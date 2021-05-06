import * as React from "react";
import {CompanySettingsForm} from "./companySettingsForm";
import {withAuthorization} from "../../firebase/withAuthorization";

export const CompanySettingsComponent : React.FunctionComponent = () => {
    return (
        <div>
            <h1>Company Settings</h1>
            <CompanySettingsForm/>
        </div>
    );
}

const authCondition = (authUser: any) => !!authUser;
export const CompanySettings = withAuthorization(authCondition)(CompanySettingsComponent);
