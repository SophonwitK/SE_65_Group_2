import { Component, OnInit } from '@angular/core';
import { DonateService } from 'src/app/services/donate.service';
import { CardService } from '../Cardsevice/card.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carddetail',
  templateUrl: './carddetail.component.html',
  styleUrls: ['./carddetail.component.scss']
})
export class CarddetailComponent implements OnInit {
  card_id:any
  report: any
  reportNumber: number = 0
  CardData:any

  constructor(
    private _cardService:CardService,
    private _activeRouter:ActivatedRoute,
    private _donateService:DonateService,
  ){
    
  }

  ngOnInit(): void {
    this.card_id = this._activeRouter.snapshot.paramMap.get('id')
    this.getAllReportByCardID()
    this.getCardByID()
  }

  getAllReportByCardID(){
    this._cardService.getAllReportByCardID(this.card_id).subscribe({
      next: res =>{
        this.reportNumber = res.length
        this.report = res
      }
    })
  }
  getCardByID(){
    this._donateService.getCardByID(this.card_id).subscribe({
      next: res =>{
        console.log(res)
        this.CardData = res
      }
    })
  }
}
