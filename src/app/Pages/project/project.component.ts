import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IProject } from '../../models/interface/master';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  projectList:IProject[]=[]; 
  masterService=inject(MasterService);
  router=inject(Router);

  ngOnInit():void{
    this.getProjects();
  }

  getProjects(){
      this.masterService.getAllProjects().subscribe((res:IProject[])=>{
              this.projectList=res;
      })
  }

  onUpdateProject(id:number){
      this.router.navigate(['new-project',id]);
    }
   
    onDeleteProject(id:number){
      const isDelete=confirm("Are you sure want to Delete");
      if(isDelete){
        this.masterService.deleteProjectById(id).subscribe((Res:IProject)=>{
          alert("Project Deleted Successfully!");
        },error=>{
          alert("Error on Project Delete!");
        })
      }
    }
}