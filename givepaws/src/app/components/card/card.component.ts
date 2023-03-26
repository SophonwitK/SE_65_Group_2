import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DonateService } from '../../services/donate.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  username = sessionStorage.getItem('username')
  id:any
  cardData:any
  imageObject: Array<object> = [];

  constructor(
    private _activeRouter: ActivatedRoute,
    private _donateService: DonateService,
  ){

  }

  ngOnInit(): void {
    this.id = this._activeRouter.snapshot.paramMap.get('id')
    this._donateService.getCardByID(this.id).subscribe({
      next: res =>{
        console.log(res)
        this.cardData = res
        res.images.forEach((data:any) => {
          this.imageObject.push({
            image: `http://127.0.0.1:8000/${data.image}`,
            thumbImage: `http://127.0.0.1:8000/${data.image}`,
          })
        });
      }
    })
    console.log(this.imageObject)
    
  }



}
