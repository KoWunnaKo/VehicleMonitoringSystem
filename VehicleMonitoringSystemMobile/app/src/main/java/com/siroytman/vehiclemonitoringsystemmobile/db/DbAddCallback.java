package com.siroytman.vehiclemonitoringsystemmobile.db;

import com.google.firebase.firestore.DocumentReference;

import androidx.annotation.NonNull;

public interface DbAddCallback {
    void onSuccess(DocumentReference documentReference);
    void onFailure(@NonNull Exception e);
}
