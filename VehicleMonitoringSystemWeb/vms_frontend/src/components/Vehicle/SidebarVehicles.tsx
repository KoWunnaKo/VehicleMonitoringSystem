import * as React from "react";
import {useEffect, useState} from "react";
import {Button, List} from "@material-ui/core";
import {StylesDictionary} from "../../utils/StylesDictionary";
import * as VehicleApi from "../../api/VehicleApi";
import Colors from "../../constants/Colors";
import Popup from "reactjs-popup";
import Vehicle from "../../models/Vehicle";
import {VehicleListItem} from "./VehicleListItem";
import {CreateVehicleForm} from "./CreateVehicleForm";
import "../Employee/SidebarDrivers.css";


export const SidebarVehicles: React.FunctionComponent = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]|null>(null);

    useEffect(() => {
        (async function() {
            // TODO companyId number
            setVehicles(await VehicleApi.getAllVehicles(1));
        })();
    }, []);

    return (
        <div style={styles.container}>
            <h2>Vehicles</h2>
            <Popup
                trigger={<Button variant="contained" style={styles.addButton}>Create vehicle</Button>}
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
    }
};

