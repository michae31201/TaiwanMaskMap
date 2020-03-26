import React from 'react';
import MaskContext from '../MaskContext';
import getSquareDist from '../utils/getSquareDist';
import '../css/SearchModel.css';

class SearchModel extends React.Component{
    state = {
        value:"", //"家音"
    }

    inputHandler = (e) => {
        if(e.key === "Enter"){
            this.searchSubmit();
        }
        const value = e.target.value;
        this.setState({value});
    }
    searchSubmit = () => {
        const storeName = this.state.value;
        if(storeName !== ""){
            const {stores, setSearchResult} = this.context;
            let result = stores.filter((store) => {          
                return store.properties.name.includes(storeName);
            })

            setSearchResult(result);
        }else{
            alert("請輸入搜尋名稱");
        }
            
    }
    selectResult = (e) =>{
        const {searchResult, openStoreInfo} = this.context;
        const index = e.target.closest('div').dataset.index;
        const position = searchResult[index].geometry.coordinates;
        
        openStoreInfo(searchResult[index].properties, position, 20);
    }
    closeSearchResult = () =>{
        const {setSearchResult} = this.context;
        
        setSearchResult([]);
    }
    render(){
        const {value} = this.state;
        const {searchResult, userCoords} = this.context;
        return(
            <div className="search-container">
                <div className="search-bar">
                    <input type="search" value={value} onChange={this.inputHandler} onKeyPress={this.inputHandler} placeholder="搜尋..."/>
                    <button onClick={this.searchSubmit}>搜尋</button>
                </div>
                {
                    searchResult.length?
                        <div className="search-result">
                            <div className="result-title">
                                搜尋結果
                                <button className="info-close" onClick={this.closeSearchResult}>&times;</button>
                            </div>
                            <div className="result-container" onClick={this.selectResult}>
                            {
                                searchResult
                                .sort((storeA,storeB) => {
                                    const [aLng,aLat] = storeA.geometry.coordinates;
                                    const [bLng,bLat] = storeB.geometry.coordinates;
                                    
                                    return getSquareDist(userCoords[1],userCoords[0],aLat,aLng) - getSquareDist(userCoords[1],userCoords[0],bLat,bLng);
                                })
                                .map((store,index) => {
                                    const {id, name, address} = store.properties
                                    const {coordinates} = store.geometry;
                                    return <div className="result-info" key={id} data-index={index} >
                                                <p className="result-info-name">{name}</p>
                                                <p>{getSquareDist(userCoords[1],userCoords[0],coordinates[1],coordinates[0])} KM</p>
                                                <p>{address}</p>
                                           </div>
                                })
                            }
                            </div>
                        </div>:null
                }
            </div>
        )
    }
}
SearchModel.contextType = MaskContext;
export default SearchModel;