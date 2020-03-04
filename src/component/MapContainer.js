import React from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import peopleIcon from '../img/map-marker.png';

class MapContainer extends React.Component{   
    shouldComponentUpdate(nextProps){
        if(nextProps.stores.length !== this.props.stores.length 
            || nextProps.mapCenter[0] !== this.props.mapCenter[0] 
            || nextProps.mapCenter[1] !==this.props.mapCenter[1]
            || nextProps.showingInfoWindow!==this.props.showingInfoWindow
            || nextProps.selectedPlaceName!== this.props.selectedPlaceName){
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

    render(){
        const {mapCenter, userCoords, zoom, stores, google, selectedPlaceName, showingInfoWindow} = this.props;
        
        return(
            <Map
                google={google}
                zoom={zoom}
                style={{width:'100%',height:'100vh'}}
                initialCenter={{lng:mapCenter[0], lat:mapCenter[1]}}
                center={{lng:mapCenter[0], lat:mapCenter[1]}}
            >
            <Marker key="people" 
                    position={{lng:userCoords[0], lat:userCoords[1]}} 
                    icon={{url:peopleIcon,scaledSize: new google.maps.Size(64,64)}}
            />  
              {
                stores.length?
                    stores.map((store,index) => {
                        const [lng,lat] = store.geometry.coordinates;
                        return <Marker key={index} position={{lng, lat}} name={store.properties.name} info={store.properties} onClick={this.selectStore}/>;
                    }):null
              }
            <InfoWindow
                    position={{lng:mapCenter[0],lat:mapCenter[1]+0.00007}}
                    visible={showingInfoWindow}>
                        <div>
                            <p>{selectedPlaceName}</p>
                        </div>
            </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({apikey: process.env.REACT_APP_API_KEY})(MapContainer);