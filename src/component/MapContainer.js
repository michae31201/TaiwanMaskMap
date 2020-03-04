import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import peopleIcon from '../img/map-marker.png';

class MapContainer extends React.Component{
    state = {
        mapCenter:[121.512, 25.04],
        userCoords:[121.512, 25.04],
        zoom:15
    }
    static getDerivedStateFromProps(props,state){
        if(props.lat !== state.mapCenter[1] && props.lng !== state.mapCenter[0] && props.lng && props.lat){
           const mapCenter = [props.lng,props.lat];
           return {mapCenter,zoom:20};
        }else{
            return null;
        }
    }

    async componentDidMount(){
        if(window.navigator){
            await navigator.geolocation.getCurrentPosition((position) => {
                const {longitude, latitude} = position.coords; 
                const center = [longitude,latitude];
                this.setState({mapCenter:center,userCoords:center});
            })
        }
    }
    shouldComponentUpdate(nextProp, nextState){
        console.log("should")
        if(nextProp.data.length !== this.props.data.length || nextState.mapCenter[0] !== this.state.mapCenter[0] || nextState.mapCenter[1] !==this.state.mapCenter[1]){
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
        const {mapCenter,userCoords,zoom} = this.state
        const {google} = this.props;
        const stores = this.props.data;
       
        return(
            <Map
                google={google}
                zoom={zoom}
                style={{width:'100%',height:'100vh'}}
                initialCenter={{lng:121.512, lat:25.04}}
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