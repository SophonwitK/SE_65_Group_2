import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders  } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DonateService {

  constructor(
    private _http: HttpClient,
  ) { 

  }

  donateHistory(id:number): Observable<any>{
    return this._http.get(`http://127.0.0.1:8000/api/payments/user/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  getPayment(id:number): Observable<any>{
    return this._http.get(`http://127.0.0.1:8000/api/payments/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  updatePayment(id:number,data:any): Observable<any>{
    const formData = new FormData();
    
    formData.append('status',data.status)
    for (const file of data.paymentcardimg) {
      formData.append('paymentcardimg', file);
    }

    return this._http.put(`http://127.0.0.1:8000/api/payments/${id}`,formData).pipe(
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
