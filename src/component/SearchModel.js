import React from 'react';
import '../css/SearchModel.css';


class SearchModel extends React.Component{
    state = {
        value:"家音",
        searchResult:[]
    }

    inputHandler = (e) => {
        const value = e.target.value;
        this.setState({value});
    }
    searchSubmit = () => {
        const searchStore = this.state.value;
        const {stores} = this.props;
        let result = stores.filter((store) => {          
            return store.properties.name.includes(searchStore);
        })

        this.setState({searchResult:result},console.log(result));
    }
    selectResult = (e) =>{
        const {searchResult} = this.state
        const storeIndex = e.target.closest('div').dataset.index;

        this.props.setCenterCoords(searchResult[storeIndex].geometry.coordinates)
        this.props.setStoreInfo(searchResult[storeIndex].properties);
    }
    closeSearchResult = () =>{
        console.log("close")
        this.setState({searchResult:[]})
    }
    render(){
        const {value,searchResult} = this.state;
        return(
            <div className="search-container">
                <div className="search-bar">
                    <input type="search" value={value} onChange={this.inputHandler} placeholder="搜尋..."/>
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
                                searchResult.map((store,index) => {
                                    const {id, name, address} = store.properties
                                    return <div className="result-info" key={id} data-index={index} >
                                                <p className="result-info-name">{name}</p>
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

export default SearchModel;