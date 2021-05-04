import ChatMessage from "../models/chatMessage";
import {getDbUserId} from "./userUtil";
import ChatContact from "../models/chatContact";
import Employee from "../models/employee";

export async function countUnreadMessages(chatMessages: ChatMessage[]): Promise<number> {
    const userId = await getDbUserId();
    let res = 0;
    for (const msg of chatMessages) {
        if (msg.receiver.id === userId && msg.unread) {
            res += 1;
        }
    }
    return res;
}

export async function getContactsList(chatMessages: ChatMessage[] | null): Promise<ChatContact[]> {
    const contactList: ChatContact[] = [];

    if (!!chatMessages) {
        const userId = await getDbUserId();
        const contacts = new Map<string, Employee>();
        const contactMessages = new Map<string, ChatMessage[]>();
        for (const msg of chatMessages) {
            const contact = msg.receiver.id === userId ? msg.sender : msg.receiver;
            if (!contactMessages.has(contact.id)) {
                contacts.set(contact.id, contact);
                contactMessages.set(contact.id, [msg]);
            } else {
                const existingContactMessages = contactMessages.get(contact.id);
                if (!!existingContactMessages) {
                    contactMessages.set(contact.id, [...existingContactMessages, msg]);
                }
            }
        }

        for (const [key] of contacts) {
            const contact = contacts.get(key);
            const contactMsg = contactMessages.get(key);
            if (!!contact && !!contactMsg) {
                const chatContact = new ChatContact(contact, contactMsg);
                contactList.push(chatContact);
            }
        }
    }

    return contactList;
}
