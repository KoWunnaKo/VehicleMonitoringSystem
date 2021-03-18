import * as React from "react";
import { withAuthorization } from "../../firebase/withAuthorization";
import {StylesDictionary} from "../../utils/StylesDictionary";
import Map from "../../components/Map/Map";

class HomeComponent extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
      return (
      <div style={styles.container}>
        <Map/>
      </div>
    );
  }
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        overflow: 'hidden'
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
