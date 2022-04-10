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
var globes;
var cloud;

export async function Initalize(scene, camera, canvas) {
  //entry.ClearExceptCamera();

  camera.position.set(0, 0, 75);

  //Creating a group for both the globe and the text to be changed at same time
  const group = new THREE.Group();


  //---THE LINES BELOW ARE GOING TO BE DELETED IN NEXT PUSH
  /*
  //Test Sphere object (only needed for debugging)
  var sphere = new THREE.SphereGeometry(15,32,16);

  //points for point material
  var points = new THREE.PointsMaterial({size: .01, color: "blue"})
  */


  //GLOBE
  globes = await Globe(scene)
  globes.position.set(35, 0, 0);
  group.add(globes);



  //WELCOME TEXT
  var welcomeText = await Text(
    scene,
    "Welcome to 3D Weather! \n Enter a location above."
  );
  //Adjust the scale of JUST the text
  welcomeText.scale.set(5, 5, 5);
  welcomeText.position.set(-15, 0, 0);
  group.add(welcomeText);



  //Cloud
  cloud = await Cloud(scene)
  cloud.scale.set(1.5, 1.5, 1.5);
  cloud.rotateZ(180);
  cloud.position.set(45, 20, 0);
  group.add(cloud);

  //axes helper
  const axesHelper = new THREE.AxesHelper(5);
  axesHelper.scale.set(10, 10, 10)
  scene.add(axesHelper);

  //adding the group to the scene
  scene.add(group);

  AddLightsToScene(scene);
  entry.RegisterOnSceneUpdate(OnSceneUpdate);
}



function AddLightsToScene(scene) {
  const hemisphereLight = new THREE.HemisphereLight(0xadd8e6, 0xffffff, 0.3);
  scene.add(hemisphereLight);

  const pointLight = new THREE.PointLight(0xff9000, 0.4, 10, 2);
  scene.add(pointLight);

  // const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  // scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.set(1024, 1024);
  directionalLight.shadow.camera.far = 285;
  directionalLight.shadow.camera.left = 0;
  directionalLight.shadow.camera.top = 0;
  directionalLight.shadow.camera.right = 0;
  directionalLight.shadow.camera.bottom = 0;
  directionalLight.position.set(-5, 5, 0);
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

  // const directionalLightCameraHelper = new THREE.CameraHelper(
  //   directionalLight.shadow.camera
  // );
  // scene.add(directionalLightCameraHelper);
}

function OnSceneUpdate(deltaTime) {
  deltaY += deltaTime;
  if (increase)
    cloud.position.y += deltaTime * .75;
  else
    cloud.position.y -= deltaTime * .75;
  if (deltaY >= maxMovement) {
    increase = !increase;
    deltaY = 0;
  }
  globes.rotateZ(.004);
}