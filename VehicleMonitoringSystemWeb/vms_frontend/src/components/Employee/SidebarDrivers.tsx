import * as React from "react";
import {useEffect, useState} from "react";
import Employee from "../../models/Employee";
import {Button, List} from "@material-ui/core";
import {StylesDictionary} from "../../utils/StylesDictionary";
import * as EmployeeApi from "../../api/EmployeeApi";
import Colors from "../../constants/Colors";
import {EmployeeListItem} from "./EmployeeListItem";
import Popup from "reactjs-popup";
import {CreateEmployeeForm} from "./CreateEmployeeForm";
import "./SidebarDrivers.css";


export const SidebarDrivers: React.FunctionComponent = () => {
    const [drivers, setDrivers] = useState<Employee[]|null>(null);

    useEffect(() => {
        (async function() {
            // TODO companyId number
            setDrivers(await EmployeeApi.getAllDrivers(1));
        })();
    }, []);

    return (
        <div style={styles.container}>
            <h2>Drivers</h2>
            <Popup
                trigger={<Button variant="contained" style={styles.addButton}>Create driver</Button>}
                modal={true}
                nested={true}
            >
                {(close: any) => {
                    // Update drivers list
                    // TODO remove - constantly updating
                    EmployeeApi.getAllDrivers(1).then(res => setDrivers(res));

                    return (
                        <div className="modal">
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div className="header"> Create driver</div>
                            <div className="content">
                                <CreateEmployeeForm closeModal={close}/>
                            </div>
                        </div>
                    )
                }}
            </Popup>

            <List style={{backgroundColor: Colors.white}}>
                {drivers && drivers.map((driver) => (
                    <EmployeeListItem key={driver.id} employee={driver}/>
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

