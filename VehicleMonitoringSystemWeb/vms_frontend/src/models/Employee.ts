export default class Employee {
  public id: string | undefined;
  public roleId: number | undefined;
  public companyId: number | undefined;
  public firstName: string | undefined;
  public lastName: string | undefined;
  public email: string | undefined;
  public telegramNickname: string | undefined;
  public password: string | undefined;

  constructor(id: string|undefined, roleId: number|undefined,
              companyId: number|undefined, firstName: string|undefined,
              lastName: string|undefined, email: string|undefined,
              telegramName: string|undefined, password: string|undefined) {
    this.id = id;
    this.roleId = roleId;
    this.companyId = companyId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.telegramNickname = telegramName;
    this.password = password;
  }

  public getFullName () : string|undefined {
    return this.firstName + ' ' + this.lastName;
  }
}
