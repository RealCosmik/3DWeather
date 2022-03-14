import * as entry from "../script";
import * as THREE from "three";
import * as WeatherHelper from "../WeatherAPI";
import * as SceneLoader from "../script"
import { Duck } from "../SceneObjects/Duck";
import { Globe } from "../SceneObjects/Globe";
export { zipValue as userZipCode };
var zipValue;
// This variable is the stored zipcode input by the user
var zipInput = document.getElementById('zip_input');
var searchBar = document.getElementById('SearchBar');

//exporting the user input for global access

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
    
    //Test Sphere object
    var sphere = new THREE.SphereGeometry(15,32,16);

    //points for point material
    var points = new THREE.PointsMaterial({size: 0.1, color: "blue"})
    //var points = new THREE.MeshBasicMaterial({color: 0xffffff})

    //Test duck object
    //var duck = await Duck(scene)

    //Loading the globe in
    var globes = await Globe(scene)
    console.log(globes)
    globes.scale.set(5,5,5)

    // particle sphere 
    globes.material = points
    var particeSphere = new THREE.Points(globes.geometry, points)
    particeSphere.
    //var particeSphere = new THREE.Points(sphere, points)

    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    // scene.add(ambientLight);


    
    scene.add(particeSphere);
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