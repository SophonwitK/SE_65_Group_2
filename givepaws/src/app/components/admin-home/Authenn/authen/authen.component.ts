import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthenPopupComponent } from '../authen-popup/authen-popup.component';
import { AuthenService } from '../Authensevice/authen.service';

@Component({
  selector: 'app-authen',
  templateUrl: './authen.component.html',
  styleUrls: ['./authen.component.scss']
})
export class AuthenComponent implements OnInit {
  displayedColumns: string[] = [
    'user.id',
    'user.username',
    'user.name',
    'user.email',
    'action'
  ];
    dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    constructor(
      private _dialog: MatDialog,
      private _authenService: AuthenService, 
      ) {}
    
    ngOnInit(): void {
      this.getAuthenList();
    }
  
  
    getAuthenList() {
      this._authenService.getAuthenList().subscribe({
        next: (res) => {
          console.log(res)
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: console.log,
        });
      }
  
      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

      popup(data: any){
        this._dialog.open(AuthenPopupComponent,{
          data,
        });
      }
}
