import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeAddEditComponent } from '../employee-add-edit/employee-add-edit.component';
import { EmployeeService } from '../Employeesevice/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
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
      private _employeeService: EmployeeService,
      ) {}
    
    ngOnInit(): void {
      this.getEmployeeList();
    }
  
    openAddEditEmployeeForm() {
      const dialogRef = this._dialog.open(EmployeeAddEditComponent);
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if(val) {
            this.getEmployeeList();
          }
        },
      });
    }
  
    getEmployeeList() {
      this._employeeService.getEmployeeList().subscribe({
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
  
      deleteEmployee(id: number) {
        this._employeeService.deleteEmployee(id).subscribe({
          next: (res) => {
            alert('Employee deleted')
            this.getEmployeeList();
          },
          error: console.log,
        });
      }
  
      openEditEmployeeForm(data: any) {
        const dialogRef = this._dialog.open(EmployeeAddEditComponent, {
          data,
        });
  
        dialogRef.afterClosed().subscribe({
          next: (val) => {
            if(val) {
              this.getEmployeeList();
            }
          },
        });
      }
}
