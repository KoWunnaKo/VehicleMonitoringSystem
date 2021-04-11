export default class VehicleDriverLink {
  public id: number | undefined;
  public driverId: string | undefined;
  public vehicleId: number | undefined;

  constructor(driverId: string | undefined,
              vehicleId: number | undefined,) {
    this.driverId = driverId;
    this.vehicleId = vehicleId;
  }
}
