import { Duck } from "../SceneObjects/Duck.js";
import { Floor } from "../SceneObjects/Floor.js";
import { Text } from "../SceneObjects/Text.js";
import { Cloud } from "../SceneObjects/Cloud.js";
import { Room } from "../SceneObjects/Room.js";
import * as entry from "../script";
import * as THREE from "three";
import * as WeatherHelper from "../WeatherAPI";
import { Sun } from "../SceneObjects/Sun.js";

var deltaY = 0;
var increase = true;
const maxMovement = 1;

var newCloud;
var newCloud2;
var newCloud3;
var newCloud4;
var newCloud5; 

//const spotLight = new THREE.SpotLight(0xffff99, 3, 165, .25, 0, 1, 1);

export async function Initalize(scene, camera, canvas) {
  
  entry.PlayAudio("/sounds/birds.mp3");

  scene.background = new THREE.Color(0x53789e);
  var groupModels = new THREE.Group();
  var groupTexts = new THREE.Group();
  var groupClouds = new THREE.Group();

  var textLocation = await Text(scene, WeatherHelper.WeatherData.location.name, false);
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
    WeatherHelper.WeatherData.current.temp_f + " °F",
    false
  );
  textTemperature.position.set(-2.4, 1, 2);
  textTemperature.rotateY(-300);

  newCloud = await Cloud.CreateCloud();
  newCloud2 = await Cloud.CreateCloud();
  newCloud3 = await Cloud.CreateCloud();
  newCloud4 = await Cloud.CreateCloud();
  newCloud5 = await Cloud.CreateCloud();
  const newDuck = await Duck.CreateNewDuck();
  const newFloor = await Floor.CreateFloor();
  newFloor.floorModel.receiveShadow=true;
  const newRoom = await Room.CreateRoom();
  newRoom.roomModel.receiveShadow=true;

  groupModels.add(newDuck.duckModel, newFloor.floorModel, newRoom.roomModel);

  groupModels.scale.set(8, 8, 8);
  groupTexts.scale.set(8, 8, 8);

  /*
    -There are multiple clouds in the scene simply clumped together 
    -Individual Cloud scaling, and relative position in relation to one another can be changed
    -position.set will move an individual cloud in the group around
    -grouping of the clouds is below
  */
  //Cloud 1
  newCloud.cloudModel.scale.set(1, 1, 1);
  newCloud.cloudModel.position.set(0,0,0);

  //Cloud 2
  newCloud2.cloudModel.scale.set(1, 1, 1);
  newCloud2.cloudModel.position.set(5,0,6);

  //Cloud 3
  newCloud3.cloudModel.scale.set(1.5, 1.5, 1.8);
  newCloud3.cloudModel.position.set(-5,5,0);

  //Cloud 4
  newCloud4.cloudModel.scale.set(1.2, 1.2, 1.2);
  newCloud4.cloudModel.position.set(4.5,-2.7,9);

  //Cloud 5
  newCloud5.cloudModel.scale.set(1, 1, 1);
  newCloud5.cloudModel.position.set(-2,0,5);

  //Grouping of clouds for easy movement and manipulation of all of them
  groupClouds.add(newCloud.cloudModel, newCloud2.cloudModel, newCloud3.cloudModel, newCloud4.cloudModel, newCloud5.cloudModel);
  groupClouds.castShadow =true;
  groupClouds.receiveShadow=false;
  
  //Set position of all the coulds
  groupClouds.position.set(0, 42, 0)

  //Adding clouds to scene
  scene.add(groupClouds)

  camera.far = 5000;
  camera.position.set(135, 30, 45);

  groupTexts.add(textLocation, textRegion, textCondition, textTemperature);

  const axesHelper = new THREE.AxesHelper( 5 );
  axesHelper.scale.set(10,10,10)
  //scene.add( axesHelper );

  scene.add(groupModels, groupTexts);
  AddLightsToScene(scene);

  entry.RegisterOnSceneUpdate(OnSceneUpdate);
}

function AddLightsToScene(scene) {

  const spotLight = new THREE.SpotLight(0xffff99, 3, 165, .35, 0, 1, 1);
  spotLight.castShadow = true;

  spotLight.position.set(25, 130, 25);

  spotLight.target.position.set(0,0,0);

  //Updating the coordinate matrix for the spotlight so it points right at the globe
  spotLight.target.updateMatrixWorld();
  scene.add(spotLight);

  spotLight.shadow.mapSize.width = 512; // default
  spotLight.shadow.mapSize.height = 512; // default
  spotLight.shadow.camera.near = 0.5; // default
  spotLight.shadow.camera.far = 500; // default
  spotLight.shadow.focus = 1; // default

  const spotLightHelper = new THREE.SpotLightHelper(spotLight, 0.2);
  //scene.add(spotLightHelper);
}


function OnSceneUpdate(deltaTime) {
  deltaY += deltaTime;
  if (increase)
      newCloud.cloudModel.position.y += deltaTime,
      newCloud2.cloudModel.position.y -= deltaTime,
      newCloud3.cloudModel.position.y += deltaTime,
      newCloud4.cloudModel.position.y -= deltaTime,
      newCloud5.cloudModel.position.y += deltaTime;
  else
      newCloud.cloudModel.position.y -= deltaTime,
      newCloud2.cloudModel.position.y += deltaTime,
      newCloud3.cloudModel.position.y -= deltaTime,
      newCloud4.cloudModel.position.y += deltaTime,
      newCloud5.cloudModel.position.y -= deltaTime;
  if (deltaY >= maxMovement) {
      increase = !increase;
      deltaY = 0;
  }
  
}