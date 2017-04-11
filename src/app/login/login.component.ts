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
    console.log(username);
    this.login_service.getToken(username.value, password.value).subscribe(data => {
        console.log('login succeed');
        this.authService.authenticate(JSON.stringify(data));
        console.log("haai!");
        this.router.navigateByUrl("/test").then((data) => {
          console.log('data: ' + data);
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
