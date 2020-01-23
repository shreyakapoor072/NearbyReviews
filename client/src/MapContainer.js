import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { fetchUser, fetchRecentBuyers } from './api';


export class MapContainer extends Component{
    constructor(props){
        super(props);
        this.state ={
            showingInfoWindow: false,
            activeMarker : {},
            selectedPlace : {}
        }
        this.points = [
            { lat: 42.02, lng: -77.01 },
            { lat: 42.03, lng: -77.02 },
            { lat: 41.03, lng: -77.04 },
            { lat: 42.05, lng: -77.02 }
        ]
        this.bounds = new this.props.google.maps.LatLngBounds();
        for (var i = 0; i < this.points.length; i++) {
          this.bounds.extend(this.points[i]);
        }
        this.buyerInfo = [];
    }
    onMarkerClick= (props,marker, e) =>
        this.setState({
            showingInfoWindow: true,
            activeMarker : marker,
            selectedPlace : props
        })
    
    onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });
     
    onMapClicked = () => {
        if (this.state.showingInfoWindow)
            this.setState({
            activeMarker: null,
            showingInfoWindow: false
            });
    };

    componentDidMount() {
         fetchRecentBuyers('675147979657').then(data => {
             console.log(data);
         })
    }
    
    render(){
        return (<div>
            <Map style={{
                    maxWidth: "300px",
                    maxHeight: "300px",
                    margin: "30px 10px"
                }}
                google={this.props.google}
                zoom={10}
                initialCenter={{
                    lat: 40.854885,
                    lng: -88.081807
                  }}
                  onClick={this.onMapClicked}
                 >
                <Marker
                    onClick={this.onMarkerClick}
                    name={"Current Location"}
                    
                />
                <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}  onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        </div>)
    }
    //BuyerInfo = {name, position = {lat:37, lng:122}}
    setNearbyBuyer(buyerInfo){
        let markers = [];
        for(let i = 0 ; i< buyerInfo.length; i++){
            markers.push(<Marker
                onClick={this.onMarkerClick}
                name={buyerInfo[i].name}
                position= {buyerInfo[i].position}
            />)
        }
        return markers
    }
}

const LoadingContainer = (props) => (
    <div>Loading....</div>
  )

export default GoogleApiWrapper({
    apiKey: "",
    LoadingContainer: LoadingContainer
  })(MapContainer);

  //AIzaSyCJBz1DbCiMqOqiB6SMVMXnNfLtXBJz5QU