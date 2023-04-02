import { Component,OnInit,ViewChild } from '@angular/core';
import { DonateService } from '../../services/donate.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-complete-card',
  templateUrl: './complete-card.component.html',
  styleUrls: ['./complete-card.component.scss']
})
export class CompleteCardComponent {
  username = sessionStorage.getItem('username')
  cardData:any 
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dataSource!: MatTableDataSource<any>

  constructor(
    private _donateService: DonateService,
    private _changeDetectorRef: ChangeDetectorRef,
  ){

  }

  ngOnInit(): void {
      this._donateService.getAllCompleteCard().subscribe({
        next: res =>{
          if(res){
            this._changeDetectorRef.detectChanges();
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.cardData = this.dataSource.connect()
            console.log(this.cardData)
          }
        }
      })
  }
  
  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
}
