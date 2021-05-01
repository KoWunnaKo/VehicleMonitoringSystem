import * as React from "react";
import {StylesDictionary} from "../../../utils/stylesDictionary";
import {useState} from "react";
import {PropertiesGeneralEmployeeForm, PropertiesGeneralEmployeeFormName} from "./propertiesGeneralEmployeeForm";
import Task from "../../../models/task";
import "../../../styles/navigation.scss";
import Employee from "../../../models/employee";

interface InterfaceProps {
  employee: Employee;
  closeModal: () => void;
  updateDrivers: () => void;
}

export const PropertiesEmployeeForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const [contentComponentName, setContentComponentName] = useState<string>(PropertiesGeneralEmployeeFormName);

    function renderContent() {
        switch (contentComponentName) {
            case PropertiesGeneralEmployeeFormName:
                return <PropertiesGeneralEmployeeForm employee={props.employee} closeModal={props.closeModal} updateDrivers={props.updateDrivers}/>
            default:
                return null;
        }
    }

    return (
        <div style={styles.container}>
            <div className="TopBarNavigation">
                <ul>
                    <li>
                        <a onClick={() => setContentComponentName(PropertiesGeneralEmployeeFormName)}>{PropertiesGeneralEmployeeFormName}</a>
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
        height: 450
    },
    content: {
        flexDirection: 'column'
    },
};
