
export default class Role {
  public static isAdministrator(id: number | undefined): boolean {
    return id === 1;
  }

  public id: number | undefined;
  public name: string | undefined;

  // constructor(id: number|undefined, name: string|undefined) {
  //   this.id = id;
  //   this.name = name;
  // }
}
