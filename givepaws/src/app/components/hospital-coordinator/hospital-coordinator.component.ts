import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DonateService } from 'src/app/services/donate.service';

@Component({
  selector: 'app-hospital-coordinator',
  templateUrl: './hospital-coordinator.component.html',
  styleUrls: ['./hospital-coordinator.component.scss']
})
export class HospitalCoordinatorComponent implements OnInit {

  requestCard:any

  constructor(
    private _authService:AuthService,
    private _donateService:DonateService,
  ){

  }

  ngOnInit(): void {
      this._donateService.getRequestCardByHospital().subscribe({
        next: res=>{
          console.log(res)
          this.requestCard = res
        }
      })
  }

  logout(){
    this._authService.logout(null)
  } 
}
