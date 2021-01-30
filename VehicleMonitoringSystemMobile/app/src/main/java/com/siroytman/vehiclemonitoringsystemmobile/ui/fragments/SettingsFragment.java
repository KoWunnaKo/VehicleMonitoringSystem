package com.siroytman.vehiclemonitoringsystemmobile.ui.fragments;

import android.content.Context;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.firebase.ui.auth.AuthUI;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.snackbar.Snackbar;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.ui.activity.AuthActivity;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.StringRes;
import androidx.fragment.app.Fragment;

public class SettingsFragment extends Fragment {
    private static final String TAG = "SettingsFragment";
    private Context context;
    private View rootView;
    private TextView userEmailText;
    private TextView userDisplayNameText;
    private Button signOutButton;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        rootView = inflater.inflate(R.layout.fragment_settings, container, false);
        context = getActivity();

        userEmailText = rootView.findViewById(R.id.user_email);
        userDisplayNameText = rootView.findViewById(R.id.user_display_name);

        signOutButton = rootView.findViewById(R.id.sign_out);
        signOutButton.setOnClickListener(v -> signOut());

        populateProfile();

        return rootView;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    private void signOut() {
        AuthUI.getInstance()
                .signOut(context)
                .addOnCompleteListener(new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        if (task.isSuccessful()) {
                            startActivity(AuthActivity.createIntent(context));
                        } else {
                            Log.w(TAG, "signOut:failure", task.getException());
                            showSnackbar(R.string.sign_out_failed);
                        }
                    }
                });
    }

    private void populateProfile() {
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        String userEmail = TextUtils.isEmpty(user.getEmail()) ? "No email" : user.getEmail();
        String displayName = TextUtils.isEmpty(user.getDisplayName()) ? "No display name" : user.getDisplayName();

        userEmailText.setText(userEmail);
        userDisplayNameText.setText(displayName);
    }

    private void showSnackbar(@StringRes int errorMessageRes) {
        Snackbar.make(rootView, errorMessageRes, Snackbar.LENGTH_LONG).show();
    }
}