import DataSet from './data-set';
import LineColor from './line-color';

export default class Line {
  dataSet: DataSet;
  color: LineColor;

  constructor() {
    this.dataSet = new DataSet();
  }
}
