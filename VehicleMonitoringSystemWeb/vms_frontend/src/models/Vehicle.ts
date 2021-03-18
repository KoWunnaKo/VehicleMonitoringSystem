export default class Vehicle {
  public id: number | undefined;
  public companyId: number | undefined;
  public name: string | undefined;
  public number: string | undefined;
  public model: string | undefined;
  public productionYear: number | undefined;

  constructor(companyId: number | undefined,
              name: string | undefined,
              number: string | undefined,
              model: string | undefined,
              productionYear: number | undefined,
              vehicle?: Vehicle) {
    if (!!vehicle) {
      this.id = vehicle.id;
    }
    this.companyId = companyId;
    this.name = name;
    this.number = number;
    this.model = model;
    this.productionYear = productionYear;
  }
}
