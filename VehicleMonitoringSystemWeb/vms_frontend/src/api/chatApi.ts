import axios from 'axios';
import {getDbUser, getDbUserCompanyId} from "../utils/userUtil";
import ChatMessage from "../models/chatMessage";

const basicUrl = 'chat';

export async function getAllEmployeeMessages(): Promise<ChatMessage[] | null> {
  const dbUser = await getDbUser();
  if (!dbUser) {
    return null;
  }

  const companyId = dbUser.companyId
  const userId = dbUser.id;

  try {
    const response = await axios.get<ChatMessage[]>(`${basicUrl}/getAllEmployeeMessages/${companyId}/${userId}`);

    const messages = response.data;
    for(let i = 0; i < messages.length; i++) {
      const m = messages[i];
      messages[i] = new ChatMessage(m.id, m.companyId, m.text, m.date, m.unread, m.sender, m.receiver, m.type, m.attachmentName);
    }
    return messages;
  } catch (e) {
    // console.log("Error:getAllEmployeeMessages ", e.response);
    return null;
  }
}

export async function createMessage(message: ChatMessage) {
  try {
    const response = await axios.post(`${basicUrl}`, message);
    // console.log(`createMessage: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    // console.log("Error:createMessage ", e.response);
    return null;
  }
}

export async function createMessageWithAttachment(companyId: number, senderId: string, receiverId: string, text: string, attachment: FormData) {
  try {
    const response = await axios.post(`${basicUrl}/withAttachment/${companyId}/${senderId}/${receiverId}/${text}`, attachment);
    // console.log(`createMessage: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    // console.log("Error:createMessage ", e.response);
    return null;
  }
}
