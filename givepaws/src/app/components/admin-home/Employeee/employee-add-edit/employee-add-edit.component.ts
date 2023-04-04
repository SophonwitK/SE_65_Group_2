import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../Employeesevice/employee.service';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _employeeService: EmployeeService, 
    private _dialogRef: MatDialogRef<EmployeeAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.employeeForm = this._fb.group({
      userName: '',
      displayName: '',
      email: ''
    })
  }

  ngOnInit(): void {
    this.employeeForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.employeeForm.valid) {
      if(this.data) {
        this._employeeService.updateEmployee(this.data.id,this.employeeForm.value).subscribe({
          next: (val: any) => {
            alert('Employee detail updated');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }else{
        this._employeeService.addEmployee(this.employeeForm.value).subscribe({
        next: (val: any) => {
          alert('Employee added!');
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
