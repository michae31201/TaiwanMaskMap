import React from 'react';
import '../css/SearchModel.css';


class SearchModel extends React.Component{
    state = {
        value:"家音",
        searchReault:[]
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

        this.setState({searchReault:result},console.log(result));
    }
    selectResult = (e) =>{
        const {searchReault} = this.state
        const storeIndex = e.target.closest('div').dataset.index;

        this.props.setCenterCoords(searchReault[storeIndex].geometry.coordinates)
        this.props.setStoreInfo(searchReault[storeIndex].properties);
    }
    render(){
        const {value,searchReault} = this.state;
        return(
            <div className="search-container">
                <div className="search-bar">
                    <input type="search" value={value} onChange={this.inputHandler} placeholder="搜尋..."/>
                    <button onClick={this.searchSubmit}>搜尋</button>
                </div>
                {
                    searchReault.length?
                        <div className="search-result">
                            <div className="result-title">搜尋結果</div>
                            <div className="result-container" onClick={this.selectResult}>
                            {
                                searchReault.map((store,index) => {
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