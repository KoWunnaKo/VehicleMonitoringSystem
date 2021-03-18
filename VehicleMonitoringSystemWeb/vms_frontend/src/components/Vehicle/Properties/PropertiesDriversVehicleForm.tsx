import * as React from "react";
import {Button, FormControl, InputLabel, Select} from '@material-ui/core';
import {StylesDictionary} from "../../../utils/StylesDictionary";
import Vehicle from "../../../models/Vehicle";
import {useEffect, useState} from "react";
import * as EmployeeApi from "../../../api/EmployeeApi";
import Employee from "../../../models/Employee";
import VehicleDriverLink from "../../../models/VehicleDriverLink";
import * as VehicleDriverLinkApi from "../../../api/VehicleDriverLinkApi";


interface InterfaceProps {
    vehicle: Vehicle;
}

export const PropertiesDriversVehicleFormName = 'Drivers';


export const PropertiesDriversVehicleForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const {vehicle} = props;
    const [drivers, setDrivers] = useState<Employee[]|null>(null);
    const [selectedDriver, setSelectedDriver] = useState<number|null>(null);

    useEffect(() => {
        (async function() {
            // TODO companyId number
            const varDrivers = await EmployeeApi.getAllDrivers(1);
            setDrivers(varDrivers);
            const varDriver = await VehicleDriverLinkApi.getCurrentDriver(vehicle.id);
            if (varDriver && varDrivers) {
                const selectedDriverPos = varDrivers.findIndex(e => e.id === varDriver.id);
                setSelectedDriver(selectedDriverPos);
            }
        })();
    }, []);

    async function saveDriverLink() {
        if (!!drivers && !!selectedDriver) {
            const vehicleDriverLink = new VehicleDriverLink(drivers[selectedDriver].id, vehicle.id);
            await VehicleDriverLinkApi.createVehicleDriverLink(vehicleDriverLink);
        }
    }

    return (
        <div style={styles.container}>
            <FormControl style={styles.formControl}>
                <Select
                    color={"secondary"}
                    value={selectedDriver}
                    onChange={event => setSelectedDriver(event.target.value)}
                >
                    {drivers && drivers.map((d: Employee, index) => (
                        <option value={index}>{d.getFullName()}</option>
                    ))}
                </Select>
            </FormControl>

            <Button onClick={saveDriverLink} variant='contained' type='submit' color='primary' style={styles.button}>
                Save
            </Button>
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20
    },
    button: {
        width: 200,
        marginTop: 20,
        alignSelf: 'center'
    },
    formControl: {
        minWidth: 200,
        maxWidth: 300,
        alignSelf: 'center'
    },
};
