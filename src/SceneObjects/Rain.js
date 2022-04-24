import * as THREE from "three";
import { Matrix4 } from "three";
import particleVertex from "../Shaders/Particles/vertex.glsl";
import particleFragment from "../Shaders/Particles/fragment.glsl";
export default class Rain {
  rainParticles;
  rainCount;
  rainGeo;
  bufferAttribute;
  scaleAttrib;
  static async CreateRain() {
    const newRain = new Rain();
    newRain.rainGeo = new THREE.BufferGeometry();
    newRain.rainCount = 2000;
    const particleBuffer = new Float32Array(newRain.rainCount * 3);
    newRain.bufferAttribute = new THREE.BufferAttribute(particleBuffer, 3);
    newRain.rainGeo.setAttribute("position", newRain.bufferAttribute);

    const scalebuffer = new Float32Array(newRain.rainCount * 3);
    newRain.scaleAttrib = new THREE.BufferAttribute(scalebuffer, 3)
    newRain.rainGeo.setAttribute('scale', newRain.scaleAttrib);
    var rainMaterial = this.GetParticleMaterial();
    newRain.rainParticles = new THREE.Points(newRain.rainGeo, rainMaterial);
    newRain.rainParticles.scale.set(10, 40, 1);
    newRain.rainParticles.position.set(0, 20, 0);
    rainMaterial.attr
    const textureLoader = new THREE.TextureLoader()
    const particleTexture = textureLoader.load("/textures/RainParticle.png")
    // rainMaterial.transparent = true
    /// rainMaterial.map = particleTexture
    // rainMaterial.color = new THREE.Color('#ff88cc')
    console.log(newRain.rainGeo.attributes);

    return newRain;
  }
  animateRain(speed) {
    for (let i = 0; i < this.rainCount; i++) {
      this.bufferAttribute.array[i] = Math.random() * .8 - 0.5;
    }
    for (let i = 0; i < this.rainCount; i++) {
      this.scaleAttrib.array[i] = Math.random() * 5 - 0.5;
    }
    // const pos = new Matrix4();
    // pos.setPosition(0, 0, 0);
    // this.rainGeo.applyMatrix4(pos);
    this.bufferAttribute.needsUpdate = true;
    this.scaleAttrib.needsUpdate = true;
    // this.rainParticles.rotation.y += speed;
  }
  static GetParticleMaterial() {
    const particleMaterial = new THREE.ShaderMaterial();
    particleMaterial.depthWrite = false;
    particleMaterial.blending = THREE.AdditiveBlending;
    particleMaterial.fragmentShader = particleFragment;
    particleMaterial.vertexShader = particleVertex;
    return particleMaterial;
  }
}
