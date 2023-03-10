import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-hospital-coordinator',
  templateUrl: './hospital-coordinator.component.html',
  styleUrls: ['./hospital-coordinator.component.scss']
})
export class HospitalCoordinatorComponent {
  constructor(
    private _authService:AuthService
  ){

  }

  logout(){
    this._authService.logout(null)
  } 
}
