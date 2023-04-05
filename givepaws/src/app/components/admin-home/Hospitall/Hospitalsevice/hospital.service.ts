import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private _http: HttpClient) { }

  addHospital(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/hospitals/', data)
  }

  updateHospital(id: number,data: any): Observable<any> {
    return this._http.put(`http://127.0.0.1:8000/api/hospitals/${id}`, data)
  }

  getHospitalList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/hospitals/')
  }

  deleteHospital(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/hospitals/${id}`)
  }
}
