import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

export class Cloud {
  #deltaY = 0;
  #increase = true;
  #maxMovement = 1;
  cloudModel;
  static async CreateCloud() {
    const newCloud = new Cloud();
    const fbxLoader = new FBXLoader();
    await fbxLoader.loadAsync("/models/FBX/Cloud/Cloud.fbx").then((fbx) => {
      newCloud.cloudModel = fbx.children[0]
      newCloud.cloudModel.scale.set(0.3, 0.3, 0.3);
      newCloud.cloudModel.position.set(0, 4.5, 0);
    });
    return newCloud;
  }

  moveCloud(deltaTime, speed) {
    this.#deltaY += deltaTime;
    if (this.#deltaY)
      this.cloudModel.position.y += deltaTime * speed
    else
      this.cloudModel.position.y -= deltaTime * speed
    if (this.#deltaY >= this.#maxMovement) {
      this.#increase = !this.#increase;
      this.#deltaY = 0;
    }
  }
}
