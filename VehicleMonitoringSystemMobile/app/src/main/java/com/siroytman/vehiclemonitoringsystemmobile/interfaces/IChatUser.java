package com.siroytman.vehiclemonitoringsystemmobile.interfaces;

import com.stfalcon.chatkit.commons.models.IUser;

import java.util.List;

/**
 * For implementing by real user model
 */
public interface IChatUser {

    /**
     * Returns the user's id
     *
     * @return the user's id
     */
    String getId();

    /**
     * Returns the user's name
     *
     * @return the user's name
     */
    String getName();

    /**
     * Returns the user's avatar image url
     *
     * @return the user's avatar image url
     */
    String getAvatar();
}
