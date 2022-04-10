import * as THREE from "three";

export class Sun {
    sunModel;
    static async CreateSun() {
        const newSun = new Sun();
        const geometry = new THREE.SphereGeometry(15, 32, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        newSun.sunModel = new THREE.Mesh(geometry, material);
        newSun.sunModel.scale.x = 0.05;
        newSun.sunModel.scale.y = 0.05;
        newSun.sunModel.scale.z = 0.05;
        newSun.sunModel.position.set(-0.5, 6, -0.5);
        return newSun;
    }
}
