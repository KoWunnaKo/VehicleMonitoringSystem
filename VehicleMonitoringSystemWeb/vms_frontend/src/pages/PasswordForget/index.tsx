import * as React from "react";
import { Link } from "react-router-dom";
import { PasswordForgetForm } from "./PasswordForgetForm";

export const PasswordForget = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

export const PasswordForgetLink = () => (
  <p>
    <Link to="/pw-forget" style={{alignSelf: 'center'}}>Forgot Password?</Link>
  </p>
);
