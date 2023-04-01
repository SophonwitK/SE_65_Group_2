import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TranferService {

  constructor(private _http: HttpClient) {}

  addt(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/Tranfer', data);
  }
  gett(): Observable<any> {
    return this._http.get('http://localhost:3000/Tranfer');
  }
  deletet(id:number): Observable<any> {
    return this._http.delete(`http://localhost:3000/Tranfer/${id}`);
  }
  updatet(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/Tranfer/${id}`, data);
  }
  getit(id: number): Observable<any> {
    return this._http.get(`http://localhost:3000/Tranfer/${id}`);
  }

}
