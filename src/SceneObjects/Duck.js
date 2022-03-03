import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { mainScene } from "../script";

export function Duck() {
  /**
   * Duck
   */
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  gltfLoader.load(
    "/models/GLTF/Duck/Duck.gltf",
    (gltf) => {
      console.log("success");
      gltf.scene.scale.set(1, 1, 1);
      gltf.scene.position.set(-1, 0, 0.4);
      for (const child of gltf.scenes) {
        mainScene.add(child);
      }
    },
    (progress) => {
      console.log("progress");
      console.log(progress);
    },
    (error) => {
      console.log("error");
      console.log(error);
    }
  );
}
