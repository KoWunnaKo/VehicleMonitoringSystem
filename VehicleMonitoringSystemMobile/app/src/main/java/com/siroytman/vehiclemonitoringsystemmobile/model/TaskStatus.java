package com.siroytman.vehiclemonitoringsystemmobile.model;

import java.util.ArrayList;
import java.util.HashMap;

public class TaskStatus {
    public int id;
    public String name;

    TaskStatus(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public static HashMap<String, Integer> getStatusNameToIdMap() {
        HashMap<String, Integer> statusMap = new HashMap<>();
        statusMap.put("Created", 1);
        statusMap.put("In progress", 2);
        statusMap.put("Resolved", 3);
        statusMap.put("Closed", 4);

        return statusMap;
    }

    public static HashMap<Integer, String> getStatusIdToNameMap() {
        HashMap<Integer, String> statusMap = new HashMap<>();
        statusMap.put(1, "Created");
        statusMap.put(2, "In progress");
        statusMap.put(3, "Resolved");
        statusMap.put(4, "Closed");

        return statusMap;
    }
}
