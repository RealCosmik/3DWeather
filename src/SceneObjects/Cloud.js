import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

export async function Cloud(scene) {
  /**
   * Cloud
   */
  const fbxLoader = new FBXLoader();
  var cloud;
  await fbxLoader.loadAsync("/models/FBX/Cloud/Cloud.fbx").then((fbx) => {
    cloud = fbx.children[0]
    cloud.scale.set(0.3, 0.3, 0.3);
    cloud.position.set(0, 4.5, 0);
    scene.add(cloud)
  });
  return cloud;
}
