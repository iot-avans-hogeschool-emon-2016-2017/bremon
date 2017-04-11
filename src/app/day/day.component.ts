import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { ExtraInfo } from './extra-info';
import { MeasurementService } from '../measurement.service';

import Chart from '../chart/chart_data/chart';
import Line from '../chart/chart_data/line';

const momentFormatString = 'YYYY-MM-DD HH:mm:ss';

const impPerKWh = 10000;

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})

export class DayComponent implements OnInit {

  protected beginTime;
  protected endTime;
  public chart: Chart;
  public extraInfo: ExtraInfo;

  constructor(private measurement_service: MeasurementService) {
    this.extraInfo = new ExtraInfo();
  }

  ngOnInit() {
    this.getLast24HoursChart();
  }

  roundToTwoDecimal(value): number {
    return Math.round(value * 100) / 100;
  }

  getLast24HoursChart() {
    this.setTimeLast24Hours();
    this.measurement_service.getMeasurements(
      this.beginTime.format(momentFormatString),
      this.endTime.format(momentFormatString)
    ).subscribe(data => {
        this.chart = this.buildChart(data);
        this.extraInfo.costs = this.calculateCosts(data);
      },
      err => {
        console.error(err);
      });
  }

  setTimeLast24Hours(): void {
    this.endTime = moment();
    this.beginTime = moment()
      .subtract(1, 'days');
  }

  buildChart(data: Array<Object>): Chart {
    const newChart = new Chart();
    if (data.length <= 0) { return newChart; }
    const line = new Line();
    line.dataSet.label = 'kWh';

    this.hours(data,(hour, measurements) => {
      /*hourK === 0 means a new day, show date new day instead of 0*/
      if (hour !== '0') {
        newChart.labels.push(hour);
      } else {
        newChart.labels.push(moment(measurements[hour]['timestamp']).format('YYYY-MM-DD'));
      }
      const totalTicks = this.countTicks(measurements);
      const kWh = totalTicks / 10000;
      this.extraInfo.setKWh(kWh);
      line.dataSet.data.push(kWh);
    });

    newChart.lines.push(line);
    return newChart;
  }

  private calculateCosts(data: Array<Object>): number {
    let costs = 0;
    const tickPerTariff = {
      'off': {
        total: 0,
        tariff: 0.1828
      },
      'normal': {
        total: 0,
        tariff: 0.1718
      }
    };
    /*in Brabant, normalTariff is valid between: 7.00 hour - 21:00 hour*/
    this.hours(data,(hour, measurements) => {
        if (hour < 7 && hour <= 21)
          tickPerTariff.normal.total += this.countTicks(measurements);
        else
          tickPerTariff.off.total  += this.countTicks(measurements);
    });

    Object.keys(tickPerTariff).forEach(key => {
      const {total, tariff} = tickPerTariff[key];
      costs += total / impPerKWh * tariff;
    });

    return costs;
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
