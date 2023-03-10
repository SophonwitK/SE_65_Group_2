import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { HospitalCoordinatorComponent } from './components/hospital-coordinator/hospital-coordinator.component';
import { EmployeeComponent } from './components/employee/employee.component';

const routes: Routes = [
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuard]},
  {path:'employee',component:EmployeeComponent,canActivate:[AuthGuard]},
  {path:'hospitalcoordinator',component:HospitalCoordinatorComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
