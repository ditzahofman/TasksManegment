import { OkPacket } from "mysql";
import dal from "../2-utils/dal"
import CustomerModel from "../4-models/customerModel";
import TaskModel from "../4-models/taskModel";

async function getAllCustomers() :Promise<CustomerModel[]>{
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

async function getAllTasksByCustomer(customerId:number): Promise<TaskModel[]> {
    const sql = `
        SELECT t.* , c.customerName 
        From tasks AS t JOIN customers AS c
        on t.customerId = c.customerId
        Where t.customerId=? `

    const books = await dal.execute(sql,[customerId]);
    return books;
}

async function addTask(task:TaskModel):Promise<TaskModel>{
    const sql = `INSERT INTO tasks VALUES(DEFAULT,?,?,?,?)
    `
    const info:OkPacket =await dal.execute(sql,[
        task.description,
        task.date,
        task.customerId,
        task.isDone
    ])

    task.taskId = info.insertId
    return task
}





export default
{
    getAllCustomers,
    getAllTasksByCustomer,
    getAllTasksWithCustomers,
    addTask
}

