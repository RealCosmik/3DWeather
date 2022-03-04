import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
export function Text(scene, message) {

    /**
     * Fonts
     */
    const fontLoader = new FontLoader();

    fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
        const textGeometry = new TextGeometry(message, {
            font: font,
            size: 0.5,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5,
        });
        const textMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
        const text = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(text);
    });
}
