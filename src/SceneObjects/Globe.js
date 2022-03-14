import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

export async function Globe(scene) {
  /**
   * Globe
   */
  const fbxLoader = new FBXLoader();
  var globe;
  await fbxLoader.loadAsync("/models/FBX/Globe/earthmap.fbx").then((fbx) => {
    globe = fbx.children[0]
    globe.scale.set(0.3, 0.3, 0.3);
    globe.position.set(0, 4.5, 0);
    //scene.add(globe)
  });
  return globe;
}
