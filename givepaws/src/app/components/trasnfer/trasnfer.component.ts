
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {  TranferService } from 'src/app/services/tranfer.service';
import {MatTableModule} from '@angular/material/table';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {TrasnferpopupComponent} from '../trasnferpopup/trasnferpopup.component';
import { MatDialog } from '@angular/material/dialog';
import {  CheckdonateService } from 'src/app/services/checkdonate.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-trasnfer',
  templateUrl: './trasnfer.component.html',
  styleUrls: ['./trasnfer.component.scss']
})
export class TrasnferComponent {
  displayedColumns: string[] = [
    
     'cardID', 
     'contribution',
     'date', 
     'slipimgcomplete', 
     
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
    private Tranfer : TranferService,
    private check : TranferService,
    private _authService: AuthService,

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
    this.getAll();
  }
  getAll(){
        this.Tranfer.gett().subscribe({
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
    const dialog = this._dialog.open(TrasnferpopupComponent,{
      data,
    });
    dialog.afterClosed().subscribe({
      next: (res) =>{
        this.getAll();
      }
    })
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
  logout(){
    this._authService.logout(null)
  }
}
