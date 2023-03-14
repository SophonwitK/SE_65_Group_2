import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})

export class AuthenticationComponent {
  username = sessionStorage.getItem('username')
  authenData: FormGroup;
  imgMessage = "Upload Images"
  files: File[] = [];

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _toastr: ToastrService,
    private _router: Router,
  ){
    this.authenData = this._fb.group({
      firstname: this._fb.control('',Validators.required),
      surname: this._fb.control('',Validators.required),
      dob: this._fb.control('',Validators.required),
      address: this._fb.control('',Validators.required),
      dateauthen:'',
      tel: this._fb.control('',Validators.compose([Validators.required,Validators.pattern('^[0-9]{10}$')])),
      idcard: this._fb.control('',Validators.compose([Validators.required,Validators.pattern('^[0-9]{13}$')])),
      uploaded_images: [[], Validators.required],
      user: Number(sessionStorage.getItem('id')),
    })
  }
  getColorClass(value: string) {
    if (value === "Images Require") {
      return 'red';
    } else {
      return 'grey';
    }
  }

  onSelect(event:any) {
    this.imgMessage = "Upload Images"
    this.files.push(...event.addedFiles);
    this.authenData.patchValue({
      uploaded_images: this.files
    })
   
  }
  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.authenData.patchValue({
      uploaded_images: this.files
    })
  }

  onSubmit(){
    if(this.authenData.valid){
      const now = new Date();
      this.authenData.patchValue({
        dob: this.authenData.value.dob.toISOString().slice(0, 19).replace('T', ' '),
        dateauthen: now.toISOString().slice(0, 19).replace('T', ' ')
      })
      this._userService.isAuthen(Number(sessionStorage.getItem('id'))).subscribe({
        next: (res)=>{
          if(res){
              this._userService.deleteAuthen(res.authid).subscribe({
                next: (res) =>{
                  console.log(res)
                }
              })
          }
        }
      })
      this._userService.requestAuthen(this.authenData.value).subscribe({
        next: (res) =>{
          if(res){
            this._router.navigate(['profile/',sessionStorage.getItem('username')])
            this._toastr.success('sent request successfuly')
          }else{
            this._toastr.error('error!, somthing wrong')
          }
        }
      })

      // this._userService.requestAuthen(this.authenData.value)
    }else{
      this.imgMessage = "Images Require"
      this._toastr.warning("Please, Enter valid Data")
    }
  }

}
