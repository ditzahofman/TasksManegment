import { OkPacket } from "mysql";
import dal from "../2-utils/dal"
import CustomerModel from "../4-models/customerModel";
import TaskModel from "../4-models/taskModel";
import { ResourceNotFoundErrorModel } from "../4-models/error-model";

async function getAllCustomers(): Promise<CustomerModel[]> {
    const sql = `
        SELECT * FROM customers `

    const customers = await dal.execute(sql);
    return customers;
}

async function getAllTasksWithCustomers(): Promise<TaskModel[]> {
    const sql = `
        SELECT t.* , c.customerName
        From tasks AS t JOIN customers AS c
        on t.customerId = c.customerId
        `

    const books = await dal.execute(sql);
    return books;
}

async function getAllTasksByCustomer(customerId: number): Promise<TaskModel[]> {
    const sql = `
        SELECT t.* , c.customerName 
        From tasks AS t JOIN customers AS c
        on t.customerId = c.customerId
        Where t.customerId=? `

    const books = await dal.execute(sql, [customerId]);
    return books;
}

async function addTask(task: TaskModel): Promise<TaskModel> {
    const now = new Date().toLocaleDateString()
    const sql = `INSERT INTO tasks VALUES(DEFAULT,?,?,?,?)
    `
    const info: OkPacket = await dal.execute(sql, [
        task.description,
        task.date = now,
        task.customerId,
        task.isDone = false
    ])

    task.taskId = info.insertId
    return task
}

async function updateTask(taskId: number) {
    const now = new Date().toLocaleDateString();
    const sql = `UPDATE tasks
                 SET isDone = CASE WHEN isDone = true THEN false ELSE true END
                 WHERE taskId = ?;`;
    const info = await dal.execute(sql, [taskId]);
}

async function deleteTask(taskId: number): Promise<void> {
  const sql= `  DELETE FROM tasks 
    WHERE tasks.taskId = ?`
    

    const info: OkPacket = await dal.execute(sql, [taskId])
    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(taskId)

}





export default
    {
        getAllCustomers,
        getAllTasksByCustomer,
        getAllTasksWithCustomers,
        addTask,
        updateTask,
        deleteTask
    }

