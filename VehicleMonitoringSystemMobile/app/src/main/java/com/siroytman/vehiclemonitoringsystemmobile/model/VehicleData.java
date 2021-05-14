package com.siroytman.vehiclemonitoringsystemmobile.model;

import androidx.annotation.NonNull;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
import androidx.room.TypeConverters;

import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.room.Converters;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

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

    // Control
    @ColumnInfo(name = "distanceMilControl")
    public Integer distanceMilControl;

    /**
     * Distance traveled since codes cleared-up.
     */
    @ColumnInfo(name = "distanceSinceCcControl")
    public Integer distanceSinceCcControl;

    /**
     * Is ignition on
     */
    @ColumnInfo(name = "ignitionMonitor")
    public String ignitionMonitor;

    // Engine
    // Checked
    /**
     * Displays the current engine revolutions per minute (RPM).
     */
    @ColumnInfo(name = "rpmEngine")
    public Integer rpmEngine;

    // Fuel
    /**
     * Fuel Consumption Rate per hour
     */
    @ColumnInfo(name = "consumptionRateFuel")
    public Integer consumptionRateFuel;

    // Pressure
    @ColumnInfo(name = "pressureFuel")
    public Integer pressureFuel;

    // Temperature
    // Checked
    @ColumnInfo(name = "engineCoolantTemperature")
    public Integer engineCoolantTemperature;

    // Speed
    @ColumnInfo(name = "speed")
    public Integer speed;


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
        vehicle_data.put("timestamp", datetime);
        vehicle_data.put("latitude", latitude);
        vehicle_data.put("longitude", longitude);

        // OBD related data
        if (AppController.getInstance().useOBD) {
            // Control
            vehicle_data.put("distanceMilControl", distanceMilControl);
            vehicle_data.put("distanceSinceCcControl", distanceSinceCcControl);
            vehicle_data.put("ignitionMonitor", ignitionMonitor);

            // Engine
            vehicle_data.put("rpmEngine", rpmEngine);

            // Fuel
            vehicle_data.put("consumptionRateFuel", consumptionRateFuel);

            // Pressure
            vehicle_data.put("pressureFuel", pressureFuel);

            // Temperature
            vehicle_data.put("engineCoolantTemperature", engineCoolantTemperature);

            // Speed
            vehicle_data.put("speed", speed);
            // TODO
        }

        return vehicle_data;
    }

    @NonNull
    @Override
    public String toString() {
        String res = "vehicle_id = " + vehicle_id + ", " +
                "user_id = " + user_id + ", " +
                "timestamp = " + datetime.toString() + ", " +
                "latitude = " + latitude + ", " +
                "longitude = " + longitude;

        if (AppController.getInstance().useOBD) {
            // Control
            res += ", distanceMilControl = " + distanceMilControl;
            res += ", distanceSinceCcControl = " + distanceSinceCcControl;
            res += ", ignitionMonitor = " + ignitionMonitor;

            // Engine
            res += ", rpmEngine = " + rpmEngine;

            // Fuel
            res += ", pressureFuel = " + pressureFuel;

            // Pressure
            res += ", pressureFuel = " + pressureFuel;

            // Temperature
            res += ", engineCoolantTemperature = " + engineCoolantTemperature;

            // Speed
            res += ", speed = " + speed;
            // TODO
        }

        return res;
    }
}
