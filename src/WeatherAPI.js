
var cachedJson;
export { cachedJson as WeatherData }
export async function fetchWeatherJSON(location) {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=e5fa685f438648b390a181343220302&q=${location}&days=1&aqi=no&alerts=no`);
    cachedJson = await response.json();
    console.log(cachedJson);
    return cachedJson;
}

/*
fetchWeatherJSON().then(obj => {
    // current weather data
    console.log(obj)
    const cloud = obj.current.cloud;
    const condition_text = obj.current.condition.text;
    const feelsLike_f = obj.current.feelslike_f;
    const humidity = obj.current.humidity;
    // 1 = yes, 0 = no
    const is_day = obj.current.is_day;
    const last_updated = obj.current.last_updated;
    const precip_in = obj.current.precip_in;
    const precip_mm = obj.current.precip_mm;
    const temp_f = obj.current.temp_f;
    const uv = obj.current.uv;
    const wind_degree = obj.current.wind_degree;
    const wind_dir = obj.current.wind_dir;
    const wind_mph = obj.current.wind_mph;

    // location data
    const country = obj.location.country;
    const lat = obj.location.lat;
    const localtime = obj.location.localtime;
    const localtime_epoch = obj.location.localtime_epoch;
    const lon = obj.location.lon;
    const name = obj.location.name;
    const region = obj.location.region;
    const tz_id = obj.location.tz_id;
});
*/
/**
 * @param {number} obj.forecast.forecastday.astro.moon_illumination - Moon illumination as %
 * @param {string} obj.forecast.forecastday.astro.moon_phase - Moon phases. Value returned: New Moon, Waxing Crescent, First Quarter, Waxing Gibbous, Full Moon, Waning Gibbous, Last Quarter, Waning Crescent
 * @param {string} obj.forecast.forecastday.astro.moonrise - Moonrise time
 * @param {string} obj.forecast.forecastday.astro.moonset - Moonset time
 * @param {string} obj.forecast.forecastday.astro.sunrise - Sunrise time
 * @param {string} obj.forecast.forecastday.astro.sunset - Sunset time
 * @param {string} obj.forecast.forecastday.date - Forecast date
 * @param {number} obj.forecast.forecastday.day.avgtemp_f - Average temperature in fahrenheit for the day
 * @param {number} obj.forecast.forecastday.day.daily_chance_of_rain - Chance of rain as percentage
 * @param {number} obj.forecast.forecastday.day.daily_chance_of_snow - Chance of snow as percentage
 * @param {number} obj.forecast.forecastday.day.daily_will_it_rain - 1 = Yes 0 = No; Will it will rain or not
 * @param {number} obj.forecast.forecastday.day.daily_will_it_snow - 1 = Yes 0 = No; Will it snow or not
 * @param {number} obj.forecast.forecastday.day.maxtemp_f - Maximum temperature in fahrenheit for the day
 * @param {number} obj.forecast.forecastday.day.maxwind_mph - Maximum wind speed in miles per hour
 * @param {number} obj.forecast.forecastday.day.mintemp_f - Minimum temperature in fahrenheit for the day
 * @param {number} obj.forecast.forecastday.day.totalprecip_in - Total precipitation in inches
 *
 */
    // forecast data

/*
void function setForecastDay(day) {

    fetchWeatherJSON().then(obj => {
        //astro
        const moon_illumination = obj.forecast.forecastday[day].astro.moon_illumination;
        const moon_phase = obj.forecast.forecastday[day].astro.moon_phase;
        const moonrise = obj.forecast.forecastday[day].astro.moonrise;
        const moonset = obj.forecast.forecastday[day].astro.moonset;
        const sunrise = obj.forecast.forecastday[day].astro.sunrise;
        const sunset = obj.forecast.forecastday[day].astro.sunset;

        const date = obj.forecast.forecastday[day].date;

        //weather
        const avgtemp_f = obj.forecast.forecastday[day].day.avgtemp_f;
        const forecast_condition_text = obj.forecast.forecastday[day].day.condition.text;
        const daily_chance_of_rain = obj.forecast.forecastday[day].day.daily_chance_of_rain;
        const daily_chance_of_snow = obj.forecast.forecastday[day].day.daily_chance_of_snow;
        const daily_will_it_rain = obj.forecast.forecastday[day].day.daily_will_it_rain;
        const daily_will_it_snow = obj.forecast.forecastday[day].day.daily_will_it_snow;
        const maxtemp_f = obj.forecast.forecastday[day].day.maxtemp_f;
        const maxwind_mph = obj.forecast.forecastday[day].day.maxwind_mph;
        const mintemp_f = obj.forecast.forecastday[day].day.mintemp_f;
        const totalprecip_in = obj.forecast.forecastday[day].day.totalprecip_in;
        const uv = obj.forecast.forecastday[day].day.uv;
    });
}

*/