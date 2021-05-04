import * as React from "react";
import * as TaskApi from "../../../api/taskApi";
import {Button, FormControl, FormHelperText, IconButton, MenuItem, TextField} from '@material-ui/core';
import {StylesDictionary} from "../../../utils/stylesDictionary";
import {useEffect, useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Task from "../../../models/task";
import Employee from "../../../models/employee";
import moment from "moment";
import Select from "@material-ui/core/Select/Select";
import * as EmployeeApi from "../../../api/employeeApi";
import Colors from "../../../constants/colors";
import {deleteTask} from "../../../api/taskApi";
import {getDbUserCompanyId} from "../../../utils/userUtil";

interface InterfaceProps {
    employee: Employee;
    closeModal: () => void;
    updateDrivers: () => void;
}

export const PropertiesGeneralEmployeeFormName = 'General';

export const PropertiesGeneralEmployeeForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const {employee} = props;
    const [firstName, setFirstName] = useState<string>(employee.firstName);
    const [lastName, setLastName] = useState<string>(employee.lastName);
    const [email, setEmail] = useState<string>(employee.email);

    useEffect(() => {
        (async function() {
            // setDrivers(await EmployeeApi.getAllDrivers());
        })();
    }, []);

    function isSaveButtonDisabled() {
        return firstName === employee.firstName
            && lastName === employee.lastName
            && email === employee.email;
    }

    async function editEmployee() {
        const companyId = await getDbUserCompanyId();
        if (companyId) {
            const newEmployee = new Employee(employee.id,
                employee.roleId, companyId, firstName, lastName,
                email, undefined, employee.password);
            await EmployeeApi.editEmployee(newEmployee);

            props.closeModal();
            props.updateDrivers();
        }
    }

    async function deleteEmployee() {
        await EmployeeApi.deleteEmployee(employee.id);
        props.closeModal();
        props.updateDrivers();
    }

    return (
        <div style={styles.container}>
            <IconButton style={styles.deleteIcon}>
                <DeleteIcon onClick={deleteEmployee}/>
            </IconButton>

            <TextField
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
                type="text"
                placeholder="First name"
                label="First name"
                style={styles.textInput}
            />

            <TextField
                value={lastName}
                onChange={event => setLastName(event.target.value)}
                type="text"
                placeholder="Last name"
                label="Last name"
                style={styles.textInput}
            />

            <TextField
                value={email}
                onChange={event => setEmail(event.target.value)}
                type="text"
                placeholder="Email"
                label="Email"
                style={styles.textInput}
            />

            <Button
                disabled={isSaveButtonDisabled()}
                onClick={editEmployee}
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
