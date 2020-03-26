import React from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import MaskContext from '../MaskContext';
import getSquareDist from '../utils/getSquareDist';
import userIcon from '../img/map-marker.png';
import '../css/MapContainer.css';

class MapContainer extends React.Component{   
    state={
        distance:5
    }

    selectStoreMarker = (props) =>{
        const {openStoreInfo} = this.context
        const storeInfo = props.info;
        const position = [props.position.lng, props.position.lat];
        
        openStoreInfo(storeInfo,position,15);
    }

    setSquareDist = (e) => {
        const {setSearchResult, closeStoreInfo} = this.context;
        const distance = Number(e.target.value);
        
        this.setState({distance});
        closeStoreInfo();
        setSearchResult([]);
    }

    render(){
        const {mapCenter, userCoords, zoom, stores, searchResult, selectedStoreName, isInfoWindowShow, closeStoreInfo} = this.context;
        const {distance} = this.state;
        const {google} = this.props;

        return(
            <> 
                <div className="distance">
                    方圓 <input type="number" value={distance} onChange={this.setSquareDist}/> KM
                </div>
                <Map
                    google={google}
                    zoom={zoom}
                    style={{width:'100%',height:'100vh'}}
                    initialCenter={{lng:mapCenter[0], lat:mapCenter[1]}}
                    center={{lng:mapCenter[0], lat:mapCenter[1]}}
                >
            
                    <Marker key="user" 
                            position={{lng:userCoords[0], lat:userCoords[1]}} 
                            icon={{url:userIcon, scaledSize: new google.maps.Size(64,64)}}
                    />  
                    {               
                        !searchResult.length ?//show square distance marker
                            stores
                            .filter((store) => {
                                const [lng,lat] = store.geometry.coordinates;
                                return getSquareDist(userCoords[1],userCoords[0],lat,lng) <= distance;
                            })
                            .map((store) => {
                                const [lng,lat] = store.geometry.coordinates;
                                return <Marker key={store.properties.id} position={{lng, lat}} info={store.properties} onClick={this.selectStoreMarker}/>;
                            })
                            :// show the search result marker
                            searchResult.map((store) => {
                                const [lng, lat] = store.geometry.coordinates;
                                return <Marker key={store.properties.id} position={{lng, lat}} info={store.properties} onClick={this.selectStoreMarker}/>
                            })
                    }
                    
                    <InfoWindow
                            position={{lng:mapCenter[0],lat:mapCenter[1]+0.00007}}
                            visible={isInfoWindowShow}
                            onClose={closeStoreInfo}>
                                <div>
                                    <p>{selectedStoreName}</p>
                                </div>
                    </InfoWindow>
                </Map>
            </>
        )
    }
}

MapContainer.contextType = MaskContext;
export default GoogleApiWrapper({apikey: process.env.REACT_APP_API_KEY})(MapContainer);