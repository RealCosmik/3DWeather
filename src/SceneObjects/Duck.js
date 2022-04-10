import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Duck {
  duckModel;
  static async CreateNewDuck() {
    const newDuck = new Duck();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
    await gltfLoader.loadAsync("/models/GLTF/Duck/Duck.gltf").then
      ((gltf) => {
        gltf.scene.scale.set(1, 1, 1);
        newDuck.duckModel = gltf.scene;
      });
    return newDuck;
  }

}
