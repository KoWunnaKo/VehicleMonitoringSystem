import Role from "./Role";

export default class Employee {
  public id: string | undefined;
  public role: Role | undefined | null;
  public companyId: number | undefined;
  public firstName: string | undefined;
  public lastName: string | undefined;
  public email: string | undefined;
  public telegramName: string | undefined;
  public password: string | undefined;

  constructor(id: string|undefined, role: Role|null,
              companyId: number|undefined, firstName: string|undefined,
              lastName: string|undefined, email: string|undefined,
              telegramName: string|undefined, password: string|undefined) {
    this.id = id;
    this.role = role;
    this.companyId = companyId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.telegramName = telegramName;
    this.password = password;
  }
}
