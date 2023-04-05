import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberService } from '../Memberservice/member.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit {
  memberForm: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _memberService: MemberService, 
    private _dialogRef: MatDialogRef<EditMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toastr:ToastrService,
  ) {
    this.memberForm = this._fb.group({
      username: this._fb.control('',Validators.required),
      name: this._fb.control('',Validators.required),
      email: this._fb.control('',Validators.required),
      is_staff:0,
      is_hospitalcoordinator:0,
      is_employee:0,
      is_authen:0,
      role:this._fb.control('',Validators.required),
    })
   }

  ngOnInit() {
    console.log(this.data)
    this.memberForm.patchValue(this.data)
    if(this.data.is_hospitalcoordinator==1){
      this.memberForm.patchValue({
        role:'hc'
      })
    }else if(this.data.is_employee==1){
      this.memberForm.patchValue({
        role:'employee'
      })
    }else if(this.data.is_staff==1){
      this.memberForm.patchValue({
        role:'admin'
      })
    }else if(this.data.is_authen==1){
      this.memberForm.patchValue({
        role:'authUser'
      })
    }else{
      this.memberForm.patchValue({
        role:'user'
      })
    }
  }

  onSubmit(){
    if(this.memberForm.valid){

      if(this.memberForm.value.role==='hc'){
        this.memberForm.patchValue({
          is_staff:0,
          is_hospitalcoordinator:1,
          is_employee:0,
          is_authen:0,
        })
      }else if(this.memberForm.value.role==='employee'){
        this.memberForm.patchValue({
          is_staff:0,
          is_hospitalcoordinator:0,
          is_employee:1,
          is_authen:0,
        })
      }else if(this.memberForm.value.role==='admin'){
        this.memberForm.patchValue({
          is_staff:1,
          is_hospitalcoordinator:0,
          is_employee:0,
          is_authen:0,
        })
      }else if(this.memberForm.value.role==='authUser'){
        this.memberForm.patchValue({
          is_staff:0,
          is_hospitalcoordinator:0,
          is_employee:0,
          is_authen:1,
        })
      }else{
        this.memberForm.patchValue({
          is_staff:0,
          is_hospitalcoordinator:0,
          is_employee:0,
          is_authen:0,
        })
      }
      this._memberService.updateMember(this.data.id,this.memberForm.value).subscribe({
        next: (val: any) => {
          alert('Member update!');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          this._toastr.error('something wrong')
          console.error(err);
        },
      })
    }
  }

}
