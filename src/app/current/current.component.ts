import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { MeasurementService } from '../measurement.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {

  private lastMeasurement: Object;
  public usage: number;
  private oldUsage: number;

  constructor(private service: MeasurementService) {
    this.oldUsage = -1;
    this.usage = -1;
    Observable.interval(60000)
    .subscribe(() => {
      this.getLastMeasurement();
    });
  }

  ngOnInit() {
    this.getLastMeasurement();
  }

  private getLastMeasurement() {
    this.service.getLastMeasurement().subscribe(data => {
      this.lastMeasurement = data[data.length - 1];
      this.currentUsage();
    },
    err => {
      console.error(err);
    });
  }

  public beautifyUsage(): number {
    return Math.round(this.usage * 100) / 100;
  }

  public isGoingUp(): boolean {
    return this.usage > this.oldUsage;
  }

  public isGoingDown(): boolean {
    return this.usage < this.oldUsage;
  }

  public isSame(): boolean {
    return this.usage === this.oldUsage;
  }
/*
  meterkast: 10000 imp./kWh
  E = P * t
  E in kWh
  P in kW
  t in Uur

  value = aantal ticks
  E = value/10000
  t = 1/60, want elke minuut een measurement

  P = E / t * 1000 voor momenteel verbruik
*/
  public currentUsage(): void {
    this.oldUsage = this.usage;
    this.usage = (this.lastMeasurement['value'] / 10000) / (1 / 60) * 1000;

    if (this.oldUsage < 0) { this.oldUsage = this.usage; }
  }
}
