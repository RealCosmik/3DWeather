import * as THREE from "three";
export default class rain {
  rainParticles;
  rainCount;
  async Intialize() {
    this.rainGeo = new THREE.CylinderBufferGeometry();
    this.rainCount = 20000;

    const posArray = new Float32Array(this.rainCount * 3);
    for (let i = 0; i < this.rainCount * 3; i++) {
      posArray[i] = Math.random() - 0.5;
    }
    this.rainGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    var rainMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.25,
      transparent: true,
    });
    this.rainParticles = new THREE.Points(this.rainGeo, rainMaterial);
    this.rainParticles.velocity = new THREE.Vector3(
      0, // x
      -Math.random(), // y: random vel
      0
    ); // z
    this.rainParticles.scale.set(40, 40, 40);
    this.rainParticles.position.set(0, 20, 0);
  }
  animateRain(speed) {
    this.rainParticles.rotation.y += speed;
  }
}
