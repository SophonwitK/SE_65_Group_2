import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminAddEditComponent } from '../admin-add-edit/admin-add-edit.component';
import { AdminService } from '../Adminsevice/admin.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  displayedColumns: string[] = [
    'id', 
    'userName', 
    'displayName', 
    'email',
    'action'
  ];
    dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    constructor(
      private _dialog: MatDialog, 
      private _adminService: AdminService,
      ) {}
    
    ngOnInit(): void {
      this.getAdminList();
    }
  
    openAddEditAdminForm() {
      const dialogRef = this._dialog.open(AdminAddEditComponent);
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if(val) {
            this.getAdminList();
          }
        },
      });
    }
  
    getAdminList() {
      this._adminService.getAdminList().subscribe({
        next: (res) => {
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
  
      deleteAdmin(id: number) {
        this._adminService.deleteAdmin(id).subscribe({
          next: (res) => {
            alert('Admin deleted')
            this.getAdminList();
          },
          error: console.log,
        });
      }
  
      openEditAdminForm(data: any) {
        const dialogRef = this._dialog.open(AdminAddEditComponent, {
          data,
        });
  
        dialogRef.afterClosed().subscribe({
          next: (val) => {
            if(val) {
              this.getAdminList();
            }
          },
        });
      }

}
