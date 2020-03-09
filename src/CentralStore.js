import React from 'react';
import App from './component/App';
import MaskContext from './MaskContext';
import getMaskData from './utils/getMaskData';

class CentralStore extends React.Component{
    state = {
        stores:[],
        searchResult:[],
        mapCenter:[121.512, 25.04],
        userCoords:[121.512, 25.04],
        zoom:15,
        storeInfo:{},
        selectedStoreName:null,
        isInfoWindowShow:false
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
  
      openStoreInfo = (store,position,zoom) =>{
        const center = position;
        this.setState({storeInfo:store,mapCenter:center,zoom});
        this.openInfoWindow(store.name);
      }
      closeStoreInfo = () =>{
        this.setState({storeInfo:{},selectedStoreName:null,isInfoWindowShow:false});
      }
      openInfoWindow = (storeName) => {
        this.setState({
            selectedStoreName:storeName,
            isInfoWindowShow:true
        })
      }
      setSearchResult = (stores) => {
        this.setState({searchResult:stores, zoom:11, isInfoWindowShow:false})
      }
      render(){
          const {stores, searchResult, mapCenter, userCoords, zoom, storeInfo, selectedStoreName, isInfoWindowShow} = this.state;
          const {openStoreInfo, closeStoreInfo, showInfoWindow, setSearchResult} = this;
          return(
            <MaskContext.Provider value={{stores,
                                          searchResult,
                                          mapCenter,
                                          userCoords,
                                          zoom,
                                          storeInfo,
                                          selectedStoreName,
                                          isInfoWindowShow,
                                          openStoreInfo,
                                          closeStoreInfo,
                                          showInfoWindow,
                                          setSearchResult}}>
                {
                    stores.length ? 
                        <App/> : <div>地圖載入中...</div>
                }
            </MaskContext.Provider>
          )
      }
}

export default CentralStore;