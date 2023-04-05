import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HcAddEditComponent } from '../hc-add-edit/hc-add-edit.component';
import { HcService } from '../Hcsevice/hc.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-hc',
  templateUrl: './hc.component.html',
  styleUrls: ['./hc.component.scss']
})
export class HcComponent implements OnInit {
  displayedColumns: string[] = [
    'hcid', 
    'hospitalid.name', 
    'user.username',
    'firstname', 
    'surname',
    'tel',
    'action'
  ];
    dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    constructor(
      private _dialog: MatDialog, 
      private _hcService: HcService,
      ) {}
    
    ngOnInit(): void {
      this.getHcList();
    }
  
    openAddEditHcForm() {
      const dialogRef = this._dialog.open(HcAddEditComponent,{
        width:'40%'
      });
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if(val) {
            this.getHcList();
          }
        },
      });
    }
  
    getHcList() {
      this._hcService.getHcList().subscribe({
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
  
      deleteHc(id: number) {
        this._hcService.deleteHc(id).subscribe({
          next: (res) => {
            alert('HC deleted')
            this.getHcList();
          },
          error: console.log,
        });
      }
  
      openEditHcForm(data: any) {
        const dialogRef = this._dialog.open(HcAddEditComponent, {
          data,
        });
  
        dialogRef.afterClosed().subscribe({
          next: (val) => {
            if(val) {
              this.getHcList();
            }
          },
        });
      }

}
