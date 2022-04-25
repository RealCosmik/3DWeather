import * as THREE from "three";
//srichs
//3D model of a wind turbine generator and animates the blades of the windmill.
//https://github.com/srichs/wind-turbine/blob/master/src/WindTurbine.js
//4/15/2022
export default class windmill {
    windmillGroup;
    #rotatingComponents;

    rotateWindmill(speed) {
        this.#rotatingComponents.rotateY(speed);
    }

    // factory method to create a windmill. Returns a newWindmill class instance
    static async CreateWindmill() {
        const newWindmill = new windmill();
        newWindmill.windmillGroup = new THREE.Group();
        const white = new THREE.MeshLambertMaterial({color: "grey"});

        const base = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, 1, 32, 3),
            white
        );
        base.position.y = -10;

        const pole = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.5, 20, 32, 1),
            white
        );

        const turbineHousing = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 2), white);
        turbineHousing.position.set(0, 10, -0.7);

        newWindmill.#rotatingComponents = new THREE.Group();

        const turbineShaft = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.2, 2, 32, 1),
            white
        );

        const endCap = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), white);
        endCap.position.y = 1;

        const triangle = new THREE.Shape(); // Create a triangular prism to form into a blade for the windmill
        triangle.moveTo(-0.35, -0.35);
        triangle.lineTo(0, 6);
        triangle.lineTo(0.35, -0.35);
        triangle.lineTo(-0.35, -0.35);
        const extrudedGeometry = new THREE.ExtrudeGeometry(triangle, {
            depth: 0.1,
            bevelEnabled: false,
        });
        const tPrism = new THREE.Mesh(extrudedGeometry, white);
        tPrism.rotation.x = Math.PI / 2;
        tPrism.position.y = 1;
        tPrism.position.z = 4;
        const tPrism2 = tPrism.clone();
        tPrism2.rotation.z = Math.PI;
        tPrism2.position.z = 3.45;
        tPrism2.scale.y = 0.63;

        const blade = new THREE.Object3D();
        blade.add(tPrism);
        blade.add(tPrism2);

        const blade2 = blade.clone();
        blade2.rotation.y = (Math.PI / 3) * 2;

        const blade3 = blade.clone();
        blade3.rotation.y = (Math.PI / 3) * 4;

        newWindmill.#rotatingComponents.add(turbineShaft);
        newWindmill.#rotatingComponents.add(endCap);
        newWindmill.#rotatingComponents.add(blade);
        newWindmill.#rotatingComponents.add(blade2);
        newWindmill.#rotatingComponents.add(blade3);
        newWindmill.#rotatingComponents.position.set(0, 10, 0.5);
        newWindmill.#rotatingComponents.rotation.x = Math.PI / 2;

        newWindmill.windmillGroup.add(base);
        newWindmill.windmillGroup.add(pole);
        newWindmill.windmillGroup.add(turbineHousing);
        newWindmill.windmillGroup.add(newWindmill.#rotatingComponents);
        return newWindmill;
    }
}
