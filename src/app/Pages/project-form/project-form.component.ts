import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../models/class/Employee';
import { MasterService } from '../../service/master.service';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProject } from '../../models/interface/master';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {

  projectForm:FormGroup =new FormGroup({});

  employeeList$: Observable<Employee[]> = new Observable<[]>;

  masterService=inject(MasterService);

  activatedRoute=inject(ActivatedRoute);

  constructor(){
    this.initializeForm();
    this.employeeList$ = this.masterService.getAllEmployees();
    this.activatedRoute.params.subscribe((res:any)=>{
      if(res.id!=0){
        this.getProjectById(res.id);
      }
    })
  }
 
  initializeForm(data?:IProject){
    this.projectForm= new FormGroup({
      projectId:new FormControl(data?data.projectId:0),
      projectName:new FormControl(data?data.projectName:''),
      clientName:new FormControl(data?data.clientName:''),
      startDate:new FormControl(data?data.startDate:''),
      leadByEmpId:new FormControl(data?data.leadByEmpId:0),
      contactPerson:new FormControl(data?data.contactPerson:''),
      contactNo:new FormControl(data?data.contactNo:''),
      contactNoProject:new FormControl(data?data.contactNoProject:''),
      emailId:new FormControl(data?data.emailId:'')
  
    })
  }

   //Project
   onSaveProject(){
    const formValue=this.projectForm.value;
      this.masterService.saveProject(formValue).subscribe((res:IProject)=>{
        alert("Project Created Successfully!");
        this.projectForm.reset();
      })
    }
    getProjectById(id:number){
        this.masterService.getProjectById(id).subscribe((res:IProject)=>{
          this.initializeForm(res);
        })
      }

      onUpdateProject(){
        const formValue=this.projectForm.value;
          this.masterService.updateProject(formValue).subscribe((res:IProject)=>{
            alert("Project Updated Successfully!");
            this.projectForm.reset();
          })
        }
 }
 
