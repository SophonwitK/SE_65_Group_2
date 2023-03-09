import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';

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
    private http: HttpClient,
    private router: Router,
  ){
    this.loginForm = this._fb.group({
      username:this._fb.control('',Validators.compose([Validators.required,Validators.minLength(5),Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)])),
      password:this._fb.control('',Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)])),
    });
  }

  validateLoginForm(){
    if(this.loginForm.valid){
      this._authService.login(this.loginForm.value).subscribe({
        next: () =>{
          this._toastr.success('Login Sucessfully')
          this._router.navigate(['home'])
        }
      })
    }else{
      this._toastr.warning("Please enter valid data")
    }
  }
  
}
