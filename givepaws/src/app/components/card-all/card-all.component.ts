import { Component,OnInit,ViewChild } from '@angular/core';
import { DonateService } from '../../services/donate.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-card-all',
  templateUrl: './card-all.component.html',
  styleUrls: ['./card-all.component.scss']
})
export class CardAllComponent implements OnInit {
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
      this._donateService.getAllApproveCard().subscribe({
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
