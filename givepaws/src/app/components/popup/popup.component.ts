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
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  imgMessage = "Upload Images"
  files: File[] = [];
   donarData:any
  displayedColumns: string[] = [
    'donatetopicID ',
     'cardID ', 
     'contribution',
     'topic', 
     'amount', 
     'slipfilepath', 
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
    private check : CheckdonateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ){
    this.empForm = this._fb.group({
      comment:''
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
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
  popup(){
    this._dialog.open(PopupComponent);
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
  // approve(id: number) {
  //   console.log(this.data);
  //   this.check.approve(id,this.empForm.value).subscribe({
      
  //     next: (res) => {
        
  //       this.getAll();
  //     },
  //     error: console.log,
  //   });
  // }

  approve(id: number) {
    console.log(this.data);
  
    // Call the first API
    this.check.approve(id,this.empForm.value).subscribe({
      next: (res) => {
  
        // Call the second API
        this.check.check_topic_amount(id,this.empForm.value).subscribe({
          next: (res2) => {
            this.getAll();
          },
          error: console.log
        });
      },
      error: console.log
    });
  }


  reject(id: number) {
    this.check.reject(id,this.empForm.value).subscribe({
      next: (res) => {
        
        this.getAll();
      },
      error: console.log,
    });
  }
  onSelect(event:any) {
    this.imgMessage = "Upload Images"
    this.files.push(...event.addedFiles);
    console.log(this.files);
    this.empForm.patchValue({
      paymentcardimg: this.files
      
    })
    
  }
  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.empForm.patchValue({
      paymentcardimg: this.files
    })
  }
  
}
