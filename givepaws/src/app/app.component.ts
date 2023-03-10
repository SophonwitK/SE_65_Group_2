import { Component,DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
