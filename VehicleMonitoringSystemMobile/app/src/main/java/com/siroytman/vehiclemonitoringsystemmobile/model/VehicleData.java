package com.siroytman.vehiclemonitoringsystemmobile.model;

import com.google.firebase.Timestamp;
import com.google.firebase.auth.FirebaseUser;

import java.sql.Time;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class VehicleData {
    int vehicle_id;
    String user_email;
    Timestamp timestamp;
    double latitude;
    double longitude;

    public VehicleData(int vehicle_id, String user_email, Date date, double latitude, double longitude) {
        this.vehicle_id = vehicle_id;
        this.user_email = user_email;
        this.timestamp = new Timestamp(date);
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Map<String, Object> toMap() {
        Map<String, Object> vehicle_data = new HashMap<>();
        vehicle_data.put("vehicle_id", vehicle_id);
        vehicle_data.put("user_email", user_email);
        vehicle_data.put("timestamp", timestamp);
        vehicle_data.put("latitude", latitude);
        vehicle_data.put("longitude", longitude);

        return vehicle_data;
    }
}
