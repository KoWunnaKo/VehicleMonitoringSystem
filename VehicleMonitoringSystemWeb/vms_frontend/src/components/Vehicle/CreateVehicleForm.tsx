import * as React from "react";
import * as VehicleApi from "../../api/VehicleApi";
import {Button, TextField} from '@material-ui/core';
import Colors from "../../constants/Colors";
import {StylesDictionary} from "../../utils/StylesDictionary";
import Vehicle from "../../models/Vehicle";
import {useState} from "react";

interface InterfaceProps {
  closeModal: () => void;
}

export const CreateVehicleForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const [error, setError] = useState<any>(null);
    const [name, setName] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [productionYear, setProductionYear] = useState<string>('');

    async function onSubmit(event: any) {
        event.preventDefault();
        await VehicleApi.createVehicle(new Vehicle(1, name, number, model, +productionYear))

        props.closeModal();
    }

    function isCreateButtonDisabled() {
        return number === "" ||
            name === "" ||
            model === "" ||
            productionYear === "";
    }

    return (
      <form onSubmit={(event) => onSubmit(event)} style={styles.container}>
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
        {/*TODO select form*/}
        <TextField
            value={productionYear}
            onChange={event => setProductionYear(event.target.value)}
            type="number"
            placeholder="Production year"
            style={styles.textInput}
        />

        <Button disabled={isCreateButtonDisabled()} variant='contained' type='submit' color='primary' style={styles.button}>
            Create
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20
    },
    textInput: {
        width: 200,
        marginTop: 5,
        marginBottom: 5,
    },
    button: {
        width: 200,
        marginTop: 20
    },
    buttonText: {
        color: Colors.white,
        alignContent: 'center'
    },
    formControl: {
        minWidth: 120,
        maxWidth: 300
    },
};
