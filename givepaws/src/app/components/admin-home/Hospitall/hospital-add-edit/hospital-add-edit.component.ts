import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HospitalService } from '../Hospitalsevice/hospital.service';

@Component({
  selector: 'app-hospital-add-edit',
  templateUrl: './hospital-add-edit.component.html',
  styleUrls: ['./hospital-add-edit.component.scss']
})
export class HospitalAddEditComponent implements OnInit {
  hospitalForm: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _hospitalService: HospitalService, 
    private _dialogRef: MatDialogRef<HospitalAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.hospitalForm = this._fb.group({
      name: '',
      email: '',
      address: '',
      tel: ''
    })
  }

  ngOnInit(): void {
    this.hospitalForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.hospitalForm.valid) {
      if(this.data) {
        this._hospitalService.updateHospital(this.data.id,this.hospitalForm.value).subscribe({
          next: (val: any) => {
            alert('Hospital detail updated');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }else{
        this._hospitalService.addHospital(this.hospitalForm.value).subscribe({
        next: (val: any) => {
          alert('Hospital added!');
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
