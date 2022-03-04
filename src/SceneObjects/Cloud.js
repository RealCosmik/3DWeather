import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

export function Cloud(scene) {
  /**
  * Cloud
  */
  const fbxLoader = new FBXLoader();
  fbxLoader.load("/models/FBX/Cloud/Cloud.fbx", (fbx) => {
    for (const child of fbx.children) {
      child.scale.set(0.3, 0.3, 0.3);
      child.position.set(0, 4, 0);
      scene.add(child);
    }
  });
}
