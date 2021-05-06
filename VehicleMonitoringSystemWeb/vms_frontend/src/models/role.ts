
export default class Role {
  public static isAdministrator(id: number | undefined): boolean {
    return id === 1;
  }

  public static isOperator(id: number | undefined): boolean {
    return id === 2;
  }

  public static isDriver(id: number | undefined): boolean {
    return id === 3;
  }

  public id: number | undefined;
  public name: string | undefined;
}
