import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) { }

  register(data:any): Observable<any>{
    return this._http.post('http://127.0.0.1:8000/api/users/register',data)
  }
  getLoginUser(){
    return this._http.get('http://127.0.0.1:8000/api/users/user')
  }
}
