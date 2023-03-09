import { Component } from '@angular/core';
import { FormBuilder, FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  hide=true;
  hide2=true;

  constructor(
    private _fb:FormBuilder,
    private _toastr:ToastrService, 
    private _authService:AuthService,
    private _router:Router,)
    {
      this.registerForm = this._fb.group({
        username:this._fb.control('',Validators.compose([Validators.required,Validators.minLength(5),Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)])),
        name:this._fb.control('',Validators.required),
        email:this._fb.control('',Validators.compose([Validators.required, Validators.email])),
        password:this._fb.control('',Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)])),
        password2nd:this._fb.control('',Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)])),
      });
      this.registerForm.addValidators(
        createCompareValidator(this.registerForm.get('password'),this.registerForm.get('password2nd'))
      );
    }

  validateRegister(){
    if(this.registerForm.valid){
      this.registerForm.removeControl('password2nd')
      this._authService.register(this.registerForm.value).subscribe({
        next: () =>{
          this._toastr.success('Registered Sucessfully')
          this._router.navigate(['login'])
        },
        error: (err: any) =>{
          console.error(err)
        },
      });
    }else{
      this._toastr.warning("Please enter valid data")
    }
  }
  
}

function createCompareValidator(controlOne: any, controlTwo: any) {
  return () => {
  if (controlOne.value !== controlTwo.value)
    return { passwordMatch: { message: 'Passwords do not match.' } };
  return null;
  };
}
