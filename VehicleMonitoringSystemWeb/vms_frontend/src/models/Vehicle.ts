export default class Vehicle {
  public id: number | undefined;
  public company_id: number | undefined;
  public name: string | undefined;
  public number: string | undefined;
  public model: string | undefined;
  public production_year: number | undefined;

  // public toJSON() {
  //   return {
  //     Id: this.id, VehicleId: this.vehicleId, UserId: this.userId,
  //     Datetime: this.datetime, Latitude: this.latitude, Longitude: this.longitude
  //   }
  // }
}
