import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private _authService: AuthService
  ){

  }
  ngOnInit (){
    this._authService.getLoginUser().subscribe({
      next: (rest:any) =>{
        console.log(rest)
      },
      error: err =>{
        console.log(err)
      }
    })
  }
}
