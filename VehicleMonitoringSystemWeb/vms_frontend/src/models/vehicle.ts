import {getDbUserCompanyId} from "../utils/userUtil";

export default class Vehicle {
  public id: number | undefined;
  public companyId: number | undefined;
  public name: string | undefined;
  public number: string | undefined;
  public model: string | undefined;
  public productionYear: number | undefined;

  constructor(name: string | undefined,
              number: string | undefined,
              model: string | undefined,
              productionYear: number | undefined,
              vehicle?: Vehicle) {
    if (!!vehicle) {
      this.id = vehicle.id;
    }

    getDbUserCompanyId()
        .then(companyId => {
          if (companyId) {
            this.companyId = companyId;
          }
        });

    this.name = name;
    this.number = number;
    this.model = model;
    this.productionYear = productionYear;
  }
}
