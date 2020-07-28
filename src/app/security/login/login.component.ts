import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from './login.service';
import { NotificationService } from 'app/shared/message/notification.service';
import { User } from './user.model';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  user:User;

  navigateTo : string;

  constructor(private fb : FormBuilder,
              private loginService : LoginService,
              private notificationService : NotificationService,
              private activatedRoute : ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password : this.fb.control('', [Validators.required])
    });

    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');
  }

  isLoggedIn() : boolean {
    return this.user !== undefined;
  }

  login(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe(user =>  this.notificationService.notify(`Bem vindo, ${user.name}`),
/*HttpErrorResponse*/ response => this.notificationService.notify(response.error.message),
                      () => this.router.navigate([atob(this.navigateTo)]))
    
    ;
  }

}
