import * as React from "react";
import { IconButton, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import {StylesDictionary} from "../../utils/StylesDictionary";
import Popup from "reactjs-popup";
import {useEffect, useState} from "react";
import Employee from "../../models/Employee";
import Task from "../../models/Task";
import {PropertiesTaskForm} from "./Properties/PropertiesTaskForm";


interface InterfaceProps {
    status: string;
    onClick: (status: string) => void;
}

export const TaskStatusListItem: React.FunctionComponent<InterfaceProps> = (props) => {
    const { status } = props;


    // useEffect(() => {
    //     (async function() {
    //     })();
    // }, []);

    return (
        <div style={styles.container}>
            <ListItem
                key={status}
                button={true}
                style={styles.listItem}
                onClick={() => props.onClick(status)}
            >
                <div>{status}</div>
            </ListItem>
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    listItem: {
        height: 50,
        flex: 1
    }
};
