import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberService } from '../Memberservice/member.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-add-edit',
  templateUrl: './member-add-edit.component.html',
  styleUrls: ['./member-add-edit.component.scss']
})
export class MemberAddEditComponent implements OnInit {

  memberForm: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _memberService: MemberService, 
    private _dialogRef: MatDialogRef<MemberAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toastr:ToastrService,
    ) {
    this.memberForm = this._fb.group({
      username: this._fb.control('',Validators.required),
      name: this._fb.control('',Validators.required),
      email: this._fb.control('',Validators.required),
      password:this._fb.control('',Validators.required)
    })
  }

  ngOnInit(): void {
 
  }

  onFormSubmit() {
    console.log(this.memberForm.value)
    if (this.memberForm.valid){
        this._memberService.addMember(this.memberForm.value).subscribe({
        next: (val: any) => {
          alert('Member added!');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          this._toastr.error('something wrong')
          console.error(err);
        },
      });
      }
    }
}
