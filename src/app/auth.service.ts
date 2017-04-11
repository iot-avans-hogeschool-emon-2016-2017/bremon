/**
 * Created by Bart on 10-4-2017.
 */
import {Injectable} from '@angular/core';


@Injectable()
export class AuthService {
  private authToken: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjIsImV4cCI6IjIwMTctMDQtMjFUMTk6NDI6NDEuMTI4WiJ9.WQMGItQZOBVLC8SWk3yYopI7OhkH4z4GLQCS9yEUUdc';

  isAuthenticated() {
    if (this.authToken === '') {
      return false;
    }
    return true;
  }

  authenticate(token: string) {
    this.authToken = token;
    console.log(token);
  }

  getToken() {
    return this.authToken;
  }
}
