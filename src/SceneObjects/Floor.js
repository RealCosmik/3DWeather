import * as THREE from "three";

export function Floor(scene) {
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

  scene.add(floor);
}
