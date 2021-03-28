import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, {Component} from 'react';

export class NewMap extends Component {
    render() {
        return (
            <Map google={this.props.google} zoom={14}>

                <Marker
                    name={'Current location'} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAJ0rt86agF-rASxiSC-pyzxWceMMga-ss'
})(NewMap)
