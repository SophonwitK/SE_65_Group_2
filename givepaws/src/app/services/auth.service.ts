import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _http:HttpClient,
    private _router: Router,
    ) { }

  register(data:any): Observable<any>{
    return this._http.post('http://127.0.0.1:8000/api/users/register',data)
  }
  getLoginUser(): Observable<any>{
    return this._http.get('http://127.0.0.1:8000/api/users/user')
  }
  login(data:any): Observable<any>{
      return this._http.post('http://127.0.0.1:8000/api/users/login',data)
  }
 
}
