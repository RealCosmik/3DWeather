import {Floor} from "../SceneObjects/Floor.js";
import {Text} from "../SceneObjects/Text.js";
import {Room} from "../SceneObjects/Room.js";
import windmill from "../SceneObjects/Windmill";
import * as entry from "../script";
import * as THREE from "three";
import * as WeatherHelper from "../WeatherAPI";
import {WeatherData} from "../WeatherAPI";

let newWindmill;
const clock = new THREE.Clock();

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


    const newFloor = await Floor.CreateFloor();
    const newRoom = await Room.CreateRoom();

    newWindmill = await windmill.CreateWindmill();
    newWindmill.windmillGroup.position.set(0, 10.5, -13);
    newWindmill.windmillGroup.rotateY(45);

    scene.add(newWindmill.windmillGroup);
    groupModels.add(newFloor.floorModel, newRoom.roomModel);

    groupModels.scale.set(8, 8, 8);
    groupTexts.scale.set(8, 8, 8);
    groupSunCloud.scale.set(8, 8, 8);
    groupSunCloud.position.set(0, 10.5, 0);

    camera.far = 5000;
    camera.position.set(135.7, 56.5, 51.7);

    groupTexts.add(textLocation, textRegion, textCondition, textTemperature);

    //const axesHelper = new THREE.AxesHelper(5);
    //axesHelper.scale.set(10, 10, 10);
    //scene.add(axesHelper);

    scene.add(groupModels, groupTexts);

    AddLightsToScene(scene);
    AddGrassToScene(scene);
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
    /*
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

     */
}

function AddGrassToScene(scene){

//Get alpha map and blade texture
//These have been taken from "Realistic real-time grass rendering" by Eddie Lee, 2010
    var loader = new THREE.TextureLoader();
    loader.crossOrigin = '';
    var grassTexture = loader.load( 'https://al-ro.github.io/images/grass/blade_diffuse.jpg' );
    var alphaMap = loader.load( 'https://al-ro.github.io/images/grass/blade_alpha.jpg' );
    var noiseTexture = loader.load( 'https://al-ro.github.io/images/grass/perlinFbm.jpg' );
    noiseTexture.wrapS = THREE.RepeatWrapping;
    noiseTexture.wrapT = THREE.RepeatWrapping;

//************** Grass **************
    //Number of blades
    var instances = 40000;
//Variables for blade mesh
    var joints = 4;
    var bladeWidth = 0.12;
    var bladeHeight = 1;

//Patch side length
    var width = 120;
//Number of vertices on ground plane side
    var resolution = 64;
//Distance between two ground plane vertices
    var delta = width/resolution;
//Radius of the sphere onto which the ground plane is bent
    var radius = 240;
//User movement speed
    var speed = 3;
//Rotation around Y axis in range [0, 2*PI]
    var azimuth = 0.4;
//The global coordinates
//The geometry never leaves a box of width*width around (0, 0)
//But we track where in space the camera would be globally
    var pos = new THREE.Vector2(0.01, 0.01);

//Define base geometry that will be instanced. We use a plane for an individual blade of grass
    var grassBaseGeometry = new THREE.PlaneBufferGeometry(bladeWidth, bladeHeight, 1, joints);
    grassBaseGeometry.translate(0, bladeHeight/2, 0);

//Define the bend of the grass blade as the combination of three quaternion rotations
    let vertex = new THREE.Vector3();
    let quaternion0 = new THREE.Quaternion();
    let quaternion1 = new THREE.Quaternion();
    let x, y, z, w, angle, sinAngle, rotationAxis;

//Rotate around Y
    angle = 0.05;
    sinAngle = Math.sin(angle / 2.0);
    rotationAxis = new THREE.Vector3(0, 1, 0);
    x = rotationAxis.x * sinAngle;
    y = rotationAxis.y * sinAngle;
    z = rotationAxis.z * sinAngle;
    w = Math.cos(angle / 2.0);
    quaternion0.set(x, y, z, w);

//Rotate around X
    angle = 0.3;
    sinAngle = Math.sin(angle / 2.0);
    rotationAxis.set(1, 0, 0);
    x = rotationAxis.x * sinAngle;
    y = rotationAxis.y * sinAngle;
    z = rotationAxis.z * sinAngle;
    w = Math.cos(angle / 2.0);
    quaternion1.set(x, y, z, w);

//Combine rotations to a single quaternion
    quaternion0.multiply(quaternion1);

//Rotate around Z
    angle = 0.1;
    sinAngle = Math.sin(angle / 2.0);
    rotationAxis.set(0, 0, 1);
    x = rotationAxis.x * sinAngle;
    y = rotationAxis.y * sinAngle;
    z = rotationAxis.z * sinAngle;
    w = Math.cos(angle / 2.0);
    quaternion1.set(x, y, z, w);

//Combine rotations to a single quaternion
    quaternion0.multiply(quaternion1);

    let quaternion2 = new THREE.Quaternion();

//Bend grass base geometry for more organic look
    for(let v = 0; v < grassBaseGeometry.attributes.position.array.length; v += 3){
        quaternion2.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
        vertex.x = grassBaseGeometry.attributes.position.array[v];
        vertex.y = grassBaseGeometry.attributes.position.array[v+1];
        vertex.z = grassBaseGeometry.attributes.position.array[v+2];
        let frac = vertex.y/bladeHeight;
        quaternion2.slerp(quaternion0, frac);
        vertex.applyQuaternion(quaternion2);
        grassBaseGeometry.attributes.position.array[v] = vertex.x;
        grassBaseGeometry.attributes.position.array[v+1] = vertex.y;
        grassBaseGeometry.attributes.position.array[v+2] = vertex.z;
    }

    grassBaseGeometry.computeVertexNormals();
    var baseMaterial = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
    var baseBlade = new THREE.Mesh(grassBaseGeometry, baseMaterial);
//Show grass base geometry
scene.add(baseBlade);

    var instancedGeometry = new THREE.InstancedBufferGeometry();

    instancedGeometry.index = grassBaseGeometry.index;
    instancedGeometry.attributes.position = grassBaseGeometry.attributes.position;
    instancedGeometry.attributes.uv = grassBaseGeometry.attributes.uv;
    instancedGeometry.attributes.normal = grassBaseGeometry.attributes.normal;

// Each instance has its own data for position, orientation and scale
    var indices = [];
    var offsets = [];
    var scales = [];
    var halfRootAngles = [];

//For each instance of the grass blade
    for (let i = 0; i < instances; i++){

        indices.push(i/instances);

        //Offset of the roots
        x = Math.random() * width - width/2;
        z = Math.random() * width - width/2;
        y = 0;
        offsets.push(x, y, z);

        //Random orientation
        let angle = Math.PI - Math.random() * (2 * Math.PI);
        halfRootAngles.push(Math.sin(0.5*angle), Math.cos(0.5*angle));

        //Define variety in height
        if(i % 3 !== 0){
            scales.push(2.0+Math.random() * 1.25);
        }else{
            scales.push(2.0+Math.random());
        }
    }

    var offsetAttribute = new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3);
    var scaleAttribute = new THREE.InstancedBufferAttribute(new Float32Array(scales), 1);
    var halfRootAngleAttribute = new THREE.InstancedBufferAttribute(new Float32Array(halfRootAngles), 2);
    var indexAttribute = new THREE.InstancedBufferAttribute(new Float32Array(indices), 1);

    instancedGeometry.setAttribute( 'offset', offsetAttribute);
    instancedGeometry.setAttribute( 'scale', scaleAttribute);
    instancedGeometry.setAttribute( 'halfRootAngle', halfRootAngleAttribute);
    instancedGeometry.setAttribute( 'index', indexAttribute);

//Define the material, specifying attributes, uniforms, shaders etc.
    var grassMaterial = new THREE.RawShaderMaterial( {
        uniforms: {
            time: {type: 'float', value: 0},
            delta: {type: 'float', value: delta },
            posX: {type: 'float', value: pos.x },
            posZ: {type: 'float', value: pos.y },
            radius: {type: 'float', value: radius },
            width: {type: 'float', value: width },
            map: { value: grassTexture},
            alphaMap: { value: alphaMap},
            noiseTexture: { value: noiseTexture},
            //sunDirection: {type: 'vec3', value: new THREE.Vector3(Math.sin(azimuth), Math.sin(elevation), -Math.cos(azimuth))},
            //cameraPosition: {type: 'vec3', value: camera.position},
            //ambientStrength: {type: 'float', value: ambientStrength},
            //translucencyStrength: {type: 'float', value: translucencyStrength},
            //diffuseStrength: {type: 'float', value: diffuseStrength},
            //specularStrength: {type: 'float', value: specularStrength},
            //shininess: {type: 'float', value: shininess},
            //lightColour: {type: 'vec3', value: sunColour},
            //specularColour: {type: 'vec3', value: specularColour},
        },
        //vertexShader: grassVertexSource,
        //fragmentShader: grassFragmentSource,
        side: THREE.DoubleSide
    } );

    var grass = new THREE.Mesh(instancedGeometry, grassMaterial);
    scene.add(grass);
}


function Update(deltaTime) {

    if (WeatherData.current.wind_mph)
        newWindmill.rotateWindmill(WeatherData.current.wind_mph * deltaTime);
}
