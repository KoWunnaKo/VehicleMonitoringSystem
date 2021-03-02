import * as React from "react";
import { withAuthorization } from "../../firebase/withAuthorization";
import Role from "../../models/Role";
import {AppController} from "../../controllers/AppController";

const AdminConsolePage: React.FunctionComponent = () => {
  return (
    <div>
      <h2>AdminConsolePage</h2>
    </div>
  );
}

const authCondition = (authUser: any) => {
    if (!!authUser) {
        const dbUser = AppController.dbUser;
        if (dbUser) {
            return Role.isAdministrator(dbUser!.roleId);
        }
    }
    return false;
}

export const AdminConsole = withAuthorization(authCondition)(AdminConsolePage);
