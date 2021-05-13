package com.siroytman.vehiclemonitoringsystemmobile.controller;

import android.util.Log;

import com.android.volley.Request;
import com.android.volley.VolleyError;
import com.siroytman.vehiclemonitoringsystemmobile.api.ApiController;
import com.siroytman.vehiclemonitoringsystemmobile.api.VolleyCallbackJSONArray;
import com.siroytman.vehiclemonitoringsystemmobile.api.VolleyCallbackJSONObject;
import com.siroytman.vehiclemonitoringsystemmobile.model.Employee;
import com.siroytman.vehiclemonitoringsystemmobile.model.Task;
import com.siroytman.vehiclemonitoringsystemmobile.model.TaskComment;
import com.siroytman.vehiclemonitoringsystemmobile.ui.activity.TaskActivity;
import com.siroytman.vehiclemonitoringsystemmobile.ui.fragments.TasksFragment;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;


public class TaskController {
    private static final String TAG = "TaskController";
    private final ApiController apiController;

    private static TaskController instance;

    private TaskController() {
        apiController = ApiController.getInstance();
    }

    public static synchronized TaskController getInstance() {
        if (instance == null) {
            instance = new TaskController();
        }
        return instance;
    }

    public void getAllTasks(TasksFragment tasksFragment) {
        Employee user = AppController.getInstance().getDbUser();
        int companyId = user.getCompanyId();
        String driverId = user.getId();

        ApiController.getInstance()
                .getJSONArrayResponse(Request.Method.GET,
                        ApiController.BACKEND_URL,
                        "task/getAllForDriver/" + companyId + "/" + driverId,
                        null,
                        new VolleyCallbackJSONArray() {
                            @Override
                            public void onSuccessResponse(JSONArray result) {
                                ArrayList<Task> tasks = Task.parseTaskArray(result);
                                tasksFragment.updateTasks(tasks);
                            }

                            @Override
                            public void onErrorResponse(VolleyError error) {
                                Log.e(TAG, "Tasks not fetched: " + error.getMessage());
                            }
                        });
    }

    public void updateTaskStatus(Task task) {
        apiController.getJSONObjectResponse(Request.Method.PUT,
                ApiController.BACKEND_URL,
                "task/updateStatus/" + task.getId() + "/" + task.getStatusId(),
                null,
                new VolleyCallbackJSONObject() {
                    @Override
                    public void onSuccessResponse(JSONObject result) {
                    }

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d(TAG, "Volley error = " + error.toString());
                    }
                });
    }

    // TODO mb use Interfaces in controllers and not activity?
    public void getAllTaskComments(int taskId, TaskActivity taskActivity) {
        int companyId = AppController.getInstance().getDbUser().getCompanyId();

        ApiController.getInstance()
                .getJSONArrayResponse(Request.Method.GET,
                        ApiController.BACKEND_URL,
                        "taskComment/getAllForTask/" + companyId + "/" + taskId,
                        null,
                        new VolleyCallbackJSONArray() {
                            @Override
                            public void onSuccessResponse(JSONArray result) {
                                ArrayList<TaskComment> taskComments = TaskComment.parseTaskCommentsArray(result);
                                taskActivity.updateTaskComments(taskComments);
                            }

                            @Override
                            public void onErrorResponse(VolleyError error) {
                                Log.e(TAG, "Task comments not fetched: " + error.getMessage());
                            }
                        });
    }

    public void createTaskComment(TaskComment taskComment, TaskActivity taskActivity) {
        apiController.getJSONObjectResponse(Request.Method.POST,
                ApiController.BACKEND_URL,
                "taskComment",
                taskComment.toJSONObject(),
                new VolleyCallbackJSONObject() {
                    @Override
                    public void onSuccessResponse(JSONObject result) {
                        TaskComment comment = TaskComment.parseTaskComment(result);
                        taskActivity.addNewTaskComment(comment);
                    }

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d(TAG, "Volley error = " + error.toString());
                    }
                });
    }
}
