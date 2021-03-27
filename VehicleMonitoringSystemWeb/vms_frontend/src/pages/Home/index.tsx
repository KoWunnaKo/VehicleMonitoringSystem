import * as React from "react";
import { withAuthorization } from "../../firebase/withAuthorization";
import {StylesDictionary} from "../../utils/StylesDictionary";
import Map from "../../components/Map/Map";
import * as VehicleDataApi from "../../api/VehicleDataApi";
import {useEffect, useState} from "react";
import VehicleData from "../../models/VehicleData";

export const HomeComponent: React.FunctionComponent = (props) => {
    const [vehicleData, setVehicleData] = useState<VehicleData[]|null>();

    useEffect(() => {
        (async function() {
            const res = await VehicleDataApi.getVehiclesLastData();
            setVehicleData(res);
        })();
    }, []);


    return (
        <div style={styles.container}>
            <Map vehicleData={vehicleData}/>
        </div>
    );
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
