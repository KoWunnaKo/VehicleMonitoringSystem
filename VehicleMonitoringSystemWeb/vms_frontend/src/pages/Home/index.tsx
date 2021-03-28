import * as React from "react";
import { withAuthorization } from "../../firebase/withAuthorization";
import {StylesDictionary} from "../../utils/StylesDictionary";
import * as VehicleDataApi from "../../api/VehicleDataApi";
import {useEffect, useState} from "react";
import VehicleData from "../../models/VehicleData";
import MapContainer from "../../components/Map/MapContainer";
import 'react-minimal-datetime-range/lib/react-minimal-datetime-range.min.css';
import { RangePicker } from 'react-minimal-datetime-range';
import {formatDateTime, getDate, getDefaultDateTime, getTime} from "../../utils/DateFunctions";

export const HomeComponent: React.FunctionComponent = (props) => {
    const [markersData, setMarkersData] = useState<VehicleData[]|null>();
    const [trajectoryData, setTrajectoryData] = useState<VehicleData[]|null>();
    const [startDateTime, setStartDateTime] = useState<string>(getDefaultDateTime());
    const [endDateTime, setEndDateTime] = useState<string>(getDefaultDateTime());


    useEffect(() => {
        (async function() {
            setMarkersData(await VehicleDataApi.getVehiclesLastData());
            setTrajectoryData(
                await VehicleDataApi.getVehiclesRangeData(startDateTime, endDateTime)
            );
        })();
    }, [startDateTime, endDateTime]);

    const setDateTimeRange = async (res: string[]) => {
        const fromDateTime = res[0].split(' ');
        const fromDate = fromDateTime[0].split('-');
        const fromTime = fromDateTime[1].split(':');
        setStartDateTime(formatDateTime(fromDate[0], fromDate[1], fromDate[2], fromTime[0], fromTime[1]));

        const toDateTime = res[1].split(' ');
        const toDate = toDateTime[0].split('-');
        const toTime = toDateTime[1].split(':');
        setEndDateTime(formatDateTime(toDate[0], toDate[1], toDate[2], toTime[0], toTime[1]));
    }

    return (
        <div style={styles.container}>
            <div>
                <MapContainer markersData={markersData} trajectoryData={trajectoryData}/>
            </div>
            <div style={styles.rangePickerContainer}>
                <RangePicker
                    locale="en-us"
                    show={false} // default is false
                    disabled={false} // default is false
                    allowPageClickToClose={true} // default is true
                    onConfirm={async (res: string[]) => await setDateTimeRange(res)}
                    // onClose={() => console.log('rangePicker: onClose')}
                    style={styles.timeRangePicker}
                    defaultDates={[getDate(startDateTime), getDate(endDateTime)]}
                    defaultTimes={[getTime(startDateTime), getTime(endDateTime)]}
                    initialDates={[getDate(startDateTime), getDate(endDateTime)]}
                    initialTimes={[getTime(startDateTime), getTime(endDateTime)]}
                />
            </div>
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        overflow: 'hidden'
    },
    rangePickerContainer: {
        width: 400,
        alignSelf: 'flex-end'
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
