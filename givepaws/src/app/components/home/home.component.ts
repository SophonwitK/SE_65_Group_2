import { Component,Inject,OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DonateService } from '../../services/donate.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  main = true;
  username = sessionStorage.getItem('username')
  role = sessionStorage.getItem('role')
  cardData: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  dataSource!: MatTableDataSource<any>
  
  
  constructor(
    private _router:Router,
    private _authService: AuthService,
    private _donateService: DonateService,
    private _changeDetectorRef: ChangeDetectorRef,
  ){
  }
  
  ngOnInit(): void {
    this._donateService.getEmergencyCard().subscribe({
      next: res =>{
        if(res){
          this._changeDetectorRef.detectChanges();
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.cardData = this.dataSource.connect()
          console.log(this.cardData)
        }
      }
    })
}

ngOnDestroy() {
  if (this.dataSource) { 
    this.dataSource.disconnect(); 
  }
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


