import Employee from "./employee";

export default class Task {
  public id: number | undefined;
  public companyId: number | undefined;
  public driverId: string | undefined;
  public driver: Employee | undefined
  public operatorId: string | undefined;
  public createDate: Date | undefined;
  public dueDate: Date | undefined;
  public name: string | undefined;
  public description: string | undefined;
  public statusId: number | undefined;

  constructor(companyId:number|undefined, driverId:string|undefined,operatorId:string|undefined,
              createDate:Date|undefined,dueDate:Date|undefined,name:string|undefined,
              description:string|undefined,statusId:number|undefined) {
    this.companyId = companyId;
    this.driverId = driverId;
    this.operatorId = operatorId;
    this.createDate = createDate;
    this.dueDate = dueDate;
    this.description = description;
    this.name = name;
    this.statusId = statusId;
  }
}
