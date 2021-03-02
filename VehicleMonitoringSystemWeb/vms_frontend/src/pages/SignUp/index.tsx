import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import * as routes from "../../constants/Routes";
import {SignUpForm} from "./SingUpForm";
import * as AuthApi from "../../api/AuthApi";
import Role from "../../models/Role";
import {withAuthorization} from "../../firebase/withAuthorization";

const SignUpComponent = ({ history }: { [key: string]: any }) => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm history={history}/>
    </div>
);

// export const SignUpLink = () => (
//   <p>
//     Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
//   </p>
// );

//  TODO async is not working, get dbUser for role check other way
const authCondition = (authUser: any) => {
    console.log(`!!authUser=${!!authUser}`)
    if (!!authUser) {
        return true;
        // const dbUser = await AuthApi.getCurrentUser();
        // if (dbUser) {
        //     return Role.isAdministrator(dbUser!.roleId);
        // }
    }
    return false;
}
// const authCondition = (authUser: any) => !!authUser;

export const SignUp = withAuthorization(authCondition)(SignUpComponent);
