import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberService } from '../Memberservice/member.service';

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
    ) {
    this.memberForm = this._fb.group({
      userName: '',
      displayName: '',
      email: ''
    })
  }

  ngOnInit(): void {
    this.memberForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.memberForm.valid) {
      if(this.data) {
        this._memberService.updateMember(this.data.id,this.memberForm.value).subscribe({
          next: (val: any) => {
            alert('Member detail updated');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }else{
        this._memberService.addMember(this.memberForm.value).subscribe({
        next: (val: any) => {
          alert('Member added!');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
      }
    }
  }
}
