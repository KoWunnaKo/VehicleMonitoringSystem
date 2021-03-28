import * as React from "react";
import { withAuthorization } from "../../firebase/withAuthorization";
import {StylesDictionary} from "../../utils/StylesDictionary";
import Map from "../../components/Map/Map";
import * as VehicleDataApi from "../../api/VehicleDataApi";
import {useEffect, useState} from "react";
import VehicleData from "../../models/VehicleData";
import {padStart} from "../../utils/StringFunctions";
import moment from "moment";

export const HomeComponent: React.FunctionComponent = (props) => {
    const [markersData, setMarkersData] = useState<VehicleData[]|null>();
    const [trajectoryData, setTrajectoryData] = useState<VehicleData[]|null>();

    // TODO remove
    const [fromHour, setFromHour] = useState<string>('09');
    const [fromMinute, setFromMinute] = useState<string>('00');
    const [fromMonth, setFromMonth] = useState<string>(padStart(String(moment().toDate().getMonth() + 1), 2, '0'));
    const [fromDay, setFromDay] = useState<string>(padStart(String(moment().toDate().getDate()),2, '0'));
    const [fromYear, setFromYear] = useState<string>(padStart(String(moment().toDate().getFullYear()), 2, '0'));

    const [toHour, setToHour] = useState<string>('09');
    const [toMinute, setToMinute] = useState<string>('00');
    const [toMonth, setToMonth] = useState<string>(padStart(String(moment().toDate().getMonth() + 1), 2, '0'));
    const [toDay, setToDay] = useState<string>(padStart(String(moment().toDate().getDate()),2, '0'));
    const [toYear, setToYear] = useState<string>(padStart(String(moment().toDate().getFullYear()), 2, '0'));


    useEffect(() => {
        (async function() {
            setMarkersData(await VehicleDataApi.getVehiclesLastData());
            setTrajectoryData(await VehicleDataApi.getVehiclesRangeData(
                    `${fromYear}-${fromMonth}-${fromDay} ${fromHour}:${fromMinute}`,
                    `${toYear}-${toMonth}-${toDay} ${toHour}:${toMinute}`,
                ));
        })();
    }, []);


    return (
        <div style={styles.container}>
            <Map markersData={markersData} trajectoryData={trajectoryData}/>
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
