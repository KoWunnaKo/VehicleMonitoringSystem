package com.siroytman.vehiclemonitoringsystemmobile.model;

import android.os.Parcel;
import android.os.Parcelable;
import android.util.Log;

import com.siroytman.vehiclemonitoringsystemmobile.util.DateUtil;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Date;

public class Task implements Parcelable {
    public static final String TAG = "Task";

    private int id;
    private Employee operator;
    private Date createDate;
    private Date dueDate;
    private String name;
    private String description;
    private int statusId;

    public Task() { }


    public static Task parseTask(JSONObject json) {
        Task task = new Task();

        try {
            task.id = json.getInt("id");
            task.operator = Employee.parseEmployee(json.getJSONObject("operator"));
            task.createDate = DateUtil.getDateFromString(json.getString("createDate"));
            task.dueDate = DateUtil.getDateFromString(json.getString("dueDate"));
            task.name = json.getString("name");
            task.description = json.getString("description");
            task.statusId = json.getInt("statusId");
        } catch (JSONException e) {
            Log.d(TAG, "Parse error: " + e.getMessage());
            return null;
        }

        return task;
    }

    public static ArrayList<Task> parseTaskArray(JSONArray jsonArray)
    {
        ArrayList<Task> result = new ArrayList<>(jsonArray.length());
        for(int i = 0; i < jsonArray.length(); ++i)
        {
            try {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                Task task = parseTask(jsonObject);
                result.add(task);
            }
            catch (JSONException e)
            {
                Log.d(TAG, "Array parse error: " + e.getMessage());
            }
        }
        return result;
    }

    protected Task(Parcel in) {
        id = in.readInt();
        operator = in.readParcelable(Employee.class.getClassLoader());
        name = in.readString();
        description = in.readString();
        statusId = in.readInt();
        createDate = new Date(in.readLong());
        dueDate = new Date(in.readLong());
    }

    public static final Creator<Task> CREATOR = new Creator<Task>() {
        @Override
        public Task createFromParcel(Parcel in) {
            return new Task(in);
        }

        @Override
        public Task[] newArray(int size) {
            return new Task[size];
        }
    };

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeInt(id);
        dest.writeParcelable(operator, flags);
        dest.writeString(name);
        dest.writeString(description);
        dest.writeInt(statusId);
        dest.writeLong(createDate.getTime());
        dest.writeLong(dueDate.getTime());
    }

    public int getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public int getStatusId() {
        return this.statusId;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public Employee getOperator() {
        return operator;
    }

    public void setNextStatusId() {
        this.statusId++;
    }

    public void setPrevStatusId() {
        this.statusId--;
    }
}
