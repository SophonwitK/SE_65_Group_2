import { Component } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
}
