import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ChartService {

  private url: string = 'http://localhost:5000/measurements/time';

  constructor(private http: Http) { }

  public getData(): Observable<Object> {

    const body = JSON.stringify({
        'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjIsImV4cCI6IjIwMTctMDQtMTVUMDc6NDU6MDMuOTM2WiJ9.J0I05BzFbn4jvAK1jIMCkkXFmju-Wm9-HfQBtp25rcI',
        'begin': '2017-03-22 11:00:00',
        'end':   '2017-03-22 11:15:00'
    });

    return this.http.post(this.url, body)
      .map(res => {
        return res.json().data || {};
      })
      .catch(this.handleError);
  }

  public getDataByUser(): Observable<Object>{
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
