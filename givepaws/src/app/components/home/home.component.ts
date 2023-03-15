import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  main = true;
  username = sessionStorage.getItem('username')
  role = sessionStorage.getItem('role')
  constructor(
    private _router:Router,
    private _authService: AuthService,
  ){
  }
  ngDoCheck(): void{
    let currenurl=this._router.url;
    if(currenurl=='/'){
      this.main=true;
    }else{
      this.main=false
    }
  }

  logout(){
    this._authService.logout(null)
  } 
}
