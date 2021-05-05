import * as React from "react";
import { withAuthorization } from "../../firebase/withAuthorization";
import {StylesDictionary} from "../../utils/stylesDictionary";
import * as VehicleDataApi from "../../api/vehicleDataApi";
import {useEffect, useState} from "react";
import VehicleData from "../../models/vehicleData";
import MapContainer from "../../components/map/mapContainer";
import 'react-minimal-datetime-range/lib/react-minimal-datetime-range.min.css';
import { RangePicker } from 'react-minimal-datetime-range';
import {
    formatDateTime,
    getDate,
    getDefaultEndDateTime,
    getDefaultStartDateTime,
    getTime
} from "../../utils/dateFunctions";
import {IconButton} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

export const HomeComponent: React.FunctionComponent = (props) => {
    const [markersData, setMarkersData] = useState<VehicleData[]|null>();
    const [trajectoryData, setTrajectoryData] = useState<VehicleData[]|null>();
    const [startDateTime, setStartDateTime] = useState<string>(getDefaultStartDateTime());
    const [endDateTime, setEndDateTime] = useState<string>(getDefaultEndDateTime());

    useEffect(() => {
        (async function() {
            await updateMapData();
        })();
    }, [startDateTime, endDateTime]);

    const updateMapData = async () => {
        await setMarkersData(await VehicleDataApi.getVehiclesLastData(startDateTime, endDateTime));
        await setTrajectoryData(
            await VehicleDataApi.getVehiclesRangeData(startDateTime, endDateTime)
        );
    }

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
                <IconButton onClick={updateMapData} color='primary' style={styles.refreshIcon}>
                    <RefreshIcon/>
                </IconButton>
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
        marginTop: 10,
        marginRight: 10,
        width: 400,
        alignSelf: 'flex-end',
        display: "flex",
        flexDirection: 'column'
    },
    refreshIcon: {
        alignSelf: 'flex-end',
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
