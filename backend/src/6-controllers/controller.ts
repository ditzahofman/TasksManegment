import express, {Request, Response, NextFunction} from "express";
import logic from "../5-logic/logic"
import TaskModel from "../4-models/taskModel";

const router = express.Router()

router.get("/customers", async(request:Request,response:Response,next:NextFunction)=>{
    try {
const customers = await logic.getAllCustomers()
response.json(customers)
    }
    catch(err:any) {
        next(err)
    }
})

router.get("/tasks", async(request:Request,response:Response,next:NextFunction)=>{
    try {
const tasks = await logic.getAllTasksWithCustomers()
response.json(tasks)
    }
    catch(err:any) {
        next(err)
    }
})

router.post("/tasks", async(request:Request,response:Response,next:NextFunction)=>{
    try {
const newTask = new TaskModel(request.body)
const addTask = await logic.addTask(newTask)
response.status(201).json(addTask)
    }
    catch(err:any) {
        next(err)
    }
})

router.patch("/tasks/:taskId", async (request: Request, response: Response, next: NextFunction) => {
    try {
      const taskId = +request.params.taskId;
      const updateTask = await logic.updateTask(taskId);
      response.status(200).json(updateTask);
    } catch (err: any) {
      next(err);
    }
  });

  router.delete("/tasks/:taskId", async (request: Request, response: Response, next: NextFunction) => {
    try {
      const taskId = +request.params.taskId;
      const deleteTask = await logic.deleteTask(taskId)
      response.sendStatus(204)
    } catch (err: any) {
      next(err);
    }
  });
  


export default router