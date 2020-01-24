import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { fetchRecentBuyers, fetchUsers } from '../../api';
import queryString from 'query-string';

import './map.css';
import { userInfo } from 'os';

export class MapContainer extends Component{
    constructor(props){
        super(props);
        //this.setParams(props);
        this.state ={
            showingInfoWindow: false,
            activeMarker : {},
            selectedPlace : {},
            markerData: []
        }
        this.blueDotIcon = {
            url: 'https://n1h2.sdlcdn.com/imgs/b/f/c/ug_localization_1579784498734.png'
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

    setParams(props){
        let params={};
        if(props){
            let url = this.props.location.search;
            params = queryString.parse(url);
        }
        return params;
    }

    componentDidMount() {
        //fetch pog id from url remove this hardcoded one
        const { pogId, userId } = this.setParams(this.props);

        const userData = this.getRecentBuyers();

        this.setState({
            markerData: userData
        })

    }

    async getRecentBuyers() {
        const { pogId, userId } = this.setParams(this.props);
        let userIds, userData;
       await fetchRecentBuyers(pogId).then( data => {
           userIds = data
        })

        if(userIds.indexOf(parseInt(userId)) === -1){
            userIds.push(userId);
        }

        await fetchUsers().then(userInfo => {
            userData = userInfo.filter(item => {
                if(userIds.indexOf(item.userId) !== -1) {
                    return item
                }
            })
        })

        return userData;

    }
    
   
    getUserInitials(fullName){
        let names = fullName.split(' ');
        let initials = '';
        names.forEach((item)=>{
            initials += item[0]
        })
        return initials.toUpperCase();
    }

    render(){
        const { markerData} = this.state;
        return (<div >
            <Map className='map-container'
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
                    name={"Chat With kshitiz rohatgi"}
                    label={this.getUserInitials("kshitiz rohatgi")}
                    icon={this.blueDotIcon}
                />
                <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}  onClose={this.onInfoWindowClose}>
                    <div>
                        <img src="https://n1h2.sdlcdn.com/imgs/b/f/c/ug_chat-bubble_24px_1579784165386.png"></img>
                        <a href="#" class="chat-with-user">{this.state.selectedPlace.name}</a>
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