// test comment 
import './style.css'
import * as THREE from 'three'
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer(
  { canvas: document.querySelector('#bg') })

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);
const Geometry = new THREE.BoxGeometry(10, 10); // verticies 
const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true });
const cube = new THREE.Mesh(Geometry, material);
scene.add(cube);


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

