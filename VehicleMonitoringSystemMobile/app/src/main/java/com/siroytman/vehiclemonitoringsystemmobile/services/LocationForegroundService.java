package com.siroytman.vehiclemonitoringsystemmobile.services;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.DocumentReference;
import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.db.DbAddCallback;
import com.siroytman.vehiclemonitoringsystemmobile.db.FirestoreController;
import com.siroytman.vehiclemonitoringsystemmobile.interfaces.ILocationManager;
import com.siroytman.vehiclemonitoringsystemmobile.model.VehicleData;
import com.siroytman.vehiclemonitoringsystemmobile.ui.fragments.LocationFragment;

import java.util.Date;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;

import static android.Manifest.permission.ACCESS_COARSE_LOCATION;
import static android.Manifest.permission.ACCESS_FINE_LOCATION;
import static android.content.pm.PackageManager.PERMISSION_GRANTED;

/**
 * Foreground service for running locationService in background
 * Sends location to GeodataProcessingService via volley
 */
public class LocationForegroundService extends Service implements ILocationManager {
    public static final String TAG = "LocationForeService";
    public static final String NOTIFICATION_CHANNEL_ID = "ForegroundServiceNotificationChannel";
    public static final int CHANNEL_ID = 420;
    private static final int REQUEST_LOCATION = 1234;
    private static final String[] PERMISSIONS = new String[]{ACCESS_COARSE_LOCATION, ACCESS_FINE_LOCATION};
    private final FirestoreController firestoreController = FirestoreController.getInstance();

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        createNotificationChannel();

        Intent notificationIntent = new Intent(this, LocationFragment.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this,
                0, notificationIntent, 0);

        Notification notification = new NotificationCompat.Builder(this, NOTIFICATION_CHANNEL_ID)
                .setContentTitle(getString(R.string.app_name))
                .setContentText(getString(R.string.location_service__notification_text))
//                .setSmallIcon(R.drawable.ic_stat_name)
                .setContentIntent(pendingIntent)
                .build();
        startForeground(CHANNEL_ID, notification);

        // Starts locationService on a background thread
        LocationService.getInstance(getApplicationContext(), this)
                .startLocationUpdates(getApplicationContext());

        return START_STICKY;
    }

    public static void startService(Context context) {
        Intent serviceIntent = new Intent(context, LocationForegroundService.class);
        ContextCompat.startForegroundService(context, serviceIntent);
    }

    public static void stopService(Context context) {
        Intent serviceIntent = new Intent(context, LocationForegroundService.class);
        context.stopService(serviceIntent);
    }

    public static boolean checkPermissions(Context context) {
        return ContextCompat.checkSelfPermission(context, ACCESS_FINE_LOCATION) == PERMISSION_GRANTED
                || ContextCompat.checkSelfPermission(context, ACCESS_COARSE_LOCATION) == PERMISSION_GRANTED;
    }

    public static void requestPermissions(Activity activity) {
        ActivityCompat.requestPermissions(activity, PERMISSIONS, REQUEST_LOCATION);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        LocationService.getInstance(getApplicationContext(), this)
                .stopLocationUpdates();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    // Callback for locationService
    @Override
    public void getLastKnownLocation(Location location) {
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        VehicleData vehicleData =
                new VehicleData(123, user.getEmail(), new Date(), location.getLatitude(), location.getLongitude());

        Log.d(TAG, "LastKnownLocation: " + vehicleData.toString());
        insertVehicleDataToFirestore(vehicleData);
    }

    // Callback for locationService
    @Override
    public void onLocationChanged(Location location) {
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        VehicleData vehicleData =
                new VehicleData(123, user.getEmail(), new Date(), location.getLatitude(), location.getLongitude());

        Log.d(TAG, "LocationChanged: " + vehicleData.toString());
        insertVehicleDataToFirestore(vehicleData);
    }

    /**
     * Inerts vehicle data into to Cloud Firestore
     * If android is offline then data will be inserted automaticaly
     * by Firestore mechanisms wheh the connection is restored
     * @param vehicleData - piece of data
     */
    private void insertVehicleDataToFirestore(VehicleData vehicleData) {
        firestoreController.add("vehicle_data", vehicleData.toMap(), new DbAddCallback() {
            @Override
            public void onSuccess(DocumentReference documentReference) {
                Log.d(TAG, "insertVehicleDataToFirestore: added to cloud firestore: " + vehicleData.toString());
            }
            @Override
            public void onFailure(@NonNull Exception e) {
                Log.d(TAG, "insertVehicleDataToFirestore: Error. NOT added to firestore: " + e);
            }
        });
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel serviceChannel = new NotificationChannel(
                    NOTIFICATION_CHANNEL_ID,
                    "Foreground Service Channel",
                    NotificationManager.IMPORTANCE_DEFAULT
            );
            NotificationManager manager = getSystemService(NotificationManager.class);
            assert manager != null;
            manager.createNotificationChannel(serviceChannel);
        }
    }
}

