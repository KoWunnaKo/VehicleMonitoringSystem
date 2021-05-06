import {Map, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
import React, {useEffect, useState} from 'react';
import {dateTimeToString, diffFromNowIsLessOrEqual} from "../../utils/dateFunctions";

function MapContainer(props) {
    const [markersData, setMarkersData] = useState(props.markersData);
    const [trajectoryData, setTrajectoryData] = useState(props.trajectoryData);

    useEffect(() => {
        (async function() {
            await setMarkersData(props.markersData);
            await setTrajectoryData(props.trajectoryData);
        })();
    }, [props.markersData, props.trajectoryData]);

    // TODO defaultMapCenter props
    const defaultProps = {
        center: {
            lat: 56.0,
            lng: 37.8
        },
        zoom: 10
    };
    
    const drawVehicleMarkers = () => {
        return (markersData &&
            markersData.map((vehicleData) => createVehicleMarker(vehicleData))
        );
    }

    const createVehicleMarker = (vehicleData) => {
        if (!vehicleData) {
            return null;
        }

        const title = vehicleData.vehicle
            ? `${vehicleData.vehicle.name} (${vehicleData.vehicle.number})\n${dateTimeToString(vehicleData.datetime)}`
            : '';

        const iconUrl = diffFromNowIsLessOrEqual(vehicleData.datetime, 'minutes', 30)
            ? '/vehicleOnlineIcon.webp'
            : '/vehicleOfflineIcon.webp';

        return (
            <Marker
                key={vehicleData.id}
                id={vehicleData.id}
                position={{
                    lat: vehicleData.latitude && +vehicleData.latitude,
                    lng: vehicleData.longitude && +vehicleData.longitude
                }}
                name={vehicleData.vehicle && vehicleData.vehicle.name}
                title={title}
                icon={{
                    anchor: new google.maps.Point(30,30),
                    scaledSize: new google.maps.Size(40,40),
                    url: iconUrl
                }}
            />
        );
    }

    const drawTrajectoryPolygons = () => {
        if (trajectoryData && Object.keys(trajectoryData).length) {
            let res = new Array(Object.values(trajectoryData).length);
            res.push(Object.entries(trajectoryData)
                .map(([key, value]) => (
                    <Polyline
                        id={key}
                        key={key}
                        path={value.map(v => ({lat: v.latitude, lng: v.longitude}))}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2}
                        icons={[
                            {
                                icon: { path: google.maps.SymbolPath.FORWARD_OPEN_ARROW },
                                offset: "0",
                                repeat: "300px"
                            }
                        ]}
                    />
                ))
            );
            return res;
        }

        return null;
    }

    const drawTrajectoryMarkers = () => {
        if (!trajectoryData || !Object.keys(trajectoryData).length) {
            return null;
        }

        // console.log(`drawTrajectoryMarkers: trajectoryData: ${JSON.stringify(trajectoryData)}`);

        const res = new Array(Object.keys(trajectoryData).length);

        for(const key of Object.keys(trajectoryData)) {
            const vehicleData = trajectoryData[key][trajectoryData[key].length - 1];

            const title = vehicleData.vehicle
                ? `Start point: ${vehicleData.vehicle.name} (${vehicleData.vehicle.number})\n${dateTimeToString(vehicleData.datetime)}`
                : '';

            res.push(
                <Marker
                    key={vehicleData.id}
                    id={vehicleData.id}
                    position={{
                        lat: vehicleData.latitude && +vehicleData.latitude,
                        lng: vehicleData.longitude && +vehicleData.longitude
                    }}
                    name={vehicleData.vehicle && vehicleData.vehicle.name}
                    title={title}
                    icon={{
                        anchor: new google.maps.Point(24, 24),
                        scaledSize: new google.maps.Size(30, 30),
                        url: '/trajectoryMarker.webp'
                    }}
                />
            );
        }

        return res;
    }

    return (
        <Map
            google={props.google}
            zoom={defaultProps.zoom}
            center={defaultProps.center}
        >

            {drawVehicleMarkers()}
            {drawTrajectoryPolygons()}
            {drawTrajectoryMarkers()}
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer)
