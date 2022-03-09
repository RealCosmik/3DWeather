import { Duck } from "../SceneObjects/Duck";
import { Sun } from "../SceneObjects/Sun"
import * as entry from "../script";
import * as WeatherHelper from "../WeatherAPI";
import * as THREE from "three";
export async function Initalize(scene, camera, canvas) {
    //  entry.ClearExceptCamera();
    entry.RegisterOnSceneUpdate(OnSceneUpdate);
}
function AddLightsToScene(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.camera.left = -7;
    directionalLight.shadow.camera.top = 7;
    directionalLight.shadow.camera.right = 7;
    directionalLight.shadow.camera.bottom = -7;
    directionalLight.position.set(-5, 5, 0);
    scene.add(directionalLight);
}
var currentTime = 0
const maxTime = 500;
function OnSceneUpdate(deltaTime) {
    currentTime += deltaTime;
    if (currentTime >= maxTime) {
        // dostuff;
        currentTime = 0;
    }
}