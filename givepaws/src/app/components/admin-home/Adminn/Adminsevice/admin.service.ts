import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient) { }

  addAdmin(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/admin', data)
  }

  updateAdmin(id: number,data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/admin/${id}`, data)
  }

  getAdminList(): Observable<any> {
    return this._http.get('http://localhost:3000/admin')
  }

  deleteAdmin(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/admin/${id}`)
  }
}
