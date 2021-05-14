package com.siroytman.vehiclemonitoringsystemmobile.util.obd;

import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.util.Log;

import com.siroytman.vehiclemonitoringsystemmobile.interfaces.IBluetoothConnectManager;

import java.io.IOException;
import java.util.UUID;

/**
 * Thread for bluetooth connection - receiving socket
 */
public class BluetoothConnectThread extends Thread {
    public static final String TAG = "BluetoothConnectThread";
    private final BluetoothSocket mmSocket;
    private final BluetoothDevice mmDevice;
    private final UUID MY_UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
    private IBluetoothConnectManager bluetoothConnectManager;

    public BluetoothConnectThread(BluetoothDevice device, IBluetoothConnectManager bluetoothConnectManager) {
        this.bluetoothConnectManager = bluetoothConnectManager;
        // Use a temporary object that is later assigned to mmSocket
        // because mmSocket is final.
        BluetoothSocket tmp = null;
        mmDevice = device;

        try {
            // Get a BluetoothSocket to connect with the given BluetoothDevice.
            // MY_UUID is the app's UUID string, also used in the server code.
            tmp = device.createRfcommSocketToServiceRecord(MY_UUID);
        } catch (IOException e) {
            Log.e(TAG, "Socket's create() method failed", e);
        }
        mmSocket = tmp;
    }

    public void run() {
        try {
            // Connect to the remote device through the socket. This call blocks
            // until it succeeds or throws an exception.
            mmSocket.connect();
        } catch (IOException connectException) {
            // Unable to connect; close the socket and return.
            try {
                mmSocket.close();
            } catch (IOException closeException) {
                Log.e(TAG, "Could not close the client socket", closeException);
            }
            return;
        }

        // The connection attempt succeeded. Perform work associated with
        // the connection in a separate thread.
        Log.d(TAG, "Connection attempt succeed!");
        this.bluetoothConnectManager.onBluetoothSocketAttached(mmSocket);
    }

    // Closes the client socket and causes the thread to finish.
    public void cancel() {
        try {
            mmSocket.close();
        } catch (IOException e) {
            Log.e(TAG, "Could not close the client socket", e);
        }
    }
}