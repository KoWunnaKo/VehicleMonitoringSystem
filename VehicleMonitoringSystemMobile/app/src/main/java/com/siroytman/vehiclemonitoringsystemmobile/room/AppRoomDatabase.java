package com.siroytman.vehiclemonitoringsystemmobile.room;

import androidx.room.Database;
import androidx.room.RoomDatabase;
import com.siroytman.vehiclemonitoringsystemmobile.model.VehicleData;

@Database(entities = {VehicleData.class}, version = 4, exportSchema = false)
public abstract class AppRoomDatabase extends RoomDatabase {
    public abstract VehicleDataDao vehicleDataDao();
}
