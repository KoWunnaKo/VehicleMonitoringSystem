import * as React from "react";
import { AuthUserContext } from "../../firebase/authUserContext";
import { withAuthorization } from "../../firebase/withAuthorization";
import { PasswordForgetForm } from "../passwordForget/passwordForgetForm";
import { PasswordChangeForm } from "./passwordChangeForm";
import {StylesDictionary} from "../../components/utils/stylesDictionary";
import Colors from "../../constants/colors";

export const AccountComponent = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div style={styles.container}>
        <h1>Account: {(authUser as any).email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = (authUser: any) => !!authUser;
export const Account = withAuthorization(authCondition)(AccountComponent);

const styles: StylesDictionary  = {
  container: {
    display: 'flex',
    flex: 1,
    height: '100vh',
    flexDirection: 'column',
    marginLeft: 8,
    backgroundColor: Colors.background
  },
};
