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
    formData.append('bankname',data.bankname)
    formData.append('accountname',data.accountname)
    formData.append('accountnumber',data.accountnumber)
    formData.append('topic',data.topic)
    formData.append('description',data.description)
    formData.append('date',data.date)
    formData.append('cardstatus',data.cardstatus)
    formData.append('receipttype',data.receipttype)
    formData.append('receiptnumber',data.receiptnumber)
    for (const file of data.receiptimgpath) {
      formData.append('receiptimgpath', file);
    }
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

  card_refresh_status(): Observable<any>{
    return this._http.post('http://127.0.0.1:8000/api/card/refresh/status/',null).pipe(
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

  getAllApproveCard(): Observable<any>{
    return this._http.get(`http://127.0.0.1:8000/api/cards/approve/`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  getAllCompleteCard(): Observable<any>{
    return this._http.get(`http://127.0.0.1:8000/api/cards/complete/`).pipe(
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
    return this._http.get(`http://127.0.0.1:8000/api/cards/id/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  getAllDonarByCardID(id:number): Observable<any>{
    return this._http.get(`http://127.0.0.1:8000/api/card/${id}/donar/`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  getAllTotalDonateByTopicID(id:number): Observable<any>{
    return this._http.get(`http://127.0.0.1:8000/api/donate/topic/${id}/payments/`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  getEmergencyCard(): Observable<any>{
    return this._http.get(`http://127.0.0.1:8000/api/card/emergency/`).pipe(
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

  closeTopicsByCardID(id:number,data:any): Observable<any>{
    return this._http.put(`http://127.0.0.1:8000/api/card/${id}/topics/close`,data).pipe(
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
    return this._http.get(`http://127.0.0.1:8000/api/card/${id}/donate/accept/`).pipe(
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

  deleteDonar(id:number): Observable<any>{
    return this._http.delete(`http://127.0.0.1:8000/api/donar/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  postDonar(data:any): Observable<any>{
    const formData = new FormData();
    formData.append('topic',data.topic)
    formData.append('description',data.description)
    formData.append('cardid',data.cardid)
    formData.append('date',data.date)
    for (const file of data.img) {
      formData.append('img', file);
    }

    return this._http.post('http://127.0.0.1:8000/api/donar/',formData).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  postReport(data:any): Observable<any>{
    return this._http.post('http://127.0.0.1:8000/api/reports/',data).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  postPayment(data:any): Observable<any>{
    const formData = new FormData();
    formData.append('status',data.status)
    formData.append('user',data.user)
    formData.append('contribution',data.contribution)
    formData.append('date',data.date)
    if(data.cardid){
      formData.append('cardid',data.cardid)
      formData.append('donatetopicid','')
    }
    if(data.donatetopicid){
      formData.append('donatetopicid',data.donatetopicid)
      formData.append('cardid','')
    }

    for (const file of data.paymentcardimg) {
      formData.append('paymentcardimg', file);
    }

    return this._http.post('http://127.0.0.1:8000/api/payments/',formData).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  closeCardByID(id:number,data:any): Observable<any>{
    return this._http.put(`http://127.0.0.1:8000/api/card/${id}/close`,data).pipe(
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
