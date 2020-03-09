import React from 'react';
import getFormatTime from '../utils/getFormatTime';
import MaskContext from '../MaskContext';
import '../css/StoreInfo.css';

const StoreInfo = (props) => {
    console.log( React.useContext(MaskContext))
    const {storeInfo, closeStoreInfo} = React.useContext(MaskContext);
    const {id, available, name, phone, address, mask_adult, mask_child, note, custom_note, updated} = storeInfo;
    const [morning,afternoon] = getFormatTime(available);
    return(
        <div className={`info ${id ? 'open':""}`}>
            <div className="info-head">
                <button className="info-close" onClick={()=>{closeStoreInfo()}}>&times;</button>
                <p>{name}</p>
            </div>
            <div className="info-body">        
                <p><strong>電話: </strong>{phone}</p>
                <hr/>
                <p><strong>地址: </strong>{address}</p>
                <hr/>
                <div className="mask">
                    <p><strong>口罩數量:</strong></p>
                    <span className={mask_adult?"":"mask-zero"}>成人: {mask_adult}</span>
                    <span className={mask_child?"":"mask-zero"}>兒童: {mask_child}</span>
                </div>
                <hr/>
                <div>
                    <p><strong>營業時間:</strong></p>
                <table rules="all">
                    <thead>
                        <tr>
                            <th></th><th>周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th>周六</th><th>周日</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>上午</td>
                            {
                                morning.map((available, index) => {return <td key={index}>{available?"V":"X"}</td>;})
                            }
                        </tr>
                        <tr>
                            <td>下午</td>
                            {
                                afternoon.map((available, index) => {return <td key={index}>{available?"V":"X"}</td>;})
                            }
                        </tr>
                    </tbody>
                </table>
                </div>
                <hr/>
                <div>
                    <p><strong>備註:</strong></p>
                    <p>{note}</p>
                    <p>{custom_note}</p>
                </div>
                
            </div>
            
            <div className="info-foot">最後更新時間: {updated}</div>
        </div>
    )
    
       
}

export default StoreInfo;