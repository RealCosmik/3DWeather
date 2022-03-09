import * as entry from "../script";
import * as THREE from "three";
import * as WeatherHelper from "../WeatherAPI";
export async function Initalize(scene, camera, canvas) {
    entry.RegisterOnSceneUpdate(OnSceneUpdate);
}
function OnSceneUpdate(deltaTime) {
    //add code here
}

// This variable is the stored zipcode input by the user
var zipInput = document.getElementById('zip_input');

//exporting the user input for global access
export{zipInput};

//The logic below was obtained from Stackoverflow
//https://stackoverflow.com/questions/21491119/sending-form-text-input-to-console-log-for-testing

//Event listener for the search bar when the user hits "Enter" or clicks the search icon
document.querySelector('form.input').addEventListener('submit', function (e) {

    //prevent the normal submission of the form
    e.preventDefault();

    //Logging the output to the console
    console.log("ZipValue Recieved: " +zipInput.value);   
});
