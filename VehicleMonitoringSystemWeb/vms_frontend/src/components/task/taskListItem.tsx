import * as React from "react";
import { IconButton, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import {StylesDictionary} from "../utils/stylesDictionary";
import Popup from "reactjs-popup";
import Task from "../../models/task";
import {PropertiesTaskForm} from "./properties/propertiesTaskForm";
import Colors from "../../constants/colors";

interface InterfaceProps {
    updateTasks: () => void;
    task: Task;
}

export const TaskListItem: React.FunctionComponent<InterfaceProps> = (props) => {
    const { task } = props;

    return (
        <div style={styles.container}>
            <ListItem
                key={task.id}
                button={true}
                style={styles.listItem}
            >
                <div>
                    {`${task.id}. ${task.name}`}
                    {<br/>}
                    {`Driver: ${!!task.driver ? task.driver.getFullName() : 'none'}`}
                </div>
                <Popup
                    trigger={
                        <ListItemSecondaryAction>
                            <IconButton edge="end">
                                <SettingsIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    }
                    modal={true}
                    nested={true}
                >
                    {(close: any) => {

                        return (
                            <div className="modal">
                                <button className="close" onClick={close}>
                                    &times;
                                </button>
                                <div>
                                    <PropertiesTaskForm closeModal={close} updateTasks={props.updateTasks} task={task}/>
                                </div>
                            </div>
                        )
                    }}
                </Popup>

            </ListItem>
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 4,
        backgroundColor: Colors.modalBackground
    },
    listItem: {
        height: 50,
        flex: 1,
    }
};
