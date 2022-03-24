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

    // This is used for limiting the number of points rendered if you want to
    // make a patricle model. Renders from 0 to (Max Number of points). Use
    // Infinity as the upper bound to render the whole model
    //cloud.geometry.setDrawRange(0, 20000)

    // Below is not needed??
    //scene.add(cloud)
  });
  return cloud;
}
