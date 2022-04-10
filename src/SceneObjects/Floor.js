import * as THREE from "three";

export class Floor {
  floorModel;
  static async CreateFloor() {
    const newFloor = new Floor();
    const textureLoader = new THREE.TextureLoader();
    await textureLoader.loadAsync("/textures/matcaps/7.png").then((texture) => {
      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        new THREE.MeshBasicMaterial({
          map: texture,
        })
      );
      floor.receiveShadow = true;
      floor.rotation.x = -Math.PI * 0.5;

      newFloor.floorModel = floor;
    });
    return newFloor;
  }

}
