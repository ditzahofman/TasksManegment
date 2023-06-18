import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task-model';
import { appConfig } from '../utils/app-config';
import {  firstValueFrom } from 'rxjs';
import { CustomerModel } from '../models/customer-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  public async getAllTasks():Promise<TaskModel[]>{
    const observable= this.http.get<TaskModel[]>(appConfig.tasksUrl)
    const tasks = await firstValueFrom(observable)
    return tasks
  }

  public async getAllCustomers():Promise<CustomerModel[]>{
    const observable= this.http.get<CustomerModel[]>(appConfig.customersUrl)
    const customers = await firstValueFrom(observable)
    return customers
  }

  public async addTask(task:TaskModel):Promise<void>{
    const observable = this.http.post(appConfig.tasksUrl,task)
    await firstValueFrom(observable)
  }

 

}
