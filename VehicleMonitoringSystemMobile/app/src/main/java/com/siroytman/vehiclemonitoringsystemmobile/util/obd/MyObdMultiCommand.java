package com.siroytman.vehiclemonitoringsystemmobile.util.obd;

import android.util.Log;

import com.github.pires.obd.commands.ObdCommand;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;

/**
 * Container implementation for multiple {@link com.github.pires.obd.commands.ObdMultiCommand} instances.
 */
public class MyObdMultiCommand {
    public static final String TAG = "MyObdMultiCommand";

    private ArrayList<ObdCommand> commands;

    public MyObdMultiCommand(ArrayList<ObdCommand> commands) {
        this.commands = commands;
    }

    /**
     * Iterate all commands, send them and read response.
     *
     * @param in  a {@link java.io.InputStream} object.
     * @param out a {@link java.io.OutputStream} object.
     * @throws java.io.IOException            if any.
     * @throws java.lang.InterruptedException if any.
     */
    public void sendCommands(InputStream in, OutputStream out)
            throws IOException, InterruptedException {
        Log.d(TAG, "sendCommands");

        for (ObdCommand command : commands)
            command.run(in, out);
    }

    /**
     * Return collection of calculated results
     *
     * @return a {@link java.lang.String} object.
     */
    public ArrayList<String> getCalculatedResults() {
        Log.d(TAG, "getCalculatedResults");
        ArrayList<String> res = new ArrayList<>(commands.size());
        for (ObdCommand command : commands) {
            res.add(command.getCalculatedResult());
        }

        return res;
    }
}