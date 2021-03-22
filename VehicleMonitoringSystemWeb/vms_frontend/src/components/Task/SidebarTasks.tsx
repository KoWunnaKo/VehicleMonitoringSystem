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
import {TaskStatusListItem} from "./TaskStatusListItem";
import Collapsible from 'react-collapsible';



export const SidebarTasks: React.FunctionComponent = () => {
    const [tasks, setTasks] = useState<Task[]|null>(null);
    const [statuses, setStatuses] = useState<string[]|null>(['Created', 'In progress', 'Resolved']);

    useEffect(() => {
        (async function() {
            await updateTasks();
        })();
    }, []);

    async function updateTasks() {
        // TODO companyId number
        const resTasks = await TaskApi.getAllTasks(1);
        setTasks(resTasks);
        console.log(`updateTask: ${JSON.stringify(resTasks)}`);
    }

    // function onStatusClick(status: string) {
    //
    // }

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
                                <CreateTaskForm updateTasks={updateTasks} closeModal={close}/>
                            </div>
                        </div>
                    )
                }}
            </Popup>

            {/*TODO combine and get statuses as array*/}
            <Collapsible trigger="Created" style={styles.taskStatus}>
                <List style={{backgroundColor: Colors.white}}>
                    {tasks && tasks
                        .filter((task) => task.statusId === 1)
                        .map((task) => (<TaskListItem key={task.id} task={task}/>))
                    }
                </List>
            </Collapsible>

            <Collapsible trigger="In progress" style={styles.taskStatus}>
                <List style={{backgroundColor: Colors.white}}>
                    {tasks && tasks
                        .filter((task) => task.statusId === 2)
                        .map((task) => (<TaskListItem key={task.id} task={task}/>))
                    }
                </List>
            </Collapsible>

            <Collapsible trigger="Resolved" style={styles.taskStatus}>
                <List style={{backgroundColor: Colors.white}}>
                    {tasks && tasks
                        .filter((task) => task.statusId === 3)
                        .map((task) => (<TaskListItem key={task.id} task={task}/>))
                    }
                </List>
            </Collapsible>
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
    },
    taskStatus: {
        alignSelf: 'center',
        backgroundColor: Colors.grey
    }
};

