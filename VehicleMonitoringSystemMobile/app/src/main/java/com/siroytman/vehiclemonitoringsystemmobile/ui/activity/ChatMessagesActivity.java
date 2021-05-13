package com.siroytman.vehiclemonitoringsystemmobile.ui.activity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.controller.ChatController;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatDialog;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatMessage;
import com.siroytman.vehiclemonitoringsystemmobile.model.Employee;
import com.squareup.picasso.Picasso;
import com.stfalcon.chatkit.commons.ImageLoader;
import com.stfalcon.chatkit.messages.MessageInput;
import com.stfalcon.chatkit.messages.MessagesList;
import com.stfalcon.chatkit.messages.MessagesListAdapter;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class ChatMessagesActivity extends AppCompatActivity implements MessageInput.InputListener,
        MessageInput.AttachmentsListener,
        MessagesListAdapter.SelectionListener {

    public static final String TAG = "ChatMessagesActivity";

    protected ImageLoader imageLoader;
    protected MessagesListAdapter<ChatMessage> messagesAdapter;
    private MessagesList messagesList;

    private Menu menu;
    private int selectionCount;

    private ChatDialog dialog;

    private ChatController chatController;

    private static ChatMessagesActivity instance;

    public static synchronized ChatMessagesActivity getInstance() {
        if (instance == null) {
            instance = new ChatMessagesActivity();
        }
        return instance;
    }

    public static void open(Context context, ChatDialog dialog) {
        Intent intent = new Intent(context, ChatMessagesActivity.class);
        intent.putExtra("dialog", dialog);
        context.startActivity(intent);
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_messages);

        instance = this;

        chatController = ChatController.getInstance();

        // Get dialog from bundle
        Bundle arguments = getIntent().getExtras();
        if(arguments != null) {
            dialog = arguments.getParcelable("dialog");
        }
        else {
            Log.e(TAG, "Error: Arguments are null!");
        }

        this.messagesList = findViewById(R.id.chat_messages__messagesList);
        initAdapter();

        MessageInput input = findViewById(R.id.chat_messages__input);
        input.setInputListener(this);
        input.setAttachmentsListener(this);
    }


    @Override
    public boolean onSubmit(CharSequence input) {
        Employee user = AppController.getInstance().getDbUser();
        String userId = user.getId();
        int companyId = user.getCompanyId();

        ChatMessage message = new ChatMessage(companyId, userId, dialog.getId(), input.toString());
        chatController.sendMessage(message);
        return true;
    }

    public void onNewMessageUpdateView(ChatMessage message) {
        messagesAdapter.addToStart(message, true);
    }

    @Override
    public void onAddAttachments() {
        // TODO messageAttachments
    }

    private void initAdapter() {
        imageLoader = (imageView, url, payload) -> Picasso.get().load(url).into(imageView);
        String senderId = AppController.getInstance().getDbUser().getId();
        messagesAdapter = new MessagesListAdapter<>(senderId, imageLoader);
        messagesAdapter.enableSelectionMode(this);
        this.messagesList.setAdapter(messagesAdapter);

        messagesAdapter.addToEnd(dialog.getMessages(), true);
    }

    @Override
    public void onBackPressed() {
        if (selectionCount == 0) {
            super.onBackPressed();
        } else {
            messagesAdapter.unselectAllItems();
        }
    }

    @Override
    public void onSelectionChanged(int count) {
        this.selectionCount = count;
//        menu.findItem(R.id.action_delete).setVisible(count > 0);
//        menu.findItem(R.id.action_copy).setVisible(count > 0);
    }
}
