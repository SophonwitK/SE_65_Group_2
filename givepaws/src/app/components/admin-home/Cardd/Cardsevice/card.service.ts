import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private _http: HttpClient) { }

  addCard(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/card', data)
  }

  updateCard(id: number,data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/card/${id}`, data)
  }

  getCardList(): Observable<any> {
    return this._http.get('http://localhost:3000/card')
  }

  deleteCard(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/card/${id}`)
  }
}
