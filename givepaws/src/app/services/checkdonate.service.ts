import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckdonateService {
  constructor(private _http: HttpClient) {}
  
  add(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/checkdonate', data);
  }
  get(): Observable<any> {
    return this._http.get(`http://127.0.0.1:8000/api/payments_waiting/`);
  }
  delete(id:number): Observable<any> {
    return this._http.delete(`http://localhost:3000/checkdonate/${id}`);
  }
  update(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/checkdonate/${id}`, data);
  }
  geti(id: number): Observable<any> {
    return this._http.get(`http://localhost:3000/checkdonate/${id}`);
  }
  approve(id: number, data: any): Observable<any> {
    return this._http.put(`http://127.0.0.1:8000/api/payments/${id}/approve/`, data);
  }
  check_topic_amount(id: number, data: any): Observable<any> {
    return this._http.put(`http://127.0.0.1:8000/api/topic/by/payment/${id}/check/`, data);
  }
  reject(id: number, data: any): Observable<any> {
    console.log(data)
    return this._http.put(`http://127.0.0.1:8000/api/payments/${id}/reject/`, data);
  }
 
}