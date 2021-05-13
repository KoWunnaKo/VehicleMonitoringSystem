package com.siroytman.vehiclemonitoringsystemmobile.util;

import java.sql.Timestamp;
import java.util.Date;

public class DateUtil {
    public static Date getDateFromString(String dateString) {
        return Timestamp.valueOf(dateString.replace("T", " ").split("\\+")[0]);
    }
}
