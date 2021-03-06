import * as React from "react";
import {StylesDictionary} from "../../utils/stylesDictionary";
import {useState} from "react";
import {PropertiesGeneralTaskForm, PropertiesGeneralTaskFormName} from "./propertiesGeneralTaskForm";
import Task from "../../../models/task";
import "../../../styles/navigation.scss";

interface InterfaceProps {
  closeModal: () => void;
  updateTasks: () => void;
  task: Task;
}

export const PropertiesTaskForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const [contentComponentName, setContentComponentName] = useState<string>(PropertiesGeneralTaskFormName);

    function renderContent() {
        switch (contentComponentName) {
            case PropertiesGeneralTaskFormName:
                return <PropertiesGeneralTaskForm closeModal={props.closeModal} updateTasks={props.updateTasks} task={props.task}/>
            default:
                return null;
        }
    }

    return (
        <div style={styles.container}>
            <div className="TopBarNavigation">
                <ul>
                    <li>
                        <a onClick={() => setContentComponentName(PropertiesGeneralTaskFormName)}>{PropertiesGeneralTaskFormName}</a>
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
