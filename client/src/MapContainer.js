import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component{
    constructor(props){
        super(props);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.state ={
            showingInfoWindow: false,
            activeMarker : {}
        }
    }
    onMarkerClick(marker){
        this.setState({
            showingInfoWindow: true,
        })
    }
}