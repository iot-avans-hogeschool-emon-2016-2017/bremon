import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { MeasurementService } from '../measurement.service';

import Chart from '../chart/chart_data/chart';
import Line from '../chart/chart_data/line';

const momentFormatString = 'YYYY-MM-DD HH:mm:ss';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  protected beginTime;
  protected endTime;
  protected chart: Chart;

  constructor(private measurement_service: MeasurementService) {
    this.endTime = moment();
    this.beginTime = moment()
        .subtract(1, 'days');
  }

  ngOnInit() {
    this.measurement_service.getMeasurements(
      this.beginTime.format(momentFormatString),
      this.endTime.format(momentFormatString)
    ).subscribe(data => {
      console.log(data);
      this.chart = this.buildChart(data);
      console.log('new chart', this.chart);
    },
    err => {
      console.error(err);
    });
  }

  buildChart(data: Array<Object>): Chart {
    const newChart = new Chart();
    if (data.length <= 0) { return newChart; }
    const line = new Line();
    line.dataSet.label = 'kWh';

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
            const totalTicks = this.countTicks(measurements);
            const kWh = totalTicks / 10000;
            line.dataSet.data.push(kWh);
          });
        });
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

}
