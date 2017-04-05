import { Component, OnInit, ViewChild  } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import {ChartService} from './chart.service';
import Line from './chart_data/line';
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
    '13:30', '13:31', '13:32', '13:33', '13:34', '13:35', '13:36', '13:37', '13:38', '13:39', '13:40'
  ];

  public lineChartOptions: any = {
    responsive: true
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

  timeuser: Boolean = false;

  constructor(private chart_service: ChartService) { }

  ngOnInit() { }

  public clickButton(): void {
    if (this.timeuser) {this.byDefaultTime();
    } else {this.byUser();
    }
    this.timeuser = !this.timeuser;
  }

  public byDefaultTime(): void {
    this.chart_service.getData().subscribe(data => {
        console.log(data);
        const line = this.chart_service.buildLine(data);
        this.showLine(line);
        console.log(line);
      },
      err => {
        console.log(err);
      });
  }

  public byUser(): void {
    this.chart_service.getDataByUser().subscribe(data => {
        console.log(data);
        const line = this.chart_service.buildLine(data);
        line.color = Red;
        this.showLine(line);
        console.log(line);
      },
      err => {
        console.log(err);
      });
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

    console.log(chartData, chartLabels, chartColors);
    this.lineChartData = [chartData];
    this.lineChartLabels = chartLabels;
    this.lineChartColors = chartColors;

    this.chart.chart.config.data.labels = this.lineChartLabels;
    this.chart.chart.config.data.datasets = this.lineChartData;
    this.chart.chart.config.data.colors = this.lineChartColors;
    this.chart.chart.update();
  }
}
