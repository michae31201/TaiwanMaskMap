import React from 'react';
import MapContainer from './MapContainer';
import getMaskData from '../utils/getMaskData';
import StoreInfo from './StoreInfo';
import '../css/App.css';

class App extends React.Component {
    state = {
      stores:[],
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

    render(){
      const {stores,storeInfo} = this.state;
      
      return (
        <div className="App">
          {
            stores.length?<MapContainer data={stores} setStoreInfo={this.setStoreInfo}/>:null
          }      
          <StoreInfo {...storeInfo} closeStoreInfo={this.closeStoreInfo} />
        </div>
      );
    }
}

export default App;
