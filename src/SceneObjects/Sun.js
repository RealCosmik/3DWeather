import * as THREE from "three";

export function Sun(scene) {
    /**
    * Sun
    */
    const geometry = new THREE.SphereGeometry(15, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.scale.x = 0.05;
    sphere.scale.y = 0.05;
    sphere.scale.z = 0.05;
    sphere.position.set(-0.5, 5.5, -0.5);

    /**
     * Sun
     */
    const geometry = new THREE.SphereGeometry(15, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.scale.x = 0.05;
    sphere.scale.y = 0.05;
    sphere.scale.z = 0.05;
    sphere.position.set(-0.5, 5.5, -0.5);

    let time = Date.now();
    /**
     * Animate
     */
    const tick = () => {
        const currentTime = Date.now();
        const deltaTime = currentTime - time;
        time = currentTime;

<<<<<<< HEAD
        window.requestAnimationFrame(tick);
    };
    scene.add(sphere);
=======
        // Update objects
        if (sphere.position.y >= 9) {
            sphere.position.y -= 0.01 * deltaTime;
        } else if (sphere.position.y <= 5) {
            sphere.position.y += 0.01 * deltaTime;
        } else {
            sphere.position.y -= 0.01 * deltaTime;
        }

        window.requestAnimationFrame(tick);
    };
    //tick()

    mainScene.add(sphere);
>>>>>>> 34184d347d44af063f7829fb19cdc288cb6c6a69
}
