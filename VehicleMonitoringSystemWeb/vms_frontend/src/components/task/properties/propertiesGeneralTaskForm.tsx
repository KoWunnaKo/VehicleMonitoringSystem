import * as React from "react";
import * as TaskApi from "../../../api/taskApi";
import {Button, FormControl, FormHelperText, IconButton, MenuItem, TextField} from '@material-ui/core';
import {StylesDictionary} from "../../utils/stylesDictionary";
import {useEffect, useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Task from "../../../models/task";
import Employee from "../../../models/employee";
import moment from "moment";
import Select from "@material-ui/core/Select/Select";
import * as EmployeeApi from "../../../api/employeeApi";

interface InterfaceProps {
    closeModal: () => void;
    updateTasks: () => void;
    task: Task;
}

export const PropertiesGeneralTaskFormName = 'General';

export const PropertiesGeneralTaskForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const {task} = props;
    const [name, setName] = useState<string|undefined>(task.name);
    const [description, setDescription] = useState<string|undefined>(task.description);
    const [comment, setComment] = useState<string|undefined>(task.comment);
    const [dueDatetime, setDueDatetime] = useState<Date|undefined>(task.dueDate);
    const [drivers, setDrivers] = useState<Employee[]|null>(null);
    const [selectedDriver, setSelectedDriver] = useState<string|undefined>(task.driverId);

    useEffect(() => {
        (async function() {
            setDrivers(await EmployeeApi.getAllDrivers());
        })();
    }, []);

    function isSaveButtonDisabled() {
        return name === task.name
            && description === task.description
            && comment === task.comment
            && dueDatetime === task.dueDate
            && selectedDriver === task.driverId;
    }

    async function editTask() {
        const newTask = task;
        newTask.name = name;
        newTask.description = description;
        newTask.comment = comment;
        newTask.dueDate = dueDatetime;
        newTask.driverId = selectedDriver;

        await TaskApi.editTask(newTask);
        props.closeModal();
        props.updateTasks();
    }

    async function deleteTask() {
        await TaskApi.deleteTask(task.id);
        props.closeModal();
        props.updateTasks();
    }

    return (
        <div style={styles.container}>
            <IconButton onClick={deleteTask} style={styles.deleteIcon}>
                <DeleteIcon />
            </IconButton>

            <TextField
                value={name}
                onChange={event => setName(event.target.value)}
                type="text"
                placeholder="Name"
                style={styles.textInput}
            />
            <TextField
                value={description}
                onChange={event => setDescription(event.target.value)}
                type="text"
                placeholder="Description"
                style={styles.textInput}
            />
            <TextField
                value={comment}
                onChange={event => setComment(event.target.value)}
                type="text"
                placeholder="Comment"
                style={styles.textInput}
            />

            <TextField
                label="Due datetime"
                type="datetime-local"
                style={styles.textInput}
                // value={dueDatetime}
                onChange={event => setDueDatetime(moment(event.target.value, 'DD.MM.YY HH:mm').toDate())}
                InputLabelProps={{shrink: true}}
            />

            <FormControl>
                <Select
                    value={selectedDriver}
                    onChange={event => setSelectedDriver(event.target.value)}
                    style={styles.select}
                >
                    {drivers && drivers.map((d: Employee) => (
                        <MenuItem key={d.id} value={d.id}>
                            {d.getFullName()}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText style={styles.textInput}>Driver</FormHelperText>
            </FormControl>

            <Button
                disabled={isSaveButtonDisabled()}
                onClick={editTask}
                variant='contained' type='submit' color='primary' style={styles.button}>
                Save
            </Button>
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: 20,
        flex: 1,
    },
    textInput: {
        width: 200,
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'center'
    },
    select: {
        width: 200,
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'center'
    },
    button: {
        width: 200,
        marginTop: 20,
        alignSelf: 'center',
    },
    deleteIcon: {
        alignSelf: 'flex-end'
    }
};
