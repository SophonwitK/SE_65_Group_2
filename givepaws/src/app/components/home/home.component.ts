import { Component,Inject,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    private _dialog: MatDialog
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

@Component({
  selector: 'about-home',
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {
  back = true;
  
  constructor(
    private _authService: AuthService
  ){
  }

  ngOnInit(): void {
    if(this._authService.isActive()){
      this.back = false
    }
    else{
      this.back= true
    }

  }
}


