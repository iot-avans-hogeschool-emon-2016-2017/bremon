import { Component, OnInit } from '@angular/core';

import { MeasurementService } from '../measurement.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {

  private lastMeasurement: Object;
  public usage: number;

  constructor(private service: MeasurementService) { }

  ngOnInit() {
    this.service.getLastMeasurement().subscribe(data => {
      this.lastMeasurement = data[data.length -1];
      this.currentUsage();
    },
    err => {
      console.error(err);
    });
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
  protected currentUsage(): void {
    this.usage = (this.lastMeasurement['value']/10000) / (1/60) * 1000;
  }
}
