import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http} from '@angular/http';

@Injectable()
export class MeasurementService {

  private token: string =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjIsImV4cCI6IjIwMTctMDQtMTVUMDc6NDU6MDMuOTM2WiJ9.J0I05BzFbn4jvAK1jIMCkkXFmju-Wm9-HfQBtp25rcI';
  private url_byTime: string = 'http://localhost:5000/measurements/time/hour';
  private url_last: string = 'http://localhost:5000/measurements/last';

  constructor(private http: Http) { }

  public getMeasurements(begin: string, end: string): Observable<Array<Object>> {
    const body = JSON.stringify({
      'token': this.token,
      'begin': begin,
      'end':   end
    });

    return this.http.post(this.url_byTime, body)
      .map(res => {
        return res.json().data || {};
      })
      .catch(this.handleError);
  }

  public getLastMeasurement(): Observable<Array<Object>> {
    const url = this.url_last + '?token=' + this.token;
    return this.http.get(url)
      .map(res => {
        return res.json().data || {};
      })
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
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
