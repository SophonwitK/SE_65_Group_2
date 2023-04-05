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
    const formData = new FormData();
    formData.append('username',data.username)
    formData.append('name',data.name)
    formData.append('email',data.email)
    formData.append('is_staff',data.is_staff)
    formData.append('is_hospitalcoordinator',data.is_hospitalcoordinator)
    formData.append('is_employee',data.is_employee)
    formData.append('is_authen',data.is_authen)

    return this._http.put(`http://127.0.0.1:8000/api/users/${id}`, formData)
  }

  getMemberList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/users/list')
  }

  deleteMember(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/users/${id}`)
  }

}
