import * as React from "react";
import { IconButton, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import {StylesDictionary} from "../../utils/StylesDictionary";
import Vehicle from "../../models/Vehicle";
import Popup from "reactjs-popup";
import {useEffect, useState} from "react";
import * as VehicleDriverLinkApi from "../../api/VehicleDriverLinkApi";
import Employee from "../../models/Employee";
import Task from "../../models/Task";


interface InterfaceProps {
    task: Task;
}

export const TaskListItem: React.FunctionComponent<InterfaceProps> = (props) => {
    const { task } = props;
    const [driver, setDriver] = useState<Employee|null>(null);


    useEffect(() => {
        (async function() {
            // setDriver(await VehicleDriverLinkApi.getCurrentDriver(vehicle.id));
        })();
    }, []);

    return (
        <div style={styles.container}>
            <ListItem
                key={task.id}
                button={true}
                style={styles.listItem}
            >
                <text>{`${task.id} ${task.name}`}</text>
                {/*<text>{`Driver: ${!!driver ? driver.getFullName() : 'none'}`}</text>*/}
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
                                    {/*<PropertiesVehicleForm closeModal={close} vehicle={vehicle}/>*/}
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
