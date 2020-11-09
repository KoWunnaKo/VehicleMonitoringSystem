package com.siroytman.vehiclemonitoringsystemmobile.api;

import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import com.android.volley.NoConnectionError;
import com.android.volley.TimeoutError;
import com.android.volley.VolleyError;
import com.siroytman.vehiclemonitoringsystemmobile.R;

public class ErrorHandler {
    public static final String TAG = "ErrorHandler";

    // Return true if handled, false otherwise
    public static Boolean HandleError(Context context, VolleyError error)
    {
        if (error.getClass() == NoConnectionError.class)
        {
            Toast.makeText(context, context.getString(R.string.error_handler__no_connection), Toast.LENGTH_LONG)
                    .show();
            Log.d(TAG, context.getString(R.string.error_handler__no_connection));
            return true;
        }
        if (error.getClass() == TimeoutError.class)
        {
            Toast.makeText(context, context.getString(R.string.error_handler__timeout), Toast.LENGTH_LONG)
                    .show();
            Log.d(TAG, context.getString(R.string.error_handler__timeout));
            return true;
        }

        Log.d(TAG, error.getMessage());
        return false;
    }
}
