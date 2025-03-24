import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Dashboard } from '../../models/class/Employee';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit{

  dashboardData:Dashboard=new Dashboard();
  masterService=inject(MasterService); 

  ngOnInit(): void {
    this.masterService.getDahboardDetails().subscribe((res:Dashboard)=>{
      this.dashboardData=res; 
    })
  }
}
