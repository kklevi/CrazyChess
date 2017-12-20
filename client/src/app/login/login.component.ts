import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  model: any = {};
  loading: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  login() {
    console.log('Do login here');
  }

}
