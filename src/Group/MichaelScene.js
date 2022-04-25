import {Sun} from "../SceneObjects/Sun"
import * as entry from "../script";
import * as THREE from "three";

var deltaY = 0;
var increase = true;
var num = 0;
var sunModel;
const maxMovement = 1;

// noinspection JSUnusedGlobalSymbols
export async function Initalize(scene, camera, canvas) {
    //  entry.ClearExceptCamera();
    entry.RegisterOnSceneUpdate(OnSceneUpdate);
    sunModel = (await Sun.CreateSun()).sunModel;
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

function OnSceneUpdate(deltaTime) {
    deltaY += deltaTime;
    if (increase)
        sunModel.position.y += deltaTime;
    else
        sunModel.position.y -= deltaTime;
    if (deltaY >= maxMovement) {
        increase = !increase;
        deltaY = 0;
    }

}