import * as React from "react";
import {Button, TextField} from '@material-ui/core';
import Colors from "../../constants/Colors";
import {StylesDictionary} from "../../utils/StylesDictionary";
import {useState} from "react";
import Task from "../../models/Task";
import * as TaskApi from "../../api/TaskApi";


interface InterfaceProps {
  closeModal: () => void;
}

export const CreateTaskForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const [error, setError] = useState<any>(null);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [comment, setComment] = useState<string>('');

    async function onSubmit(event: any) {
        event.preventDefault();
        const task = new Task(1, undefined, undefined, undefined,
            undefined, name, description, undefined, comment);
        await TaskApi.createTask(task)

        props.closeModal();
    }

    function isCreateButtonDisabled() {
        return description === "" ||
            name === "" ||
            comment === "";
    }

    return (
      <form onSubmit={(event) => onSubmit(event)} style={styles.container}>
        {/* TODO date picker*/}
        {/*<TextField*/}
        {/*    value={name}*/}
        {/*    onChange={event => setName(event.target.value)}*/}
        {/*    type="text"*/}
        {/*    placeholder="Due date"*/}
        {/*    style={styles.textInput}*/}
        {/*/>*/}
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

        <Button disabled={isCreateButtonDisabled()} variant='contained' type='submit' color='primary' style={styles.button}>
            Create
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20
    },
    textInput: {
        width: 200,
        marginTop: 5,
        marginBottom: 5,
    },
    button: {
        width: 200,
        marginTop: 20
    },
    buttonText: {
        color: Colors.white,
        alignContent: 'center'
    },
    formControl: {
        minWidth: 120,
        maxWidth: 300
    },
};
