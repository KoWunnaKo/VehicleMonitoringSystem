package com.siroytman.vehiclemonitoringsystemmobile.model;

import android.os.Parcel;
import android.os.Parcelable;

import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.stfalcon.chatkit.commons.models.IDialog;
import com.stfalcon.chatkit.commons.models.IUser;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ChatDialog implements IDialog<ChatMessage>, Parcelable {

    public static ArrayList<ChatDialog> getDialogsList(ArrayList<ChatMessage> messages) {
        ArrayList<ChatDialog> dialogs = new ArrayList<>();

        if (!messages.isEmpty()) {
            String userId = AppController.getInstance().getDbUser().getId();

            HashMap<String, Employee> contacts = new HashMap<>();
            HashMap<String, ArrayList<ChatMessage>> contactsMessages = new HashMap<>();
            for (ChatMessage msg : messages) {
                Employee contact = msg.getReceiver().getId().equals(userId) ? msg.getSender() : msg.getReceiver();
                if (!contacts.containsKey(contact.getId())) {
                    contacts.put(contact.getId(), contact);
                    contactsMessages.put(contact.getId(), new ArrayList<ChatMessage>() {{add(msg);}});
                } else {
                    contactsMessages.get(contact.getId()).add(msg);
                }
            }

            for (String contactId : contacts.keySet()) {
                Employee contact = contacts.get(contactId);
                ArrayList<ChatMessage> contactMessages = contactsMessages.get(contactId);
                if (contact != null && contactMessages != null) {
                    dialogs.add(new ChatDialog(contact, contactMessages));
                }
            }
        }

        return dialogs;
    }

    private String id;
    private String dialogPhoto;
    private String dialogName;
    private Employee user;
    private ChatMessage lastMessage;
    private ArrayList<ChatMessage> messages;

    private int unreadCount;

    public ChatDialog(Employee user, ArrayList<ChatMessage> messages) {
        this.user = user;
        this.messages = messages;

        this.id = user.getId();
        this.lastMessage = messages.get(messages.size() - 1);
        this.dialogName = user.getName();
        this.dialogPhoto = "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
        countUnread();
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public String getDialogPhoto() {
        return dialogPhoto;
    }

    @Override
    public String getDialogName() {
        return dialogName;
    }

    @Override
    public List<? extends IUser> getUsers() {
        return new ArrayList<Employee>() {{add(user);}};
    }

    @Override
    public ChatMessage getLastMessage() {
        return lastMessage;
    }

    public ArrayList<ChatMessage> getMessages() {
        return messages;
    }

    @Override
    public void setLastMessage(ChatMessage lastMessage) {
        this.lastMessage = lastMessage;
    }

    @Override
    public int getUnreadCount() {
        return unreadCount;
    }

    private void countUnread() {
        this.unreadCount = 0;
        for (ChatMessage message: this.messages) {
            if (message.getIsRead()) {
                ++this.unreadCount;
            }
        }
    }

    protected ChatDialog(Parcel in) {
        id = in.readString();
        dialogPhoto = in.readString();
        dialogName = in.readString();
        user = in.readParcelable(Employee.class.getClassLoader());
//        lastMessage = in.readParcelable(ChatMessage.class.getClassLoader());
        messages = new ArrayList<>();
        in.readTypedList(messages, ChatMessage.CREATOR);
//        unreadCount = in.readInt();
    }

    public static final Creator<ChatDialog> CREATOR = new Creator<ChatDialog>() {
        @Override
        public ChatDialog createFromParcel(Parcel in) {
            return new ChatDialog(in);
        }

        @Override
        public ChatDialog[] newArray(int size) {
            return new ChatDialog[size];
        }
    };

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(id);
        dest.writeString(dialogPhoto);
        dest.writeString(dialogName);
        dest.writeParcelable(user, flags);
        dest.writeTypedList(messages);
    }
}
