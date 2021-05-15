import Employee from "./employee";
import {getDbUserId} from "../utils/userUtil";
import {getBackendServerUrl} from "../api";

export enum MessageTypeConstants {
  TEXT = 'text',
  PHOTO = 'photo',
  // FILE = 'file'
}

export default class ChatMessage {
  public id: number|undefined;
  public companyId: number;
  public text: string;
  public date: Date|undefined;
  public unread: boolean;
  public sender: Employee;
  public receiver: Employee;

  public position: string;
  public status: string;
  public title: string;
  public type: MessageTypeConstants;
  public attachmentName: string|null;
  public data: any;

  constructor(id: number|undefined, companyId: number, text: string,
              date: Date|undefined, unread: boolean, sender: Employee,
              receiver: Employee, type: MessageTypeConstants, attachmentName: string|null) {
    this.id = id;
    this.companyId = companyId;
    this.text = text;
    if (date) {
      this.date = new Date(date);
    }
    this.unread = unread;

    sender = Object.setPrototypeOf(sender, Employee.prototype);
    this.sender = sender;
    receiver = Object.setPrototypeOf(receiver, Employee.prototype);
    this.receiver = receiver;

    getDbUserId().then(userId => {
      this.position = userId === sender.id ? 'right' : 'left';
      this.status = unread ? 'received' : 'read';

      this.title = userId === sender.id ? 'You' : sender.getFullName();
    });

    this.type = type;
    if (type === MessageTypeConstants.PHOTO) {
      this.attachmentName = attachmentName;
      this.data = {
        uri: `${getBackendServerUrl()}chat/attachment/${attachmentName}`,
      };
    }
  }
}
