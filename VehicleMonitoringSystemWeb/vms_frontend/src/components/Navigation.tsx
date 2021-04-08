import * as React from "react";
import { useHistory } from "react-router-dom";
import "../styles/Navigation.scss";
import {auth} from "../firebase";
import Employee from "../models/Employee";
import Role from "../models/Role";
import {ACCOUNT, CHAT, HOME, LANDING, SIGN_IN} from "../constants/Routes";
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
        <div className="TopBarNavigation">
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
                    <a onClick={() => navigateWithoutSidebar(CHAT)}>Chat</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(ACCOUNT)}>Account</a>
                </li>
                <li>
                    <a onClick={signOutClick}>Sign Out</a>
                </li>
            </ul>
        </div>
    );

    const NavigationAuthAdministrator = () => (
        <div className="TopBarNavigation">
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
                    <a onClick={() => navigateWithoutSidebar(CHAT)}>Chat</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(ACCOUNT)}>Account</a>
                </li>
                <li>
                    <a onClick={signOutClick}>Sign Out</a>
                </li>
            </ul>
        </div>
    );

    const NavigationNonAuth = () => (
        <div className="TopBarNavigation">
            <ul>
                <li>
                    <a onClick={() => navigateWithoutSidebar(LANDING)}>Landing</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(SIGN_IN)}>Sign In</a>
                </li>
            </ul>
        </div>
    );

    function signOutClick() {
        auth.doSignOut();
        props.setSidebarDisplay(false);
    }

    function homeClick() {
        history.push(HOME);
        props.setSidebarDisplay(false);
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

