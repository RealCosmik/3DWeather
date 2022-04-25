import * as THREE from "three";
import {Color} from "three";

export default class Rain {
    raingeo = new THREE.BufferGeometry();
    particleRender = new THREE.Points();
    points = [];
    rainMaterial = new THREE.PointsMaterial();

    static async CreateRain(color) {
        const newRain = new Rain();
        for (let i = 0; i < 1000; i++) {
            var rainDrop = new THREE.Vector3(
                Math.random() * 400 - 200,
                Math.random() * 500 - 250,
                Math.random() * 400 - 200
            );
            newRain.points.push(rainDrop);
        }
        newRain.raingeo.setFromPoints(newRain.points);
        newRain.rainMaterial = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 5,
            transparent: true,
        });
        newRain.rainMaterial.size = 5;
        newRain.rainMaterial.color = new Color("Blue");
        newRain.particleRender = new THREE.Points(
            newRain.raingeo,
            newRain.rainMaterial
        );
        return newRain;
    }

    DownPour(deltaTime) {
        for (let i = 0; i < 1000; i++) {
            this.points[i].y -= deltaTime * Math.random() * 20;
            if (this.points[i].y < -200) {
                this.points[i].y = 300;
            }
        }
        this.raingeo.setFromPoints(this.points);
    }
}
