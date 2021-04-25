package com.siroytman.vehiclemonitoringsystemmobile.model;

import android.util.Log;

import com.stfalcon.chatkit.commons.models.IUser;

import org.json.JSONException;
import org.json.JSONObject;

public class Employee implements IUser {
    public static final String TAG = "Employee";

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
}
