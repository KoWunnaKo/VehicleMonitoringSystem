export default class Task {
  public id: number | undefined;
  public companyId: number | undefined;
  public driverId: string | undefined;
  public operatorId: string | undefined;
  public createDate: Date | undefined;
  public dueDate: Date | undefined;
  public name: string | undefined;
  public description: string | undefined;
  public status: string | undefined;
  public comment: string | undefined;

  constructor(companyId:number|undefined, driverId:string|undefined,operatorId:string|undefined,
              createDate:Date|undefined,dueDate:Date|undefined,name:string|undefined,
              description:string|undefined,status:string|undefined,comment:string|undefined) {
    this.companyId = companyId;
    this.driverId = driverId;
    this.operatorId = operatorId;
    this.createDate = createDate;
    this.dueDate = dueDate;
    this.description = description;
    this.name = name;
    this.status = status;
    this.comment = comment;
  }
}
