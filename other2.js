export function outsideMethod2() {

    const location = 'london'

    async function fetchWeatherJSON() {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=e5fa685f438648b390a181343220302&q=${location}&days=1&aqi=no&alerts=no`);
        console.log(response);
        return await response.json();
    }
    /**
     * @param obj
     * @param obj.current
     * @param obj.current.cloud
     * @param obj.current.condition.text
     * @param obj.current.feelslike_f
     * @param obj.current.humidity
     * @param obj.current.humidity
     * @param obj.current.is_day
     * @param obj.current.last_updated
     * @param obj.current.precip_in
     * @param obj.current.precip_mm
     * @param obj.current.temp_f
     * @param obj.current.wind_degree
     * @param obj.current.wind_dir;
     * @param obj.current.wind_mph;
     * @param obj.location.country;
     * @param obj.location.lat;
     * @param obj.location.localtime;
     * @param obj.location.localtime_epoch;
     * @param obj.location.lon;
     * @param obj.location.tz_id;
     */
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

    /**
     * @param obj.forecast.forecastday.astro.moon_illumination
     * @param obj.forecast.forecastday.astro.moon_phase
     * @param obj.forecast.forecastday.astro.moonrise
     * @param obj.forecast.forecastday.astro.moonset
     * @param obj.forecast.forecastday.astro.sunrise;
     * @param obj.forecast.forecastday.astro.sunset
     * @param obj.forecast.forecastday.date
     * @param obj.forecast.forecastday.day.avgtemp_f
     * @param obj.forecast.forecastday.day.daily_chance_of_rain
     * @param obj.forecast.forecastday.day.daily_chance_of_snow
     * @param obj.forecast.forecastday.day.daily_will_it_rain
     * @param obj.forecast.forecastday.day.daily_will_it_snow
     * @param obj.forecast.forecastday.day.maxtemp_f
     * @param obj.forecast.forecastday.day.maxwind_mph
     * @param obj.forecast.forecastday.day.mintemp_f
     * @param obj.forecast.forecastday.day.totalprecip_in;
     *
     */
    // forecast data
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


}