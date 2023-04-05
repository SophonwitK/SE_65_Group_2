import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardService } from '../Cardsevice/card.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DonateService } from 'src/app/services/donate.service';

@Component({
  selector: 'admin-app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class AdminCardComponent implements OnInit {
  displayedColumns: string[] = [
    'cardid', 
    'topic',
    'date',
    'action' 
  ];
    dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    constructor(
      private _dialog: MatDialog, 
      private _cardService: CardService,
      private _donateService: DonateService,
      ) {}
    
    ngOnInit(): void {
      this.getCardList();
    }
  
  
    getCardList() {
      this._donateService.getAllApproveCard().subscribe({
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
      
      

}
