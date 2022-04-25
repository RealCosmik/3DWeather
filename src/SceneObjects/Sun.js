import * as THREE from "three";

export class Sun {
    sunModel = new THREE.Object3D();
    sunMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});

    static async CreateSun() {
        const newSun = new Sun();
        const geometry = new THREE.SphereGeometry(15, 32, 16);
        newSun.sunModel = new THREE.Mesh(geometry, newSun.sunMaterial);
        newSun.sunModel.scale.x = 0.05;
        newSun.sunModel.scale.y = 0.05;
        newSun.sunModel.scale.z = 0.05;
        newSun.sunModel.position.set(-0.5, 6, -0.5);
        return newSun;
    }
}
