/**
 * Created by Bart on 7-4-2017.
 */
import { Component, OnInit } from '@angular/core';

import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // events


  constructor(private login_service: LoginService) { }

  ngOnInit() { }


}
