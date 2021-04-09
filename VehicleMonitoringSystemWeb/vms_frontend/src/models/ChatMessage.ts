import Employee from "./Employee";

export default class ChatMessage {
  public id: number | undefined;
  public text: string | undefined;
  public date: Date | undefined;
  public sender: Employee | undefined;
  public receiver: Employee | undefined;

  constructor(id: number|undefined, text: string|undefined, date: Date | undefined,
              sender: Employee | undefined, receiver: Employee | undefined) {
    this.id = id;
    this.text = text;
    this.date = date;
    this.sender = sender;
    this.receiver = receiver;
  }
}
