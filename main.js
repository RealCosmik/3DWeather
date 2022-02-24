// test comment 
import './style.css'
import * as THREE from 'three'
import * as OTHER from "./other.js"
import {outsideMethod2} from "./other2";
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer(
  { canvas: document.querySelector('#bg') })

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
const Geometry = new THREE.BoxGeometry(10, 10); // verticies 
const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true });
const cube = new THREE.Mesh(Geometry, material);
scene.add(cube);


const location = 'london';

outsideMethod2()

fetch(`http://api.weatherapi.com/v1/forecast.json?key=e5fa685f438648b390a181343220302&q=${location}&days=1&aqi=no&alerts=no`)
  .then(response => response.json())
  .then(data => console.log(data));

animate();


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

