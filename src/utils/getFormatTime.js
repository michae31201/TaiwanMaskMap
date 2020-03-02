const getFormatTime = (time) => {
    let result = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];

    if(time){
        let timeArray = time.split("、");
        for(let i = 0; i < timeArray.length; i++){
            switch(timeArray[i]){
                case "星期一上午看診":
                    result[0][0] = 1;
                    break;
                case "星期二上午看診":
                    result[0][1] = 1;
                    break;
                case "星期三上午看診":
                    result[0][2] = 1;
                    break;
                case "星期四上午看診":
                    result[0][3] = 1;
                    break;
                case "星期五上午看診":
                    result[0][4] = 1;
                    break;
                case "星期六上午看診":
                    result[0][5] = 1;
                    break;
                case "星期日上午看診":
                    result[0][6] = 1;
                    break;
                case "星期一下午看診":
                    result[1][0] = 1;
                    break;
                case "星期二下午看診":
                    result[1][1] = 1;
                    break;
                case "星期三下午看診":
                    result[1][2] = 1;
                    break;
                case "星期四下午看診":
                    result[1][3] = 1;
                    break;
                case "星期五下午看診":
                    result[1][4] = 1;
                    break;
                case "星期六下午看診":
                    result[1][5] = 1;
                    break;
                case "星期日下午看診":
                    result[1][6] = 1;
                    break;               
                default:
                    break;
            }
        }
    }
    return result;
}

export default getFormatTime;
