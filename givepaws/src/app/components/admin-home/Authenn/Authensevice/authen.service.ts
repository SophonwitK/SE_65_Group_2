import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(private _http: HttpClient) { }

  addAuthen(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/authen', data)
  }

  updateAuthen(id: number,data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/authen/${id}`, data)
  }

  getAuthenList(): Observable<any> {
    return this._http.get('http://localhost:3000/authen')
  }

  deleteAuthen(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/authen/${id}`)
  }
}
