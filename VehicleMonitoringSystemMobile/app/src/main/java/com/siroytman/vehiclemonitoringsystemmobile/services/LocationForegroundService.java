package com.siroytman.vehiclemonitoringsystemmobile.services;

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

import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.interfaces.ILocationManager;
import com.siroytman.vehiclemonitoringsystemmobile.ui.activity.MainActivity;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;

// Foreground service for running locationService in background
// Sends location to GeodataProcessingService via volley
public class LocationForegroundService extends Service implements ILocationManager {
    public static final String TAG = "LocationForeService";
    public static final String NOTIFICATION_CHANNEL_ID = "ForegroundServiceNotificationChannel";
    public static final int CHANNEL_ID = 420;

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        createNotificationChannel();

        Intent notificationIntent = new Intent(this, MainActivity.class);
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
        LocationService.getInstance(getApplicationContext(), this).startLocationUpdates(getApplicationContext());

        return START_STICKY;
    }

    // Callback for locationService
    @Override
    public void getLastKnownLocation(Location location) {
        Log.d(TAG, "LastKnownLocation: Latitude: " + location.getLatitude() + "; Longitude: " + location.getLongitude());
    }

    // Callback for locationService
    @Override
    public void onLocationChanged(Location location) {
        Log.d(TAG, "LocationChanged: Latitude: " + location.getLatitude() + "; Longitude: " + location.getLongitude());
    }

    public static void startService(Context context) {
        Intent serviceIntent = new Intent(context, LocationForegroundService.class);
        ContextCompat.startForegroundService(context, serviceIntent);
    }

    public static void stopService(Context context){
        Intent serviceIntent = new Intent(context, LocationForegroundService.class);
        context.stopService(serviceIntent);
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

    @Override
    public void onDestroy() {
        super.onDestroy();
        LocationService.getInstance(getApplicationContext(), this).stopLocationUpdates();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
