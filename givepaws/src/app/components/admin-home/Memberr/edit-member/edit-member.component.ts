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
      password:this._fb.control('',Validators.required),
      is_staff:0,
      is_hospitalcoordinator:0,
      is_employee:0,
    })
   }

  ngOnInit() {
    console.log(this.data)
    this.memberForm.patchValue(this.data)
  }

}
