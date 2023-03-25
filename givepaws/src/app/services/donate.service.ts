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

  postDonate(data:any): Observable<any>{
    const formData = new FormData();
    formData.append('topic',data.topic)
    formData.append('description',data.description)
    formData.append('date',data.date)
    formData.append('cardstatus',data.cardstatus)
    formData.append('receipttype',data.receipttype)
    formData.append('receiptnumber',data.receiptnumber)
    for (const file of data.receiptimgpath) {
      formData.append('receiptimgpath', file);
    }
    formData.append('price',data.price)
    for (const file of data.uploaded_images) {
      formData.append('uploaded_images', file);
    }
    formData.append('hospitalid',data.hospitalid)
    formData.append('user',data.user)


    return this._http.post('http://127.0.0.1:8000/api/cards/',formData).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  getAllCardByUserID(id:number): Observable<any>{
    return this._http.get(`http://127.0.0.1:8000/api/cards/users/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  
  getCardByID(id:number): Observable<any>{
    return this._http.get(`http://127.0.0.1:8000/api/cards/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

    
  deleteCardByID(id:number): Observable<any>{
    return this._http.delete(`http://127.0.0.1:8000/api/cards/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  getDonateAcceptByCardID(id:number): Observable<any>{
    return this._http.get(`http://127.0.0.1:8000/api/card/donate/accept/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }


  postTopic(data:any): Observable<any>{
    return this._http.post('http://127.0.0.1:8000/api/donate/topic/',data).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
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
