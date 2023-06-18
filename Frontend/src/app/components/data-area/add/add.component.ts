import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerModel } from 'src/app/models/customer-model';
import { TaskModel } from 'src/app/models/task-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public task=new TaskModel()
  public customer:CustomerModel[]=[]
  
  public constructor(private dataService:DataService,public router:Router){}
  
  
public async ngOnInit():Promise <void> {
    try {
      this.customer= await this.dataService.getAllCustomers()
    } catch (err:any) {
      alert(err)
    }
  }
  public async send():Promise<void>{
    try {
      await this.dataService.addTask(this.task) 
      alert("The gift has been successfully added")
      this.router.navigateByUrl("/home")
    } catch (error:any) {
      alert(error.message)
    }
  
   }

}

