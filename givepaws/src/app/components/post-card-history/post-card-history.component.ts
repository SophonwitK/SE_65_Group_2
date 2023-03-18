import { Component, OnInit, ViewChild} from '@angular/core';
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
          console.log(res)
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
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

  openReject(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialog = this._dialog.open(RejectCardDialog, {
      width:'auto',
      height: 'auto',
      minWidth:'25%',
      minHeight: '50%',
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
  selector: 'reject',
  templateUrl: './reject-card.component.html',
})
export class RejectCardDialog{
  constructor(
    public _dialogRef: MatDialogRef<RejectCardDialog>,
    ) {
      
    }

}


