import * as React from "react";
import Employee from "../../models/employee";
import {IconButton, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import {StylesDictionary} from "../utils/stylesDictionary";
import SettingsIcon from "@material-ui/icons/Settings";
import Popup from "reactjs-popup";
import {PropertiesEmployeeForm} from "./properties/propertiesEmployeeForm";

interface InterfaceProps {
    employee: Employee;
    updateEmployees: () => void;
}

export const EmployeeListItem: React.FunctionComponent<InterfaceProps> = (props) => {
    const {employee} = props;

    return (
        <div style={styles.container}>
            <ListItem
                key={employee.id}
                button={true}
                // onPress={() => this.onLearnMore(driver)}
                style={styles.listItem}
            >
                {employee.getFullName()}

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
                                    <PropertiesEmployeeForm employee={employee} closeModal={close} updateDrivers={props.updateEmployees}/>
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
        flexDirection: 'column'
    },
    listItem: {
        height: 50,
        flex: 1
    }
};
