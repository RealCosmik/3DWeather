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
var cloud1;
var cloud2;
var cloud3;
var cloud4;
var cloud5;

export async function Initalize(scene, camera, canvas) {
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

  groupModels.add(await Duck(scene), await Floor(scene), await Room(scene));

  groupModels.scale.set(8, 8, 8);
  groupTexts.scale.set(8, 8, 8);

  //Creating 5 clouds
  cloud1 = await Cloud(scene)
  cloud2 = await Cloud(scene)
  cloud3 = await Cloud(scene)
  cloud4 = await Cloud(scene)
  cloud5 = await Cloud(scene)


  /*
    -There are multiple clouds in the scene simply clumped together 
    -Individual Cloud scaling, and relative position in relation to one another can be changed
    -position.set will move an individual cloud in the group around
    -grouping of the clouds is below
  */
  //Cloud 1
  cloud1.scale.set(1, 1, 1);
  cloud1.position.set(0,0,0);

  //Cloud 2
  cloud2.scale.set(1, 1, 1);
  cloud2.position.set(5,0,6);

  //Cloud 3
  cloud3.scale.set(1.5, 1.5, 1.8);
  cloud3.position.set(-5,5,0);

  //Cloud 4
  cloud4.scale.set(1.2, 1.2, 1.2);
  cloud4.position.set(4.5,-2.7,9);

  //Cloud 5
  cloud5.scale.set(1, 1, 1);
  cloud5.position.set(-2,0,5);

  //Grouping of clouds for easy movement and manipulation of all of them
  groupClouds.add(cloud1, cloud2, cloud3, cloud4, cloud5)
  
  //Set position of all the coulds
  groupClouds.position.set(0, 42, 0)

  //Adding clouds to scene
  scene.add(groupClouds)

  camera.far = 5000;
  camera.position.set(135, 30, 45);

  groupTexts.add(textLocation, textRegion, textCondition, textTemperature);

  const axesHelper = new THREE.AxesHelper( 5 );
  axesHelper.scale.set(10,10,10)
  scene.add( axesHelper );

  //scene.add(groupModels, groupTexts, groupSunCloud);
  scene.add(groupModels, groupTexts);
  AddLightsToScene(scene);
  // entry.RegisterOnSceneUpdate(Update);
  entry.RegisterOnSceneUpdate(OnSceneUpdate);
}

function AddLightsToScene(scene) {
  const hemisphereLight = new THREE.HemisphereLight(0xadd8e6, 0xffffff, 0.3);
  scene.add(hemisphereLight);

  const pointLight = new THREE.PointLight(0xff9000, 0.4, 10, 2);
  scene.add(pointLight);

//   const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
//   scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.set(1024, 1024);
  directionalLight.shadow.camera.far = 15;
  directionalLight.shadow.camera.left = -7;
  directionalLight.shadow.camera.top = 10;
  directionalLight.shadow.camera.right = 7;
  directionalLight.shadow.camera.bottom = -7;
  directionalLight.position.set(0, 75, 0);
  //directionalLight.
  scene.add(directionalLight);

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
}

function OnSceneUpdate(deltaTime) {
  deltaY += deltaTime;
  if (increase)
      cloud1.position.y += deltaTime,
      cloud2.position.y -= deltaTime,
      cloud3.position.y += deltaTime,
      cloud4.position.y -= deltaTime,
      cloud5.position.y += deltaTime;
  else
      cloud1.position.y -= deltaTime,
      cloud2.position.y += deltaTime,
      cloud3.position.y -= deltaTime,
      cloud4.position.y += deltaTime,
      cloud5.position.y -= deltaTime;
  if (deltaY >= maxMovement) {
      increase = !increase;
      deltaY = 0;
  }
}