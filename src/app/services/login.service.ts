import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskService } from './task.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  loggedIn: boolean = false;
  api = "http://localhost:5000/users?";
  constructor(private http : HttpClient, private tservice: TaskService, private router: Router) { }

  login(name:string, pass:string){
    this.http.get<any>(this.api + 'uName=' + name + '&uPass=' + pass)
    .subscribe(res => {
      if(res[0] !== undefined){
        this.tservice.setID(res[0].id);
        this.loggedIn = true;
        this.router.navigate(['/tasklist']);
      }
      else{
        alert("Wrong Password!");
      }
    }, err => {
      alert("Something went wrong!");
    })
  }
  getLoggedIn(){
    return this.loggedIn;
  }
  setLoggedIn(){
    this.loggedIn = false;
  }
}
