import * as entry from "../script";
import * as THREE from "three";
import * as WeatherHelper from "../WeatherAPI";
import * as SceneLoader from "../script"
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
    if (didSceneLoad)
        searchBar.remove();
}