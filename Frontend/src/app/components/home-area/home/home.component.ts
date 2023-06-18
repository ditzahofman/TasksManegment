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

}
