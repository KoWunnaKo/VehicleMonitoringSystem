package com.siroytman.vehiclemonitoringsystemmobile.ui.activity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import com.firebase.ui.auth.AuthUI;
import com.firebase.ui.auth.AuthUI.IdpConfig;
import com.firebase.ui.auth.ErrorCodes;
import com.firebase.ui.auth.IdpResponse;
import com.firebase.ui.auth.util.ExtraConstants;
import com.google.android.material.snackbar.Snackbar;
import com.google.firebase.auth.FirebaseAuth;
import com.siroytman.vehiclemonitoringsystemmobile.R;

import java.util.ArrayList;
import java.util.List;

import androidx.annotation.DrawableRes;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.StringRes;
import androidx.annotation.StyleRes;
import androidx.appcompat.app.AppCompatActivity;
import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class AuthActivity extends AppCompatActivity {
    private static final String TAG = "AuthActivity";

    private static final int RC_SIGN_IN = 100;
    private static final boolean ALLOW_NEW_EMAIL_ACCOUNTS = false;
    private static final boolean REQUIRE_EMAIL_NAME = false;
    private static final boolean ENABLE_CREDENTIALS = true;
    private static final boolean ENABLE_HINTS= true;

    @BindView(R.id.root) View mRootView;

    @NonNull
    public static Intent createIntent(@NonNull Context context) {
        return new Intent(context, AuthActivity.class);
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_auth);
        ButterKnife.bind(this);

        catchEmailLinkSignIn();
    }

    public void catchEmailLinkSignIn() {
        if (getIntent().getExtras() == null) {
            return;
        }
        String link = getIntent().getExtras().getString(ExtraConstants.EMAIL_LINK_SIGN_IN);
        if (link != null) {
            signInWithEmailLink(link);
        }
    }

    @OnClick(R.id.sign_in)
    public void signIn() {
        startActivityForResult(buildSignInIntent(/*link=*/null), RC_SIGN_IN);
    }

    public void signInWithEmailLink(@Nullable String link) {
        startActivityForResult(buildSignInIntent(link), RC_SIGN_IN);
    }

    @NonNull
    public AuthUI getAuthUI() {
        AuthUI authUI = AuthUI.getInstance();
        return authUI;
    }

    @NonNull
    public Intent buildSignInIntent(@Nullable String link) {
        AuthUI.SignInIntentBuilder builder = getAuthUI().createSignInIntentBuilder()
                .setTheme(getSelectedTheme())
                .setLogo(getSelectedLogo())
                .setAvailableProviders(getSelectedProviders())
                .setIsSmartLockEnabled(ENABLE_CREDENTIALS, ENABLE_HINTS);

        if (link != null) {
            builder.setEmailLink(link);
        }

        FirebaseAuth auth = FirebaseAuth.getInstance();

        if (auth.getCurrentUser() != null && auth.getCurrentUser().isAnonymous()) {
            builder.enableAnonymousUsersAutoUpgrade();
        }

        return builder.build();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == RC_SIGN_IN) {
            handleSignInResponse(resultCode, data);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        FirebaseAuth auth = FirebaseAuth.getInstance();
        if (auth.getCurrentUser() != null && getIntent().getExtras() == null) {
            startSignedInActivity(null);
            finish();
        }
    }

    private void handleSignInResponse(int resultCode, @Nullable Intent data) {
        IdpResponse response = IdpResponse.fromResultIntent(data);

        // Successfully signed in
        if (resultCode == RESULT_OK) {
            startSignedInActivity(response);
            finish();
        } else {
            // Sign in failed
            if (response == null) {
                // User pressed back button
                showSnackbar(R.string.sign_in_cancelled);
                return;
            }

            if (response.getError().getErrorCode() == ErrorCodes.NO_NETWORK) {
                showSnackbar(R.string.no_internet_connection);
                return;
            }

            if (response.getError().getErrorCode() == ErrorCodes.ERROR_USER_DISABLED) {
                showSnackbar(R.string.account_disabled);
                return;
            }

            showSnackbar(R.string.unknown_error);
            Log.e(TAG, "Sign-in error: ", response.getError());
        }
    }

    private void startSignedInActivity(@Nullable IdpResponse response) {
        startActivity(new Intent(this, NavigationActivity.class));
    }

    @StyleRes
    private int getSelectedTheme() {
        return AuthUI.getDefaultTheme();
    }

    @DrawableRes
    private int getSelectedLogo() {
        return R.mipmap.firebase_auth_120dp;
    }

    private List<IdpConfig> getSelectedProviders() {
        List<IdpConfig> selectedProviders = new ArrayList<>();

        // UseEmailProvider
        selectedProviders.add(new IdpConfig.EmailBuilder()
                .setRequireName(REQUIRE_EMAIL_NAME)
                .setAllowNewAccounts(ALLOW_NEW_EMAIL_ACCOUNTS)
                .build());

        return selectedProviders;
    }

    private void showSnackbar(@StringRes int errorMessageRes) {
        Snackbar.make(mRootView, errorMessageRes, Snackbar.LENGTH_LONG).show();
    }
}
