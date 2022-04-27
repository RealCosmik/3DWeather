// noinspection CommaExpressionJS

import {Text} from "../SceneObjects/Text.js";
import {Cloud} from "../SceneObjects/Cloud.js";
import {Room} from "../SceneObjects/Room.js";
import * as entry from "../script";
import * as THREE from "three";
import * as WeatherHelper from "../WeatherAPI";
import {WeatherData} from "../WeatherAPI";
import {Grass} from "../SceneObjects/Grass.js";
import windmill from "../SceneObjects/Windmill";

var deltaY = 0;
var increase = true;
const maxMovement = 1;

//Initializing 5 clouds
var cloud1;
var cloud2;
var cloud3;
var cloud4;
var cloud5;

//initialize Windmill
let newWindmill;

//Initialize grass
let grass = new Grass();

export async function Initalize(scene, camera, canvas) {
    entry.PlayAudio("/sounds/birds.mp3");
    scene.background = new THREE.Color(0x53789e);
    var groupModels = new THREE.Group();
    var groupTexts = new THREE.Group();
    var groupClouds = new THREE.Group();

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

    const newRoom = await Room.CreateRoom();
    newWindmill = await windmill.CreateWindmill();
    newWindmill.windmillGroup.position.set(0, 10.5, 0);
    newWindmill.windmillGroup.rotateY(45);
    scene.add(newWindmill.windmillGroup);
    groupModels.add(newRoom.roomModel);

    groupModels.scale.set(8, 8, 8);
    groupTexts.scale.set(8, 8, 8);

    //Creating 5 clouds
    cloud1 = await Cloud.CreateCloud();
    cloud2 = await Cloud.CreateCloud();
    cloud3 = await Cloud.CreateCloud();
    cloud4 = await Cloud.CreateCloud();
    cloud5 = await Cloud.CreateCloud();

    /*
      -There are multiple clouds in the scene simply clumped together
      -Individual Cloud scaling, and relative position in relation to one another can be changed
      -position.set will move an individual cloud in the group around
      -grouping of the clouds is below
    */
    //Cloud 1
    cloud1.cloudModel.scale.set(1, 1, 1);
    cloud1.cloudModel.position.set(0, 0, 0);

    //Cloud 2
    cloud2.cloudModel.scale.set(1, 1, 1);
    cloud2.cloudModel.position.set(5, 0, 6);

    //Cloud 3
    cloud3.cloudModel.scale.set(1.5, 1.5, 1.8);
    cloud3.cloudModel.position.set(-5, 5, 0);

    //Cloud 4
    cloud4.cloudModel.scale.set(1.2, 1.2, 1.2);
    cloud4.cloudModel.position.set(4.5, -2.7, 9);

    //Cloud 5
    cloud5.cloudModel.scale.set(1, 1, 1);
    cloud5.cloudModel.position.set(-2, 0, 5);

    //Grouping of clouds for easy movement and manipulation of all of them
    groupClouds.add(
        cloud1.cloudModel,
        cloud2.cloudModel,
        cloud3.cloudModel,
        cloud4.cloudModel,
        cloud5.cloudModel
    );

    //Set position of all the coulds
    groupClouds.position.set(0, 42, 0);

    //Adding clouds to scene
    scene.add(groupClouds);

    camera.far = 5000;
    camera.position.set(135, 30, 45);

    groupTexts.add(textLocation, textRegion, textCondition, textTemperature);

    scene.add(groupModels, groupTexts);
    grass = await Grass.CreateGrass(canvas);
    grass.grassGroup.scale.set(0.7, 1, 0.7);
    scene.add(grass.grassGroup);

    AddLightsToScene(scene);
    entry.RegisterOnSceneUpdate(OnSceneUpdate);
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
    directionalLight.position.set(0, 75, 0);

    scene.add(directionalLight);
}

function OnSceneUpdate(deltaTime) {
    deltaY += deltaTime;

    //This giant if/else is to make the animation of the clouds (they bounce up and down)
    if (increase)
        (cloud1.cloudModel.position.y += deltaTime),
            (cloud2.cloudModel.position.y -= deltaTime),
            (cloud3.cloudModel.position.y += deltaTime),
            (cloud4.cloudModel.position.y -= deltaTime),
            (cloud5.cloudModel.position.y += deltaTime);
    else
        (cloud1.cloudModel.position.y -= deltaTime),
            (cloud2.cloudModel.position.y += deltaTime),
            (cloud3.cloudModel.position.y -= deltaTime),
            (cloud4.cloudModel.position.y += deltaTime),
            (cloud5.cloudModel.position.y -= deltaTime);
    if (deltaY >= maxMovement) {
        increase = !increase;
        deltaY = 0;
    }
    if (WeatherData.current.wind_mph) {
        newWindmill.rotateWindmill(WeatherData.current.wind_mph * deltaTime);
        grass.swayGrass(deltaTime * WeatherData.current.wind_mph);
    }
}
