import React from 'react';
import MapContainer from './MapContainer';
import getMaskData from '../utils/getMaskData';
import StoreInfo from './StoreInfo';
import SearchModel from './SearchModel';
import '../css/App.css';

class App extends React.Component {
    state = {
      stores:[],
      searchResult:[],
      mapCenter:[121.512, 25.04],
      userCoords:[121.512, 25.04],
      zoom:15,
      storeInfo:null,
      selectedPlaceName:null,
      showingInfoWindow:false
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

    setStoreInfo = (store,position,zoom) =>{
      const center = position;
      this.setState({storeInfo:store,mapCenter:center,zoom});
      this.handleInfoWindow(store.name);
    }
    closeStoreInfo = () =>{
      this.setState({storeInfo:null,selectedPlaceName:null,showingInfoWindow:false});
    }
    handleInfoWindow = (storeName) => {
      this.setState({
          selectedPlaceName:storeName,
          showingInfoWindow:true
      })
    }
    setSearchResult = (stores) => {
      this.setState({searchResult:stores,zoom:11})
    }

  
    render(){
      const {stores, searchResult, storeInfo, mapCenter, userCoords, zoom, selectedPlaceName, showingInfoWindow} = this.state;

      return (
        <div className="App">
          {
            stores.length?
                  <MapContainer stores={stores} 
                              searchResult={searchResult}
                              setStoreInfo={this.setStoreInfo} 
                              mapCenter={mapCenter} 
                              userCoords={userCoords} 
                              zoom={zoom}
                              selectedPlaceName={selectedPlaceName}
                              showingInfoWindow={showingInfoWindow}
                              closeStoreInfo={this.closeStoreInfo}
                              > 
                    <SearchModel stores={stores} setStoreInfo={this.setStoreInfo} setSearchResult={this.setSearchResult}/>      
                    <StoreInfo {...storeInfo} closeStoreInfo={this.closeStoreInfo} />
                  </MapContainer>
                  :<div>地圖載入中...</div>
          }
         
        </div>
      );
    }
}

export default App;
