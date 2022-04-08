import { Duck } from "../SceneObjects/Duck.js";
import { Floor } from "../SceneObjects/Floor.js";
import { Text } from "../SceneObjects/Text.js";
import { Cloud } from "../SceneObjects/Cloud.js";
import { Room } from "../SceneObjects/Room.js";
import * as entry from "../script";
import * as THREE from "three";
import * as WeatherHelper from "../WeatherAPI";
import { Sun } from "../SceneObjects/Sun.js";

export async function Initalize(scene, camera, canvas) {
    scene.background = new THREE.Color(0x53789e);
    var groupModels = new THREE.Group();
    var groupTexts = new THREE.Group();
    var groupSunCloud = new THREE.Group();

    var textLocation = await Text(scene, WeatherHelper.WeatherData.location.name);
    textLocation.position.set(-2.4, 4, 2);
    textLocation.rotateY(-300);

    var textRegion = await Text(scene, WeatherHelper.WeatherData.location.region);
    textRegion.position.set(-2.4, 3, 2);
    textRegion.rotateY(-300);

    var textCondition = await Text(
        scene,
        WeatherHelper.WeatherData.current.condition.text
    );
    textCondition.position.set(-2.4, 2, 2);
    textCondition.rotateY(-300);

    var textTemperature = await Text(
        scene,
        WeatherHelper.WeatherData.current.temp_f + " °F"
    );
    textTemperature.position.set(-2.4, 1, 2);
    textTemperature.rotateY(-300);

    groupSunCloud.add(await Cloud(scene), await Sun(scene));

    Windmill = new THREE.Object3D();
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

    rotatingComponents = new THREE.Object3D();

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
    var extrudedGeometry = new THREE.ExtrudeGeometry(triangle, {amount: 0.1, bevelEnabled: false});
    var tPrism = new THREE.Mesh(extrudedGeometry, white);
    tPrism.rotation.x = Math.PI/2;
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
    blade2.rotation.y = Math.PI/3 * 2;

    var blade3 = blade.clone();
    blade3.rotation.y = Math.PI/3 * 4;

    rotatingComponents.add(turbineShaft);
    rotatingComponents.add(endCap);
    rotatingComponents.add(blade);
    rotatingComponents.add(blade2);
    rotatingComponents.add(blade3);
    rotatingComponents.position.set(0, 10, 0.5);
    rotatingComponents.rotation.x = Math.PI/2;

    Windmill.add(base);
    Windmill.add(pole);
    Windmill.add(turbineHousing);
    Windmill.add(rotatingComponents);

    groupModels.add(await Floor(scene), await Room(scene), Windmill(scene));


    groupModels.scale.set(8, 8, 8);
    groupTexts.scale.set(8, 8, 8);
    groupSunCloud.scale.set(8, 8, 8);
    groupSunCloud.position.set(0,10.5,0)
    camera.far = 5000;
    camera.position.set(135.7, 56.5, 51.7);

    groupTexts.add(textLocation, textRegion, textCondition, textTemperature);

    const axesHelper = new THREE.AxesHelper( 5 );
    axesHelper.scale.set(10,10,10)
    scene.add( axesHelper );

    scene.add(groupModels, groupTexts, groupSunCloud);
    AddLightsToScene(scene);
    entry.RegisterOnSceneUpdate(Update);
}

function AddLightsToScene(scene) {
    const hemisphereLight = new THREE.HemisphereLight(0xadd8e6, 0xffffff, 0.3);
    scene.add(hemisphereLight);

    const pointLight = new THREE.PointLight(0xff9000, 0.4, 10, 2);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.camera.left = -7;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.right = 7;
    directionalLight.shadow.camera.bottom = -7;
    directionalLight.position.set(-5, 5, 0);
    scene.add(directionalLight);

    const hemisphereLightHelper = new THREE.HemisphereLightHelper(
        hemisphereLight,
        0.2
    );
    scene.add(hemisphereLightHelper);

    const directionalLightHelper = new THREE.DirectionalLightHelper(
        directionalLight,
        0.2
    );
    scene.add(directionalLightHelper);

    const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
    scene.add(pointLightHelper);

    const directionalLightCameraHelper = new THREE.CameraHelper(
        directionalLight.shadow.camera
    );
    scene.add(directionalLightCameraHelper);
}

function Update(deltaTime) {

}
