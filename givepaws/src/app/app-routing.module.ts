import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent,AboutComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HospitalCoordinatorComponent } from './components/hospital-coordinator/hospital-coordinator.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DonateHistoryComponent } from './components/donate-history/donate-history.component';
import { CardAllComponent } from './components/card-all/card-all.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostCardHistoryComponent } from './components/post-card-history/post-card-history.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthenUserGuard } from './guard/authen-user.guard';
import { CardComponent } from './components/card/card.component';
import { CheckDonatePaymentListComponent } from './components/check-donate-payment-list/check-donate-payment-list.component';
import { CompleteCardComponent } from './components/complete-card/complete-card.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminGuard } from './guard/admin.guard';
import { TrasnferComponent } from './components/trasnfer/trasnfer.component';
import { CarddetailComponent } from './components/admin-home/Cardd/carddetail/carddetail.component';
import { EmployeeGuard } from './guard/employee.guard';
import { HospitalCoordinatorGuard } from './guard/hospital-coordinator.guard';

const routes: Routes = [
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'about',component:AboutComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'hc',component:HospitalCoordinatorComponent,canActivate:[AuthGuard, HospitalCoordinatorGuard]},
  {path:'profile/:username',component:UserProfileComponent},
  {path:'authentication',component:AuthenticationComponent},
  {path:'authentication/:id',component:AuthenticationComponent},
  {path:'donate/history/:username',component:DonateHistoryComponent},
  {path:'post/card/history/:username',component:PostCardHistoryComponent,canActivate:[AuthGuard,AuthenUserGuard]},
  {path:'post/card',component:PostCardComponent,canActivate:[AuthGuard,AuthenUserGuard]},
  {path:'edit/card/:id',component:PostCardComponent,canActivate:[AuthGuard,AuthenUserGuard]},
  {path:'cards',component:CardAllComponent},
  {path:'cards/:id',component:CardComponent},
  {path:'employee',component:CheckDonatePaymentListComponent,canActivate:[AuthGuard,EmployeeGuard]},
  {path:'cards/complete/history',component:CompleteCardComponent},
  {path:'admin',component:AdminHomeComponent,canActivate:[AuthGuard,AdminGuard]},
  {path:'bill',component:TrasnferComponent,canActivate:[AuthGuard,EmployeeGuard]},
  {path:'admin/card/:id/reports',component:CarddetailComponent,canActivate:[AuthGuard,AdminGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
