package com.siroytman.vehiclemonitoringsystemmobile.controller;

import android.util.Log;

import com.android.volley.Request;
import com.android.volley.VolleyError;
import com.siroytman.vehiclemonitoringsystemmobile.api.ApiController;
import com.siroytman.vehiclemonitoringsystemmobile.api.VolleyCallbackJSONArray;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatDialog;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatMessage;
import com.siroytman.vehiclemonitoringsystemmobile.ui.fragments.ChatDialogFragment;

import org.json.JSONArray;

import java.util.ArrayList;


public class ChatController {
    private static final String TAG = "ChatController";
    private final ApiController apiController;

    private static ChatController instance;

    private ChatController() {
        apiController = ApiController.getInstance();
    }

    public static synchronized ChatController getInstance() {
        if (instance == null) {
            instance = new ChatController();
        }
        return instance;
    }

    public void getDialogs() {
        // TODO companyId and senderId
        int companyId = 1;
        String senderId = "6rCZ9FrOAMd4SdEDNaNENoY1Gku2";

//        Log.d(TAG, "chat/getAllEmployeeMessages/" + companyId + "/" + senderId);
        apiController.getJSONArrayResponse(Request.Method.GET,
                        ApiController.BACKEND_URL,
                        "chat/getAllEmployeeMessages/" + companyId + "/" + senderId,
                        null,
                        new VolleyCallbackJSONArray() {
                            @Override
                            public void onSuccessResponse(JSONArray result) {
                                ArrayList<ChatMessage> chatMessages = ChatMessage.parseChatMessageArray(result);
                                ArrayList<ChatDialog> chatDialogs = ChatDialog.getDialogsList(chatMessages);
                                ChatDialogFragment.getInstance().dialogsFetchedUpdateView(chatDialogs);
                            }

                            @Override
                            public void onErrorResponse(VolleyError error) {
                                Log.d(TAG, "Volley error = " + error.toString());
                            }
                        });
    }
}
