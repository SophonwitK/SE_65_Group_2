import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse  } from '@angular/common/http';
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

  async getCurrentUser():  Promise<any>{
    const response = await lastValueFrom(this._http.get('http://127.0.0.1:8000/api/users/user'))
    return response;
  }
  
}
