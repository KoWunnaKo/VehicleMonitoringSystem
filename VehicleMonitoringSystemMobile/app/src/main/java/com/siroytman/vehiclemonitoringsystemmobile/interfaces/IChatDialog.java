package com.siroytman.vehiclemonitoringsystemmobile.interfaces;

import com.stfalcon.chatkit.commons.models.IMessage;
import com.stfalcon.chatkit.commons.models.IUser;

import java.util.List;

/**
 * For implementing by real dialog model
 */

public interface IChatDialog<MESSAGE extends IMessage> {

    String getId();

    String getDialogPhoto();

    String getDialogName();

    List<? extends IUser> getUsers();

    MESSAGE getLastMessage();

    void setLastMessage(MESSAGE message);

    int getUnreadCount();
}
