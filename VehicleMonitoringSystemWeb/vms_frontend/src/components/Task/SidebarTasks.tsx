import * as React from "react";
import {useEffect, useState} from "react";
import {Button, List} from "@material-ui/core";
import {StylesDictionary} from "../../utils/StylesDictionary";
import * as TaskApi from "../../api/TaskApi";
import Colors from "../../constants/Colors";
import Popup from "reactjs-popup";
import "../Employee/SidebarDrivers.css";
import {CreateTaskForm} from "./CreateTaskForm";
import Task from "../../models/Task";
import {TaskListItem} from "./TaskListItem";


export const SidebarTasks: React.FunctionComponent = () => {
    const [tasks, setTasks] = useState<Task[]|null>(null);

    useEffect(() => {
        (async function() {
            // TODO companyId number
            setTasks(await TaskApi.getAllTasks(1));
        })();
    }, []);

    return (
        <div style={styles.container}>
            <h2>Tasks</h2>
            <Popup
                trigger={<Button variant="contained" style={styles.addButton}>Create task</Button>}
                modal={true}
                nested={true}
            >
                {(close: any) => {
                    return (
                        <div className="modal">
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div className="header">Create task</div>
                            <div className="content">
                                <CreateTaskForm closeModal={close}/>
                            </div>
                        </div>
                    )
                }}
            </Popup>

            <List style={{backgroundColor: Colors.white}}>
                {tasks && tasks.map((task) => (
                    <TaskListItem key={task.id} task={task}/>
                ))}
            </List>
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    addButton: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: Colors.primaryBlue
    }
};

