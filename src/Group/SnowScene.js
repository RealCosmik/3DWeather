import {Duck} from "../SceneObjects/Duck.js";
import {Water} from "../SceneObjects/Water.js";
import {Text} from "../SceneObjects/Text.js";
import {Cloud} from "../SceneObjects/Cloud.js";
import {Room} from "../SceneObjects/Room.js";
import windmill from "../SceneObjects/Windmill";
import * as entry from "../script";
import * as THREE from "three";
import * as WeatherHelper from "../WeatherAPI";
import Rain from "../SceneObjects/Rain";
import {WeatherData} from "../WeatherAPI";
import {Camera} from "three";

let newRain = new Rain();
let newWindmill;
let newWater = new Water();
const clock = new THREE.Clock();
var mainCamera = new Camera();

export async function Initalize(scene, camera, canvas) {
    mainCamera = camera;
    scene.background = new THREE.Color(0x53789e);

    var groupModels = new THREE.Group();
    var groupTexts = new THREE.Group();
    var groupSunCloud = new THREE.Group();

    var textLocation = await Text(
        scene,
        WeatherHelper.WeatherData.location.name,
        false
    );
    textLocation.position.set(-2.4, 4, 2);
    textLocation.rotateY(-300);

    var textRegion = await Text(
        scene,
        WeatherHelper.WeatherData.location.region,
        true
    );
    textRegion.position.set(-2.4, 3.25, 2);
    textRegion.rotateY(-300);

    var textCondition = await Text(
        scene,
        WeatherHelper.WeatherData.current.condition.text,
        false
    );
    textCondition.position.set(-2.4, 1.75, 2);
    textCondition.rotateY(-300);

    var textTemperature = await Text(
        scene,
        WeatherHelper.WeatherData.current.temp_f + " °F",
        false
    );
    textTemperature.position.set(-2.4, 1, 2);
    textTemperature.rotateY(-300);

    const newCloud = await Cloud.CreateCloud();
    groupSunCloud.add(newCloud.cloudModel);

    const newDuck = await Duck.CreateNewDuck();
    newDuck.duckModel.scale.set(0.5, 0.5, 0.5);
    newDuck.duckModel.position.set(-0.5, 0, 0.5);
    newWater = await Water.CreateWater();
    //   newWater.waterMaterial.uniforms.uSurfaceColor.value = new THREE.Color("Snow");
    newWater.waterMaterial.uniforms.uDepthColor.value = new THREE.Color("Grey");
    const newRoom = await Room.CreateRoom();

    newWindmill = await windmill.CreateWindmill();
    newWindmill.windmillGroup.position.set(0, 10.5, 0);
    newWindmill.windmillGroup.rotateY(45);
    scene.add(newWindmill.windmillGroup);
    groupModels.add(newDuck.duckModel, newWater.groupModel, newRoom.roomModel);

    groupModels.scale.set(8, 8, 8);
    groupTexts.scale.set(8, 8, 8);
    groupSunCloud.scale.set(8, 8, 8);
    groupSunCloud.position.set(0, 10.5, 0);
    camera.far = 5000;
    camera.position.set(135.7, 56.5, 51.7);

    groupTexts.add(textLocation, textRegion, textCondition, textTemperature);

    const axesHelper = new THREE.AxesHelper(5);
    axesHelper.scale.set(10, 10, 10);
    scene.add(axesHelper);

    scene.add(groupModels, groupTexts, groupSunCloud);

    newRain = await Rain.CreateRain();
    newRain.rainMaterial.color = new THREE.Color("Snow");
    scene.add(newRain.particleRender);
    newRain.particleRender.position.set(0, 0, 50);

    AddLightsToScene(scene);
    entry.RegisterOnSceneUpdate(Update);
}

function AddLightsToScene(scene) {
    const hemisphereLight = new THREE.HemisphereLight(0xadd8e6, 0xffffff, 0.3);
    scene.add(hemisphereLight);

    // const pointLight = new THREE.PointLight(0xff9000, 0.4, 10, 2);
    // scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointWindMillLight = new THREE.PointLight(0xff9000, 0.5);
    scene.add(pointWindMillLight);

    const pointWindMillLightHelper = new THREE.PointLightHelper(
        pointWindMillLight,
        0.2
    );
    pointWindMillLight.position.set(1, 10, 1);
    scene.add(pointWindMillLightHelper);
}

function Update(deltaTime) {
    newRain.DownPour(deltaTime * 20);
    const elapsedTime = clock.getElapsedTime();
    newWater.animateWaves(elapsedTime);
    if (WeatherData.current.wind_mph)
        newWindmill.rotateWindmill(WeatherData.current.wind_mph * deltaTime);
}
