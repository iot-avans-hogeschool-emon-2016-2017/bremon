import { Component } from '@angular/core';
import * as moment from 'moment';
import {ChartService} from './chart/chart.service';
import Chart from './chart/chart_data/chart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  public difInHours: number;
  public chart: Chart;

  constructor(private chart_service: ChartService) {
    this.difInHours = 0;
  }

  public byHoursInterval(): void {
    const endTime = moment();
    const beginTime = moment();

    this.chart_service.getData(
      beginTime
        .subtract(this.difInHours, 'hour')
        .format('YYYY-MM-DD HH:mm:ss'),
      endTime
        .format('YYYY-MM-DD HH:mm:ss')
    ).subscribe(data => {
        this.chart = this.chart_service.buildChartByTimeInterval(data);
      },
      err => {
        console.log(err);
      });
  }
}
