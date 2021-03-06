import * as React from "react";
import { IconButton, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import {StylesDictionary} from "../utils/stylesDictionary";
import Vehicle from "../../models/vehicle";
import Popup from "reactjs-popup";
import {PropertiesVehicleForm} from "./properties/propertiesVehicleForm";
import {useEffect, useState} from "react";
import * as VehicleApi from "../../api/vehicleApi";
import * as VehicleDriverLinkApi from "../../api/vehicleDriverLinkApi";
import Employee from "../../models/employee";
import Colors from "../../constants/colors";


interface InterfaceProps {
    vehicle: Vehicle;
    updateVehicles: () => void;
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
                    {vehicle.getFormattedName()}
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
                                    <PropertiesVehicleForm vehicle={vehicle} closeModal={close} updateVehicles={props.updateVehicles}/>
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
        flex: 1
    }
};
