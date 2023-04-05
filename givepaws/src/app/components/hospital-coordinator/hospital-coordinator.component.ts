import { AuthService } from '../../services/auth.service';
import { Component, OnInit, ViewChild,Inject} from '@angular/core';
import { DonateService } from 'src/app/services/donate.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { FormGroup,Validators , FormBuilder } from '@angular/forms'  
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hospital-coordinator',
  templateUrl: './hospital-coordinator.component.html',
  styleUrls: ['./hospital-coordinator.component.scss']
})
export class HospitalCoordinatorComponent implements OnInit {

  requestCard:any
  displayedColumns: string[] = ['cardid','date','topic','receipttype','action']
  dataSource!: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort


  constructor(
    private _authService:AuthService,
    private _donateService:DonateService,
    private _dialog:MatDialog
  ){

  }

  ngOnInit(): void {
    this.getCardList()
  }

  logout(){
    this._authService.logout(null)
  } 
  getCardList(){
    this._donateService.getHcDataByID(Number(sessionStorage.getItem('id'))).subscribe({
      next: res =>{
        console.log(res)
        this._donateService.getRequestCardByHospital(res.hospitalid.hospitalid).subscribe({
          next: res=>{
            if(res){
              this.dataSource = new MatTableDataSource(res);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
              this.requestCard = res
            }

          }
        })
      }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,data:any): void {
    const dialog = this._dialog.open(HCRequestDialog, {
      data: data,
      width:'40%',
      height: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialog.afterClosed().subscribe({
      next: (res) =>{

      }
    })
  }

}

@Component({
  selector: 'hc-request-dialog',
  templateUrl: './hc.request.component.html',
})
export class HCRequestDialog implements OnInit {
  acceptForm:FormGroup
  dataHC:any
  constructor(
    private _dialogRef:DialogRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _donateService: DonateService,
    private _fb:FormBuilder,
    private _toastr:ToastrService,
  ){
    this.acceptForm = this._fb.group({
      hcid:'',
      description:this._fb.control('',Validators.required),
      date:'',
      cardid: data.cardid
    })
  }

  ngOnInit(): void {
    console.log(this.data)
    this._donateService.getHcDataByID(Number(sessionStorage.getItem('id'))).subscribe({
      next: res =>{
        console.log(res.hcid)
        this.dataHC = res
      }
    })
  } 

  onReject(){
    const now = new Date();
    this.acceptForm.patchValue({
      hcid:this.dataHC.hcid,
      date: now.toISOString().slice(0, 19).replace('T', ' ')
    })
    this._donateService.postDonateAccept(this.acceptForm.value).subscribe({})
    const data = {
      "cardstatus": "reject"
    }
    this._donateService.closeCardByID(this.data.cardid,data).subscribe({

    })
    this._dialogRef.close()
    this._toastr.success('sent successfully')
  }
  onApprove(){
    const now = new Date();
    this.acceptForm.patchValue({
      hcid:this.dataHC.hcid,
      date: now.toISOString().slice(0, 19).replace('T', ' ')
    })
    this._donateService.postDonateAccept(this.acceptForm.value).subscribe({})
    const data = {
      "cardstatus": "approve"
    }
    this._donateService.closeCardByID(this.data.cardid,data).subscribe({

    })
    this._dialogRef.close()
    this._toastr.success('sent successfully')
  }
 
}

