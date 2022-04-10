import * as THREE from "three";
export default class Rain {
  rainParticles;
  rainCount;

  static async CreateRain() {
    const newRain = new Rain();
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
    newRain.rainParticles = new THREE.Points(this.rainGeo, rainMaterial);
    newRain.rainParticles.velocity = new THREE.Vector3(
      0, // x
      -Math.random(), // y: random vel
      0
    ); // z
    newRain.rainParticles.scale.set(40, 40, 40);
    newRain.rainParticles.position.set(0, 20, 0);
    return newRain;
  }
  animateRain(speed) {
    this.rainParticles.rotation.y += speed;
  }
}
