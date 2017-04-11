/**
 * Created by Bart on 7-4-2017.
 */
import {Component, OnInit} from '@angular/core';

import {LoginService} from './login.service';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // events


  constructor(private login_service: LoginService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  onClick_login(username, password) {    
    this.login_service.getToken(username.value, password.value).subscribe(data => {
        this.authService.authenticate(JSON.stringify(data));
        this.router.navigateByUrl("/").then((data) => {
        }).catch((ex) => {
            console.log(ex);
          }
        );
      },
      err => {
        console.log(err);
      });
  }
}
