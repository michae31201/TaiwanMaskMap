import React from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import '../css/MapContainer.css';
import userIcon from '../img/map-marker.png';

class MapContainer extends React.Component{   
    state={
        dist:10
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.stores.length !== this.props.stores.length 
            || nextProps.mapCenter[0] !== this.props.mapCenter[0] 
            || nextProps.mapCenter[1] !==this.props.mapCenter[1]
            || nextProps.showingInfoWindow!==this.props.showingInfoWindow
            || nextProps.selectedPlaceName!== this.props.selectedPlaceName
            || nextState.dist !== this.state.dist
            || nextProps.searchResult !== this.props.searchResult){
            return true;
        }else{
            return false;
        }
    }
    selectStore = (props) =>{
        const storeInfo = props.info;
        const position = [props.position.lng, props.position.lat];
        
        this.props.setStoreInfo(storeInfo,position,15);
    }

    searchSquareDist =  (lat1, lng1, lat2, lng2) => {
        var radLat1 = lat1 * Math.PI / 180.0;
        var radLat2 = lat2 * Math.PI / 180.0;
        var a = radLat1 - radLat2;
        var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137;
        s = Math.round(s * 10000) / 10000;
        return s
    };
    setSquareDist = (e) => {
        const dist = Number(e.target.value);
        this.setState({dist});
    }

    render(){
        const {mapCenter, userCoords, zoom, stores, searchResult, google, selectedPlaceName, showingInfoWindow, closeStoreInfo} = this.props;
        const {dist} = this.state;

        return(
            <Map
                google={google}
                zoom={zoom}
                style={{width:'100%',height:'100vh'}}
                initialCenter={{lng:mapCenter[0], lat:mapCenter[1]}}
                center={{lng:mapCenter[0], lat:mapCenter[1]}}
            >
            {this.props.children}   
            <div className="distance">
                方圓 <input type="number" value={dist}  style={{width:"2rem"}} onChange={this.setSquareDist}/> KM
            </div>
            <Marker key="people" 
                    position={{lng:userCoords[0], lat:userCoords[1]}} 
                    icon={{url:userIcon,scaledSize: new google.maps.Size(64,64)}}
            />  
              {
                
                !searchResult.length ?//show square distance marker
                    stores
                    .filter((store) => {
                        const [lng,lat] = store.geometry.coordinates;
                        return this.searchSquareDist(userCoords[1],userCoords[0],lat,lng) <= dist;
                    })
                    .map((store) => {
                        const [lng,lat] = store.geometry.coordinates;
                        return <Marker key={store.properties.id} position={{lng, lat}} info={store.properties} onClick={this.selectStore}/>;
                    })
                    :// show the search result marker
                    searchResult.map((store) => {
                        const [lng, lat] = store.geometry.coordinates;
                        return <Marker key={store.properties.id} position={{lng, lat}} info={store.properties} onClick={this.selectStore}/>
                    })
              }
            
            <InfoWindow
                    position={{lng:mapCenter[0],lat:mapCenter[1]+0.00007}}
                    visible={showingInfoWindow}
                    onClose={closeStoreInfo}>
                        <div>
                            <p>{selectedPlaceName}</p>
                        </div>
            </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({apikey: process.env.REACT_APP_API_KEY})(MapContainer);