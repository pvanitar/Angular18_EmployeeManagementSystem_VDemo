import { Component, inject, OnInit, signal } from '@angular/core';
import { IProject, IProjectEmployee } from '../../models/interface/master';
import { MasterService } from '../../service/master.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../models/class/Employee';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-project-employee',
  standalone: true,
  imports: [ReactiveFormsModule,AsyncPipe],
  templateUrl: './project-employee.component.html',
  styleUrl: './project-employee.component.css'
})
export class ProjectEmployeeComponent implements OnInit {

  projectEmployeeList=signal<IProjectEmployee[]>([]);
  masterService=inject(MasterService);

  empProjectForm:FormGroup=new FormGroup({});
  projectList$:Observable<IProject[]>=new Observable<IProject[]>();
  employeeList$:Observable<Employee[]>=new Observable<Employee[]>();

  ngOnInit(): void {
    this.getAllProjectEmployees();
    this.projectList$=this.masterService.getAllProjects();
    this.employeeList$=this.masterService.getAllEmployees();
  }

  initializeForm(){
    this.empProjectForm=new FormGroup({
      empProjectId:new FormControl(0),
      projectId:new FormControl(0),
      empId:new FormControl(0),
      assignedDate:new FormControl(''),
      role:new FormControl(''),
      isActive:new FormControl('')
    })
  }
  getAllProjectEmployees(){
    this.masterService.getAllProjectEmployees().subscribe((res:IProjectEmployee[])=>{
      this.projectEmployeeList.set(res);
    })
  }
  onSave(){
    const formValue=this.empProjectForm.value;
    debugger;
          this.masterService.saveProjectEmployee(formValue).subscribe((res:IProjectEmployee)=>{
            alert("Project Employee Created Successfully!");
            this.empProjectForm.reset();
          },error=>{
            alert("Error on Project Employee Create!");
          })
  }
}
