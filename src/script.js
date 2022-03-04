import "./style.css";
import * as THREE from "three";
import * as dat from "lil-gui";
import * as JustinScene from "./Group/JustinScene";
import * as MichaelScene from "./Group/MichaelScene";

const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");
// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xadd8e6);

let mixer = null;

var onSceneTick = [];
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

const camera = new THREE.PerspectiveCamera(
  50,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(10, 10, 10);
scene.add(camera);

// Controls

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

function tick() {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Model animation
  if (mixer) {
    mixer.update(deltaTime);
  }
  for (let i = 0; i < onSceneTick.length; i++) {
    onSceneTick[i](deltaTime);
  }
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

JustinScene.Initalize(scene, camera, canvas);
MichaelScene.Initalize(scene, camera, canvas);

export function RegisterOnSceneUpdate(sceneListener) {
  onSceneTick.push(sceneListener);
}