import Vehicle from "./Vehicle";

export default class VehicleData {
  public id: number | undefined;
  public vehicle_id: number | undefined;
  public vehicle: Vehicle | undefined;
  public user_id: number | undefined;
  public datetime: Date | undefined;
  public latitude: string | undefined;
  public longitude: string | undefined;

  // public toJSON() {
  //   return {
  //     Id: this.id, VehicleId: this.vehicleId, UserId: this.userId,
  //     Datetime: this.datetime, Latitude: this.latitude, Longitude: this.longitude
  //   }
  // }
}
