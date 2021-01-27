package com.siroytman.vehiclemonitoringsystemmobile.ui.activity;

/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.CompoundButton.OnCheckedChangeListener;
import android.widget.RadioButton;

import com.firebase.ui.auth.AuthMethodPickerLayout;
import com.firebase.ui.auth.AuthUI;
import com.firebase.ui.auth.AuthUI.IdpConfig;
import com.firebase.ui.auth.ErrorCodes;
import com.firebase.ui.auth.IdpResponse;
import com.firebase.ui.auth.util.ExtraConstants;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.snackbar.Snackbar;
import com.google.firebase.auth.ActionCodeSettings;
import com.google.firebase.auth.AuthResult;
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

    @BindView(R.id.root) View mRootView;

    @BindView(R.id.email_provider) CheckBox mUseEmailProvider;
    @BindView(R.id.email_link_provider) CheckBox mUseEmailLinkProvider;

    @BindView(R.id.default_layout) RadioButton mDefaultLayout;
    @BindView(R.id.custom_layout) RadioButton mCustomLayout;

    @BindView(R.id.credential_selector_enabled) CheckBox mEnableCredentialSelector;
    @BindView(R.id.hint_selector_enabled) CheckBox mEnableHintSelector;

    @NonNull
    public static Intent createIntent(@NonNull Context context) {
        return new Intent(context, AuthActivity.class);
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_firebase_ui);
        ButterKnife.bind(this);

        mUseEmailLinkProvider.setOnCheckedChangeListener(new OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                flipPasswordProviderCheckbox(isChecked);
            }
        });

        mUseEmailProvider.setOnCheckedChangeListener(new OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                flipEmailLinkProviderCheckbox(isChecked);
            }
        });

        mUseEmailLinkProvider.setChecked(false);
        mUseEmailProvider.setChecked(true);

        // The custom layout in this app only supports Email and Google providers.
        mCustomLayout.setOnCheckedChangeListener(new OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean checked) {
                if (checked) {
                    mUseEmailProvider.setChecked(true);
                    mUseEmailLinkProvider.setChecked(false);
                }
            }
        });

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

    public void flipPasswordProviderCheckbox(boolean emailLinkProviderIsChecked) {
        if (emailLinkProviderIsChecked) {
            mUseEmailProvider.setChecked(false);
        }
    }

    public void flipEmailLinkProviderCheckbox(boolean passwordProviderIsChecked) {
        if (passwordProviderIsChecked) {
            mUseEmailLinkProvider.setChecked(false);
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
                .setIsSmartLockEnabled(mEnableCredentialSelector.isChecked(),
                        mEnableHintSelector.isChecked());

        if (mCustomLayout.isChecked()) {
            AuthMethodPickerLayout customLayout = new AuthMethodPickerLayout
                    .Builder(R.layout.auth_method_picker_custom_layout)
                    .setGoogleButtonId(R.id.custom_google_signin_button)
                    .setEmailButtonId(R.id.custom_email_signin_clickable_text)
                    .setTosAndPrivacyPolicyId(R.id.custom_tos_pp)
                    .build();

            builder.setTheme(R.style.CustomTheme);
            builder.setAuthMethodPickerLayout(customLayout);
        }

        if (link != null) {
            builder.setEmailLink(link);
        }

        FirebaseAuth auth = FirebaseAuth.getInstance();

        if (auth.getCurrentUser() != null && auth.getCurrentUser().isAnonymous()) {
            builder.enableAnonymousUsersAutoUpgrade();
        }

        return builder.build();
    }

    @OnClick(R.id.sign_in_silent)
    public void silentSignIn() {
        getAuthUI().silentSignIn(this, getSelectedProviders())
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            startSignedInActivity(null);
                        } else {
                            showSnackbar(R.string.sign_in_failed);
                        }
                    }
                });
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
        startActivity(SignedInActivity.createIntent(this, response));
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

        if (mUseEmailProvider.isChecked()) {
            selectedProviders.add(new IdpConfig.EmailBuilder()
                    .setRequireName(REQUIRE_EMAIL_NAME)
                    .setAllowNewAccounts(ALLOW_NEW_EMAIL_ACCOUNTS)
                    .build());
        }

        if (mUseEmailLinkProvider.isChecked()) {
            ActionCodeSettings actionCodeSettings = ActionCodeSettings.newBuilder()
                    .setAndroidPackageName("com.siroytman.vehiclemonitoringsystemmobile", true, null)
                    .setHandleCodeInApp(true)
                    .setUrl("https://google.com")
                    .build();

            selectedProviders.add(new IdpConfig.EmailBuilder()
                    .setAllowNewAccounts(ALLOW_NEW_EMAIL_ACCOUNTS)
                    .setActionCodeSettings(actionCodeSettings)
                    .enableEmailLinkSignIn()
                    .build());
        }

        return selectedProviders;
    }

    private void showSnackbar(@StringRes int errorMessageRes) {
        Snackbar.make(mRootView, errorMessageRes, Snackbar.LENGTH_LONG).show();
    }
}
