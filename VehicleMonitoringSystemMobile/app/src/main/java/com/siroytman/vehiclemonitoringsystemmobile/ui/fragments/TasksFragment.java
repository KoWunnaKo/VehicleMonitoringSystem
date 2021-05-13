package com.siroytman.vehiclemonitoringsystemmobile.ui.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.PopupMenu;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.appbar.MaterialToolbar;
import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.controller.TaskController;
import com.siroytman.vehiclemonitoringsystemmobile.model.Task;
import com.siroytman.vehiclemonitoringsystemmobile.model.TaskStatus;
import com.siroytman.vehiclemonitoringsystemmobile.ui.activity.TaskActivity;
import com.siroytman.vehiclemonitoringsystemmobile.ui.adapter.TaskListAdapter;

import java.util.ArrayList;
import java.util.HashMap;

public class TasksFragment extends Fragment implements TaskListAdapter.ItemClickListener {
    private static final String TAG = "TasksFragment";
    private View rootView;
    private TaskListAdapter adapter;
    private MaterialToolbar topAppBar;
    private PopupMenu popupMenu;

    ArrayList<Task> allTasks;

    private String filterTaskStatus = "All";

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        TaskController.getInstance().getAllTasks(this);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        rootView = inflater.inflate(R.layout.fragment_tasks, container, false);

        topAppBar = rootView.findViewById(R.id.tasks__topAppBar);

        createTaskStatusPopupMenu();

        topAppBar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                popupMenu.show(); //showing popup menu
            }
        });

        return rootView;
    }

    public void updateTasks(ArrayList<Task> tasks) {
        if (allTasks == null) {
            allTasks = tasks;
        }

        // set up the RecyclerView
        RecyclerView recyclerView = rootView.findViewById(R.id.task_RV);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        adapter = new TaskListAdapter(getContext(), tasks);
        adapter.setClickListener(this);
        recyclerView.setAdapter(adapter);
    }

    private ArrayList<Task> filterTasksByStatus() {
        HashMap<String, Integer> statusMap = TaskStatus.getStatusNameToIdMap();
        ArrayList<Task> filteredTasks = new ArrayList<>();
        for (Task task: allTasks) {
            if (filterTaskStatus.equals("All") || task.getStatusId() == statusMap.get(filterTaskStatus)) {
                filteredTasks.add(task);
            }
        }

        return filteredTasks;
    }

    private void createTaskStatusPopupMenu() {
        //Creating the instance of PopupMenu
        popupMenu = new PopupMenu(getContext(), topAppBar);
        //Inflating the Popup using xml file
        popupMenu.getMenuInflater()
                .inflate(R.menu.task_status_menu, popupMenu.getMenu());

        //registering popup with OnMenuItemClickListener
        popupMenu.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
            public boolean onMenuItemClick(MenuItem item) {
                filterTaskStatus = item.getTitle().toString();
                topAppBar.setTitle("Tasks: " + filterTaskStatus);

                ArrayList<Task> filteredTasks = filterTasksByStatus();
                updateTasks(filteredTasks);

                return true;
            }
        });
    }

    @Override
    public void onItemClick(View view, int position) {
        Intent intent = new Intent(getActivity(), TaskActivity.class);
        intent.putExtra(Task.class.getSimpleName(), adapter.getItem(position));
        getActivity().startActivity(intent);
    }
}