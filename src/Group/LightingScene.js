// noinspection JSUnusedLocalSymbols

import * as entry from "../script";
import * as THREE from "three";
import {Vector3} from "three";
import * as dat from "lil-gui";
import {WeatherData} from "../WeatherAPI";
import {Sun} from "../SceneObjects/Sun";


let RotationFolder;
let gui;
let directionalLight;
let rotationData;
let sun = new Sun();
let lightGroup = new THREE.Group();

export async function Initialize(scene, camera, canvas) {
    sun = await Sun.CreateSun();
    sun.sunMaterial.transparent = true;
    entry.RegisterOnSceneUpdate(update);
    gui = new dat.GUI({width: 300});
    rotationData = {};
    rotationData.angle = 2;
    rotationData.manualControl = false;
    rotationData.speed = 0.1;
    rotationData.pivot = new Vector3(0, 42, 0);
    rotationData.origin = new Vector3(0, -12, 80);
    const lightFolder = gui.addFolder("Light Data");
    AddLightsToScene(scene, lightFolder);
    RotationFolder = gui.addFolder("rotation Data");
    rotationData.angleControl = RotationFolder.add(
        rotationData,
        "angle",
        0,
        360,
        0.5
    );
    RotationFolder.add(rotationData, "manualControl", 0, 1, 1);
    const pivotFolder = RotationFolder.addFolder("pivot");
    pivotFolder.add(rotationData.pivot, "x", -100, 100, 0.5);
    pivotFolder.add(rotationData.pivot, "y", -100, 100, 0.5);
    pivotFolder.add(rotationData.pivot, "z", -100, 100, 0.5);
    const originFolder = RotationFolder.addFolder("origin");
    originFolder.add(rotationData.origin, "x", -100, 100, 0.5);
    originFolder.add(rotationData.origin, "y", -100, 100, 0.5);
    originFolder.add(rotationData.origin, "z", -100, 100, 0.5);
    sun.sunModel.position.set(0, 100, 0);
    sun.sunModel.scale.set(0.5, 0.5, 0.5);
    scene.add(sun.sunModel);
}

function AddLightsToScene(scene, lightFolder) {
    const hemisphereLight = new THREE.HemisphereLight(0xadd8e6, 0xffffff, 0.3);
    // rotationData.mainLight = hemisphereLight;
    //lightGroup.add(hemisphereLight);

    const pointLight = new THREE.PointLight(0xff9000, 0.4, 10, 2);
    // rotationData.mainLight = pointLight
    //lightGroup.add(pointLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    //rotationData.mainLight = ambientLight;
    //. lightGroup.add(ambientLight);

    directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.camera.left = -7;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.right = 7;
    directionalLight.shadow.camera.bottom = -7;
    rotationData.origin;
    rotationData.mainLight = directionalLight;
    lightFolder.addColor(rotationData.mainLight, "color", 1);
    rotationData.intensityControl = lightFolder.add(
        rotationData.mainLight,
        "intensity",
        0,
        1,
        0.0055
    );
    lightGroup.add(directionalLight);
    const hemisphereLightHelper = new THREE.HemisphereLightHelper(
        hemisphereLight,
        0.2
    );
    //  scene.add(hemisphereLightHelper);

    // const directionalLightHelper = new THREE.DirectionalLightHelper(
    //     directionalLight,
    //     10
    // );
    // scene.add(directionalLightHelper);

    const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
    //scene.add(pointLightHelper);

    // const directionalLightCameraHelper = new THREE.CameraHelper(
    //     directionalLight.shadow.camera
    // );
    // scene.add(directionalLightCameraHelper);
    scene.add(lightGroup);
}

function RotateAroundPoint(pivot, origin, angle) {
    angle = (angle * Math.PI) / 180;
    const xFactor = Math.cos(angle);
    const yFactor = Math.sin(angle);
    const xNew =
        xFactor * (origin.x - pivot.x) - yFactor * (origin.y - pivot.y) + pivot.x;
    const yNew =
        yFactor * (origin.x - pivot.x) + xFactor * (origin.y - pivot.y) + pivot.y;
    return new Vector3(xNew, yNew, 0);
}

function GetElaspedHours() {
    // this assumes that weather api always keeps the format of "2022-04-25 02:30"
    // I know that the first character is the space.
    const dateString = WeatherData.current.last_updated.substring(
        10,
        WeatherData.current.last_updated.length
    );
    const dateData = dateString.split(":");
    const hour = parseInt(dateData[0]);
    const minutesInHour = parseInt(dateData[1]) / 60;
    var totalHours = hour + minutesInHour;
    return totalHours / 24;
}

function update(deltaTime) {
    const percentHours = GetElaspedHours();
    const newAngle = percentHours * 360;
    const newPos = RotateAroundPoint(
        rotationData.pivot,
        rotationData.origin,
        rotationData.angle
    );
    lightGroup.position.set(newPos.x, newPos.y, rotationData.origin.z);
    sun.sunModel.position.set(newPos.x, newPos.y, rotationData.origin.z);
    if (!rotationData.manualControl) {
        rotationData.angle = newAngle;
        const newIntensity = (rotationData.angle / 180) * 0.6;
        rotationData.mainLight.intensity = newIntensity;
        sun.sunMaterial.opacity = newIntensity;
    }
    rotationData.angleControl.updateDisplay();
    rotationData.intensityControl.updateDisplay();
}

export function CleanUp() {
    gui?.destroy();
}
