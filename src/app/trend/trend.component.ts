/**
 * Created by Bart on 7-4-2017.
 */
import {Component, OnInit} from '@angular/core';
import Line from "../chart/chart_data/line";
import Chart from "../chart/chart_data/chart";
import {MeasurementService} from "../measurement.service";

@Component({
  selector: 'app-test',
  templateUrl: './trend.component.html'
})
export class TrendComponent implements OnInit {


  public chart: Chart;

  constructor(private measurement_service: MeasurementService) {
  }

  ngOnInit() {
    this.measurement_service.getTrend().subscribe(
      data => {
        this.chart = this.buildChart(data);
      }
    );
  }

  buildChart(data: Array<Object>): Chart {
    const newChart = new Chart();
    if (data.length <= 0) { return newChart; }
    const line = new Line();
    line.dataSet.label = 'Trend (in kWh per uur)';
    for (let i = 0; i < 24; i++) {
      newChart.labels.push(i.toString() + ':00');
    }
    line.dataSet.data = data;
    newChart.lines.push(line);
    return newChart;
  }

}
