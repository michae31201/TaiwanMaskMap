import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends React.Component{
    state = {
        lng:121.512,
        lat:25.04
    }

    async componentDidMount(){
        if(window.navigator){
            await navigator.geolocation.getCurrentPosition((position) => {
                const {longitude, latitude} = position.coords;               
                this.setState({lng: longitude, lat: latitude});
            })
        }
    }
    shouldComponentUpdate(nextProp, nextState){
        if(nextProp.data.length !== this.props.data.length || nextState.lng !== this.state.lng || nextState.lat !==this.state.lat){
            return true;
        }else{
            return false;
        }
    }
    selectStore = (props) =>{
        const storeInfo = props.info;
        this.props.setStoreInfo(storeInfo);
    }

    render(){
        const {lat,lng} = this.state
        const stores = this.props.data;
       
        return(
            <Map
                google={this.props.google}
                zoom={15}
                style={{width:'100%',height:'100vh'}}
                initialCenter={{lng:121.512, lat:25.04}}
                center={{lat, lng}}
            >
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