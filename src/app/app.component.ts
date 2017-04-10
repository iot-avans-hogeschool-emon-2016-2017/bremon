import { Component } from '@angular/core';

import {ChartService} from './chart/chart.service';
import Chart from './chart/chart_data/chart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  public beginTime: string;
  public endTime: string;
  public chart: Chart;

  constructor(private chart_service: ChartService) {
    this.beginTime = '2017-04-05 08:00:00';
    this.endTime = '2017-04-06 08:00:00';
  }

  public byHoursInterval(): void {
    console.log(this.beginTime, this.endTime);
    this.chart_service.getData(
      this.beginTime,
      this.endTime
    ).subscribe(data => {
        this.chart = this.chart_service.buildChartByTimeInterval(data);
      },
      err => {
        console.log(err);
      });
  }
}
