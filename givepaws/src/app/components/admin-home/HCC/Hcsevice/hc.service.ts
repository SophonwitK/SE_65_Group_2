import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HcService {

  constructor(private _http: HttpClient) { }

  addHc(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/hc', data)
  }

  updateHc(id: number,data: any): Observable<any> {
    return this._http.put(`http://127.0.0.1:8000/api/hc/${id}`, data)
  }

  getHcList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/hc')
  }

  getUserHcList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/role/hc')
  }


  deleteHc(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/hc/${id}`)
  }
}
