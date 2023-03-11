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
    private _router : Router,
  ){

  }
  async ngOnInit() {
    this.refresh()
  }

  openUpdateUser(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialog = this._dialog.open(UpdateUserDialog, {
      data: this.userData,
      width:'20%',
      height: '60%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialog.afterClosed().subscribe({
      next: (res) =>{
        if(res){
          this.userData = res
        }
        else{
          this.refresh()
        }
      }
    })
  }

  openAuthen(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialog = this._dialog.open(AuthenDialog, {
      data: this.userData,
      width:'20%',
      height: '20%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialog.afterClosed().subscribe({
      next: (res) =>{
        if(res){
          this._router.navigate(['authentication/',sessionStorage.getItem('username')])
        }
      }
    })
  }



  refresh(){
    this._authService.isLogin().subscribe(
      data => this.userData=data
    )
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
    ) {
      this.userData = this._fb.group({
        username:this._fb.control(data.username,Validators.compose([Validators.required,Validators.minLength(5),Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)])),
        name:this._fb.control(data.name,Validators.required),
        email:this._fb.control(data.email,Validators.compose([Validators.required, Validators.email])),
        password:this._fb.control('',Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)])),
      })
    }

    updateUserDialog(){
      if(this.userData.valid){
        this._userService.updateUser(Number(sessionStorage.getItem('id')),this.userData.value).subscribe({
          next: (res) =>{
            console.log(res)
            if(res){
              this._toastr.success('update successfully');
              sessionStorage.removeItem('username')
              sessionStorage.setItem('username',res.username)
              this._dialogRef.close(res);
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

@Component({
  selector: 'authen-user',
  templateUrl: './authen-user.component.html',
  styleUrls: ['./authen-user.component.scss'],
})
export class AuthenDialog {
  hide=true;
  userData: FormGroup;
  constructor(
    public _dialogRef: MatDialogRef<UpdateUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb : FormBuilder,
    private _userService: UserService,
    private _toastr : ToastrService,
    private _router : Router,

    ) {
      this.userData = this._fb.group({
        password:this._fb.control('',Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)])),
      })
    }

    confirmPwdUserDialog(){
      if(this.userData.valid){
        this._userService.confirmPwd(Number(sessionStorage.getItem('id')),this.userData.value).subscribe({
          next: (res) =>{
            if(res){
              this._dialogRef.close(res);
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
