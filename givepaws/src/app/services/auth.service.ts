import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable,lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  exp:any;

  constructor(
    private _http:HttpClient,
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
    console.log(JSON.parse(this.exp).exp)
    console.log(new Date().getTime() / 1000)
    if(JSON.parse(this.exp).exp > new Date().getTime() / 1000)
      return true
    return false
  }
  isActive(){
    return sessionStorage.getItem('username')!=null?sessionStorage.getItem('username')?.toString():'';
  }

}
