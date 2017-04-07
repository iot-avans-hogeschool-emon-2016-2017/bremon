import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http} from '@angular/http';

import Chart from './chart_data/chart';
import Line from './chart_data/line';
import {Red} from './chart_data/line-color';

@Injectable()
export class ChartService {

  private url: string = 'http://localhost:5000/measurements/time/hour';

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

  public buildChartByTimeInterval(measurements: Array<Object>): Chart {
    const newChart = new Chart();
    if (measurements.length <= 0) { return newChart; }
    const line = new Line();
    line.color = Red;
    line.dataSet.label = 'Total value per Hour';
    Object.keys(measurements).forEach(key => {
      newChart.labels.push(key);
      line.dataSet.data.push(this.countValues(measurements[key]));
    });

    newChart.lines.push(line);
    return newChart;
  }

  private countValues(measurements): number {
    let total = 0;
    Object.keys(measurements).forEach(key => {
      total += measurements[key].value;
    });
    return total ;
  }
}
