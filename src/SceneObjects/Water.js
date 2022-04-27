import * as THREE from "three";
import waterVertexShader from "../Shaders/Water/vertex.glsl";
import waterFragmentShader from "../Shaders/Water/fragment.glsl";
import * as dat from "lil-gui";
import {ShaderMaterial} from "three";

export class Water {
    waterModel;
    waterMaterial = new ShaderMaterial();
    groupModel;
    
    /*
        Globe Model credited to Bruno Simon
        Sourced from https://threejs-journey.com/lessons/29
    */
    static async CreateWater() {
        const newWater = new Water();
        newWater.groupModel = new THREE.Group();

        const waterGeometry = new THREE.PlaneGeometry(2, 2, 512, 512);

        newWater.waterMaterial = new THREE.ShaderMaterial({
            vertexShader: waterVertexShader,
            fragmentShader: waterFragmentShader,
            uniforms: {
                uTime: {value: 0},

                uBigWavesElevation: {value: 0.2},
                uBigWavesFrequency: {value: new THREE.Vector2(4, 1.5)},
                uBigWavesSpeed: {value: 0.75},

                uSmallWavesElevation: {value: 0.15},
                uSmallWavesFrequency: {value: 3},
                uSmallWavesSpeed: {value: 0.2},
                uSmallIterations: {value: 4},

                uDepthColor: {value: new THREE.Color("#186691")},
                uSurfaceColor: {value: new THREE.Color("#9bd8ff")},
                uColorOffset: {value: 0.08},
                uColorMultiplier: {value: 5},
            },
        });

        // Mesh
        const water = new THREE.Mesh(waterGeometry, newWater.waterMaterial);
        water.rotation.x = -Math.PI * 0.5;
        water.scale.set(1, 1, 1);
        water.position.set(0, 0.1, 0);

        const wallNorth = new THREE.Mesh(
            new THREE.BoxGeometry(2, 0.25, 0.1),
            new THREE.MeshStandardMaterial({color: "White"})
        );
        wallNorth.position.set(1, 0, 0);
        wallNorth.rotateY(300);

        const wallEast = new THREE.Mesh(
            new THREE.BoxGeometry(2, 0.25, 0.1),
            new THREE.MeshStandardMaterial({color: "White"})
        );
        wallEast.position.set(0, 0, 1);

        const wallSouth = new THREE.Mesh(
            new THREE.BoxGeometry(2, 0.25, 0.1),
            new THREE.MeshStandardMaterial({color: "White"})
        );
        wallSouth.rotateY(300);
        wallSouth.position.set(-1, 0, 0);

        const wallWest = new THREE.Mesh(
            new THREE.BoxGeometry(2, 0.25, 0.1),
            new THREE.MeshStandardMaterial({color: "White"})
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
