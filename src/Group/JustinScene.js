import { Duck } from "../SceneObjects/Duck.js";
import { Floor } from "../SceneObjects/Floor.js";
import { Text } from "../SceneObjects/Text.js";
import { Sun } from "../SceneObjects/Sun.js";
import { Cloud } from "../SceneObjects/Cloud.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as entry from "../script";
import * as THREE from "three";

var controls;
export function Initalize(scene, camera, canvas) {
    Duck(scene);
    Text(scene);
    Sun(scene);
    Cloud(scene);
    Floor(scene);
    controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0.75, 0);
    controls.enableDamping = true;
    AddLightsToScene(scene);
    entry.RegisterOnSceneUpdate(Update);
}
function AddLightsToScene(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.camera.left = -7;
    directionalLight.shadow.camera.top = 7;
    directionalLight.shadow.camera.right = 7;
    directionalLight.shadow.camera.bottom = -7;
    directionalLight.position.set(-5, 5, 0);
    scene.add(directionalLight);
}
function Update() {
    controls.update();
}