import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, {useEffect, useState} from 'react';

function MapContainer(props) {
    const [markersData, setMarkersData] = useState();
    // const [trajectoryData, setTrajectoryData] = useState();

    useEffect(() => {
        (async function() {
            setMarkersData(props.markersData);
            // setTrajectoryData(props.trajectoryData);
            // console.log(`NewMap, props.markersData: ${JSON.stringify(props.markersData)}`);
        })();
    }, [props.markersData]);
    // }, [props.markersData, props.trajectoryData]);

    const defaultProps = {
        center: {
            lat: 56.0,
            lng: 37.8
        },
        zoom: 10
    };

    return (
        <Map
            google={props.google}
            zoom={defaultProps.zoom}
            center={defaultProps.center}
        >

            {markersData && markersData.map((vehicleData) => (
                <Marker
                    key={vehicleData.id}
                    id={vehicleData.id}
                    position={{lat: +vehicleData.latitude, lng: +vehicleData.longitude}}
                    name={vehicleData.vehicle.name}
                    title={vehicleData.vehicle.name}
                />
            ))}
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAJ0rt86agF-rASxiSC-pyzxWceMMga-ss'
})(MapContainer)
