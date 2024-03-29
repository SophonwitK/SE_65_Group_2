import { Component,Inject,OnInit,OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userData: any
  authenStatus: any
  authenData: any
  authen_req = false
  auth_bt = true
  username = sessionStorage.getItem('username')
  role = sessionStorage.getItem('role')
  user_id = sessionStorage.getItem('id')

  constructor(
    private _dialog: MatDialog,
    private _authService: AuthService,
    private _router : Router,
    private _userService: UserService,
  ){

  }
  ngOnInit(): void {
    this.refresh();
    this.isApprove();
    this.isAuthen();
  }

  isApprove(){
    this._userService.authenStatusCheck(Number(this.user_id)).subscribe({
      next: res=>{
        if(res){
          this.authenStatus = res
        }
      }
    })
  }

  isAuthen(){
    this._userService.isAuthen(Number(this.user_id)).subscribe({
      next: (res)=>{
        if(res){
          this.authen_req=true
          this.auth_bt=false
          if(this.authenStatus){
            this.authenData = res
            this.auth_bt = false
            this.authen_req=false
            if(this.authenStatus.isapprove){
              sessionStorage.setItem('role','auth-user')
            }
          }
        }else{
          this.auth_bt=true
        }
      }
    })
  }

  openChangePwd(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialog = this._dialog.open(UpdatePasswordDialog, {
      width:'20%',
      height: '50%',
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

  openDonate(){
    this._router.navigate(['/donate/history/',sessionStorage.getItem('username')])
  }

  openAcceptDonate(){
    this._router.navigate(['/acceptdonate/history/',])
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
  selector: 'update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordDialog {
  hide=true;
  hide2=true;
  hide3=true;
  userData: FormGroup;
  constructor(
    public _dialogRef: MatDialogRef<UpdatePasswordDialog>,
    private _fb : FormBuilder,
    private _userService:UserService,
    private _toastr : ToastrService,
    private _authService: AuthService
    ) {
      this.userData = this._fb.group({
        old_password:this._fb.control('',Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)])),
        password:this._fb.control('',Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)])),
        confirm_password:this._fb.control('',Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)])),
      })
      this.userData.addValidators(
        this._authService.createCompareValidator(this.userData.get('password'),this.userData.get('confirm_password'))
      )
    }

    updatePwd(){
      if(this.userData.valid){
        this.userData.removeControl('confirm_password')
        this._userService.updatePassword(Number(sessionStorage.getItem('id')),this.userData.value).subscribe({
          next: (res) =>{
            console.log(res)
            if(res){
              this._toastr.success('password change successfully');
              this._dialogRef.close(res);
            }else{
              this._toastr.warning('wrong old password');
            }
          }
        })
      }
      else{
        this._toastr.warning('please enter valid data');
      }
    }

}
