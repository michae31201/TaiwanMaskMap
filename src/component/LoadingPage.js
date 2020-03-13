import React from 'react';
import '../css/LoadingPage.css';

const LoadingPage = () => {
    return(
        <div className="loading">
            <p>載入中</p>
            <p className="one">.</p>
            <p className="two">.</p>
            <p className="three">.</p>
            <p className="four">.</p>
            <p className="five">.</p>
        </div>
    )
}

export default LoadingPage;