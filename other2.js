
export function outsideMethod2() {

    let obj;

    fetch(`http://api.weatherapi.com/v1/forecast.json?key=e5fa685f438648b390a181343220302&q=${location}&days=1&aqi=no&alerts=no`)
        .then(response => response.json())
        .then(data => obj = data)
        .then(data => console.log(data));




}