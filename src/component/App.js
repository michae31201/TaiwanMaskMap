import React from 'react';
import MapContainer from './MapContainer';
import getMaskData from '../utils/getMaskData';
import StoreInfo from './StoreInfo';
import SearchModel from './SearchModel';
import '../css/App.css';

class App extends React.Component {
    state = {
      stores:[],
      lng:null,
      lat:null,
      storeInfo:null
    }

    async componentDidMount(){
      const storeData = await getMaskData();
      this.setState({stores:storeData})
    }
    setStoreInfo = (store) =>{
      console.log(store)
      this.setState({storeInfo:store});
    }
    closeStoreInfo = () =>{
      this.setState({storeInfo:null});
    }
    setCenterCoords = (coords) =>{
      this.setState({lng:coords[0],lat:coords[1]});
    }

    render(){
      const {stores,storeInfo,lat,lng} = this.state;
      
      return (
        <div className="App">
          {
            stores.length?<MapContainer data={stores} setStoreInfo={this.setStoreInfo} lat={lat} lng={lng}/>:null
          }
          <SearchModel stores={stores} setStoreInfo={this.setStoreInfo} setCenterCoords={this.setCenterCoords}/>      
          <StoreInfo {...storeInfo} closeStoreInfo={this.closeStoreInfo} />
        </div>
      );
    }
}

export default App;
