package com.siroytman.vehiclemonitoringsystemmobile.util.obd;

import android.util.Log;

import com.github.pires.obd.commands.ObdCommand;
import com.github.pires.obd.commands.SpeedCommand;
import com.github.pires.obd.commands.control.DistanceMILOnCommand;
import com.github.pires.obd.commands.control.DistanceSinceCCCommand;
import com.github.pires.obd.commands.control.IgnitionMonitorCommand;
import com.github.pires.obd.commands.engine.RPMCommand;
import com.github.pires.obd.commands.fuel.ConsumptionRateCommand;
import com.github.pires.obd.commands.pressure.FuelPressureCommand;
import com.github.pires.obd.commands.temperature.EngineCoolantTemperatureCommand;
import com.siroytman.vehiclemonitoringsystemmobile.model.VehicleData;

import java.util.ArrayList;

public class ObdCommandsHelper {
    public static final String TAG = "ObdCommandsHelper";
    
    public static ArrayList<ObdCommand> getDefaultCommands() {
        ArrayList<ObdCommand> obdCommandList = new ArrayList<ObdCommand>() {{
            // Control
            add(new DistanceMILOnCommand());
            add(new DistanceSinceCCCommand());
            add(new IgnitionMonitorCommand());
            // Engine
            add(new RPMCommand());
            // Fuel
            add(new ConsumptionRateCommand());
            // Pressure
            add(new FuelPressureCommand());
            // Temperature
            add(new EngineCoolantTemperatureCommand());
            // Speed
            add(new SpeedCommand());
        }};
        
        return obdCommandList;
    }

    public static VehicleData parseDefaultCommandsResult(VehicleData vehicleData, ArrayList<String> result) {
        Log.d(TAG, "parseDefaultCommandsResult");

        int i = 0;

        // Control
        try {
            vehicleData.distanceMilControl = Integer.parseInt(result.get(i++));
        } catch (NumberFormatException e) {
            Log.e(TAG, i + ". distanceMilControl: error parsing " + e);
        }

        try {
            vehicleData.distanceSinceCcControl = Integer.parseInt(result.get(i++));
        } catch (NumberFormatException e) {
            Log.e(TAG, i + ". distanceSinceCcControl: error parsing " + e);
        }

        try {
            vehicleData.ignitionMonitor = result.get(i++);
        } catch (NumberFormatException e) {
            Log.e(TAG, i + ". ignitionMonitor: error parsing " + e);
        }

        // Engine
        try {
            vehicleData.rpmEngine = Integer.parseInt(result.get(i++));
        } catch (NumberFormatException e) {
            Log.e(TAG, i + ". rpmEngine: error parsing " + e);
        }

        // Fuel
        try {
            vehicleData.consumptionRateFuel = Integer.parseInt(result.get(i++));
        } catch (NumberFormatException e) {
            Log.e(TAG, i + ". consumptionRateFuel: error parsing " + e);
        }

        // Pressure
        try {
            vehicleData.pressureFuel = Integer.parseInt(result.get(i++));
        } catch (NumberFormatException e) {
            Log.e(TAG, i + ". pressureFuel: error parsing " + e);
        }

        // Temperature
        try {
            vehicleData.engineCoolantTemperature = Integer.parseInt(result.get(i++));
        } catch (NumberFormatException e) {
            Log.e(TAG, i + ". engineCoolantTemperature: error parsing " + e);
        }

        // Speed
        try {
            vehicleData.speed = Integer.parseInt(result.get(i++));
        } catch (NumberFormatException e) {
            Log.e(TAG, i + ". speed: error parsing " + e);
        }

        return vehicleData;
    }
}
