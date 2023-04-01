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
    return this._http.get(`http://localhost:3000/checkdonate`);
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
 

}