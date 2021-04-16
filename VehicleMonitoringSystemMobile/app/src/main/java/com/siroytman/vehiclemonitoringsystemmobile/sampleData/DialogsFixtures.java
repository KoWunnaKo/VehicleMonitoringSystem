package com.siroytman.vehiclemonitoringsystemmobile.sampleData;

import com.siroytman.vehiclemonitoringsystemmobile.model.ChatDialog;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatMessage;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatUser;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;


/*
 * Created by Anton Bevza on 07.09.16.
 */
public final class DialogsFixtures extends FixturesData {
    private DialogsFixtures() {
        throw new AssertionError();
    }

    public static ArrayList<ChatDialog> getDialogs() {
        ArrayList<ChatDialog> chats = new ArrayList<>();

        for (int i = 0; i < 20; i++) {
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.DAY_OF_MONTH, -(i * i));
            calendar.add(Calendar.MINUTE, -(i * i));

            chats.add(getDialog(i, calendar.getTime()));
        }

        return chats;
    }

    private static ChatDialog getDialog(int i, Date lastMessageCreatedAt) {
        ArrayList<ChatUser> users = getUsers();
        return new ChatDialog(
                getRandomId(),
                users.size() > 1 ? groupChatTitles.get(users.size() - 2) : users.get(0).getName(),
                users.size() > 1 ? groupChatImages.get(users.size() - 2) : getRandomAvatar(),
                users,
                getMessage(lastMessageCreatedAt),
                i < 3 ? 3 - i : 0);
    }

    private static ArrayList<ChatUser> getUsers() {
        ArrayList<ChatUser> users = new ArrayList<>();
        int usersCount = 1 + rnd.nextInt(4);

        for (int i = 0; i < usersCount; i++) {
            users.add(getUser());
        }

        return users;
    }

    private static ChatUser getUser() {
        return new ChatUser(
                getRandomId(),
                getRandomName(),
                getRandomAvatar(),
                getRandomBoolean());
    }

    private static ChatMessage getMessage(final Date date) {
        return new ChatMessage(
                getRandomId(),
                getUser(),
                getRandomMessage(),
                date);
    }
}
