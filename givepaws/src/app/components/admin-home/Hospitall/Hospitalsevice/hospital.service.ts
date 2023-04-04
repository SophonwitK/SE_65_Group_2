import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private _http: HttpClient) { }

  addHospital(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/hospital', data)
  }

  updateHospital(id: number,data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/hospital/${id}`, data)
  }

  getHospitalList(): Observable<any> {
    return this._http.get('http://localhost:3000/hospital')
  }

  deleteHospital(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/hospital/${id}`)
  }
}
