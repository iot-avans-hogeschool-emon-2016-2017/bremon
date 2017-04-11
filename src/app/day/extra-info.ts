export class ExtraInfo {
  costs: number;
  kWh: object;

  constructor() {
    this.costs = -1;
    this.kWh = {
      highest: -1,
      lowest: -1
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

  public getHighest(): void {
    return this.kWh['highest'];
  }

  public getLowest(): void {
    return this.kWh['lowest'];
  }
}
