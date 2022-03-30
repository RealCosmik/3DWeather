import * as entry from "../script";
import * as THREE from "three";
import * as WeatherHelper from "../WeatherAPI";
import * as SceneLoader from "../script"
import { Duck } from "../SceneObjects/Duck";
import { Globe } from "../SceneObjects/Globe";
import { Cloud } from "../SceneObjects/Cloud";
import { Text } from "../SceneObjects/Text.js";
export { zipValue as userZipCode };
var zipValue;
// This variable is the stored zipcode input by the user
var zipInput = document.getElementById('zip_input');
var searchBar = document.getElementById('SearchBar');

//The logic below was obtained from Stackoverflow
//https://stackoverflow.com/questions/21491119/sending-form-text-input-to-console-log-for-testing

//Event listener for the search bar when the user hits "Enter" or clicks the search icon
document.querySelector('form.input').addEventListener('submit', onSubmit);

async function onSubmit(eventArgs) {
    //prevent the normal submission of the form
    eventArgs.preventDefault();
    zipValue = zipInput.value;
    //Logging the output to the console
    console.log("ZipValue Recieved: " + zipValue.toString());
    var didSceneLoad = await SceneLoader.LoadScene(zipValue);
    // if (didSceneLoad)
    //     searchBar.remove();
}

export async function Initalize(scene, camera, canvas) {
    entry.ClearExceptCamera();

    //Creating a group for both the globe and the text to be changed at same time
    const group = new THREE.Group();
    
    //Test Sphere object (only needed for debugging)
    var sphere = new THREE.SphereGeometry(15,32,16);

    //points for point material
    var points = new THREE.PointsMaterial({size: .01, color: "blue"})

    //Loading the globe in
    var globes = await Globe(scene)
    console.log(globes)

    //---UNCOMMENT FOR CLOUD EXAMPLE---
    // var cloud = await Cloud(scene)
    // console.log(cloud)
    // cloud.scale.set(5,5,5)

    //particles for cloud
    //cloud.material = points


    globes.material = points
    var particeSphere = new THREE.Points(globes.geometry, points)
    //Adjust the scale of JUST the globe
    particeSphere.scale.set(2,2,2);
  
    //adding the globe particlesphere to the group
    group.add(particeSphere);

    //WELCOME TEXT
    var welcomeText = await Text(
      scene,
      "Welcome to 3D Weather! \n Enter a location above."
    );
    //Adjust the scale of JUST the text
    welcomeText.scale.set(5,5,5);
    
    //Add Welcome text to the group
    group.add(welcomeText);
  
    //axes helper
    const axesHelper = new THREE.AxesHelper( 5 );
    axesHelper.scale.set(10,10,10)
    scene.add( axesHelper );

    //adding the group to the scene
    scene.add(group);
    
    //AddLightsToScene(scene);
    entry.RegisterOnSceneUpdate(Update);
}



function AddLightsToScene(scene) {
    const hemisphereLight = new THREE.HemisphereLight(0xadd8e6, 0xffffff, 0.3);
    scene.add(hemisphereLight);
  
    const pointLight = new THREE.PointLight(0xff9000, 0.4, 10, 2);
    scene.add(pointLight);
  
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    // scene.add(ambientLight);
  
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.camera.far = 285;
    directionalLight.shadow.camera.left = 0;
    directionalLight.shadow.camera.top = 0;
    directionalLight.shadow.camera.right = 0;
    directionalLight.shadow.camera.bottom = 0;
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