import * as React from "react";
import * as VehicleApi from "../../../api/VehicleApi";
import {Button, IconButton, TextField} from '@material-ui/core';
import {StylesDictionary} from "../../../utils/StylesDictionary";
import Vehicle from "../../../models/Vehicle";
import {useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";

interface InterfaceProps {
    closeModal: () => void;
    vehicle: Vehicle;
}

export const PropertiesGeneralVehicleFormName = 'General';

export const PropertiesGeneralVehicleForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const {vehicle} = props;
    const [name, setName] = useState<string|undefined>(vehicle.name);
    const [number, setNumber] = useState<string|undefined>(vehicle.number);
    const [model, setModel] = useState<string|undefined>(vehicle.model);
    const [productionYear, setProductionYear] = useState<number|undefined>(vehicle.productionYear);

    function isSaveButtonDisabled() {
        return name === vehicle.name
            && number === vehicle.number
            && model === vehicle.model
            && productionYear === vehicle.productionYear;
    }

    async function editVehicle() {
        const newVehicle =
            await VehicleApi.editVehicle(new Vehicle(vehicle.companyId, name, number, model, productionYear, vehicle));
    }

    async function deleteVehicle() {
        await VehicleApi.deleteVehicle(vehicle.id);
        props.closeModal();
    }

    return (
        <div style={styles.container}>
            <IconButton onClick={deleteVehicle} style={styles.deleteIcon}>
                <DeleteIcon />
            </IconButton>

            <TextField
                value={name}
                onChange={event => setName(event.target.value)}
                type="text"
                placeholder="Name"
                style={styles.textInput}
            />
            <TextField
                value={number}
                onChange={event => setNumber(event.target.value)}
                type="text"
                placeholder="Number"
                style={styles.textInput}
            />
            <TextField
                value={model}
                onChange={event => setModel(event.target.value)}
                type="text"
                placeholder="Model"
                style={styles.textInput}
            />
            <TextField
                value={productionYear}
                onChange={event => setProductionYear(+event.target.value)}
                type="number"
                placeholder="Production year"
                style={styles.textInput}
            />

            <Button
                disabled={isSaveButtonDisabled()}
                onClick={editVehicle}
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
    button: {
        width: 200,
        marginTop: 20,
        alignSelf: 'center',
    },
    deleteIcon: {
        alignSelf: 'flex-end'
    }
};
