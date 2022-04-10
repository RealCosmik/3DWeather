import * as entry from "../script";
import * as THREE from "three";
import { Vector3 } from "three";
import windmill from "../SceneObjects/Windmill"
import { Cloud } from "../SceneObjects/Cloud"
import { WeatherData } from "../WeatherAPI"
let newWindmill;
export async function Initalize(scene, camera, canvas) {
    newWindmill = new windmill();
    await newWindmill.Intialize(scene);
    AddLightsToScene(scene);
    entry.RegisterOnSceneUpdate(Update);
}

function AddLightsToScene(scene) {
    const hemisphereLight = new THREE.HemisphereLight(0xadd8e6, 0xffffff, 0.3);
    scene.add(hemisphereLight);

    const pointLight = new THREE.PointLight(0xff9000, 0.4, 10, 2);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.camera.left = -7;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.right = 7;
    directionalLight.shadow.camera.bottom = -7;
    directionalLight.position.set(-5, 5, 0);
    scene.add(directionalLight);


}

function Update(deltaTime) {
    if (WeatherData.current.wind_mph)
        newWindmill.rotateWindmill(WeatherData.current.wind_mph * deltaTime);
}
