import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})

export class AuthenticationComponent implements OnInit{
  username = sessionStorage.getItem('username')
  authenData: FormGroup;
  imgMessage = "Upload Images"
  files: File[] = [];
  id: any

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _toastr: ToastrService,
    private _router: Router,
    private _activeRouter: ActivatedRoute, 
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
    console.log(this.authenData.value.dob)
  }

  ngOnInit(): void {
    this.id = this._activeRouter.snapshot.paramMap.get('id')
    if(this.id){
      this._userService.isAuthen(Number(sessionStorage.getItem('id'))).subscribe({
        next: (res)=>{
          if(res){
            this.authenData.patchValue({
              firstname: res.firstname,
              surname: res.surname,
              dob: res.dob,
              address:res.address,
              tel: res.tel,
              idcard: res.idcard,
            })
          }
        }
      })
    }
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

      if(this.authenData.value.dob.length === undefined){
        this.authenData.patchValue({
          dob: this.authenData.value.dob.toISOString().slice(0, 19).replace('T', ' '),
        })
      }
      this.authenData.patchValue({
        dateauthen: now.toISOString().slice(0, 19).replace('T', ' ')
      })

      this._userService.isAuthen(Number(sessionStorage.getItem('id'))).subscribe({
        next: (res)=>{
          if(res){
              this._userService.deleteAuthen(res.authid).subscribe({})
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

    }
    else{
      this.imgMessage = "Images Require"
      this._toastr.warning("Please, Enter valid Data")
    }
  }

}
