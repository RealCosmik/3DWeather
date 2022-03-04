import { Duck } from "../SceneObjects/Duck.js";
import { Floor } from "../SceneObjects/Floor.js";
import { Text } from "../SceneObjects/Text.js";
import { Sun } from "../SceneObjects/Sun.js";
import { Cloud } from "../SceneObjects/Cloud.js";
import * as entry from "../script";
import * as THREE from "three";
import * as WeatherHelper from "../WeatherAPI";

var controls;
var sunModel;
var deltaY = 0;
var incrase = true;
const maxMovement = 1;
var num = 0;
export async function Initalize(scene, camera, canvas) {
    await Duck(scene);
    await Text(scene, WeatherHelper.WeatherData.location.name);
    sunModel = await Sun(scene);
    await Cloud(scene);
    await Floor(scene);

    AddLightsToScene(scene);
    entry.RegisterOnSceneUpdate(Update);
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
function Update(deltaTime) {
    deltaY += deltaTime;
    if (incrase)
        sunModel.position.y += deltaTime;
    else
        sunModel.position.y -= deltaTime;
    if (deltaY >= maxMovement) {
        incrase = !incrase;
        deltaY = 0;
    }
}