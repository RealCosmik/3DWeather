import * as THREE from "three";
import waterVertexShader from "../Shaders/Water/vertex.glsl";
import waterFragmentShader from "../Shaders/Water/fragment.glsl";
import * as dat from "lil-gui";
import { ShaderMaterial } from "three";

export class Water {
  waterModel;
  waterMaterial = new ShaderMaterial();
  groupModel;

  static async CreateWater() {
    const newWater = new Water();
    newWater.groupModel = new THREE.Group();
    const gui = new dat.GUI({ width: 340 });
    const debugObject = {};

    debugObject.depthColor = "#186691";
    debugObject.surfaceColor = "#9bd8ff";

    gui.addColor(debugObject, "depthColor").onChange(() => {
      newWater.waterMaterial.uniforms.uDepthColor.value.set(
        debugObject.depthColor
      );
    });
    gui.addColor(debugObject, "surfaceColor").onChange(() => {
      newWater.waterMaterial.uniforms.uSurfaceColor.value.set(
        debugObject.surfaceColor
      );
    });

    const waterGeometry = new THREE.PlaneGeometry(2, 2, 512, 512);

    newWater.waterMaterial = new THREE.ShaderMaterial({
      vertexShader: waterVertexShader,
      fragmentShader: waterFragmentShader,
      uniforms: {
        uTime: { value: 0 },

        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
        uBigWavesSpeed: { value: 0.75 },

        uSmallWavesElevation: { value: 0.15 },
        uSmallWavesFrequency: { value: 3 },
        uSmallWavesSpeed: { value: 0.2 },
        uSmallIterations: { value: 4 },

        uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
        uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
        uColorOffset: { value: 0.08 },
        uColorMultiplier: { value: 5 },
      },
    });
    gui
      .add(newWater.waterMaterial.uniforms.uBigWavesElevation, "value")
      .min(0)
      .max(1)
      .step(0.001)
      .name("uBigWavesElevation");
    gui
      .add(newWater.waterMaterial.uniforms.uBigWavesFrequency.value, "x")
      .min(0)
      .max(10)
      .step(0.001)
      .name("uBigWavesFrequencyX");
    gui
      .add(newWater.waterMaterial.uniforms.uBigWavesFrequency.value, "y")
      .min(0)
      .max(10)
      .step(0.001)
      .name("uBigWavesFrequencyY");
    gui
      .add(newWater.waterMaterial.uniforms.uBigWavesSpeed, "value")
      .min(0)
      .max(4)
      .step(0.001)
      .name("uBigWavesSpeed");

    gui
      .add(newWater.waterMaterial.uniforms.uSmallWavesElevation, "value")
      .min(0)
      .max(1)
      .step(0.001)
      .name("uSmallWavesElevation");
    gui
      .add(newWater.waterMaterial.uniforms.uSmallWavesFrequency, "value")
      .min(0)
      .max(30)
      .step(0.001)
      .name("uSmallWavesFrequency");
    gui
      .add(newWater.waterMaterial.uniforms.uSmallWavesSpeed, "value")
      .min(0)
      .max(4)
      .step(0.001)
      .name("uSmallWavesSpeed");
    gui
      .add(newWater.waterMaterial.uniforms.uSmallIterations, "value")
      .min(0)
      .max(5)
      .step(1)
      .name("uSmallIterations");

    gui
      .add(newWater.waterMaterial.uniforms.uColorOffset, "value")
      .min(0)
      .max(1)
      .step(0.001)
      .name("uColorOffset");
    gui
      .add(newWater.waterMaterial.uniforms.uColorMultiplier, "value")
      .min(0)
      .max(10)
      .step(0.001)
      .name("uColorMultiplier");

    // Mesh
    const water = new THREE.Mesh(waterGeometry, newWater.waterMaterial);
    water.rotation.x = -Math.PI * 0.5;
    water.scale.set(1, 1, 1);
    water.position.set(0, 0.1, 0);

    const wallNorth = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.25, 0.1),
      //#FFFFFF
      new THREE.MeshStandardMaterial({ color: "White" })
    );
    wallNorth.position.set(1, 0, 0);
    wallNorth.rotateY(300);

    const wallEast = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.25, 0.1),
      new THREE.MeshStandardMaterial({ color: "White" })
    );
    wallEast.position.set(0, 0, 1);

    const wallSouth = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.25, 0.1),
      new THREE.MeshStandardMaterial({ color: "White" })
    );
    wallSouth.rotateY(300);
    wallSouth.position.set(-1, 0, 0);

    const wallWest = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.25, 0.1),
      new THREE.MeshStandardMaterial({ color: "White" })
    );
    wallWest.position.set(0, 0, -1);

    newWater.waterModel = water;
    newWater.groupModel.add(water, wallNorth, wallSouth, wallEast, wallWest);
    return newWater;
  }
  animateWaves(elapsedTime) {
    this.waterMaterial.uniforms.uTime.value = elapsedTime;
  }
}
