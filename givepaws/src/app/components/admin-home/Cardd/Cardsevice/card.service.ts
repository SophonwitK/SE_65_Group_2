import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private _http: HttpClient) { }


  getAllReportByCardID(id:number): Observable<any> {
    return this._http.get(`http://127.0.0.1:8000/api/card/${id}/reports/`)
  }

}
