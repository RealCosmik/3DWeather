import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
export async function Text(scene, message) {

    /**
     * Fonts
     */
    const fontLoader = new FontLoader();
    var textObject

    await fontLoader.loadAsync("/fonts/helvetiker_regular.typeface.json").then((font) => {
        const textGeometry = new TextGeometry(message.toString(), {
            font: font,
            size: 0.4,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5,
        });
        console.log(message)
        const textMaterial = new THREE.MeshBasicMaterial();
        //textMaterial.color.set(0x000000)
        const text = new THREE.Mesh(textGeometry, textMaterial);
        textObject = text
        scene.add(text);
        
    });
    return textObject
}
