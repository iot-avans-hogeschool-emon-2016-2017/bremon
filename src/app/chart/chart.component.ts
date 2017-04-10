import { Component, OnInit, ViewChild  } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';


import {ChartService} from './chart.service';
import Chart from './chart_data/chart';
import {Grey} from './chart_data/line-color';

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
    '13:30', ' ', ' ', '13:33', ' ', ' ', '13:36', ' ', ' ', '13:39'
  ];

  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartColors: Array<any> = [
    Grey
  ];

  public lineChartLegend: Boolean = true;
  public lineChartType: String = 'line';

  public beginTime: string;
  public endTime: string;

  constructor(private chart_service: ChartService) {
    this.beginTime = '2017-04-05 08:00:00';
    this.endTime = '2017-04-06 08:00:00';
  }

  ngOnInit() { }

  public byHoursInterval(): void {
    this.chart_service.getData(
      this.beginTime,
      this.endTime
    ).subscribe(data => {
        const chart = this.chart_service.buildChartByTimeInterval(data);
        this.showChart(chart);
      },
      err => {
        console.log(err);
      });
  }

  private showChart(chart: Chart): void {
    const dataSets = [];
    const colors = [];

    chart.lines.forEach(line => {
      dataSets.push(line.dataSet);
      colors.push(line.color);
    });

    this.chart.chart.config.data.datasets = dataSets;
    this.chart.chart.config.data.colors = colors;
    this.chart.chart.config.data.labels = chart.labels;
    this.chart.chart.config.data.options = chart.options;
    this.chart.chart.config.data.legend = chart.showLegend;
    this.chart.chart.config.data.chartType = chart.type;
    this.chart.chart.update();
  }
}
