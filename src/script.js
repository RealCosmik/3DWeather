import "./style.css";
import * as THREE from "three";
import * as dat from "lil-gui";
import * as JustinScene from "./Group/JustinScene";
import * as MichaelScene from "./Group/MichaelScene";
import * as GithenduScene from "./Group/GithenduScene";
import * as RichScene from "./Group/RichScene";
import * as CloudScene from "./Group/CloudScene";
import * as WeatherHelper from "./WeatherAPI";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const clock = new THREE.Clock();
var scene, camera, canvas, renderer;
let previousTime = 0;
var sceneUpdates = [];
var controls;
var loadStatus = false;
WeatherHelper.fetchWeatherJSON("Boston").then(InitalizeAppData).catch(onErrorRecieved)
export async function LoadScene(zipcode) {
  await WeatherHelper.fetchWeatherJSON(zipcode).then(InitalizeAppData).catch(onErrorRecieved)
  return loadStatus;
}
function onErrorRecieved(reason) {
  let errorData = reason.message.split('*');
  let errorMessage = errorData[0];
  let errorCode = errorData[1];
  switch (errorCode) {
    case "1002":
      alert("Please come back later tech prblms");
      break;
    case "1003":
      alert("enter valid location");
      break;
    case "1005":
      alert(errorMessage);
      break;
    case "1006":
      alert(errorMessage);
      break;
    case "2006":
      alert("Please come back later tech prblms");
      break;
    case "2007":
      alert("we are poor and cant use api anymore sorry");
      break;
    case "2008":
      alert("api key broke");
      break;
    default:
      alert("unkown error try again!");
      break;
  }
}
function InitalizeAppData(response) {
  if (response.error) {
    throw new Error(response.error.message + "*" + response.error.code);
  }
  loadStatus = true;
  // Canvas
  canvas = document.querySelector("canvas.webgl");
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xadd8e6);

  // Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  camera = new THREE.PerspectiveCamera(
    50,
    sizes.width / sizes.height,
    0.1,
    2000
  );
  camera.position.set(10, 10, 10);
  scene.add(camera);

  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0.75, 0);
  controls.enableDamping = true;


  LoadInitalScenes();
  OnSceneUpdate();

}

async function LoadInitalScenes() {
  //await JustinScene.Initalize(scene, camera, canvas);
  await CloudScene.Initalize(scene, camera, canvas);
  //await RichScene.Initalize(scene, camera, canvas);
  //await MichaelScene.Initalize(scene, camera, canvas);
  //await GithenduScene.Initalize(scene, camera, canvas)
}


function OnSceneUpdate() {
  const elapsedTime = clock.getElapsedTime();
  const currentFocus = document.hasFocus();
  var deltaTime;
  if (!currentFocus)
    deltaTime = 0;
  else
    deltaTime = elapsedTime - previousTime;

  previousTime = elapsedTime;
  camera.updateProjectionMatrix();
  controls.update();
  for (let i = 0; i < sceneUpdates.length; i++)
    sceneUpdates[i](deltaTime);
  renderer.render(scene, camera);
  //console.log(camera.position)
  window.requestAnimationFrame(OnSceneUpdate);
}

export function RegisterOnSceneUpdate(updateCallback) {
  sceneUpdates.push(updateCallback);
}
export function ClearExceptCamera() {
  scene.clear();
  scene.add(camera);
}