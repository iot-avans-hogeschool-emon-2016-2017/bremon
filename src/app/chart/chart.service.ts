import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http} from '@angular/http';

import * as moment from 'moment';

import Chart from './chart_data/chart';
import Line from './chart_data/line';
import {Grey} from './chart_data/line-color';

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

  public buildChartByTimeInterval(data: Array<Object>): Chart {
    const newChart = new Chart();
    if (data.length <= 0) { return newChart; }
    const line = new Line();
    line.dataSet.label = 'kWh';
    line.color = Grey;
    Object.keys(data).forEach(yearK => {
      const year = data[yearK];

      Object.keys(year).forEach(monthK => {
        const month = year[monthK];

        Object.keys(month).forEach(dayK => {
          const day = month[dayK];

          Object.keys(day).forEach(hourK => {
            const measurements = day[hourK];
            /*hourK === 0 means a new day, show date new day instead of zero*/
            if (hourK !== '0') {
              newChart.labels.push(hourK);
            } else {
              newChart.labels.push(moment(measurements[hourK]['timestamp']).format('YYYY-MM-DD'));
            }
            line.dataSet.data.push(this.countValues(measurements));
          });
        });
      });
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
