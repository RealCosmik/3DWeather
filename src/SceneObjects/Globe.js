import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js";

export class Globe {


    /*
        Globe Model credited to Alan Ziimmerman
        Sourced from https://sketchfab.com/3d-models/earth-8a3f6e66955e41d48762d75725d3ab52
    */

    globeModel

    static async CreateGlobe() {
        const newGlobe = new Globe();
        const fbxLoader = new FBXLoader();
        await fbxLoader.loadAsync("/models/FBX/CompleteGlobe/globe2.fbx").then((fbx) => {
            newGlobe.globeModel = fbx.children[0]
            newGlobe.globeModel.scale.set(0.3, 0.3, 0.3);
            newGlobe.globeModel.position.set(0, 4.5, 0);
        });
        return newGlobe;
    }

}
