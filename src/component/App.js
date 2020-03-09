import React from 'react';
import MapContainer from './MapContainer';
import StoreInfo from './StoreInfo';
import SearchModel from './SearchModel';
import '../css/App.css';

class App extends React.Component {
    render(){
      return (
        <div className="App">
          <MapContainer/> 
          <SearchModel />      
          <StoreInfo/>
        </div>
      );
    }
}

export default App;
