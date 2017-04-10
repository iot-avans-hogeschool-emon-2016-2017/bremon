import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import Chart from './chart_data/chart';
import {Grey} from './chart_data/line-color';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  public lineChartData: Array<any> = [ ];

  public lineChartLabels: Array<any> = [ ];

  public lineChartOptions: any = { };

  public lineChartColors: Array<any> = [];

  public lineChartLegend: Boolean;
  public lineChartType: String;


  @ViewChild(BaseChartDirective) chartComponent: BaseChartDirective;
  @Input() chart: Chart;

  constructor() { }

  ngOnInit() {
    this.showChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.showChart();
  }

  private showChart(): void {
    if (!this.chart) { return; }
    const dataSets = [];
    const colors = [];

    this.chart.lines.forEach(line => {
      dataSets.push(line.dataSet);
      colors.push(line.color);
    });

    this.lineChartData = dataSets;
    this.lineChartColors = colors;
    this.lineChartLabels = this.chart.labels;
    this.lineChartOptions = this.chart.options;
    this.lineChartLegend = this.chart.showLegend;
    this.lineChartType = this.chart.type;

    if (this.chartComponent.chart) {
      this.chartComponent.chart.config.data.labels = this.chart.labels;
      this.chartComponent.chart.update();
    }
  }
}
