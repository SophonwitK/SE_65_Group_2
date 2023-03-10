import { Component ,ViewEncapsulation} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent {
  username = sessionStorage.getItem('username')
  constructor(
    private _authService: AuthService
  ){
  
  }

  logout(){
    this._authService.logout(null)
  } 
  
}
