import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {Marker} from "./Marker";
import * as VehicleDataApi from "../../api/VehicleDataApi";

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            markersData: null
        }
    }

    async componentDidMount() {
        const vehicleData = await VehicleDataApi.getVehiclesLastData();
        // console.log(`vehicleData: ${JSON.stringify(vehicleData)}`);
        this.setState({markersData: vehicleData})
    }

    static defaultProps = {
        center: {
            lat: 56.0,
            lng: 37.8
        },
        zoom: 10
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAJ0rt86agF-rASxiSC-pyzxWceMMga-ss' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    {this.state.markersData && this.state.markersData.map((vehicleData) => (
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
}

export default Map;
