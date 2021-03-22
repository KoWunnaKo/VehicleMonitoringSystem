import * as React from "react";
import { useHistory } from "react-router-dom";
import "./Navigation.css";
import {auth} from "../firebase";
import Employee from "../models/Employee";
import Role from "../models/Role";
import {ACCOUNT, HOME, LANDING, SIGN_IN} from "../constants/Routes";
import {SidebarDrivers} from "./Employee/SidebarDrivers";
import {SidebarVehicles} from "./Vehicle/SidebarVehicles";
import {SidebarTasks} from "./Task/SidebarTasks";


interface InterfaceProps {
    dbUser: Employee|null;
    setSidebarDisplay: (display: boolean) => void;
    setSidebarComponent: (comp: React.ReactNode) => void;
}

export const Navigation: React.FunctionComponent<InterfaceProps> = (props) => {
    const history = useHistory();
    const dbUser = props.dbUser;

    const getNavigationByRole = () => {
        if (dbUser && dbUser.roleId) {
            if (Role.isAdministrator(dbUser.roleId)) {
                return (<NavigationAuthAdministrator/>);
            } else {
                return (<NavigationAuthOperator/>);
            }
        } else {
            return (<NavigationNonAuth/>);
        }
    }

    const NavigationAuthOperator = () => (
        <ul>
            <li>
                <a onClick={homeClick}>Home</a>
            </li>
            <li>
                <a onClick={driversClick}>Drivers</a>
            </li>
            <li>
                <a onClick={vehiclesClick}>Vehicles</a>
            </li>
            <li>
                <a onClick={tasksClick}>Tasks</a>
            </li>
            <li>
                <a onClick={() => navigateWithoutSidebar(ACCOUNT)}>Account</a>
            </li>
            <li>
                <a onClick={signOutClick}>Sign Out</a>
            </li>
        </ul>
    );

    const NavigationAuthAdministrator = () => (
        <ul>
            <li>
                <a onClick={homeClick}>Home</a>
            </li>
            <li>
                <a onClick={driversClick}>Drivers</a>
            </li>
            <li>
                <a onClick={vehiclesClick}>Vehicles</a>
            </li>
            <li>
                <a onClick={tasksClick}>Tasks</a>
            </li>
            <li>
                <a onClick={() => navigateWithoutSidebar(ACCOUNT)}>Account</a>
            </li>
            <li>
                <a onClick={signOutClick}>Sign Out</a>
            </li>
        </ul>
    );

    const NavigationNonAuth = () => (
        <ul>
            <li>
                <a onClick={() => navigateWithoutSidebar(LANDING)}>Landing</a>
            </li>
            <li>
                <a onClick={() => navigateWithoutSidebar(SIGN_IN)}>Sign In</a>
            </li>
        </ul>
    );

    function signOutClick() {
        auth.doSignOut();
        props.setSidebarDisplay(false);
    }

    function homeClick() {
        history.push(HOME);
        props.setSidebarDisplay(false);
        // const ChildComp1: React.FC = () => (<h1>This is a child component 1</h1>);
        // props.setSidebarComponent(<ChildComp1/>);
    }

    function driversClick() {
        history.push(HOME);
        props.setSidebarDisplay(true);
        props.setSidebarComponent(<SidebarDrivers/>);
    }

    function vehiclesClick() {
        history.push(HOME);
        props.setSidebarDisplay(true);
        props.setSidebarComponent(<SidebarVehicles/>);
    }

    function tasksClick() {
        history.push(HOME);
        props.setSidebarDisplay(true);
        props.setSidebarComponent(<SidebarTasks/>);
    }

    function navigateWithoutSidebar(pageName: string){
        history.push(pageName);
        props.setSidebarDisplay(false);
    }

    return getNavigationByRole();
}

