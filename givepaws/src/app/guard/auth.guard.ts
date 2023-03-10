import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  auth = false;
  userData : any;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _toastr: ToastrService,
    )
  {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this._authService.isActive()){
      if(this._authService.isExpire()){
        return true
      }else{
        this._toastr.warning("Sessions expire! please login again")
        this._router.navigate(['login'])
        return false
      }
      
    }else{
      this._toastr.error("Unauthorize! please login")
      this._router.navigate(['login'])
      return false
    }

  }
  
}
