import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../Adminsevice/admin.service';

@Component({
  selector: 'app-admin-add-edit',
  templateUrl: './admin-add-edit.component.html',
  styleUrls: ['./admin-add-edit.component.scss']
})
export class AdminAddEditComponent implements OnInit {

  adminForm: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _adminService: AdminService, 
    private _dialogRef: MatDialogRef<AdminAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.adminForm = this._fb.group({
      userName: '',
      displayName: '',
      password: '',
      email: ''
    })
  }

  ngOnInit(): void {
    this.adminForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.adminForm.valid) {
      if(this.data) {
        this._adminService.updateAdmin(this.data.id,this.adminForm.value).subscribe({
          next: (val: any) => {
            alert('Admin detail updated');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }else{
        this._adminService.addAdmin(this.adminForm.value).subscribe({
        next: (val: any) => {
          alert('Admin added!');
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
