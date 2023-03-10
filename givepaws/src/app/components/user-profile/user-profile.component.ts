import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  user: FormGroup
  constructor(
    private _router : Router,
    private _fb : FormBuilder
  ){
    this.user = this._fb.group({
      username:this._fb.control('',Validators.compose([Validators.required,Validators.minLength(5),Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)])),
      name:this._fb.control('',Validators.required),
      email:this._fb.control('',Validators.compose([Validators.required, Validators.email])),
      password:this._fb.control('',Validators.compose([Validators.minLength(8),Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)])),
      password2nd:this._fb.control(''),
    })
  }

  updateUser(){
    
  }


}
