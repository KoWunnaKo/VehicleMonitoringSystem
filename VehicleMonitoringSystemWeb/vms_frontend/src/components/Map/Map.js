import React, {useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import {Marker} from "./Marker";

function Map(props) {
    const [markersData, setMarkersData] = useState();
    const [trajectoryData, setTrajectoryData] = useState();

    useEffect(() => {
        (async function() {
            setMarkersData(props.markersData);
            setTrajectoryData(props.trajectoryData);
        })();
    }, [props.markersData, props.trajectoryData]);

    const defaultProps = {
        center: {
            lat: 56.0,
            lng: 37.8
        },
        zoom: 10
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAJ0rt86agF-rASxiSC-pyzxWceMMga-ss' }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}

                Dra
            >
                {markersData && markersData.map((vehicleData) => (
                    <Marker
                        key={vehicleData.id}
                        lat={+vehicleData.latitude}
                        lng={+vehicleData.longitude}
                        name={vehicleData.vehicle.name}
                    />
                ))}

            </GoogleMapReact>
        </div>
    );
}

export default Map;
