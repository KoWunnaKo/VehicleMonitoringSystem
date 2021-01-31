package com.siroytman.vehiclemonitoringsystemmobile.model;

import com.google.firebase.Timestamp;

import org.jetbrains.annotations.NotNull;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import androidx.annotation.NonNull;

public class VehicleData {

    public int vehicle_id;

    public String user_email;

    @NonNull
    public Date datetime;

    public double latitude;

    public double longitude;

    public VehicleData(int vehicle_id, String user_email, @NotNull Date datetime, double latitude, double longitude) {
        this.vehicle_id = vehicle_id;
        this.user_email = user_email;
        this.datetime = datetime;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Map<String, Object> toMap() {
        Map<String, Object> vehicle_data = new HashMap<>();
        vehicle_data.put("vehicle_id", vehicle_id);
        vehicle_data.put("user_email", user_email);
        vehicle_data.put("timestamp", new Timestamp(datetime));
        vehicle_data.put("latitude", latitude);
        vehicle_data.put("longitude", longitude);

        return vehicle_data;
    }

    @NonNull
    @Override
    public String toString() {
        return "vehicle_id = " + vehicle_id + ", " +
                "user_email = " + user_email + ", " +
                "timestamp = " + datetime.toString() + ", " +
                "latitude = " + latitude + ", " +
                "longitude = " + longitude;
    }
}
