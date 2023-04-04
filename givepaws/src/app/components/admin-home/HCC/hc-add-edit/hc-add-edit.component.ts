import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HcService } from '../Hcsevice/hc.service';

@Component({
  selector: 'app-hc-add-edit',
  templateUrl: './hc-add-edit.component.html',
  styleUrls: ['./hc-add-edit.component.scss']
})
export class HcAddEditComponent implements OnInit {
  hcForm: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _hcService: HcService, 
    private _dialogRef: MatDialogRef<HcAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.hcForm = this._fb.group({
      userName: '',
      firstName:'',
      surName:'',
      tel: '',
    })
  }

  ngOnInit(): void {
    this.hcForm.patchValue(this.data);
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
