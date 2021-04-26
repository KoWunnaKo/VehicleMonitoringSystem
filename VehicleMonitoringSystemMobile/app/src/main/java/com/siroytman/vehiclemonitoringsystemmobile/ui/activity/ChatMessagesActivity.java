package com.siroytman.vehiclemonitoringsystemmobile.ui.activity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.Menu;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.controller.ChatController;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatDialog;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatMessage;
import com.siroytman.vehiclemonitoringsystemmobile.sampleData.MessagesFixtures;
import com.siroytman.vehiclemonitoringsystemmobile.ui.fragments.ChatDialogFragment;
import com.squareup.picasso.Picasso;
import com.stfalcon.chatkit.commons.ImageLoader;
import com.stfalcon.chatkit.messages.MessageInput;
import com.stfalcon.chatkit.messages.MessagesList;
import com.stfalcon.chatkit.messages.MessagesListAdapter;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;

public class ChatMessagesActivity extends AppCompatActivity implements MessageInput.InputListener,
        MessageInput.AttachmentsListener,
        MessageInput.TypingListener,
        MessagesListAdapter.SelectionListener,
        MessagesListAdapter.OnLoadMoreListener{

    public static final String TAG = "ChatMessagesActivity";

    private static final int TOTAL_MESSAGES_COUNT = 100;

    protected final String senderId = "0";
    protected ImageLoader imageLoader;
    protected MessagesListAdapter<ChatMessage> messagesAdapter;
    private MessagesList messagesList;

    private Menu menu;
    private int selectionCount;
    private Date lastLoadedDate;

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

        imageLoader = (imageView, url, payload) -> Picasso.get().load(url).into(imageView);

        this.messagesList = findViewById(R.id.chat_messages__messagesList);
        initAdapter();

        MessageInput input = findViewById(R.id.chat_messages__input);
        input.setInputListener(this);
        input.setTypingListener(this);
        input.setAttachmentsListener(this);
    }


    @Override
    public boolean onSubmit(CharSequence input) {
        // TODO userId, companyId
        String userId = "6rCZ9FrOAMd4SdEDNaNENoY1Gku2";
        int companyId = 1;
        ChatMessage message = new ChatMessage(companyId, userId, dialog.getId(), input.toString());
        chatController.sendMessage(message);

//        messagesAdapter.addToStart(
//                MessagesFixtures.getTextMessage(input.toString()), true);
        return true;
    }

    public void onNewMessageUpdateView(ChatMessage message) {
        messagesAdapter.addToStart(message, true);
    }

    @Override
    public void onAddAttachments() {
//        messagesAdapter.addToStart(
//                MessagesFixtures.getImageMessage(), true);
    }

    private void initAdapter() {
        messagesAdapter = new MessagesListAdapter<>(senderId, imageLoader);
        messagesAdapter.enableSelectionMode(this);
        messagesAdapter.setLoadMoreListener(this);
//        messagesAdapter.registerViewClickListener(R.id.messageUserAvatar,
//                (view, message) -> AppUtils.showToast(DefaultMessagesActivity.this,
//                        message.getUser().getName() + " avatar click",
//                        false));
        this.messagesList.setAdapter(messagesAdapter);

        messagesAdapter.addToEnd(dialog.getMessages(), true);
    }

    @Override
    public void onStartTyping() {
//        Log.d("Typing listener", getString(R.string.start_typing_status));
    }

    @Override
    public void onStopTyping() {
//        Log.d("Typing listener", getString(R.string.stop_typing_status));
    }

    @Override
    public void onBackPressed() {
        if (selectionCount == 0) {
            super.onBackPressed();
        } else {
            messagesAdapter.unselectAllItems();
        }
    }


    protected void loadMessages() {
        //imitation of internet connection
//        new Handler().postDelayed(() -> {
//            ArrayList<ChatMessage> messages = MessagesFixtures.getMessages(lastLoadedDate);
//            lastLoadedDate = messages.get(messages.size() - 1).getCreatedAt();
//            messagesAdapter.addToEnd(messages, false);
//        }, 1000);
    }

    private MessagesListAdapter.Formatter<ChatMessage> getMessageStringFormatter() {
        return message -> {
            String createdAt = new SimpleDateFormat("MMM d, EEE 'at' h:mm a", Locale.getDefault())
                    .format(message.getCreatedAt());

            String text = message.getText();
            if (text == null) text = "[attachment]";

            return String.format(Locale.getDefault(), "%s: %s (%s)",
                    message.getUser().getName(), text, createdAt);
        };
    }

    @Override
    public void onLoadMore(int page, int totalItemsCount) {
        Log.i("TAG", "onLoadMore: " + page + " " + totalItemsCount);
        if (totalItemsCount < TOTAL_MESSAGES_COUNT) {
            loadMessages();
        }
    }

    @Override
    public void onSelectionChanged(int count) {
        this.selectionCount = count;
//        menu.findItem(R.id.action_delete).setVisible(count > 0);
//        menu.findItem(R.id.action_copy).setVisible(count > 0);
    }
}
