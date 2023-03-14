import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HospitalCoordinatorComponent } from './components/hospital-coordinator/hospital-coordinator.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { AcceptingDonationHistoryComponent } from './components/accepting-donation-history/accepting-donation-history.component';
import { DonateHistoryComponent } from './components/donate-history/donate-history.component';
import { UserGuard } from './guard/user.guard';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'hospitalcoordinator',component:HospitalCoordinatorComponent},
  {path:'profile/:username',component:UserProfileComponent},
  {path:'authentication/:username',component:AuthenticationComponent},
  {path:'donate/history/:username',component:DonateHistoryComponent},
  {path:'acceptdonate/history/:username',component:AcceptingDonationHistoryComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
