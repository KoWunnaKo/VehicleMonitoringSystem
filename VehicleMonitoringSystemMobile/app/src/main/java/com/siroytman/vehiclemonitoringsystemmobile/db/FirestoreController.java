package com.siroytman.vehiclemonitoringsystemmobile.db;

import android.util.Log;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.Map;

import androidx.annotation.NonNull;

public class FirestoreController {
    public static final String TAG = "FirestoreController";

    // A singleton instance of the application class for easy access in other places
    private static FirestoreController instance;

    private final FirebaseFirestore db;

    private FirestoreController() {
        // initialize the singleton
        instance = this;
        // initialize firestore
        db = FirebaseFirestore.getInstance();
    }

    public static synchronized FirestoreController getInstance() {
        if (instance == null) {
            instance = new FirestoreController();
        }
        return instance;
    }

    public void add(final String collectionPath, final Map<String, Object> object, final DbAddCallback callback) {
        db.collection(collectionPath)
                .add(object)
                .addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
                    @Override
                    public void onSuccess(DocumentReference documentReference) {
                        Log.d(TAG, "DocumentSnapshot added with ID: " + documentReference.getId());
                        callback.onSuccess(documentReference);
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Log.d(TAG, "Error adding document", e);
                        callback.onFailure(e);
                    }
                });
    }

    public void getAll(final String collectionPath, final DbGetCallback callback) {
        db.collection(collectionPath)
                .get()
                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                    @Override
                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                        if (task.isSuccessful()) {
                            for (QueryDocumentSnapshot document : task.getResult()) {
                                Log.d(TAG, document.getId() + " => " + document.getData());
                            }
                        } else {
                            Log.d(TAG, "Error getting documents.", task.getException());
                        }
                        callback.onComplete(task);
                    }
                });
    }
}
