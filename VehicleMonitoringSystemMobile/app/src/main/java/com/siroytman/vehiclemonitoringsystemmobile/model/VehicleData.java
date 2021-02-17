package com.siroytman.vehiclemonitoringsystemmobile.model;

import com.google.firebase.Timestamp;
import com.siroytman.vehiclemonitoringsystemmobile.room.Converters;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import androidx.annotation.NonNull;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
import androidx.room.TypeConverters;

@Entity
public class VehicleData {
    @PrimaryKey(autoGenerate = true)
    @ColumnInfo(name = "id")
    public long id;
    @ColumnInfo(name = "vehicle_id")
    public int vehicle_id;
    @ColumnInfo(name = "user_id")
    public String user_id;
    @TypeConverters(Converters.class)
    @ColumnInfo(name = "datetime")
    public Date datetime;
    @ColumnInfo(name = "latitude")
    public double latitude;
    @ColumnInfo(name = "longitude")
    public double longitude;

    public VehicleData(int vehicle_id, String user_id, Date datetime, double latitude, double longitude) {
        this.vehicle_id = vehicle_id;
        this.user_id = user_id;
        this.datetime = datetime;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Map<String, Object> toMap() {
        Map<String, Object> vehicle_data = new HashMap<>();
        vehicle_data.put("vehicle_id", vehicle_id);
        vehicle_data.put("user_id", user_id);
        vehicle_data.put("timestamp", new Timestamp(datetime));
        vehicle_data.put("latitude", latitude);
        vehicle_data.put("longitude", longitude);

        return vehicle_data;
    }

    @NonNull
    @Override
    public String toString() {
        return "vehicle_id = " + vehicle_id + ", " +
                "user_id = " + user_id + ", " +
                "timestamp = " + datetime.toString() + ", " +
                "latitude = " + latitude + ", " +
                "longitude = " + longitude;
    }
}
