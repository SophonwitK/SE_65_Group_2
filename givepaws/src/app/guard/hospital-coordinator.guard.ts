import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HospitalCoordinatorGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _toastr: ToastrService,
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this._authService.getRole()==='hospital-coordinator'){
      return true
    }else{
      this._toastr.error('Unauthorize !')
      return false;
    }
  }
  
}
