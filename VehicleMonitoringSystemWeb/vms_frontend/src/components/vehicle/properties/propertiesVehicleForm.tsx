import * as React from "react";
import {StylesDictionary} from "../../../utils/stylesDictionary";
import {useState} from "react";
import {PropertiesGeneralVehicleForm, PropertiesGeneralVehicleFormName} from "./propertiesGeneralVehicleForm";
import {PropertiesDriversVehicleForm, PropertiesDriversVehicleFormName} from "./propertiesDriversVehicleForm";
import Vehicle from "../../../models/vehicle";

interface InterfaceProps {
  closeModal: () => void;
  vehicle: Vehicle;
}

export const PropertiesVehicleForm: React.FunctionComponent<InterfaceProps> = (props) => {
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
        display: 'flex',
        flexDirection: 'column',
        width: 400,
        height: 350
    },
    content: {
        flexDirection: 'column'
    },
};
