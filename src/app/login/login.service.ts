/**
 * Created by Bart on 7-4-2017.
 */
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Headers, RequestOptions, Http, Response} from '@angular/http';

@Injectable()
export class LoginService {

  private url: string = 'https://emonapi.brdk.nl/login';

  constructor(private http: Http) { }

  public getToken(username, password): Observable<Array<Object>> {
    var headers = new Headers({ 'Content-Type': 'application/json' });
    var options = new RequestOptions({ headers: headers });

    const body = {
      'username': username,
      'password': password
    }

    return this.http.post(this.url, body, options)
      .map(res => {
        return res.json().token || {};
      })
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body['error'] || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
