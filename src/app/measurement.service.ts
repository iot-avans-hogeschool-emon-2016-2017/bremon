import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http} from '@angular/http';
import {AuthService} from "./auth.service";
import { environment } from '../environments/environment';

@Injectable()
export class MeasurementService {

  private token: string = this.auth.getToken();

  private URI_bytime: string = '/measurements/time/hour';
  private URI_last: string = '/measurements/last';
  private URI_trend: string = '/measurements/trend';
  // private URL: string = 'http://localhost:5000';
  private URL: string = 'https://emonapi.brdk.nl';

  constructor(private http: Http, private auth: AuthService) {
  if (environment.production)
    this.URL = 'https://emonapi.brdk.nl';
  }

  public getMeasurements(begin: string, end: string): Observable<Array<Object>> {
    const body = JSON.stringify({
      'token': this.auth.getToken(),
      'begin': begin,
      'end':   end
    });

    return this.http.post(this.URL + this.URI_bytime, body)
      .map(res => {
        return res.json().data || {};
      })
      .catch(this.handleError);
  }

  public getTrend(): Observable<Array<number>> {
    const body = JSON.stringify({
      'token': this.auth.getToken()
    });

    return this.http.post(this.URL + this.URI_trend, body)
      .map(res => {
        return res.json().data || {};
      })
      .catch(this.handleError);
  }

  public getLastMeasurement(): Observable<Array<Object>> {
    const url = this.URL + this.URI_last + '?token=' + this.auth.getToken();
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
