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

    // This is used for limiting the number of points rendered if you want to
    // make a patricle model. Renders from 0 to (Max Number of points). Use
    // Infinity as the upper bound to render the whole model
    globe.geometry.setDrawRange(0, 2000000)

    // Below is not needed??
    //scene.add(globe)
  });
  return globe;
}
