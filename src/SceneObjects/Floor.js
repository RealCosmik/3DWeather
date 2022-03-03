import * as THREE from "three";
import { mainScene } from "../script";

export function Floor() {
  /**
   * Floor
   */
  const textureLoader = new THREE.TextureLoader();
  const gradientTexture = textureLoader.load("/textures/matcaps/7.png");
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshBasicMaterial({
      map: gradientTexture,
    })
  );
  floor.receiveShadow = true;
  floor.rotation.x = -Math.PI * 0.5;

  mainScene.add(floor);
}
