import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

import { User } from './User';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public logS: LoginService){}
  isLoggedIn = this.logS.getLoggedIn();
  ngDoCheck(){
    this.isLoggedIn = this.logS.getLoggedIn();
  }

}
