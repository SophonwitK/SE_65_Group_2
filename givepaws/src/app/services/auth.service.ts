import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) { }

  register(data:any): Observable<any>{
    return this._http.post('http://127.0.0.1:8000/api/users/register',data)
  }
  getLoginUser(): Observable<any>{
    return this._http.get('http://127.0.0.1:8000/api/users/user')
  }
  login(data:any): Observable<any>{
    return this._http.post<{ token: string }>('http://127.0.0.1:8000/api/users/login', data)
    .pipe(
      map(result => {
        if (result.token) {
          localStorage.setItem('access_token', result.token);
          return true;
        }
        return false;
      })
    );
  }
  logout(): Observable<any>{
    localStorage.removeItem('access_token');
    return this._http.get('http://127.0.0.1:8000/api/users/logout')
  }
  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}
