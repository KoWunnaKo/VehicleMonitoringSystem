import * as React from "react";
import {useEffect, useState} from "react";
import {Button, List, Tooltip} from "@material-ui/core";
import {StylesDictionary} from "../utils/stylesDictionary";
import * as VehicleApi from "../../api/vehicleApi";
import Popup from "reactjs-popup";
import Vehicle from "../../models/vehicle";
import {VehicleListItem} from "./vehicleListItem";
import {CreateVehicleForm} from "./createVehicleForm";
import "../../styles/sidebarDrivers.scss";
import 'react-minimal-datetime-range/lib/react-minimal-datetime-range.min.css';
import Employee from "../../models/employee";
import {getDbUser, getRoleRestrictionTooltip, isUserOperator} from "../../utils/userUtil";

export const SidebarVehicles: React.FunctionComponent = () => {
    const [dbUser, setDbUser] = useState<Employee|null>();
    const [vehicles, setVehicles] = useState<Vehicle[]|null>(null);

    useEffect(() => {
        (async function() {
            await setDbUser(await getDbUser());
            await updateVehicles();
        })();
    }, []);

    const updateVehicles = async () => {
        // TODO driver links not updates, cause drivers are fetching separetly - need to think it through
        setVehicles(await VehicleApi.getAllVehicles());
    }

    return (
        <div style={styles.container}>
            <h2>Vehicles</h2>
            <Popup
                trigger={
                    <div style={styles.flexible}>
                        <Tooltip title={getRoleRestrictionTooltip(dbUser)}>
                            <div style={styles.flexible}>
                                <Button variant="contained" color='primary' style={styles.addButton} disabled={isUserOperator(dbUser)} >
                                    Create vehicle
                                </Button>
                            </div>
                        </Tooltip>
                    </div>
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
                            <div className="header">Create vehicle</div>
                            <div className="content">
                                <CreateVehicleForm closeModal={close} updateVehicles={updateVehicles}/>
                            </div>
                        </div>
                    )
                }}
            </Popup>

            <List>
                {vehicles && vehicles.map((vehicle) => (
                    <VehicleListItem key={vehicle.id} vehicle={vehicle} updateVehicles={updateVehicles}/>
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
        marginBottom: 10
    },
    timeRangePicker: {
        width: '300px',
        margin: '0 auto'
    },
    flexible: {
        flex: 1,
        display: 'flex'
    }
};

