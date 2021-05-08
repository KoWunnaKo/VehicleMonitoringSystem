import * as React from "react";
import {StylesDictionary} from "../utils/stylesDictionary";
import {useEffect, useState} from "react";
import Employee from "../../models/employee";
import * as EmployeeApi from "../../api/employeeApi";
import Role from "../../models/role";
import Collapsible from "react-collapsible";
import {List} from "@material-ui/core";
import Colors from "../../constants/colors";
import {getDbUser} from "../../utils/userUtil";
import {EmployeeContactListItem} from "./employeeContactListItem";

interface InterfaceProps {
    closeModal: () => void;
    selectContact: (Employee) => void;
}

export const AddEmployeeContactForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const roles = Role.getAllRoles();
    const [employeesContacts, setEmployeesContacts] = useState<Employee[]|null>();

    useEffect(() => {
        (async function() {
            const dbUser = await getDbUser();
            const employees = await EmployeeApi.getAllEmployees();
            if (employees && dbUser) {
                await setEmployeesContacts(employees.filter(e => e.id !== dbUser.id));
            }
        })();
    }, []);

    function compareEmployeesForSort(a: Employee, b: Employee): number {
        if (!a.id || !b.id) {
            return 0;
        }

        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    }

    return (
        <div style={styles.container}>
            <h2>Start chat with...</h2>
            {
                roles.map(r =>
                    <Collapsible
                        trigger={`${r.name}: ${employeesContacts && employeesContacts.filter((e) => e.roleId === r.id).length || 0}`}
                        key={r.id}>
                        <List style={{backgroundColor: Colors.white}}>
                            {employeesContacts && employeesContacts
                                .filter((e) => e.roleId === r.id)
                                .sort((a, b) => compareEmployeesForSort(a, b))
                                .map((e) => (<EmployeeContactListItem key={e.id} employee={e} selectContact={props.selectContact} closeModal={props.closeModal}/>))
                            }
                        </List>
                    </Collapsible>)
            }
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: 20,
        width: 300,
        height: 400
    },
    select: {
        width: 200,
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'center'
    },
    button: {
        width: 200,
        marginTop: 20,
        alignSelf: 'center',
    }
};
