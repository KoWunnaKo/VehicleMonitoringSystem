package com.siroytman.vehiclemonitoringsystemmobile.model;

import android.os.Parcel;
import android.os.Parcelable;
import android.util.Log;

import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.interfaces.IChatMessage;
import com.siroytman.vehiclemonitoringsystemmobile.util.DateUtil;
import com.stfalcon.chatkit.commons.models.IMessage;
import com.stfalcon.chatkit.commons.models.IUser;
import com.stfalcon.chatkit.commons.models.MessageContentType;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

public class TaskComment implements Parcelable,
        IChatMessage,
        MessageContentType.Image, /*this is for default image messages implementation*/
        MessageContentType /*and this one is for custom content type (in this case - voice message)*/ {
    public static final String TAG = "TaskComment";

    protected TaskComment(Parcel in) {
        id = in.readString();
        text = in.readString();
        date = new Date(in.readLong());
        author = in.readParcelable(Employee.class.getClassLoader());
        taskId = in.readInt();
    }

    public static final Creator<TaskComment> CREATOR = new Creator<TaskComment>() {
        @Override
        public TaskComment createFromParcel(Parcel in) {
            return new TaskComment(in);
        }

        @Override
        public TaskComment[] newArray(int size) {
            return new TaskComment[size];
        }
    };

    public static TaskComment parseTaskComment(JSONObject json) {
        String userId = AppController.getInstance().getDbUser().getId();

        TaskComment taskComment = new TaskComment();

        try {
            taskComment.id = json.getString("id");
            taskComment.text = json.getString("text");
            taskComment.date = DateUtil.getDateFromString(json.getString("date"));
            taskComment.author = Employee.parseEmployee(json.getJSONObject("author"));
            taskComment.taskId = json.getInt("taskId");
        } catch (JSONException e) {
            Log.d(TAG, "Parse error: " + e.getMessage());
            return null;
        }

        return taskComment;
    }

    public static ArrayList<TaskComment> parseTaskCommentsArray(JSONArray jsonArray)
    {
        ArrayList<TaskComment> result = new ArrayList<>(jsonArray.length());
        for(int i = 0; i < jsonArray.length(); ++i)
        {
            try {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                TaskComment message = parseTaskComment(jsonObject);
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
    private int taskId;
    private String text;
    private Date date;
    private Employee author;
    private String authorId;

    private Image image;

    public TaskComment() {
    }

    public TaskComment(int companyId, String authorId, int taskId, String text) {
        this.companyId = companyId;
        this.authorId = authorId;
        this.taskId = taskId;
        this.text = text;
    }

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
        return this.author;
    }

    public Employee getAuthor() {
        return this.author;
    }

    @Override
    public String getImageUrl() {
        return image == null ? null : image.url;
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

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(id);
        dest.writeString(text);
        dest.writeLong(date.getTime());
        dest.writeParcelable(author, flags);
        dest.writeInt(taskId);
    }

    public JSONObject toJSONObject() {
        HashMap<String, Object> param = new HashMap<>();
        param.put("companyId", companyId);
        param.put("authorId", authorId);
        param.put("text", text);
        param.put("taskId", taskId);
        return new JSONObject(param);
    }

    public static class Image {
        private String url;

        public Image(String url) {
            this.url = url;
        }
    }
}

