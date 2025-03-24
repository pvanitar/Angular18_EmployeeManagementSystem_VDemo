import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IProject, IProjectEmployee } from '../models/interface/master';
import { Dashboard, Employee } from '../models/class/Employee';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  apiURL:string="https://projectapi.gerasim.in/api/EmployeeManagement/";
  constructor(private http:HttpClient) { }

  getAllParentDepartment ():Observable<IApiResponse>{
    return this.http.get<IApiResponse>(this.apiURL+"GetParentDepartment");
  }

  getAllDepartmentbyParentdeptId (deptId:number):Observable<IApiResponse>{
    //return this.http.get<IApiResponse>("https://projectapi.gerasim.in/api/EmployeeManagement/GetChildDepartmentByParentId"+deptId);
    //Using Template Litral
    return this.http.get<IApiResponse>(`${this.apiURL}GetChildDepartmentByParentId?deptId=${deptId}`);
  }

  //Emplotee
  saveEmployee (obj:Employee):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(this.apiURL+"CreateEmployee",obj);
  }
  getAllEmployees ():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiURL+"GetAllEmployees");
  }
  updateEmployee (obj:Employee):Observable<IApiResponse>{
    return this.http.put<IApiResponse>(this.apiURL+"UpdateEmployee/"+obj.employeeId,obj);
  }
  deleteEmployeeById(id: number): Observable<IApiResponse> {
    return this.http.delete<IApiResponse>(`${this.apiURL}DeleteEmployee/${id}`);
  }

  //Project
  getAllProjects ():Observable<IProject[]>{
    return this.http.get<IProject[]>(this.apiURL+"GetAllProjects");
  }
  saveProject (obj:IProject):Observable<IProject>{
    return this.http.post<IProject>(this.apiURL+"CreateProject",obj);
  }
  getProjectById (id:number):Observable<IProject>{
    return this.http.get<IProject>(this.apiURL+"GetProject/"+id);
  }
  updateProject (obj:IProject):Observable<IProject>{
    return this.http.put<IProject>(this.apiURL+"UpdateProject/"+obj.projectId,obj);
  }
  deleteProjectById (id:number):Observable<IProject>{
    return this.http.delete<IProject>(this.apiURL+"DeleteProject/"+id);
  }

  //Project Employee
  getAllProjectEmployees ():Observable<IProjectEmployee[]>{
    return this.http.get<IProjectEmployee[]>(this.apiURL+"GetAllProjectEmployees");
  }
  saveProjectEmployee (obj:IProjectEmployee):Observable<IProjectEmployee>{
    debugger;
    return this.http.post<IProjectEmployee>(this.apiURL+"CreateProjectEmployee",obj);
  }
  updateProjectEmployee (obj:IProjectEmployee):Observable<IProjectEmployee>{
    return this.http.put<IProjectEmployee>(this.apiURL+"UpdateProjectEmployee/"+obj.empProjectId,obj);
  }
  deleteProjectEmployeeById (id:number):Observable<IProjectEmployee>{
    return this.http.delete<IProjectEmployee>(this.apiURL+"DeleteProjectEmployee/"+id);
  }
  //Dashboard
  getDahboardDetails ():Observable<Dashboard>{
    return this.http.get<Dashboard>(this.apiURL+"GetDashboard");
  }

}
