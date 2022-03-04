import * as entry from "../script";
import * as THREE from "three";
import * as WeatherHelper from "../WeatherAPI";
export function Initalize(scene, camera, canvas) {
    console.log("rich scene init");
    entry.RegisterOnSceneUpdate(OnSceneUpdate);
}
function OnSceneUpdate(deltaTime) {

}