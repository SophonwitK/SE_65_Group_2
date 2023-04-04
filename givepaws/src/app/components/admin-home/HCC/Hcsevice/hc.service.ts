import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HcService {

  constructor(private _http: HttpClient) { }

  addHc(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/hc', data)
  }

  updateHc(id: number,data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/hc/${id}`, data)
  }

  getHcList(): Observable<any> {
    return this._http.get('http://localhost:3000/hc')
  }

  deleteHc(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/hc/${id}`)
  }
}
