import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HcService } from '../Hcsevice/hc.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-hc-add-edit',
  templateUrl: './hc-add-edit.component.html',
  styleUrls: ['./hc-add-edit.component.scss']
})
export class HcAddEditComponent implements OnInit {
  hcForm: FormGroup;
  hospitalList:any;
  userHcList:any

  constructor(
    private _fb: FormBuilder, 
    private _dialogRef: MatDialogRef<HcAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userService:UserService,
    private _hcService:HcService,
    ) {
    this.hcForm = this._fb.group({
      firstname:this._fb.control('',Validators.required),
      surname:this._fb.control('',Validators.required),
      tel: this._fb.control('',Validators.required),
      hospitalid:this._fb.control('',Validators.required),
      user:this._fb.control('',Validators.required),
    })
  }

  ngOnInit(): void {
    this.hcForm.patchValue(this.data);
    this._userService.getHospitalList().subscribe({
      next: res =>{
        this.hospitalList = res
      }
    })
    this._hcService.getUserHcList().subscribe({
      next: res =>{
        console.log(res)
        this.userHcList = res
      }
    })
  }

  onFormSubmit() {
    if (this.hcForm.valid) {
      if(this.data) {
        this._hcService.updateHc(this.data.id,this.hcForm.value).subscribe({
          next: (val: any) => {
            alert('HC detail updated');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }else{
        this._hcService.addHc(this.hcForm.value).subscribe({
        next: (val: any) => {
          alert('HC added!');
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
