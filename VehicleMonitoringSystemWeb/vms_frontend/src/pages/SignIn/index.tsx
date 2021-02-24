import * as React from "react";
import { withRouter } from "react-router-dom";
import { SignInForm } from "./SignInForm";

const SignInComponent = ({ history }: { [key: string]: any }) => (
    <SignInForm history={history}/>
);

export const SignIn = withRouter(SignInComponent);
