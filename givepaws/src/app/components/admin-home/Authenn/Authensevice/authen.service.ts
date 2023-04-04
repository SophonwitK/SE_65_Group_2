import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,catchError,of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(private _http: HttpClient) { }

  getAuthenList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/authens/')
  }

  postAuthen(data:any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/authen/check/',data)
  }
  putAuthenUser(data:any,id:number): Observable<any> {
    return this._http.put(`http://127.0.0.1:8000/api/users/${id}`,data)
  }
}