import Employee from "./employee";
import ChatMessage from "./chatMessage";
import {countUnreadMessages} from "../utils/chatUtil";

const standardAvatarUrl = 'https://img.icons8.com/pastel-glyph/2x/person-male--v3.png'
const standardAvatarAlt = 'Avatar';

export default class ChatContact {
  public employee: Employee;
  public avatar: string;
  // Avatar alt
  public alt: string;
  // employee name
  public title: string;
  // lastMessageText
  public subtitle: string;
  // lastMessageDate
  public date: Date|undefined;
  // unreadMessagesCount
  public unread: number;
  public chatMessages: ChatMessage[];

  constructor(employee: Employee, chatMessages: ChatMessage[]) {
    employee = Object.setPrototypeOf(employee, Employee.prototype);
    this.employee = employee;
    this.chatMessages = chatMessages;

    this.title = employee.getFullName();
    this.avatar = standardAvatarUrl;
    this.alt = standardAvatarAlt;
    if (chatMessages.length) {
      this.date = chatMessages[chatMessages.length - 1].date;
      this.subtitle = chatMessages[chatMessages.length - 1].text;
      countUnreadMessages(chatMessages)
          .then(unreadCount => this.unread = unreadCount);
    }
  }
}
