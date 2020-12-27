import * as React from "react";
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";
import { AuthUserContext } from "../firebase/AuthUserContext";
import "./Navigation.css";
import {auth} from "../firebase";

export const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
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
