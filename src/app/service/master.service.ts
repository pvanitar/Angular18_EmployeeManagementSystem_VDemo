import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../models/interface/master';
import { Employee } from '../models/class/Employee';

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

  //Emplotee save
  saveEmployee (obj:Employee):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(this.apiURL+"CreateEmployee",obj);
  }
  getAllEmployees ():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiURL+"GetAllEmployees");
  }
  updateEmployee (obj:Employee):Observable<IApiResponse>{
    return this.http.put<IApiResponse>(this.apiURL+"UpdateEmployee/"+obj.employeeId,obj);
  }
  deleteEmployeeById (id:number):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(this.apiURL+"DeleteEmployee/"+id);
  }
}
