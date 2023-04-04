import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders  } from '@angular/common/http';
import { Observable,of,lastValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient,
  ) { 

  }

  getHospitalList(): Observable<any>{
    return this._http.get('http://127.0.0.1:8000/api/hospitals/').pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  deleteAuthen(id:number): Observable<any>{
    return this._http.delete(`http://127.0.0.1:8000/api/authens/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }


  authenStatusCheck(id:number): Observable<any>{
    return this._http.get(`http://127.0.0.1:8000/api/user/authen/check/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  authenRemoveCheck(id:number): Observable<any>{
    return this._http.delete(`http://127.0.0.1:8000/api/user/authen/check/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  isAuthen(id:number): Observable<any>{
    return this._http.get(`http://127.0.0.1:8000/api/user/authen/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  updateUser(id:number,data: any): Observable<any>{
    return this._http.put(`http://127.0.0.1:8000/api/users/user/${id}`,data).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  updatePassword(id:number,data: any): Observable<any>{
    return this._http.put(`http://127.0.0.1:8000/api/users/password/${id}`,data).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }


  confirmPwd(id:number,data: any): Observable<any>{
    return this._http.patch(`http://127.0.0.1:8000/api/users/user/${id}`,data).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }


  requestAuthen(data: any): Observable<any>{
    const formData = new FormData();

    formData.append('firstname',data.firstname);
    formData.append('surname',data.surname);
    formData.append('address',data.address);
    formData.append('dob',data.dob);
    formData.append('dateauthen',data.dateauthen);
    formData.append('idcard',data.idcard);
    formData.append('tel',data.tel);
    formData.append('user',data.user);

    for (const file of data.uploaded_images) {
      formData.append('uploaded_images', file);
    }

    return this._http.post('http://127.0.0.1:8000/api/authens/',formData).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('error:', error);
          return of(false);
        }
        return of(true);
      })
    );
  }

  async getCurrentUser():  Promise<any>{
    const response = await lastValueFrom(this._http.get('http://127.0.0.1:8000/api/users/user'))
    return response;
  }
}
