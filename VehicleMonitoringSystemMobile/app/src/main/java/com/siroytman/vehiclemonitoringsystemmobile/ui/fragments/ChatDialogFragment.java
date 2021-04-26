package com.siroytman.vehiclemonitoringsystemmobile.ui.fragments;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.controller.ChatController;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatDialog;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatMessage;
import com.siroytman.vehiclemonitoringsystemmobile.ui.activity.ChatMessagesActivity;
import com.squareup.picasso.Picasso;
import com.stfalcon.chatkit.commons.ImageLoader;
import com.stfalcon.chatkit.dialogs.DialogsList;
import com.stfalcon.chatkit.dialogs.DialogsListAdapter;

import java.util.ArrayList;


public class ChatDialogFragment extends Fragment implements DialogsListAdapter.OnDialogClickListener<ChatDialog> {
    public static final String TAG = "ChatDialogFragment";

    protected ImageLoader imageLoader;
    protected DialogsListAdapter<ChatDialog> dialogsAdapter;
    private DialogsList dialogsListView;
    private ChatController chatController;

    private static ChatDialogFragment instance;

    public static synchronized ChatDialogFragment getInstance() {
        if (instance == null) {
            instance = new ChatDialogFragment();
        }
        return instance;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        chatController = ChatController.getInstance();

        instance = this;
    }

    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_chat_dialog, container, false);

        this.imageLoader = (imageView, url, payload) -> Picasso.get().load(url).into(imageView);
        this.dialogsListView = rootView.findViewById(R.id.chat__dialogs_list);

        initAdapter();

        return rootView;
    }

    @Override
    public void onDialogClick(ChatDialog dialog) {
        ChatMessagesActivity.open(getActivity(), dialog);
        Log.d(TAG, "onDialogClick, dialogName: " + dialog.getDialogName());
    }

    private void initAdapter() {
        this.dialogsAdapter = new DialogsListAdapter<>(this.imageLoader);
        this.dialogsAdapter.setOnDialogClickListener(this);
        this.dialogsListView.setAdapter(this.dialogsAdapter);

        chatController.getDialogs();
    }

    public void dialogsFetchedUpdateView(ArrayList<ChatDialog> chatDialogs) {
        this.dialogsAdapter.setItems(chatDialogs);
    }

    //for example
    private void onNewMessage(String dialogId, ChatMessage message) {
        boolean isUpdated = dialogsAdapter.updateDialogWithMessage(dialogId, message);
        if (!isUpdated) {
            //Dialog with this ID doesn't exist, so you can create new Dialog or update all dialogs list
        }
    }

    //for example
    private void onNewDialog(ChatDialog dialog) {
        dialogsAdapter.addItem(dialog);
    }
}