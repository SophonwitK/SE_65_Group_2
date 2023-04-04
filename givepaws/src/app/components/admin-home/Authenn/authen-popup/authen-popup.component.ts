import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-authen-popup',
  templateUrl: './authen-popup.component.html',
  styleUrls: ['./authen-popup.component.scss']
})
export class AuthenPopupComponent implements OnInit {
  firstName;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.firstName = data.name
  }

  ngOnInit(): void {
  }
}
