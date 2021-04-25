package com.siroytman.vehiclemonitoringsystemmobile.model;

import android.util.Log;

import com.siroytman.vehiclemonitoringsystemmobile.interfaces.IChatMessage;
import com.stfalcon.chatkit.commons.models.IMessage;
import com.stfalcon.chatkit.commons.models.IUser;
import com.stfalcon.chatkit.commons.models.MessageContentType;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ChatMessage implements IChatMessage,
        MessageContentType.Image, /*this is for default image messages implementation*/
        MessageContentType /*and this one is for custom content type (in this case - voice message)*/ {
    public static final String TAG = "ChatMessage";

    public static ChatMessage parseChatMessage(JSONObject json) {
        ChatMessage chatMessage = new ChatMessage();

        try {
            chatMessage.text = json.getString("text");
            chatMessage.date = Timestamp.valueOf(json.getString("date").replace("T", " "));
            chatMessage.sender = Employee.parseEmployee(json.getJSONObject("sender"));
            chatMessage.receiver = Employee.parseEmployee(json.getJSONObject("receiver"));
        } catch (JSONException e) {
            Log.d(TAG, "Parse error: " + e.getMessage());
            return null;
        }

        return chatMessage;
    }

    public static ArrayList<ChatMessage> parseChatMessageArray(JSONArray jsonArray)
    {
        ArrayList<ChatMessage> result = new ArrayList<>(jsonArray.length());
        for(int i = 0; i < jsonArray.length(); ++i)
        {
            try {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                ChatMessage message = parseChatMessage(jsonObject);
                result.add(message);
            }
            catch (JSONException e)
            {
                Log.d(TAG, "Array parse error: " + e.getMessage());
            }
        }
        return result;
    }

    private String id;
    private int companyId;
    private String text;
    private Date date;
    private Employee sender;
    private Employee receiver;
    private boolean isRead;

    private Image image;

    public ChatMessage() {
    }

//    public ChatMessage(String id, Employee sender, String text, Date date) {
//        this.id = id;
//        this.text = text;
//        this.sender = sender;
//        this.date = date;
//    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public String getDialogPhoto() {
        return null;
    }

    @Override
    public String getDialogName() {
        return null;
    }

    @Override
    public List<? extends IUser> getUsers() {
        return null;
    }

    @Override
    public IMessage getLastMessage() {
        return null;
    }

    @Override
    public void setLastMessage(IMessage message) {
    }

    @Override
    public int getUnreadCount() {
        return 0;
    }

    @Override
    public String getText() {
        return text;
    }

    @Override
    public Date getCreatedAt() {
        return date;
    }

    @Override
    public Employee getUser() {
        return this.sender;
    }

    public Employee getSender() {
        return this.sender;
    }

    public Employee getReceiver() {
        return this.receiver;
    }

    @Override
    public String getImageUrl() {
        return image == null ? null : image.url;
    }

    public boolean getIsRead() {
        return isRead;
    }

    public String getStatus() {
        return "Sent";
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public static class Image {
        private String url;

        public Image(String url) {
            this.url = url;
        }
    }
}

