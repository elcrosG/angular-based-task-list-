import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;

  constructor(private activeRout: ActivatedRoute, private http : HttpClient, private router: Router, private fb: FormBuilder, private loginservice: LoginService) { }

  ngOnInit(): void {
    
    console.log(this.router);
    if(this.loginservice.getLoggedIn()){
      this.router.navigate(['/tasklist']);
    }
  }

  regForm = this.fb.group({
    uName: ['', Validators.required],
    uPass: ['', Validators.required]
  })

  register(){
    if(this.regForm.status === 'VALID'){
      this.http.post<any>("http://localhost:5000/users", this.regForm.value)
      .subscribe(res => {
        alert("Signup successful!");
        this.regForm.reset();
        this.router.navigate(['login']);
      }, err=>{
        alert("something went wrong!")
      })
    }
  }
}
