import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private _http: HttpClient) { }

  addMember(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/users/list', data)
  }

  updateMember(id: number,data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/member/${id}`, data)
  }

  getMemberList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/users/list')
  }

  deleteMember(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/member/${id}`)
  }
  getMember(id: number): Observable<any> {
    return this._http.get(`http://localhost:3000/member/${id}`)
  }
}
