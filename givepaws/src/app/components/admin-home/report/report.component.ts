import { DialogRef } from '@angular/cdk/dialog';
import { Component,Inject } from '@angular/core';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DonateService } from 'src/app/services/donate.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class AdminReportComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _router:Router,
    private _dialogRef:DialogRef,
    private _donateService:DonateService,
    private _toaster:ToastrService
  ){

  }
  onClose(){
    const data_card = {
      "cardstatus":"close"
    }
    this._donateService.closeCardByID(this.data.cardid,data_card).subscribe({
      next: res =>{
        if(res){
          this._dialogRef.close()
          this._toaster.success('close card successfully')
          this._router.navigate(['admin'])
        }
      } 
    })
  }

}

