package com.siroytman.vehiclemonitoringsystemmobile.controller;

import android.util.Log;

import com.android.volley.Request;
import com.android.volley.VolleyError;
import com.siroytman.vehiclemonitoringsystemmobile.api.ApiController;
import com.siroytman.vehiclemonitoringsystemmobile.api.VolleyCallbackJSONArray;
import com.siroytman.vehiclemonitoringsystemmobile.api.VolleyCallbackJSONObject;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatDialog;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatMessage;
import com.siroytman.vehiclemonitoringsystemmobile.model.Employee;
import com.siroytman.vehiclemonitoringsystemmobile.ui.activity.ChatMessagesActivity;
import com.siroytman.vehiclemonitoringsystemmobile.ui.fragments.ChatDialogFragment;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;


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
        Employee user = AppController.getInstance().getDbUser();
        String senderId = user.getId();
        int companyId = user.getCompanyId();

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

    public void sendMessage(ChatMessage message) {
        apiController.getJSONObjectResponse(Request.Method.POST,
                ApiController.BACKEND_URL,
                "chat",
                message.toJSONObject(),
                new VolleyCallbackJSONObject() {
                    @Override
                    public void onSuccessResponse(JSONObject result) {
                        ChatMessage message = ChatMessage.parseChatMessage(result);
                        ChatMessagesActivity.getInstance().onNewMessageUpdateView(message);
                    }

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d(TAG, "Volley error = " + error.toString());
                    }
                });
    }
}
