import Vehicle from "./vehicle";

export default class VehicleData {
  public id: number | undefined;
  public vehicleId: number | undefined;
  public vehicle: Vehicle | undefined;
  public userId: number | undefined;
  public datetime: Date | undefined;
  public latitude: string | undefined;
  public longitude: string | undefined;
}
