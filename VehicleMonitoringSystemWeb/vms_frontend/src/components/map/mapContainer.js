import {Map, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
import React, {useEffect, useState} from 'react';
import {dateTimeToString} from "../../utils/dateFunctions";

function MapContainer(props) {
    const [markersData, setMarkersData] = useState();
    const [trajectoryData, setTrajectoryData] = useState();

    useEffect(() => {
        (async function() {
            await setMarkersData(props.markersData);
            await setTrajectoryData(props.trajectoryData);
        })();
    }, [props.markersData]);

    // TODO defaultMapCenter props
    const defaultProps = {
        center: {
            lat: 56.0,
            lng: 37.8
        },
        zoom: 10
    };

    const createVehicleMarker = (vehicleData) => {
        const title = vehicleData.vehicle
            ? `${vehicleData.vehicle.name} (${vehicleData.vehicle.number})\n${dateTimeToString(vehicleData.datetime)}`
            : '';

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
                    anchor: new google.maps.Point(24,24),
                    scaledSize: new google.maps.Size(30,30),
                    url: '/vehicleIcon.webp'
                }}
            />
        );
    }

    return (
        <Map
            google={props.google}
            zoom={defaultProps.zoom}
            center={defaultProps.center}
        >

            {markersData && markersData.map((vehicleData) => (
                createVehicleMarker(vehicleData)
            ))}

            {trajectoryData && Object.entries(trajectoryData)
                .map(([key, value]) => (
                    <Polyline
                        id={key}
                        key={key}
                        path={value.map(v => ({lat: v.latitude, lng: v.longitude}))}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2} />
                    )
                )
            }
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer)
