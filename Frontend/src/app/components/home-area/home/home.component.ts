import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  public tasks:TaskModel[]=[]
  public constructor(private dataService:DataService){}
  
 public async ngOnInit() {
    try {
      this.tasks = await this.dataService.getAllTasks()
    } catch (error: any) {
      alert(error.message)
    }
  }

public async updateIsDone(taskId:number){
await this.dataService.updateIsDone(taskId)

}

public async deleteMe(taskId:number){
  try {
    if(!(window.confirm("Do you sure that you want to delete this task?"))) return
    await this.dataService.deleteTask(taskId)
    alert("The task was successfully deleted")
    const index = this.tasks.findIndex((t)=>t.taskId===taskId)
    this.tasks.splice(index,1)
  } catch (error:any) {
    alert(error.message)
  }
 
}

}
