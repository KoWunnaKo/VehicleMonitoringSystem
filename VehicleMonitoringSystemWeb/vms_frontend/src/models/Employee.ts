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
    // TODO set companyId
    this.companyId = 1;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.telegramNickname = telegramName;
    this.password = password;
  }

  public toJSON() {
    return {
      Id: this.id, RoleId: this.roleId, CompanyId: this.companyId,
      FirstName: this.firstName, LastName: this.lastName, Email: this.email,
      TelegramNickname: this.telegramNickname,
    }
  }
}
