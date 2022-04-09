import * as THREE from "three";
let rotatingComponents
export function GetRotationObjects() {
    return rotatingComponents;
}
export async function Windmill(scene) {
    var windmillGroup = new THREE.Group();
    var white = new THREE.MeshLambertMaterial({ color: "white" });


    var base = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 1, 32, 3), white
    );
    base.position.y = -10;

    var pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.5, 20, 32, 1), white
    );

    var turbineHousing = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 2), white
    );
    turbineHousing.position.set(0, 10, -0.7);

    rotatingComponents = new THREE.Group();

    var turbineShaft = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 2, 32, 1), white
    );

    var endCap = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 32, 32), white
    );
    endCap.position.y = 1;

    var triangle = new THREE.Shape(); // Create a triangular prism to form into a blade for the wind mill
    triangle.moveTo(-0.35, -0.35);
    triangle.lineTo(0, 6);
    triangle.lineTo(0.35, -0.35);
    triangle.lineTo(-0.35, -0.35);
    var extrudedGeometry = new THREE.ExtrudeGeometry(triangle, { depth: 0.1, bevelEnabled: false });
    var tPrism = new THREE.Mesh(extrudedGeometry, white);
    tPrism.rotation.x = Math.PI / 2;
    tPrism.position.y = 1;
    tPrism.position.z = 4;
    var tPrism2 = tPrism.clone();
    tPrism2.rotation.z = Math.PI
    tPrism2.position.z = 3.45;
    tPrism2.scale.y = 0.63;

    var blade = new THREE.Object3D();
    blade.add(tPrism);
    blade.add(tPrism2);

    var blade2 = blade.clone();
    blade2.rotation.y = Math.PI / 3 * 2;

    var blade3 = blade.clone();
    blade3.rotation.y = Math.PI / 3 * 4;

    rotatingComponents.add(turbineShaft);
    rotatingComponents.add(endCap);
    rotatingComponents.add(blade);
    rotatingComponents.add(blade2);
    rotatingComponents.add(blade3);
    rotatingComponents.position.set(0, 10, 0.5);
    rotatingComponents.rotation.x = Math.PI / 2;

    windmillGroup.add(base);
    windmillGroup.add(pole);
    windmillGroup.add(turbineHousing);
    windmillGroup.add(rotatingComponents);
    return windmillGroup;
}