import * as entry from "../script";
import * as THREE from "three";
import * as WeatherHelper from "../WeatherAPI";
import * as SceneLoader from "../script"
import { Duck } from "../SceneObjects/Duck";
import { Globe } from "../SceneObjects/Globe";
import { Cloud } from "../SceneObjects/Cloud";
import { Text } from "../SceneObjects/Text.js";


var deltaY = 0;
var increase = true;
var maxMovement = 1;
var globe;
var cloud;

//Spotlight has to be global to update it's target location
const spotLight = new THREE.SpotLight(0xffffff, 10, 75, .25, 0, 1);

export async function Initalize(scene, camera, canvas) {
  //entry.ClearExceptCamera();

  camera.position.set(0, 0, 75);

  //Creating a group for both the globe and the text to be changed at same time
  const group = new THREE.Group();



  //GLOBE
  // globe = await Globe.CreateGlobe();
  // globe.globeModel.position.set(35, 0, 0);
  // group.add(globe.globeModel);

  console.log(globe.globeModel);



  //WELCOME TEXT
  var welcomeText = await Text(
    scene,
    "Welcome to 3D Weather! \n Enter a location above.",
    false
  );
  //Adjust the scale of JUST the text
  welcomeText.scale.set(5, 5, 5);
  welcomeText.position.set(-15, 0, 0);
  group.add(welcomeText);



  //Cloud
  cloud = await Cloud.CreateCloud();
  cloud.cloudModel.scale.set(1.5, 1.5, 1.5);
  globe.globeModel.add(cloud.cloudModel);
  cloud.cloudModel.position.x = 45;
  cloud.cloudModel.position.y = 27;
  cloud.cloudModel.rotateX(1);



  //axes helper
  // const axesHelper = new THREE.AxesHelper(5);
  // axesHelper.scale.set(10, 10, 10)
  // scene.add(axesHelper);



  //adding the group to the scene
  scene.add(group);



  AddLightsToScene(scene);
  entry.RegisterOnSceneUpdate(OnSceneUpdate);
}


function AddLightsToScene(scene) {

  //Hemisphere light is really to make the cloud look good
  const hemisphereLight = new THREE.HemisphereLight(0xadd8e6, 0xffffff, 1);
  scene.add(hemisphereLight);

  //Spotlight points right at the globe
  spotLight.position.set(10, 0, 50);
  //Pointing the spotlight right at the center of the globe
  spotLight.target.position.set(35, 0, 0);
  //Updating the coordinate matrix for the spotlight so it points right at the globe
  spotLight.target.updateMatrixWorld();
  scene.add(spotLight);

  const spotLightHelper = new THREE.SpotLightHelper(spotLight, 0.2);
  //scene.add(spotLightHelper);

}

function OnSceneUpdate(deltaTime) {
  //BounceCloud(cloud.cloudModel, deltaTime);
  //cloud.cloudModel.rotateZ(.002);
  globe.globeModel.rotateY(-.004);
}
function BounceCloud(cloudModel, deltaTime) {
  deltaY += deltaTime;
  if (increase)
    cloudModel.position.y += deltaTime * .75;
  else
    cloudModel.position.y -= deltaTime * .75;
  if (deltaY >= maxMovement) {
    increase = !increase;
    deltaY = 0;
  }
}