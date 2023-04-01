import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {  CheckdonateService } from 'src/app/services/checkdonate.service';
import {MatTableModule} from '@angular/material/table';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {PopupComponent} from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-check-donate-payment-list',
  templateUrl: './check-donate-payment-list.component.html',
  styleUrls: ['./check-donate-payment-list.component.scss']
})
export class CheckDonatePaymentListComponent implements OnInit {
  displayedColumns: string[] = [
    
     'user', 
     'contribution',
     'date', 
     'paymentcardimg', 
     'status', 
     'action',
     
     
    ];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  empForm: FormGroup;
  constructor(
    private _dialog: MatDialog,
    private _fb: FormBuilder,
    private check : CheckdonateService
    ){
    this.empForm = this._fb.group({
      paymentcardID:'',
      user:'',
      contribution:'',
      date:'',
      paymentcardimg:'',
      status:'',
      donatetopicID :''
    });
  }
  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
        this.check.get().subscribe({
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
      this.check.add(this.empForm.value).subscribe({
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
    this.check.delete(id).subscribe({
      next: (res) => {
        
        this.getAll();
      },
      error: console.log,
    });
  }
  
}