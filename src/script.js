import "./style.css";
import * as THREE from "three";
import * as dat from "lil-gui";
import * as JustinScene from "./Group/JustinScene";
import * as MichaelScene from "./Group/MichaelScene";
import * as GithenduScene from "./Group/GithenduScene";
import * as RichScene from "./Group/RichScene";
import * as WeatherHelper from "./WeatherAPI";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const clock = new THREE.Clock();
var scene, camera, canvas, renderer;
let previousTime = 0;
var sceneUpdates = [];
var controls;
WeatherHelper.fetchWeatherJSON("02119").then(InitalizeAppData)

function InitalizeAppData() {
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
    100
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
  await JustinScene.Initalize(scene, camera, canvas);
  await MichaelScene.Initalize(scene, camera, canvas);
  await RichScene.Initalize(scene, camera, canvas)
  await GithenduScene.Initalize(scene, camera, canvas)
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
  controls.update();
  for (let i = 0; i < sceneUpdates.length; i++)
    sceneUpdates[i](deltaTime);
  renderer.render(scene, camera);

  window.requestAnimationFrame(OnSceneUpdate);
}

export function RegisterOnSceneUpdate(updateCallback) {
  sceneUpdates.push(updateCallback);
}
export function ClearExceptCamera() {
  scene.clear();
  scene.add(camera);
}