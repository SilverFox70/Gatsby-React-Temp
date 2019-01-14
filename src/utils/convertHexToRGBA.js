const convertHexToRGBA = (hex, opacity = 1) => {
    hex = hex.replace('#','');
    const r = parseInt(hex.substring(0,2), 16);
    const g = parseInt(hex.substring(2,4), 16);
    const b = parseInt(hex.substring(4,6), 16);
    // Assume that if the value is greater
    // than 1, they meant it as a percentage.
    if (opacity > 1) { opacity /= 100;}

    const result = 'rgba('+r+','+g+','+b+','+opacity+')';
    return result;
}

export default convertHexToRGBA;


