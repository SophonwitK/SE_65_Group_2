import { Component,OnInit } from '@angular/core';
import { DonateService } from '../../services/donate.service';

@Component({
  selector: 'app-card-all',
  templateUrl: './card-all.component.html',
  styleUrls: ['./card-all.component.scss']
})
export class CardAllComponent implements OnInit {
  username = sessionStorage.getItem('username')
  cardData:any 

  constructor(
    private _donateService: DonateService,
  ){

  }

  ngOnInit(): void {
      this._donateService.getAllApproveCard().subscribe({
        next: res =>{
          if(res){
            console.log(res)
            this.cardData = res
          }
        }
      })
  }
}
