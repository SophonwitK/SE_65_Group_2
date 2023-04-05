import { AuthService } from '../../services/auth.service';
import { Component, OnInit, ViewChild,Inject} from '@angular/core';
import { DonateService } from 'src/app/services/donate.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';


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
  ){

  }

  ngOnInit(): void {
    this.getCardList()
  }

  logout(){
    this._authService.logout(null)
  } 
  getCardList(){
    console.log(Number(sessionStorage.getItem('id')))
    this._donateService.getHcDataByID(Number(sessionStorage.getItem('id'))).subscribe({
      next: res =>{
        console.log(res)
      }
    })

    // this._donateService.getRequestCardByHospital().subscribe({
    //   next: res=>{
    //     console.log(res)
    //     this.dataSource = new MatTableDataSource(res);
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    //     this.requestCard = res
    //   }
    // })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
