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
            apiDataFetched: false,
            markerData: [],
            showDialog: false,
            currUserData: {}
        }
        this.blueDotIcon = {
            url: 'https://n1h2.sdlcdn.com/imgs/b/f/c/ug_localization_1579784498734.png'
        }
        this.buyerInfo = [];
        this.radius = 10;
    }

    getNearbyUsers (currLat, currLng, recentPurchasedUser, radius_km){
        let google = window.google;
        let add_curr_usr_latlng = new google.maps.LatLng(currLat, currLng);
        let nearByUserIds = [];
        for(let i = 0 ;i < recentPurchasedUser.length; i++){
            let marker_latlng = new google.maps.LatLng(recentPurchasedUser[i].lat , recentPurchasedUser[i].long);
            let distanceFrmCurrUser = google.maps.geometry.spherical.computeDistanceBetween(add_curr_usr_latlng, marker_latlng);
            if(distanceFrmCurrUser <= radius_km *1000){
                nearByUserIds.push(recentPurchasedUser[i]._id);
            }
        }
    }
    componentDidUpdate(prevProp){
        if(!this.state.showDialog && this.props.location.hash.includes('modal')){
            this.setState({
                showDialog: true
            })
        }
        this.getNearbyUsers(this.state.currUserData.lat,this.state.currUserData.long, this.state.markerData , this.radius);
    }
    onMarkerClick= (props,marker, e) =>{
        if(!props.currentUsr)
        this.setState({
            showingInfoWindow: true,
            activeMarker : marker,
            selectedPlace : props
        })
        let buyerData = this.state.markerData.filter((item)=>{
            if(item.userId === props.userId){
                return item;
            }
        })
        window.localStorage.setItem('buyerInfo', JSON.stringify(buyerData.length > 0 && buyerData[0]));
    }
    
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
        const { pogId, userId : currUserId } = this.setParams(this.props);
        this.pogId = pogId;
        let userIds, userData, currUserData;
       await fetchRecentBuyers(pogId).then( data => {
           userIds = data
        })
        userIds = userIds.filter(item=>{
            if(item.userId !== parseInt(currUserId)){
                return item;
            }
        })
        await fetchUsers().then(userInfo => {
            userData = userInfo.filter(item => {
                if(userIds && userIds.indexOf(item.userId) !== -1) {
                    return item;
                }
            })
            currUserData = userInfo.filter(item=>{
                if(parseInt(currUserId) === item.userId){
                    return item;
                }
            })
        })
       

        this.setState({
            markerData: userData, 
            currUserData: currUserData && currUserData[0]
        })
        window.localStorage.setItem('userInfo', JSON.stringify(this.state.currUserData));
    }
    
    getUserInitials(fullName){
        if(fullName === undefined)
            return;
        let names = fullName.split(' ');
        let initials = '';
        names.forEach((item)=>{
            initials += item[0]
        })
        return initials.toUpperCase();
    }

    render(){
        if(this.state.markerData === undefined ){
            return;
        }
        return (<div >
            <Map className='map-container'
                google={this.props.google}
                zoom={13}
                center={{
                    lat: this.state.currUserData.lat,
                    lng: this.state.currUserData.long
                  }}
                  onClick={this.onMapClicked}
                 >
                <Marker
                    onClick={this.onMarkerClick}
                    icon={this.blueDotIcon}
                    currentUsr = {true}
                    position ={{
                        lat: this.state.currUserData.lat,
                        lng: this.state.currUserData.long
                      }}
                />
                {this.setNearbyBuyer()}
                <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}  onClose={this.onInfoWindowClose}>
                    <div className="informarker">
                        <div className="markerbox">
                            <div className="infomarker__initial">{this.getUserInitials(this.state.selectedPlace.name)}</div>
                            <div className="informarker__userbox">
                                <h3>{"Chat With " + this.state.selectedPlace.name}</h3>
                                <p><span>Likes:</span> 5 </p>
                            </div>
                        </div>
                        <div className="infomarker__footer">
                                <ul>
                                    <a href={`/chat?dialog=true&pogId=${this.pogId}&userId=${this.state.currUserData.userId}`}><li>Open Chat</li></a>
                                    <a href="https://m.snapdeal.com/product/x/622934948144"><li>View Product</li></a>
                                    <a href="/earnHelp"><li>Earn Snapcash</li></a>
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
                    label = {this.getUserInitials(buyerInfo[i].name)}
                    key ={i}
                    userId = {buyerInfo[i].userId}
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
    apiKey: '',
    LoadingContainer: LoadingContainer,
    libraries: ['geometry']
  })(MapContainer);

  //AIzaSyCJBz1DbCiMqOqiB6SMVMXnNfLtXBJz5QU
  //