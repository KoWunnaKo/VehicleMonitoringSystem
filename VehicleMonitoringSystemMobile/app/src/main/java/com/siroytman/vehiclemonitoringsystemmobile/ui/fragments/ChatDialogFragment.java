package com.siroytman.vehiclemonitoringsystemmobile.ui.fragments;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatDialog;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatMessage;
import com.siroytman.vehiclemonitoringsystemmobile.sampleData.DialogsFixtures;
import com.siroytman.vehiclemonitoringsystemmobile.ui.activity.ChatMessagesActivity;
import com.squareup.picasso.Picasso;
import com.stfalcon.chatkit.commons.ImageLoader;
import com.stfalcon.chatkit.dialogs.DialogsList;
import com.stfalcon.chatkit.dialogs.DialogsListAdapter;


public class ChatDialogFragment extends Fragment implements DialogsListAdapter.OnDialogClickListener<ChatDialog> {
    public static final String TAG = "ChatDialogFragment";
    private View rootView;
    protected ImageLoader imageLoader;
    protected DialogsListAdapter<ChatDialog> dialogsAdapter;
    private DialogsList dialogsListView;


    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        rootView = inflater.inflate(R.layout.fragment_chat_dialog, container, false);

        imageLoader = (imageView, url, payload) -> Picasso.get().load(url).into(imageView);
        dialogsListView = rootView.findViewById(R.id.chat__dialogs_list);
        initAdapter();

        return rootView;
    }

    @Override
    public void onDialogClick(ChatDialog dialog) {
        ChatMessagesActivity.open(getActivity());
        Log.d(TAG, "onDialogClick, dialogName: " + dialog.getDialogName());
    }

    private void initAdapter() {
        dialogsAdapter = new DialogsListAdapter<>(imageLoader);
        dialogsAdapter.setItems(DialogsFixtures.getDialogs());

        dialogsAdapter.setOnDialogClickListener(this);
//        dialogsAdapter.setOnDialogLongClickListener(this);

        dialogsListView.setAdapter(dialogsAdapter);
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