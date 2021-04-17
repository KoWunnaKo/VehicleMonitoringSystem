import * as React from "react";
import {useEffect, useState} from "react";
import {Button, List} from "@material-ui/core";
import {StylesDictionary} from "../../utils/stylesDictionary";
import * as VehicleApi from "../../api/vehicleApi";
import Colors from "../../constants/colors";
import Popup from "reactjs-popup";
import Vehicle from "../../models/vehicle";
import {VehicleListItem} from "./vehicleListItem";
import {CreateVehicleForm} from "./createVehicleForm";
import "../../styles/sidebarDrivers.scss";
import 'react-minimal-datetime-range/lib/react-minimal-datetime-range.min.css';

export const SidebarVehicles: React.FunctionComponent = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]|null>(null);

    useEffect(() => {
        (async function() {
            setVehicles(await VehicleApi.getAllVehicles());
        })();
    }, []);


    return (
        <div style={styles.container}>
            <h2>Vehicles</h2>
            <Popup
                trigger={<Button variant="contained" color='primary' style={styles.addButton}>Create vehicle</Button>}
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
                                <CreateVehicleForm closeModal={close}/>
                            </div>
                        </div>
                    )
                }}
            </Popup>

            <List style={{backgroundColor: Colors.white}}>
                {vehicles && vehicles.map((vehicle) => (
                    <VehicleListItem key={vehicle.id} vehicle={vehicle}/>
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
        marginBottom: 10,
        backgroundColor: Colors.primaryBlue
    },
    timeRangePicker: {
        width: '300px',
        margin: '0 auto'
    }
};

