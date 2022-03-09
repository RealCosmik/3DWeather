import { Duck } from "../SceneObjects/Duck.js";
import { Floor } from "../SceneObjects/Floor.js";
import { Text } from "../SceneObjects/Text.js";
import { Cloud } from "../SceneObjects/Cloud.js";
import { Room } from "../SceneObjects/Room.js";
import * as entry from "../script";
import * as THREE from "three";
import * as WeatherHelper from "../WeatherAPI";


var floorModel;
var roomModel;

var textLocation;
var textTemperature;
var textRegion;
var textCondition;


export async function Initalize(scene, camera, canvas) {
    scene.background = new THREE.Color(0x53789E);

    textLocation = await Text(scene, WeatherHelper.WeatherData.location.name);
    textLocation.position.set(-2.4, 4, 2)
    textLocation.rotateY(-300)

    textRegion = await Text(scene, WeatherHelper.WeatherData.location.region);
    textRegion.position.set(-2.4, 3, 2)
    textRegion.rotateY(-300)

    textCondition = await Text(scene, WeatherHelper.WeatherData.current.condition.text);
    textCondition.position.set(-2.4, 2, 2)
    textCondition.rotateY(-300)

    textTemperature = await Text(scene, WeatherHelper.WeatherData.current.temp_f);
    textTemperature.position.set(-2.4, 1, 2)
    textTemperature.rotateY(-300)

    await Duck(scene);
    await Cloud(scene);
    floorModel = await Floor(scene);
    roomModel = await Room(scene);
    AddLightsToScene(scene);
    entry.RegisterOnSceneUpdate(Update);
}
function AddLightsToScene(scene) {
    const hemisphereLight = new THREE.HemisphereLight(0xadd8e6, 0xffffff, 0.3)
    scene.add(hemisphereLight);

    const pointLight = new THREE.PointLight(0xff9000, 0.4, 10, 2)
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

    const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
    scene.add(hemisphereLightHelper)

    const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
    scene.add(directionalLightHelper)

    const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
    scene.add(pointLightHelper)

    const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
    scene.add(directionalLightCameraHelper)
}
function Update(deltaTime) {

}