import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';

import * as moment from 'moment';

import { ExtraInfo } from '../day/extra-info';
import { MeasurementService } from '../measurement.service';

import Chart from '../chart/chart_data/chart';
import Line from '../chart/chart_data/line';

const momentFormatString = 'YYYY-MM-DD HH:mm:ss';

const impPerKWh = 10000;

@Component({
  selector: 'app-hour',
  templateUrl: './hour.component.html',
  styleUrls: ['./hour.component.css']
})
export class HourComponent implements OnInit {

  protected beginTime;
  protected endTime;
  public hour: number;
  public chart: Chart;
  public extraInfo: ExtraInfo;

  constructor(private measurement_service: MeasurementService) {
    this.extraInfo = new ExtraInfo();
    this.hour = -1;
    Observable.interval(60000)
      .subscribe(() => {
        this.getLastHour();
      });
  }

  ngOnInit() {
    this.getLastHour();
  }

  getLastHour(): void {
    this.setLastHour();
    this.measurement_service.getMeasurements(
      this.beginTime.format(momentFormatString),
      this.endTime.format(momentFormatString)
    ).subscribe(data => {
        this.chart = this.buildChart(data);
        console.log(this.chart);
      },
      err => {
        console.error(err);
      });
  }

  setLastHour(): void {
    this.endTime = moment();
    this.beginTime = moment()
      .subtract(this.endTime.minutes() + 1, 'minutes');
  }

  buildChart(data: Array<Object>): Chart {
    const newChart = new Chart();
    if (data.length <= 0) { return newChart; }
    const line = new Line();
    line.dataSet.label = 'verbuik in Watt';

    this.hours(data, (hour, measurements) => {
      this.hour = hour;
      measurements.forEach(measurement => {
        const {timestamp, value} = measurement;
        const time = moment(timestamp);
        const kWh = value / impPerKWh * 1000;

        if (time.minute() % 3 === 0 )
        {
          newChart.labels.push(time.format('mm'));
        } else {
          newChart.labels.push('');
        }
        line.dataSet.data.push(kWh);
      });
    });

    newChart.lines.push(line);
    return newChart;
  }

  private countTicks(measurements): number {
    let total = 0;
    Object.keys(measurements).forEach(key => {
      total += measurements[key].value;
    });
    return total;
  }

  private hours(data: Array<Object>, func): void {
    Object.keys(data).forEach(yearK => {
      const year = data[yearK];

      Object.keys(year).forEach(monthK => {
        const month = year[monthK];

        Object.keys(month).forEach(dayK => {
          const day = month[dayK];

          Object.keys(day).forEach(hourK => {
            if (func) {
              func(hourK, day[hourK]);
            }
          });
        });
      });
    });
  }
}
