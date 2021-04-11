import * as React from "react";
import { AuthUserContext } from "../../firebase/authUserContext";
import { withAuthorization } from "../../firebase/withAuthorization";
import { PasswordForgetForm } from "../passwordForget/passwordForgetForm";
import { PasswordChangeForm } from "./passwordChangeForm";

export const AccountComponent = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {(authUser as any).email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = (authUser: any) => !!authUser;

export const Account = withAuthorization(authCondition)(AccountComponent);
