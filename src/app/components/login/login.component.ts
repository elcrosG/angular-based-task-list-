import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  hide = true;

  constructor(private fb: FormBuilder,private loginservice : LoginService,private router: Router) { }
 
  logForm = this.fb.group({
    uName: ['', Validators.required],
    uPass: ['', Validators.required]
  })

  ngOnInit(): void {
    if(this.loginservice.getLoggedIn()){
      this.router.navigate(['/tasklist']);
    }
  }
  login(){
    if(this.logForm.status === 'VALID'){
      this.loginservice.login(this.logForm.value.uName!, this.logForm.value.uPass!);
    }
  }

}
