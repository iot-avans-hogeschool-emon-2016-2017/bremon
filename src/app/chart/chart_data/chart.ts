import Line from './line';

export default class Chart {

  lines: Array<Line>;
  labels: Array<string>;
  options: any;
  showLegend: boolean;
  type: string;

  constructor() {
    this.lines = [];
    this.labels = [];
    this.options = {
      responsive: true
    };
    this.showLegend = true;
    this.type = 'line';
  }
}


