import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CheckdonateService } from 'src/app/services/checkdonate.service';
import {MatTableModule} from '@angular/material/table';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {PopupComponent} from '../popup/popup.component';
import {  TranferService } from 'src/app/services/tranfer.service';

@Component({
  selector: 'app-trasnferpopup',
  templateUrl: './trasnferpopup.component.html',
  styleUrls: ['./trasnferpopup.component.scss']
})
export class TrasnferpopupComponent {
  displayedColumns: string[] = [
    'paymentcardID',
     'user', 
     'contribution',
     'date', 
     'paymentcardimg', 
     'donatetopicID',
     'action',
     
     
    ];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  empForm: FormGroup;
  constructor(
    private _dialog: MatDialog,
    private _fb: FormBuilder,
    private check : TranferService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ){
    this.empForm = this._fb.group({
      donatetopicID :'',
      cardID:'',
      topic:'',
      amount:'',
      slipfilepath:'',
      id:'',
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  getAll(){
        this.check.gett().subscribe({
              next: (res) => {
                console.log(res);
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
              },
              error: console.log,
            });
  }
  popup(data: any){
    this._dialog.open(PopupComponent,{
      data,
    });
  }
  onFormSubmit() {
    if(this.empForm.valid){
      console.log(this.empForm.value);
      this.check.addt(this.empForm.value).subscribe({
          next:(val:any)=>{
            alert("successful");
          },
          error:(err:any)=>{
            console.error(err);
          }

      })
    }
  }
  delete(id: number) {
    this.check.deletet(id).subscribe({
      next: (res) => {
        
        this.getAll();
      },
      error: console.log,
    });
  }
}
