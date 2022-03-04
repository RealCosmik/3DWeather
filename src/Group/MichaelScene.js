import * as entry from "../script";
export function Initalize(scene, camera, canvas) {
    entry.RegisterOnSceneUpdate(OnSceneUpdate);
}
function OnSceneUpdate(deltaTime) {
}