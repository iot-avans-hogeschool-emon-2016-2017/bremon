import { Component, OnInit, ViewChild  } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import * as moment from 'moment';

import {ChartService} from './chart.service';
import Line from './chart_data/line';
import Data from './chart_data/data';
import {Red} from './chart_data/line-color';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  public lineChartData: Array<any> = [
    {
      data:
      [133, 114, 92, 428, 626, 633, 633, 642, 629, 632, 628],
      label: 'Default'
    }
  ];

  public lineChartLabels: Array<any> = [
    '13:30', '13:31', '13:32', '13:33', '13:34', '13:35', '13:36', '13:37', '13:38', '13:39'
  ];

  public xLabels: Array<any> = [
    '13:00', '13:36', '13:39'
  ];

  public lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [
        {ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
          stepSize: 25
        }}
      ]
    }
  };

  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend: Boolean = true;
  public lineChartType: String = 'line';

  // events
  public chartClicked(e: any): void {
    console.log('click', e);
  }

  public chartHovered(e: any): void {
    console.log('hoverd', e);
  }

  constructor(private chart_service: ChartService) { }

  ngOnInit() { }

  public byDefaultTime(): void {
    this.chart_service.getData(
      '2017-04-06 07:00:00',
      '2017-04-06 08:10:00'
    ).subscribe(data => {
        const line = this.chart_service.buildLine(data);
        this.showLine(line);
      },
      err => {
        console.log(err);
      });
  }

  public byUser(): void {
    this.chart_service.getDataByUser().subscribe(data => {
        const line = this.chart_service.buildLine(data);
        line.color = Red;
        this.showLine(line);
      },
      err => {
        console.log(err);
      });
  }

  public byHoursInterval(): void {
    this.chart_service.getData(
      '2017-04-06 01:00:00',
      '2017-04-06 08:10:00'
    ).subscribe(data => {
        const line = this.chart_service.buildLine(data);
        const line2 = this.buildLine(data);

        this.showLine(line2);
      },
      err => {
        console.log(err);
      });
  }

  private buildLine(measurements: Array<Object>): Line {
    const line = new Line();
    line.dataSet = {
      data: [],
      legend_label: 'Per uur'
    };
    line.color = Red;

    const byHours = [];
    let currentHour = {
      hour: -1,
      data: []
    };

    if (measurements.length <= 0) { return null; }
    console.log(measurements);

    let mTime = moment(measurements[0]['timestamp']);
    currentHour.hour = mTime.hour();
    currentHour.data.push(measurements[0]['value']);

    measurements.forEach(measurement => {
      mTime = moment(measurement['timestamp']);

      if (mTime.hour() !== currentHour.hour) {
        byHours.push(currentHour);
        currentHour = {
          hour: mTime.hour(),
          data: []
        };
      }

      currentHour.data.push(measurement['value']);
    });

    byHours.push(currentHour);

    byHours.forEach(hour => {
      let totalValue = 0;
      hour.data.forEach(value => {
        totalValue += value;
      });
      hour.data = totalValue;
    });

    byHours.forEach(hour => {
      const newData = new Data();
      newData.data = hour['data'] / 10000;
      newData.label = hour['hour'];
      line.dataSet.data.push(newData);
    });

    console.log(byHours);
    console.log(line);
    return line;
  }


  private showLine(line: Line): void {
    const chartData = {
      data: [],
      label: line.dataSet.legend_label
    };
    const chartLabels = [];
    const chartColors = [line.color];
    line.dataSet.data.forEach(data => {
      chartData.data.push(data.data);
      chartLabels.push(data.label);
    });

    this.lineChartData = [chartData];
    this.lineChartLabels = chartLabels;
    this.lineChartColors = chartColors;

    this.chart.chart.config.data.labels = this.lineChartLabels;
    this.chart.chart.config.data.datasets = this.lineChartData;
    this.chart.chart.config.data.colors = this.lineChartColors;
    this.chart.chart.update();
  }
}
