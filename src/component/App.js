import React from 'react';
import MapContainer from './MapContainer';
import StoreInfo from './StoreInfo';
import SearchModel from './SearchModel';
import '../css/App.css';

const App = () => {
  return (
    <div className="App">
      <MapContainer/> 
      <SearchModel />      
      <StoreInfo/>
    </div>
  );
}

export default App;
