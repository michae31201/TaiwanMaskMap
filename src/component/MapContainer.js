import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import peopleIcon from '../img/map-marker.png';

class MapContainer extends React.Component{
    shouldComponentUpdate(nextProps){
        console.log("should")
        if(nextProps.stores.length !== this.props.stores.length || nextProps.mapCenter[0] !== this.props.mapCenter[0] || nextProps.mapCenter[1] !==this.props.mapCenter[1]){
            console.log("yes")
            return true;
        }else{
            console.log("no")
            return false;
        }
    }
    selectStore = (props) =>{
        const storeInfo = props.info;
        //onst [lng, lat] = props.geometry;
        //this.setState({lng,lat});
        this.props.setStoreInfo(storeInfo);
    }

    render(){
        const {mapCenter, userCoords, zoom, stores, google} = this.props;

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
                    icon={{url:peopleIcon,scaledSize: new google.maps.Size(64,64)}}/>           
              {
                stores.length?
                    stores.map((store,index) => {
                        const [lng,lat] = store.geometry.coordinates;
                        return <Marker key={index} position={{lng, lat}} info={store.properties} onClick={this.selectStore}/>;
                    }):null
              }
            </Map>
        )
    }
}

export default GoogleApiWrapper({apikey: process.env.REACT_APP_API_KEY})(MapContainer);