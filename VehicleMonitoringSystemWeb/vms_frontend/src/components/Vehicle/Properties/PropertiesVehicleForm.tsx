import * as React from "react";
import {StylesDictionary} from "../../../utils/StylesDictionary";
import {useState} from "react";
import {PropertiesGeneralVehicleForm, PropertiesGeneralVehicleFormName} from "./PropertiesGeneralVehicleForm";
import {PropertiesDriversVehicleForm, PropertiesDriversVehicleFormName} from "./PropertiesDriversVehicleForm";
import Vehicle from "../../../models/Vehicle";

interface InterfaceProps {
  closeModal: () => void;
  vehicle: Vehicle;
}

export const PropertiesVehicleForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const navigationStyles = require('../../Navigation.css')
    const [contentComponentName, setContentComponentName] = useState<string>(PropertiesGeneralVehicleFormName);

    function renderContent() {
        switch (contentComponentName) {
            case PropertiesGeneralVehicleFormName:
                return <PropertiesGeneralVehicleForm closeModal={props.closeModal} vehicle={props.vehicle}/>
            case PropertiesDriversVehicleFormName:
                return <PropertiesDriversVehicleForm vehicle={props.vehicle}/>
            default:
                return null;
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.topNavBar}>
                <ul className={navigationStyles.ul}>
                    <li>
                        <a onClick={() => setContentComponentName(PropertiesGeneralVehicleFormName)}>{PropertiesGeneralVehicleFormName}</a>
                    </li>
                    <li>
                        <a onClick={() => setContentComponentName(PropertiesDriversVehicleFormName)}>{PropertiesDriversVehicleFormName}</a>
                    </li>
                </ul>
            </div>
            <div style={styles.content}>
                {renderContent()}
            </div>
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: 400,
        height: 350
    },
    topNavBar: {
        flexDirection: 'row',
    },
    content: {
        flexDirection: 'column'
    },
};
