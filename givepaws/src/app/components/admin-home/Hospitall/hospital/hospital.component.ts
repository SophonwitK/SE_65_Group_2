import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HospitalAddEditComponent } from '../hospital-add-edit/hospital-add-edit.component';
import { HospitalService } from '../Hospitalsevice/hospital.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 
    'name',
    'email',
    'address' ,
    'tel',
    'action'
  ];
    dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    constructor(
      private _dialog: MatDialog, 
      private _hospitalService: HospitalService,
      ) {}
    
    ngOnInit(): void {
      this.getHospitalList();
    }
  
    openAddEditHospitalForm() {
      const dialogRef = this._dialog.open(HospitalAddEditComponent);
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if(val) {
            this.getHospitalList();
          }
        },
      });
    }
  
    getHospitalList() {
      this._hospitalService.getHospitalList().subscribe({
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
  
      deleteHospital(id: number) {
        this._hospitalService.deleteHospital(id).subscribe({
          next: (res) => {
            alert('Hospital deleted')
            this.getHospitalList();
          },
          error: console.log,
        });
      }
  
      openEditHospitalForm(data: any) {
        const dialogRef = this._dialog.open(HospitalAddEditComponent, {
          data,
        });
  
        dialogRef.afterClosed().subscribe({
          next: (val) => {
            if(val) {
              this.getHospitalList();
            }
          },
        });
      }

}
