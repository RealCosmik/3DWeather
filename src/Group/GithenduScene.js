// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {Text} from "../SceneObjects/Text.js";
import {Room} from "../SceneObjects/Room.js";
import windmill from "../SceneObjects/Windmill";
import * as entry from "../script";
import * as THREE from "three";
import * as WeatherHelper from "../WeatherAPI";
import {WeatherData} from "../WeatherAPI";
import {Grass} from "../SceneObjects/Grass.js";

let newWindmill;

let mainCamera;

let grassMaterial;
let groundShader;
let radius;
let pos;
var grass = new Grass();
const clock = new THREE.Clock();

export async function Initalize(scene, camera, canvas) {

    mainCamera = camera;
    entry.PlayAudio("/sounds/wind.wav");
    scene.background = new THREE.Color(0x53789e);
    var groupModels = new THREE.Group();
    var groupTexts = new THREE.Group();

    var textLocation = await Text(scene, WeatherHelper.WeatherData.location.name);
    textLocation.position.set(-2.4, 4, 2);
    textLocation.rotateY(-300);

    var textRegion = await Text(scene, WeatherHelper.WeatherData.location.region, true);
    textRegion.position.set(-2.4, 3.25, 2);
    textRegion.rotateY(-300);

    var textCondition = await Text(
        scene,
        WeatherHelper.WeatherData.current.condition.text, false
    );
    textCondition.position.set(-2.4, 1.75, 2);
    textCondition.rotateY(-300);

    var textTemperature = await Text(
        scene,
        WeatherHelper.WeatherData.current.temp_f + " °F"
    );
    textTemperature.position.set(-2.4, 1, 2);
    textTemperature.rotateY(-300);

    //const newFloor = await Floor.CreateFloor();
    const newRoom = await Room.CreateRoom();

    newWindmill = await windmill.CreateWindmill();
    newWindmill.windmillGroup.position.set(0, 10.5, -13);
    newWindmill.windmillGroup.rotateY(45);

    scene.add(newWindmill.windmillGroup);
    groupModels.add(newRoom.roomModel);

    groupModels.scale.set(8, 8, 8);
    groupTexts.scale.set(8, 8, 8);

    camera.far = 5000;
    camera.position.set(135.7, 56.5, 51.7);

    groupTexts.add(textLocation, textRegion, textCondition, textTemperature);

    //const axesHelper = new THREE.AxesHelper(5);
    //axesHelper.scale.set(10, 10, 10);
    //scene.add(axesHelper);

    scene.add(groupModels, groupTexts);

    AddLightsToScene(scene);
    //AddGrassToScene(scene, canvas);
    grass = await Grass.CreateGrass(canvas);
    scene.add(grass.grassGroup);
    entry.RegisterOnSceneUpdate(Update);
}

function AddLightsToScene(scene) {

    const hemisphereLight = new THREE.HemisphereLight(0xadd8e6, 0xffffff, 0.3);
    scene.add(hemisphereLight);

    // const pointLight = new THREE.PointLight(0xff9000, 0.4, 10, 2);
    // scene.add(pointLight);

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
    //  scene.add(directionalLight);
    /*
    const hemisphereLightHelper = new THREE.HemisphereLightHelper(
        hemisphereLight,
        0.2
    );
    scene.add(hemisphereLightHelper);

    const directionalLightHelper = new THREE.DirectionalLightHelper(
        directionalLight,
        0.2
    );
    scene.add(directionalLightHelper);

    const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
    scene.add(pointLightHelper);

    const directionalLightCameraHelper = new THREE.CameraHelper(
        directionalLight.shadow.camera
    );
    scene.add(directionalLightCameraHelper);

     */
}

function Update(deltaTime) {
    if (WeatherData.current.wind_mph) {
        newWindmill.rotateWindmill(WeatherData.current.wind_mph * deltaTime);
        grass.swayGrass(deltaTime * WeatherData.current.wind_mph);
    }
}
