import * as React from "react";
import {StylesDictionary} from "../../utils/stylesDictionary";
import {useState} from "react";
import {PropertiesGeneralVehicleForm, PropertiesGeneralVehicleFormName} from "./propertiesGeneralVehicleForm";
import {PropertiesDriversVehicleForm, PropertiesDriversVehicleFormName} from "./propertiesDriversVehicleForm";
import Vehicle from "../../../models/vehicle";
import "../../../styles/navigation.scss";

interface InterfaceProps {
  vehicle: Vehicle;
  closeModal: () => void;
  updateVehicles: () => void;
}

export const PropertiesVehicleForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const [contentComponentName, setContentComponentName] = useState<string>(PropertiesGeneralVehicleFormName);

    function renderContent() {
        switch (contentComponentName) {
            case PropertiesGeneralVehicleFormName:
                return <PropertiesGeneralVehicleForm vehicle={props.vehicle} closeModal={props.closeModal} updateVehicles={props.updateVehicles}/>
            case PropertiesDriversVehicleFormName:
                return <PropertiesDriversVehicleForm vehicle={props.vehicle} closeModal={props.closeModal} updateVehicles={props.updateVehicles}/>
            default:
                return null;
        }
    }

    return (
        <div style={styles.container}>
            <div className="TopBarNavigation">
                <ul>
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
        flexDirection: 'column',
        width: 400,
        height: 350
    },
    content: {
        flexDirection: 'column'
    },
};
