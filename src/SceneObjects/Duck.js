import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export async function Duck(scene) {
  /**
   * Duck
   */
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);
  await gltfLoader.loadAsync("/models/GLTF/Duck/Duck.gltf").then
    ((gltf) => {
      gltf.scene.scale.set(1, 1, 1);
      gltf.scene.position.set(-1, 0, 0.4);
      for (const child of gltf.scenes) {
        scene.add(child);
      }
    });
}
