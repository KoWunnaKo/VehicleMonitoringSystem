package com.siroytman.vehiclemonitoringsystemmobile.model;

import android.os.Parcel;
import android.os.Parcelable;
import android.util.Log;

import com.stfalcon.chatkit.commons.models.IUser;

import org.json.JSONException;
import org.json.JSONObject;

public class Employee implements IUser, Parcelable {
    public static final String TAG = "Employee";

    protected Employee(Parcel in) {
        id = in.readString();
        firstName = in.readString();
        lastName = in.readString();
    }

    public static final Creator<Employee> CREATOR = new Creator<Employee>() {
        @Override
        public Employee createFromParcel(Parcel in) {
            return new Employee(in);
        }

        @Override
        public Employee[] newArray(int size) {
            return new Employee[size];
        }
    };

    public static Employee parseEmployee(JSONObject json) {
        try {
            Employee user = new Employee();
            user.setId(json.getString("id"));
            user.setFirstName(json.getString("firstName"));
            user.setLastName(json.getString("lastName"));

            return user;
        } catch (JSONException e)
        {
            Log.d(TAG, "Parse error: " + e.getMessage());
            return null;
        }
    }

    private String id;

    private String firstName;

    private String lastName;

    private Employee() { }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.firstName + " " + this.lastName;
    }

    @Override
    public String getAvatar() {
        return null;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(id);
        dest.writeString(firstName);
        dest.writeString(lastName);
    }
}
