/**
 * Created by Bart on 7-4-2017.
 */
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http} from '@angular/http';

@Injectable()
export class LoginService {

  private url: string = 'http://localhost:5000/measurements/time';

  constructor(private http: Http) { }

  public getData(begin, end): Observable<Array<Object>> {

    const body = JSON.stringify({
      'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjIsImV4cCI6IjIwMTctMDQtMTVUMDc6NDU6MDMuOTM2WiJ9.J0I05BzFbn4jvAK1jIMCkkXFmju-Wm9-HfQBtp25rcI',
      'begin': begin,
      'end':   end
    });

    return this.http.post(this.url, body)
      .map(res => {
        return res.json().data || {};
      })
      .catch(this.handleError);
  }

  public getDataByUser(): Observable<Array<Object>> {
    const url = 'http://localhost:5000/measurements/user/2';
    const body = JSON.stringify({
      'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjIsImV4cCI6IjIwMTctMDQtMTVUMDc6NDU6MDMuOTM2WiJ9.J0I05BzFbn4jvAK1jIMCkkXFmju-Wm9-HfQBtp25rcI'
    });

    return this.http.post(url, body)
      .map(res => {
        return res.json().data || {};
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
