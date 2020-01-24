import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { fetchRecentBuyers, fetchUsers } from '../../api';
import queryString from 'query-string';
import './map.css';

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
        this.getRecentBuyers();
    }

    async getRecentBuyers() {
        const { pogId, userId } = this.setParams(this.props);
        let userIds, userData;
       await fetchRecentBuyers(pogId).then( data => {
           userIds = data
        })

        if(userIds && userIds.indexOf(parseInt(userId)) === -1){
            userIds.push(userId);
        }

        await fetchUsers().then(userInfo => {
            userData = userInfo.filter(item => {
                if(userIds && userIds.indexOf(item.userId) !== -1) {
                    return item
                }
            })
        })
       
        this.setState({
            markerData: userData
        })

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
        return (<div >
            <Map className='map-container'
                google={this.props.google}
                zoom={13}
                initialCenter={{
                    lat: 28.408561189492,
                    lng: 77.08244685083629
                  }}
                  onClick={this.onMapClicked}
                 >
                <Marker
                    onClick={this.onMarkerClick}
                    name={"Chat With kshitiz rohatgi"}
                    label={this.getUserInitials("kshitiz rohatgi")}
                    icon={this.blueDotIcon}
                />
                {this.setNearbyBuyer()}
                <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}  onClose={this.onInfoWindowClose}>
                    {/* <div className="infomarker">
                        <img src="https://n1h2.sdlcdn.com/imgs/b/f/c/ug_chat-bubble_24px_1579784165386.png"></img>
                        <a href="#" className="chat-with-user">{this.state.selectedPlace.name}</a>
                    </div> */}
                    <div className="informarker">
                        <div className="markerbox">
                            <div className="infomarker__initial">{this.getUserInitials("Kshitiz rohatgi")}</div>
                            <div className="informarker__userbox">
                                <h3>Kshitiz Rohatgi</h3>
                                <p><span>Rating:</span> 5 Star </p>
                            </div>
                        </div>
                        <div className="infomarker__footer">
                                <ul>
                                    <a href="/chat"><li>Open Chat</li></a>
                                    <li>View Product</li>
                                    <li>Earn Snapcash</li>
                                </ul>
                            </div>
                    </div>
                </InfoWindow>
            </Map>
        </div>)
    }
    //BuyerInfo = {name, position = {lat:37, lng:122}}
    setNearbyBuyer(){
        let buyerInfo = this.state.markerData;
        let markers = [];
        const markerLen = buyerInfo.length;
        if(markerLen > 0) {
            for(let i = 0 ; i< markerLen; i++){
                const position = {
                    lat: buyerInfo[i].lat,
                    lng: buyerInfo[i].long
                }
                markers.push(<Marker
                    onClick={this.onMarkerClick}
                    name={buyerInfo[i].name}
                    position= {position}
                />)
            }
            return markers
        }   
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