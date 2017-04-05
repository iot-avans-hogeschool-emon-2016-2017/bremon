import { Component, OnInit } from '@angular/core';
import {ChartService} from './chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

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
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(private chart_service: ChartService) { }

  ngOnInit() {
    this.chart_service.getData().subscribe(data => {
      console.log(data);
    },
    err => {
      console.log(err);
    });

    this.chart_service.getDataByUser().subscribe(data => {
        console.log(data);
      },
      err => {
        console.log(err);
      });
  }

}
