import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import * as THREE from "three";

export async function Globe(scene){

    const stlLoader = new STLLoader();
    var globe;

    //BELOW CODE SOURCED FROM line 92 of the following repo
    //https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_stl.html
    const material = new THREE.MeshPhongMaterial( { color: 0xAAAAAA, 
        specular: 0x111111, 
        shininess: 200 } );

    //BELOW CODE SOURCED FROM
    //https://sbcode.net/threejs/loaders-stl/
    stlLoader.load(
        '/models/STL/earthmap.stl',
        function (geometry) {
            const mesh = new THREE.Mesh(geometry, material)
            console.log(geometry)
            scene.add(mesh)
        },
        (xhr) => {
            //console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )


}