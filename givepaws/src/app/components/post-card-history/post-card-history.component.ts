import { Component, OnInit, ViewChild,Inject} from '@angular/core';
import { DonateService } from 'src/app/services/donate.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-post-card-history',
  templateUrl: './post-card-history.component.html',
  styleUrls: ['./post-card-history.component.scss']
})
export class PostCardHistoryComponent implements OnInit{
  username = sessionStorage.getItem('username')
  user_id = sessionStorage.getItem('id')
  cardData : any;

  displayedColumns: string[] = ['cardid','date','topic','hospitalid.name','receipttype','cardstatus','action']
  dataSource!: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private _donateService: DonateService,
    private _dialog: MatDialog
  ){

  }

  ngOnInit(): void {
      this._donateService.getAllCardByUserID(Number(this.user_id)).subscribe({
        next: res =>{
          if(res){
            console.log(res)
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }
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

  openReject(enterAnimationDuration: string, exitAnimationDuration: string,id:any): void {
    const dialog = this._dialog.open(RejectCardDialog, {
      data: id,
      width:'30%',
      height: 'auto',
      position: {top: '13rem'},
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
  selector: 'reject-card',
  templateUrl: './reject-card.component.html',
})
export class RejectCardDialog implements OnInit{
  donate_accept:any;
  constructor(
    public _dialogRef: MatDialogRef<RejectCardDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _donateService: DonateService,
    ) {
      
    }

    ngOnInit(): void {
        this._donateService.getDonateAcceptByCardID(this.data).subscribe({
          next: res =>{
            console.log(res)
            this.donate_accept = res
          }
        })
    }
    
    closeDialog(){
      this._dialogRef.close()
    }
}


