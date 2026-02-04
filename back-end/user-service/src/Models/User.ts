export class User {
  public id?: number;
  constructor(
    public nameApp: string,
    public email: string,
    public password: string,
    id?: number
  ) {
    if (id) this.id = id;
  }
}
