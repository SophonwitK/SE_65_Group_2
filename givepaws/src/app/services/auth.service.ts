import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  exp:any;

  constructor(
    private _http: HttpClient,
    private _toastr: ToastrService,
    private _router: Router,
    ) { }

  register(data:any): Observable<any>{
    return this._http.post('http://127.0.0.1:8000/api/users/register',data).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  logout(data:any): Observable<any>{
    sessionStorage.clear()
    this._router.navigate(['/'])
    this._toastr.success('logout sucessfuly')
    return this._http.post('http://127.0.0.1:8000/api/users/logout',data)
  }
  isLogin(): Observable<any>{
    return this._http.get('http://127.0.0.1:8000/api/users/user').pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  login(data:any): Observable<any>{
      return this._http.post('http://127.0.0.1:8000/api/users/login',data).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error) {
            console.log('error:', error);
            return of(false);
          }
          return of(true);
        })
      );
  }

  getRole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }

  isExpire(){
    this.exp = sessionStorage.getItem('expire-date')
    if(this.exp == null)
      return false
    // console.log(JSON.parse(this.exp).exp)
    // console.log(new Date().getTime() / 1000)
    if(JSON.parse(this.exp).exp > new Date().getTime() / 1000)
      return true
    return false
  }

  isActive(){
    return sessionStorage.getItem('username')!=null?sessionStorage.getItem('username')?.toString():'';
  }

  getUserRole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }


  createCompareValidator(controlOne: any, controlTwo: any){
    return () => {
    if (controlOne.value !== controlTwo.value)
      return { passwordMatch: { message: 'Passwords do not match.' } };
    return null;
    };
  }


}
