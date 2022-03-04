import * as THREE from "three";

export function Sun(scene) {
    const geometry = new THREE.SphereGeometry(15, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.scale.x = 0.05;
    sphere.scale.y = 0.05;
    sphere.scale.z = 0.05;
    sphere.position.set(-0.5, 5.5, -0.5);

    let time = Date.now();
    scene.add(sphere);
    return sphere;
    const tick = () => {
        const currentTime = Date.now();
        const deltaTime = currentTime - time;
        time = currentTime;

        // Update objects

        window.requestAnimationFrame(tick);
    };
    //tick()
}
