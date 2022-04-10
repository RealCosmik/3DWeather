import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

export class Globe {

  globeModel
  static async CreateGlobe() {
    const newGlobe = new Globe();
    const fbxLoader = new FBXLoader();
    await fbxLoader.loadAsync("/models/FBX/Globe/earthmap.fbx").then((fbx) => {
      newGlobe.globeModel = fbx.children[0]
      newGlobe.globeModel.scale.set(0.3, 0.3, 0.3);
      newGlobe.globeModel.position.set(0, 4.5, 0);

      // This is used for limiting the number of points rendered if you want to
      // make a patricle model. Renders from 0 to (Max Number of points). Use
      // Infinity as the upper bound to render the whole model
      newGlobe.globeModel.geometry.setDrawRange(0, 2000000)
    });
    return newGlobe;
  }

}
