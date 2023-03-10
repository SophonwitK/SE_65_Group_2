import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hide=true


  constructor(
    private _fb: FormBuilder,
    private _toastr:ToastrService, 
    private _authService:AuthService,
    private _router:Router,
    private _http: HttpClient,
  ){
    sessionStorage.clear();
    this.loginForm = this._fb.group({
      username:this._fb.control('',Validators.compose([Validators.required,Validators.minLength(5),Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)])),
      password:this._fb.control('',Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)])),
    });
  }

  proceedLogin(){
    if(this.loginForm.valid){
      this._authService.login(this.loginForm.value).subscribe({
        next: (res) =>{
          if(res){
            sessionStorage.setItem('expire-date',JSON.stringify(jwt_decode(res.jwt)))
            this._authService.isLogin().subscribe({
              next: (res)=>{
                sessionStorage.setItem('username',res.username)
                if(res.is_staff){
                  sessionStorage.setItem('role',"admin");
                  this._router.navigate(['admin']);
                }
                else if(res.is_employee){
                  sessionStorage.setItem('role',"employee");
                }
                else if(res.is_hospitalcoordinator){
                  sessionStorage.setItem('role',"hospital-coordinator");

                }else if(res.is_authen){
                  sessionStorage.setItem('role',"authen-user");

                }
                else{
                  sessionStorage.setItem('role',"user");
                  this._router.navigate(['home']);
                }
                this._toastr.success('Login Sucessfully');
            },
              error: (err)=>{
                console.log(err)
              }
            })
          }
          else{
            this._toastr.warning('username or password are incorrect');
          }
          }
      })
    }else{
      this._toastr.warning("Please enter valid data");
    }
  }
  
}
