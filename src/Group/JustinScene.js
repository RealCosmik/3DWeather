import { Duck } from "../SceneObjects/Duck.js";
import { Floor } from "../SceneObjects/Floor.js";
import { Text } from "../SceneObjects/Text.js";
import { Cloud } from "../SceneObjects/Cloud.js";
import { Room } from "../SceneObjects/Room.js";
import windmill from "../SceneObjects/Windmill";
import * as entry from "../script";
import * as THREE from "three";
import * as WeatherHelper from "../WeatherAPI";
import { Sun } from "../SceneObjects/Sun.js";
import Rain from "../SceneObjects/Rain";
import { WeatherData } from "../WeatherAPI";
import { Grass } from "../SceneObjects/Grass.js";
// hello
let newRain;
let newWindmill;
const clock = new THREE.Clock();
var grass = new Grass();
export async function Initalize(scene, camera, canvas) {
  entry.PlayAudio("/sounds/birds.mp3");
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
  const sun = await Sun.CreateSun();
  groupSunCloud.add(newCloud.cloudModel, sun.sunModel);
  //const newDuck = await Duck.CreateNewDuck();
  const newFloor = await Floor.CreateFloor();
  const newRoom = await Room.CreateRoom();
  newWindmill = await windmill.CreateWindmill();
  newWindmill.windmillGroup.position.set(0, 10.5, 0);
  newWindmill.windmillGroup.rotateY(45);
  scene.add(newWindmill.windmillGroup);
  groupModels.add(newFloor.floorModel, newRoom.roomModel);

  groupModels.scale.set(8, 8, 8);
  groupTexts.scale.set(8, 8, 8);
  groupSunCloud.scale.set(8, 8, 8);
  groupSunCloud.position.set(0, 10.5, 0);
  camera.far = 5000;
  camera.position.set(135.7, 56.5, 51.7);

  groupTexts.add(textLocation, textRegion, textCondition, textTemperature);

  scene.add(groupModels, groupTexts, groupSunCloud);
  grass = await Grass.CreateGrass(canvas);
  grass.grassGroup.scale.set(0.7, 1, 0.7);
  scene.add(grass.grassGroup);
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
  if (WeatherData.current.wind_mph) {
    newWindmill.rotateWindmill(WeatherData.current.wind_mph * deltaTime);
    grass.swayGrass(deltaTime * WeatherData.current.wind_mph);
  }
}
