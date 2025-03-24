import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { LayoutComponent } from './Pages/layout/layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { EmployeeComponent } from './Pages/employee/employee.component';
import { ProjectComponent } from './Pages/project/project.component';
import { ProjectEmployeeComponent } from './Pages/project-employee/project-employee.component';
import { ProjectFormComponent } from './Pages/project-form/project-form.component';

export const routes: Routes = [

    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            },
            {
                path:'employee',
                component:EmployeeComponent
            },
            {
                path:'project',
                component:ProjectComponent
            },
            {
                path:'new-project/:id',
                component:ProjectFormComponent
            },
            {
                path:'project-employee',
                component:ProjectEmployeeComponent
            }
        ]
    }
];
