import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent,AboutComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HospitalCoordinatorComponent } from './components/hospital-coordinator/hospital-coordinator.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DonateHistoryComponent } from './components/donate-history/donate-history.component';
import { CardAllComponent } from './components/card-all/card-all.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostCardHistoryComponent } from './components/post-card-history/post-card-history.component';
import { UserGuard } from './guard/user.guard';
import { AuthGuard } from './guard/auth.guard';
import { AuthenUserGuard } from './guard/authen-user.guard';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'hospitalcoordinator',component:HospitalCoordinatorComponent},
  {path:'profile/:username',component:UserProfileComponent},
  {path:'authentication',component:AuthenticationComponent},
  {path:'authentication/:id',component:AuthenticationComponent},
  {path:'donate/history/:username',component:DonateHistoryComponent},
  {path:'post/card/history/:username',component:PostCardHistoryComponent},
  {path:'post/donate',component:PostCardComponent,canActivate:[AuthGuard,AuthenUserGuard]},
  {path:'edit/card/:id',component:PostCardComponent,canActivate:[AuthGuard,AuthenUserGuard]},
  {path:'donate',component:CardAllComponent,canActivate:[AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
