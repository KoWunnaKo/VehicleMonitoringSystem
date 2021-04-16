package com.siroytman.vehiclemonitoringsystemmobile.util;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentManager;

public class FragmentUtil {
    // Replace fragment in activity
    public static void replaceFragment(FragmentActivity activity, int container, Fragment f){
        activity.getSupportFragmentManager().beginTransaction().replace(container, f).commit();
    }

    // Replace fragment in fragment
    public static void replaceFragment(Fragment fragment, int container, Fragment f){
        fragment.getChildFragmentManager().beginTransaction().replace(container, f).commit();
    }

    // Replace fragment
    public static void replaceFragment(FragmentManager fragmentManager, int container, Fragment f){
        fragmentManager.beginTransaction().replace(container, f).commit();
    }

    public static void clearFragment(Fragment parentFragment) {
        FragmentManager fragmentManager = parentFragment.getChildFragmentManager();
        for (Fragment frag : fragmentManager.getFragments()) {
            fragmentManager.beginTransaction().remove(frag).commit();
        }
    }

}
