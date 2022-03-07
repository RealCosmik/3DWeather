import * as entry from "../script";
import * as THREE from "three";
import * as WeatherHelper from "../WeatherAPI";
export async function Initalize(scene, camera, canvas) {
    entry.RegisterOnSceneUpdate(OnSceneUpdate);
}
function OnSceneUpdate(deltaTime) {
    // console.log("RichScene");
    // //https://stackoverflow.com/questions/21491119/sending-form-text-input-to-console-log-for-testing
    // var zipInput = document.getElementById('zip_input');

    // document.querySelector('div.input').addEventListener('submit', function (e) {

    //     //prevent the normal submission of the form
    //     e.preventDefault();
    
    //     console.log("Zip Code Input = " + zipInput.value);
    //     console.log("ZipValue Recieved");    
    // });
    //console.log("RichScene");
    //console.log(document.getElementById('zip_input').value);

}
var zipInput = document.getElementById('zip_input');

export{zipInput};

//https://stackoverflow.com/questions/21491119/sending-form-text-input-to-console-log-for-testing
document.querySelector('form.input').addEventListener('submit', function (e) {

    //prevent the normal submission of the form
    e.preventDefault();

    console.log("ZipValue Recieved: " +zipInput.value);   
});
