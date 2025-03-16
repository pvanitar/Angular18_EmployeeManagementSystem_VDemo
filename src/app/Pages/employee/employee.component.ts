import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IApiResponse, IChildDepartment, IParentDepartment } from '../../models/interface/master';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/class/Employee';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  isFormVisible= signal<boolean>(false);
  masterService=inject(MasterService);
  parentDeptList=signal<IParentDepartment[]>([]);
  childDeptList=signal<IChildDepartment[]>([]);
  parentDeptId:number=0;
  childDeptId:number=0;
  employeeList=signal<Employee[]>([]);

  objEmployee:Employee=new Employee();

  ngOnInit(): void {
    this.getAllParentDepartments();
    this.getAllEmployees();
  }

  getAllParentDepartments(){
    this.masterService.getAllParentDepartment().subscribe((res:IApiResponse)=>{
        this.parentDeptList.set(res.data);
    })
  }

  onParentDeptChange(){
    this.masterService.getAllDepartmentbyParentdeptId(this.parentDeptId).subscribe((Res:IApiResponse)=>{
        this.childDeptList.set(Res.data);
    })
  }

  //Employee save
  onSave(){
    this.masterService.saveEmployee(this.objEmployee).subscribe((res:IApiResponse)=>{
      alert("Employee Created Successfully!");
      this.getAllEmployees();
      this.objEmployee=new Employee();
    },error=>{
      alert("Error on Employee Create!");
    });
  }
  getAllEmployees(){
    this.masterService.getAllEmployees().subscribe((res:Employee[])=>{
        this.employeeList.set(res);
    })
  }
  onUpdate(){
    this.masterService.updateEmployee(this.objEmployee).subscribe((res:IApiResponse)=>{
      alert("Employee Updated Successfully!");
      this.getAllEmployees();
      this.objEmployee=new Employee();
    },error=>{
      alert("Error on Employee Update!");
    });
  }
  onEditEmployee(data:Employee){
    this.objEmployee=data;
    this.isFormVisible.set(true);
  }
  onDeleteEmployee(id:number){
    const isDelete=confirm("Are you sure want to Delete");
    if(isDelete){
      this.masterService.deleteEmployeeById(id).subscribe((Res:IApiResponse)=>{
        alert("Employee Deleted Successfully!");
        this.getAllEmployees();
      },error=>{
        alert("Error on Employee Delete!");
      })
    }
  }
}
