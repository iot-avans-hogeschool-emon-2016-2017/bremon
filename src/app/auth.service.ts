/**
 * Created by Bart on 10-4-2017.
 */
import {Injectable} from "@angular/core";


@Injectable()
export class AuthService {
  private authToken = '';

  isAuthenticated() {
    if (this.authToken === '') {
      return true;
    }
    return true;
  }

  authenticate(token: string) {
    this.authToken = token;
  }
}
