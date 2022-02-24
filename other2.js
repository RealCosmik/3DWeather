
export function outsideMethod2() {

    let obj;

    fetch(`http://api.weatherapi.com/v1/forecast.json?key=e5fa685f438648b390a181343220302&q=${location}&days=1&aqi=no&alerts=no`)
        .then(response => response.json())
        .then(data => obj = data)
        .then(data => console.log(data));

    const cloud = obj.current.cloud;
    const conditonText = obj.current.conditon.text;
    const feelsLikeF = obj.current.feelslike_f
    const humidity = obj.current.humidity
    // 1 = yes, 0 = no
    const isDay = obj.current.is_day
    const last_updated = obj.current.last_updated







}