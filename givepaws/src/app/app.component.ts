import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{
  title = 'givepaws';
  Navbar = true;
  
  constructor(
    private _router:Router,
  ){
  }
  ngDoCheck(): void{
    let currenurl=this._router.url;
    if(currenurl=='/'){
      this.Navbar=true;
    }else{
      this.Navbar=false
    }
  }
}
