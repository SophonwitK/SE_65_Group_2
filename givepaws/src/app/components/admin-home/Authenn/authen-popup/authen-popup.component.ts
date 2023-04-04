import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenService } from '../Authensevice/authen.service';



@Component({
  selector: 'app-authen-popup',
  templateUrl: './authen-popup.component.html',
  styleUrls: ['./authen-popup.component.scss']
})
export class AuthenPopupComponent implements OnInit {
  comment:FormGroup

  imageObject: Array<object> = []
  constructor(
    public _dialogRef: MatDialogRef<AuthenPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder,
    private _toastr:ToastrService,
    private _authenService:AuthenService,
    ) {
      this.comment = this._fb.group({
        comment: this._fb.control('',Validators.required),
        isapprove	:'',
        authen: this.data.authid,
      })
  }

  ngOnInit(): void {
    console.log(this.data)
    this.data.images.forEach((data:any) => {
      this.imageObject.push({
        image: `http://127.0.0.1:8000${data.image}`,
        thumbImage: `http://127.0.0.1:8000${data.image}`,
      })
    });
  }

  onReject(){
    if(this.comment.valid){
      this.comment.patchValue({
        isapprove:'0'
      })
      console.log(this.comment.value)
      this._authenService.postAuthen(this.comment.value).subscribe({
        next: res =>{
          this._dialogRef.close()
          this._toastr.success('post successfully')
        },
        error: err =>{
          console.log(err)
          this._toastr.error('something wrong')
        }
      })
    }else{
      this._toastr.warning('Plase enter valid data')
    }
  }

  onApprove(){
    if(this.comment.valid){
      this.comment.patchValue({
        isapprove:'1'
      })
      this._authenService.postAuthen(this.comment.value).subscribe({
        next: res =>{
          const data ={
            "is_authen":"1"
          }
          this._authenService.putAuthenUser(data,this.data.user.id).subscribe({})
          this._dialogRef.close()
          this._toastr.success('post successfully')
        },
        error: err =>{
          console.log(err)
          this._toastr.error('something wrong')
        }
      })
    }else{
      this._toastr.warning('Plase enter valid data')
    }
  }


}
