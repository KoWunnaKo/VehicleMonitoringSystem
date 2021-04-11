import Employee from "./employee";
import {getDbUserId} from "../utils/userUtil";

export default class ChatMessage {
  public id: number|undefined;
  public companyId: number;
  public text: string;
  public date: Date|undefined;
  public unread: boolean;
  public sender: Employee;
  public receiver: Employee;

  public position: string;
  public type: string;
  public status: string;
  public title: string;

  constructor(id: number|undefined, companyId: number, text: string,
              date: Date|undefined, unread: boolean, sender: Employee,
              receiver: Employee) {
    this.id = id;
    this.companyId = companyId;
    this.text = text;
    this.date = date;
    this.unread = unread;

    sender = Object.setPrototypeOf(sender, Employee.prototype);
    this.sender = sender;
    receiver = Object.setPrototypeOf(receiver, Employee.prototype);
    this.receiver = receiver;

    const userId = getDbUserId();
    this.position = userId === sender.id ? 'right' : 'left';
    this.status = unread ? 'received' : 'read';

    this.title = userId === sender.id ? 'You' : sender.getFullName();

    this.type = 'text';
  }
}
