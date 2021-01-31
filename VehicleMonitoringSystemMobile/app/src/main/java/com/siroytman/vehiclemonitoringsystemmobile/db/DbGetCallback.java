package com.siroytman.vehiclemonitoringsystemmobile.db;

import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.QuerySnapshot;

import androidx.annotation.NonNull;

public interface DbGetCallback {
    void onComplete(@NonNull Task<QuerySnapshot> task);
}
