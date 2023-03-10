import { Component,Inject,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userData: any;
  constructor(
    private _dialog: MatDialog,
    private _authService: AuthService,
  ){
    
  }
  ngOnInit(): void {
    this._authService.isLogin().subscribe(
      data => this.userData=data
    )
  }

  updateUser(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this._dialog.open(UpdateUserDialog, {
      width:'20%',
      height: '60%',
      data: this.userData,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}


@Component({
  selector: 'update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserDialog {
  hide=true;
  userData: FormGroup;
  constructor(
    public _dialogRef: MatDialogRef<UpdateUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb : FormBuilder,
    private _userService:UserService,
    private _toastr : ToastrService,
        private _router : Router,
    ) {
      this.userData = this._fb.group({
        username:this._fb.control(data.username,Validators.compose([Validators.required,Validators.minLength(5),Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)])),
        name:this._fb.control(data.name,Validators.required),
        email:this._fb.control(data.email,Validators.compose([Validators.required, Validators.email])),
        password:this._fb.control(data.password,Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)])),
      })
    }

    updateUserDialog(){
      if(this.userData.valid){
        this._userService.updateUser(Number(sessionStorage.getItem('id')),this.userData.value).subscribe({
          next: (res) =>{
            if(res){
              sessionStorage.removeItem('username')
              sessionStorage.setItem('username',res.username)
              this._dialogRef.close();
              this._router.navigate(['/profile',sessionStorage.getItem('username')])
              this._toastr.success('update successfully');
            }else{
              this._toastr.warning('wrong password');
            }
          }
        })
      }
      else{
        this._toastr.warning('please enter valid data');
      }
    }

}
