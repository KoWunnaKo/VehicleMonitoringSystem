import * as React from "react";
import { IconButton, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import {StylesDictionary} from "../../utils/stylesDictionary";
import Vehicle from "../../models/vehicle";
import Popup from "reactjs-popup";
import {PropertiesVehicleForm} from "./properties/propertiesVehicleForm";
import {useEffect, useState} from "react";
import * as VehicleApi from "../../api/vehicleApi";
import * as VehicleDriverLinkApi from "../../api/vehicleDriverLinkApi";
import Employee from "../../models/employee";


interface InterfaceProps {
    vehicle: Vehicle;
}

export const VehicleListItem: React.FunctionComponent<InterfaceProps> = (props) => {
    const { vehicle } = props;
    const [driver, setDriver] = useState<Employee|null>(null);


    useEffect(() => {
        (async function() {
            setDriver(await VehicleDriverLinkApi.getCurrentDriver(vehicle.id));
        })();
    }, []);

    return (
        <div style={styles.container}>
            <ListItem
                key={vehicle.id}
                button={true}
                style={styles.listItem}
            >
                <div>
                    {`${vehicle.name} ${vehicle.number}`}
                    {<br/>}
                    {`Driver: ${!!driver ? driver.getFullName() : 'none'}`}
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
                                    <PropertiesVehicleForm closeModal={close} vehicle={vehicle}/>
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
