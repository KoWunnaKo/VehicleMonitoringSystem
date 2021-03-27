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

    const [hour, setHour] = useState('09');
    const [minute, setMinute] = useState('00');
    const [month, setMonth] = useState(padStart(String(moment().toDate().getMonth() + 1), 2, '0'));
    const [date, setDate] = useState(padStart(String(moment().toDate().getDate()),2, '0'));
    const [year, setYear] = useState(padStart(String(moment().toDate().getFullYear()), 2, '0'));

    useEffect(() => {
        (async function() {
            // TODO companyId number
            setVehicles(await VehicleApi.getAllVehicles(1));
        })();
    }, []);

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
                onConfirm={(res: any) => console.log(res)}
                onClose={() => console.log('onClose')}
                style={styles.timeRangePicker}
                placeholder={['Start Time', 'End Time']}
                ////////////////////
                // IMPORTANT DESC //
                ////////////////////
                defaultDates={[year+'-'+month+'-'+date,year+'-'+month+'-'+date]}
                // ['YYYY-MM-DD', 'YYYY-MM-DD']
                // This is the value you choosed every time.
                defaultTimes={[hour+':'+minute,hour+':'+minute]}
                // ['hh:mm', 'hh:mm']
                // This is the value you choosed every time.
                initialDates={[year+'-'+month+'-'+date,year+'-'+month+'-'+date]}
                // ['YYYY-MM-DD', 'YYYY-MM-DD']
                // This is the initial dates.
                // If provied, input will be reset to this value when the clear icon hits,
                // otherwise input will be display placeholder
                initialTimes={[hour+':'+minute,hour+':'+minute]}
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

