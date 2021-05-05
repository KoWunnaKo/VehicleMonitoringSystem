import * as React from "react";
import {useEffect, useState} from "react";
import Employee from "../../models/employee";
import {Button, List, Tooltip} from "@material-ui/core";
import {StylesDictionary} from "../utils/stylesDictionary";
import * as EmployeeApi from "../../api/employeeApi";
import Colors from "../../constants/colors";
import {EmployeeListItem} from "./employeeListItem";
import Popup from "reactjs-popup";
import {CreateEmployeeForm} from "./createEmployeeForm";
import "../../styles/sidebarDrivers.scss";
import {getDbUser, isUserOperator} from "../../utils/userUtil";

// TODO sidebar employees with filters
export const SidebarDrivers: React.FunctionComponent = () => {
    const [dbUser, setDbUser] = useState<Employee|null>();

    const [drivers, setDrivers] = useState<Employee[]|null>(null);

    useEffect(() => {
        (async function() {
            await setDbUser(await getDbUser());
            await updateDrivers();
        })();
    }, []);

    const updateDrivers = async () => {
        setDrivers(await EmployeeApi.getAllDrivers());
    }

    return (
        <div style={styles.container}>
            <h2>Drivers</h2>
            <Popup
                trigger={
                    <div style={styles.flexible}>
                        <Tooltip title={isUserOperator(dbUser) ? 'Access only for the Administrators' : ''}>
                            <div style={styles.flexible}>
                                <Button variant="contained" color='primary' style={styles.addButton} disabled={isUserOperator(dbUser)} >
                                    Create driver
                                </Button>
                            </div>
                        </Tooltip>
                    </div>
                }
                modal={true}
                nested={true}
            >
                {(close: any) => {
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

            <List>
                {drivers && drivers.map((driver) => (
                    <EmployeeListItem key={driver.id} employee={driver} updateDrivers={updateDrivers}/>
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
        textDecorationColor: Colors.white
    },
    flexible: {
        flex: 1,
        display: 'flex'
    }
};

