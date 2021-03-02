import * as React from "react";
import { Link } from "react-router-dom";
import * as routes from "../constants/Routes";
import "./Navigation.css";
import {auth} from "../firebase";
import Employee from "../models/Employee";
import Role from "../models/Role";

interface InterfaceProps {
    dbUser: Employee|null;
}

export const Navigation: React.FunctionComponent<InterfaceProps> = (props) => {
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

    return getNavigationByRole();
}

const NavigationAuthOperator = () => (
    <ul>
        <li>
            <Link to={routes.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={routes.HOME}>Home</Link>
        </li>
        <li>
            <Link to={routes.ACCOUNT}>Account</Link>
        </li>
        <li>
            <a onClick={auth.doSignOut}>Sign Out</a>
        </li>
    </ul>
);

const NavigationAuthAdministrator = () => (
    <ul>
        <li>
            <Link to={routes.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={routes.HOME}>Home</Link>
        </li>
        <li>
            <Link to={routes.ADMIN_CONSOLE}>Admin console</Link>
        </li>
        <li>
            <Link to={routes.ACCOUNT}>Account</Link>
        </li>
        <li>
            <a onClick={auth.doSignOut}>Sign Out</a>
        </li>
    </ul>
);

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={routes.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={routes.SIGN_IN}>Sign In</Link>
        </li>
    </ul>
);
