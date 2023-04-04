import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders  } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranferService {

  constructor(private _http: HttpClient) {}

  addt(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/Tranfer', data);
  }
  gett(): Observable<any> {
    return this._http.get(`http://127.0.0.1:8000/api/donate/topic/complete/list/`);
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


  update_slipimg(data:any,id:number): Observable<any>{
    console.log(data)
    console.log(id)
    const formData = new FormData();
    for (const file of data.slipimgcomplete) {
      formData.append('slipimgcomplete', file);
    }
    return this._http.put(`http://127.0.0.1:8000/api/topic/${id}/update/slip`,formData).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

}
