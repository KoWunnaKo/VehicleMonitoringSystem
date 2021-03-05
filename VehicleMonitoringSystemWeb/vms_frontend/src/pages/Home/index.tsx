import * as React from "react";
import { withAuthorization } from "../../firebase/withAuthorization";
import {StylesDictionary} from "../../utils/StylesDictionary";
import {AppController} from "../../controllers/AppController";
import Role from "../../models/Role";
import SimpleMap from "../../components/Map/SimpleMap";

class HomeComponent extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
      return (
      <div style={styles.container}>
        {/*<h2>Home Page</h2> */}
        {/*<p>The Home Page is accessible by every signed in user.</p>*/}
        <SimpleMap/>
      </div>
    );
  }
}

const styles: StylesDictionary  = {
    container: {
        flex: 1,
        // backgroundColor:'#b642f4'
    }
};

// Administrator auth
// const authCondition = (authUser: any) => {
//     if (!!authUser) {
//         const dbUser = AppController.dbUser;
//         if (dbUser) {
//             return Role.isAdministrator(dbUser!.roleId);
//         }
//     }
//     return false;
// }

const authCondition = (authUser: any) => !!authUser;

export const HomeScreen = withAuthorization(authCondition)(HomeComponent);
