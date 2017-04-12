export class ExtraInfo {
  costs: number;
  kWh: object;

  constructor() {
    this.costs = -1;
    this.kWh = {
      highest: -1,
      lowest: -1,
      total: -1,
      avg: -1
    };
  }

  public setKWh(kWh): void {
    if (this.kWh['lowest'] === -1 || this.kWh['lowest'] > kWh) {
      this.kWh['lowest'] = kWh;
    }

    if (this.kWh['highest'] === -1 || this.kWh['highest'] < kWh) {
      this.kWh['highest'] = kWh;
    }
  }

  public getKWhInfo(key): number {
    return this.kWh[key];
  }

  public calcAvg(totalHours): void {
    this.kWh['avg'] = this.kWh['total'] / totalHours;
  }
}
