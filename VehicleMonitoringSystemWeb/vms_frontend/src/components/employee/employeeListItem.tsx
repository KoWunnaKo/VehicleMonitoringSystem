import * as React from "react";
import Employee from "../../models/employee";
import {IconButton, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {StylesDictionary} from "../../utils/stylesDictionary";
import * as EmployeeApi from "../../api/employeeApi";


interface InterfaceProps {
    employee: Employee;
}

export const EmployeeListItem: React.FunctionComponent<InterfaceProps> = (props) => {
    async function onDeleteClick() {
        if(props.employee.id) {
            await EmployeeApi.deleteEmployee(props.employee.id);
        }
    }

    return (
        <div style={styles.container}>
            <ListItem
                key={props.employee.id}
                button={true}
                // onPress={() => this.onLearnMore(driver)}
                style={styles.listItem}
            >
                {`${props.employee.firstName} ${props.employee.lastName}`}

                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={onDeleteClick}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
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
