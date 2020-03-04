import React from 'react';
import MapContainer from './MapContainer';
import getMaskData from '../utils/getMaskData';
import StoreInfo from './StoreInfo';
import SearchModel from './SearchModel';
import '../css/App.css';

class App extends React.Component {
    state = {
      stores:[],
      mapCenter:[121.512, 25.04],
      userCoords:[121.512, 25.04],
      zoom:15,
      storeInfo:null
    }

    async componentDidMount(){    
      const storeData = await getMaskData();
      this.setState({stores:storeData});

      if(window.navigator){
        await navigator.geolocation.getCurrentPosition((position) => {
            const {longitude, latitude} = position.coords; 
            const center = [longitude,latitude];
            this.setState({mapCenter:center,userCoords:center});
        })
      }
    }

    setStoreInfo = (store) =>{
      console.log(store)
      this.setState({storeInfo:store});
    }
    closeStoreInfo = () =>{
      this.setState({storeInfo:null});
    }
    setCenterCoords = (coords) =>{
      this.setState({mapCenter:coords,zoom:20});
    }

    render(){
      const {stores, storeInfo, mapCenter, userCoords, zoom} = this.state;
      
      return (
        <div className="App">
          {
            stores.length?
              <MapContainer stores={stores} setStoreInfo={this.setStoreInfo} mapCenter={mapCenter} userCoords={userCoords} zoom={zoom}/>:null
          }
          <SearchModel stores={stores} setStoreInfo={this.setStoreInfo} setCenterCoords={this.setCenterCoords}/>      
          <StoreInfo {...storeInfo} closeStoreInfo={this.closeStoreInfo} />
        </div>
      );
    }
}

export default App;
