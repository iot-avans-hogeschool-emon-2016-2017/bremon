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


  @ViewChild(BaseChartDirective) chart_canvas: BaseChartDirective;
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

    if (this.chart_canvas.chart) {
      this.chart_canvas.chart.config.data.datasets = dataSets;
      this.chart_canvas.chart.config.data.colors = colors;
      this.chart_canvas.chart.config.data.labels = this.chart.labels;
      this.chart_canvas.chart.config.data.options = this.chart.options;
      this.chart_canvas.chart.config.data.legend = this.chart.showLegend;
      this.chart_canvas.chart.config.data.chartType = this.chart.type;
      this.chart_canvas.chart.update();
    }
  }
}
