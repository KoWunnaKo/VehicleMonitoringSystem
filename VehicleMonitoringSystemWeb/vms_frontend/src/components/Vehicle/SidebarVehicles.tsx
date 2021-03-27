import * as React from "react";
import {useEffect, useState} from "react";
import {Button, List} from "@material-ui/core";
import {StylesDictionary} from "../../utils/StylesDictionary";
import * as VehicleApi from "../../api/VehicleApi";
import Colors from "../../constants/Colors";
import Popup from "reactjs-popup";
import Vehicle from "../../models/Vehicle";
import {VehicleListItem} from "./VehicleListItem";
import {CreateVehicleForm} from "./CreateVehicleForm";
import "../Employee/SidebarDrivers.css";
import 'react-minimal-datetime-range/lib/react-minimal-datetime-range.min.css';
import { RangePicker } from 'react-minimal-datetime-range';
import moment from "moment";
import {padStart} from "../../utils/StringFunctions";


export const SidebarVehicles: React.FunctionComponent = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]|null>(null);

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
            // TODO companyId number
            setVehicles(await VehicleApi.getAllVehicles(1));
        })();
    }, []);

    const setTimeRange = (res: string[]) => {
        const fromDateTime = res[0].split(' ');
        const fromDate = fromDateTime[0].split('-');
        const fromTime = fromDateTime[1].split(':');

        setFromYear(fromDate[0]);
        setFromMonth(fromDate[1]);
        setFromDay(fromDate[2]);
        setFromHour(fromTime[0]);
        setFromMinute(fromTime[1]);

        const toDateTime = res[1].split(' ');
        const toDate = toDateTime[0].split('-');
        const toTime = toDateTime[1].split(':');

        setToYear(toDate[0]);
        setToMonth(toDate[1]);
        setToDay(toDate[2]);
        setToHour(toTime[0]);
        setToMinute(toTime[1]);
    }

    return (
        <div style={styles.container}>
            <h2>Vehicles</h2>
            <Popup
                trigger={<Button variant="contained" style={styles.addButton}>Create vehicle</Button>}
                modal={true}
                nested={true}
            >
                {(close: any) => {
                    return (
                        <div className="modal">
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div className="header">Create vehicle</div>
                            <div className="content">
                                <CreateVehicleForm closeModal={close}/>
                            </div>
                        </div>
                    )
                }}
            </Popup>

            <List style={{backgroundColor: Colors.white}}>
                {vehicles && vehicles.map((vehicle) => (
                    <VehicleListItem key={vehicle.id} vehicle={vehicle}/>
                ))}
            </List>

            <RangePicker
                locale="en-us" // default is en-us
                show={false} // default is false
                disabled={false} // default is false
                allowPageClickToClose={true} // default is true
                onConfirm={(res: string[]) => setTimeRange(res)}
                onClose={() => console.log('onClose')}
                style={styles.timeRangePicker}
                placeholder={['Start Time', 'End Time']}
                ////////////////////
                // IMPORTANT DESC //
                ////////////////////
                defaultDates={[fromYear+'-'+fromMonth+'-'+fromDay,toYear+'-'+toMonth+'-'+toDay]}
                // ['YYYY-MM-DD', 'YYYY-MM-DD']
                // This is the value you choosed every time.
                defaultTimes={[fromHour+':'+fromMinute,toHour+':'+toMinute]}
                // ['hh:mm', 'hh:mm']
                // This is the value you choosed every time.
                initialDates={[fromYear+'-'+fromMonth+'-'+fromDay,toYear+'-'+toMonth+'-'+toDay]}
                // ['YYYY-MM-DD', 'YYYY-MM-DD']
                // This is the initial dates.
                // If provied, input will be reset to this value when the clear icon hits,
                // otherwise input will be display placeholder
                initialTimes={[fromHour+':'+fromMinute,toHour+':'+toMinute]}
                // ['hh:mm', 'hh:mm']
                // This is the initial times.
                // If provied, input will be reset to this value when the clear icon hits,
                // otherwise input will be display placeholder
            />
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    addButton: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: Colors.primaryBlue
    },
    timeRangePicker: {
        width: '300px',
        margin: '0 auto'
    }
};

