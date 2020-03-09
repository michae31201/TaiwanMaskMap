import React from 'react';
import '../css/SearchModel.css';


class SearchModel extends React.Component{
    state = {
        value:"", //"家音"
       // searchResult:[]
    }

    inputHandler = (e) => {
        if(e.key === "Enter"){
            this.searchSubmit();
        }
        const value = e.target.value;
        this.setState({value});
    }
    searchSubmit = () => {
        const searchStore = this.state.value;
        if(searchStore !== ""){
            const {stores} = this.props;
            let result = stores.filter((store) => {          
                return store.properties.name.includes(searchStore);
            })

            //this.setState({searchResult:result});
            this.props.setSearchResult(result);
        }else{
            alert("請輸入搜尋名稱");
        }
            
    }
    selectResult = (e) =>{
        const {searchResult} = this.state
        const storeIndex = e.target.closest('div').dataset.index;
        const position = this.props.searchResult[storeIndex].geometry.coordinates;
        
        this.props.setStoreInfo(this.props.searchResult[storeIndex].properties,position,20);
    }
    closeSearchResult = () =>{
       // this.setState({searchResult:[]})
        this.props.setSearchResult([]);
    }
    render(){
        const {value,searchResult} = this.state;
        return(
            <div className="search-container">
                <div className="search-bar">
                    <input type="search" value={value} onChange={this.inputHandler} onKeyPress={this.inputHandler} placeholder="搜尋..."/>
                    <button onClick={this.searchSubmit}>搜尋</button>
                </div>
                {
                    this.props.searchResult.length?
                        <div className="search-result">
                            <div className="result-title">
                                搜尋結果
                                <button className="info-close" onClick={this.closeSearchResult}>&times;</button>
                            </div>
                            <div className="result-container" onClick={this.selectResult}>
                            {
                                this.props.searchResult.map((store,index) => {
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