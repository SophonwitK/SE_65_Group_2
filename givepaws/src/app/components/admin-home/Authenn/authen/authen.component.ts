import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthenPopupComponent } from '../authen-popup/authen-popup.component';
import { AuthenService } from '../Authensevice/authen.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

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

      
    deleteAuth(enterAnimationDuration: string, exitAnimationDuration: string,data: any): void {
      const dialog = this._dialog.open(deleteAuthComponent, {
        data: data,
        width:'15%',
        height: 'auto',
        enterAnimationDuration,
        exitAnimationDuration,
      });
      dialog.afterClosed().subscribe({
        next: (res) =>{
          this.getAuthenList()
        }
      })
    }

}


@Component({
  selector: 'delete-authen',
  templateUrl: './delete-authen.component.html',
})
export class deleteAuthComponent {
  constructor(
    public _dialogRef: MatDialogRef<deleteAuthComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userService:UserService,
    private _toastr:ToastrService,
  ){
  
  }

  onDelete(){
    this._userService.deleteAuthen(this.data.authid).subscribe({
      next: res =>{
        this._toastr.success('delete complete')
        this._dialogRef.close()
      }
    })
  }
}