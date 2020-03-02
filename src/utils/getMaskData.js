
const getMaskData = async () => {
    const response = await fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json');
    const result = await response.json();

    return result.features;
}

export default getMaskData;