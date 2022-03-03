import * as THREE from "three";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader.js";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js";
import {mainScene} from "../script";
import {fetchWeatherJSON} from "../other2.js";

export function Text() {

    const location = 'london';

    /**
     * @param {Object} obj - WeatherAPI.com JSON response
     * @param {Object} obj.current - Current weather object
     * @param {number} obj.current.cloud - Cloud cover as percentage
     * @param {string} obj.current.condition.text - Weather condition text
     * @param {number} obj.current.feelslike_f - Feels like temperature in fahrenheit
     * @param {number} obj.current.humidity - Humidity as percentage
     * @param {number} obj.current.is_day - 1 = Yes 0 = No; Whether to show day condition icon or night icon
     * @param {string} obj.current.last_updated - Local time when the real time data was updated.
     * @param {number} obj.current.precip_in - Precipitation amount in inches
     * @param {number} obj.current.precip_mm - Precipitation amount in millimeters
     * @param {number} obj.current.temp_f - Temperature in fahrenheit
     * @param {number} obj.current.wind_degree - Wind direction in degrees
     * @param {string} obj.current.wind_dir - Wind direction as 16 point compass. e.g.: NSW
     * @param {number} obj.current.wind_mph - Wind speed in miles per hour
     * @param {string} obj.location.country - Location country
     * @param {number} obj.location.lat - Latitude in decimal degree
     * @param {string} obj.location.localtime - Local date and time
     * @param {number} obj.location.localtime_epoch - Local date and time in unix time
     * @param {number} obj.location.lon - Longitude in decimal degree
     * @param {string} obj.location.tz_id - Time zone name
     */
    fetchWeatherJSON(location).then(obj => {
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
        /**
         * Fonts
         */
        const fontLoader = new FontLoader();

        fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
            const textGeometry = new TextGeometry("Boston", {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5,
            });
            const textMaterial = new THREE.MeshBasicMaterial({wireframe: true});
            const text = new THREE.Mesh(textGeometry, textMaterial);
            mainScene.add(text);
        });
    });
}