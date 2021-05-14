package com.siroytman.vehiclemonitoringsystemmobile.interfaces;

import android.bluetooth.BluetoothSocket;

public interface IBluetoothConnectManager {
    void onBluetoothSocketAttached(BluetoothSocket bluetoothSocket);
}
