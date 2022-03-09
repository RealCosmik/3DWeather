import * as THREE from "three";

export async function Room(scene) {
  const room = new THREE.Group();
  

  const wallLeft = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 5, 5),
    new THREE.MeshStandardMaterial({ color: "#FFFFFF" })
  );

  wallLeft.position.x = -2.4;
  wallLeft.position.y = 2.5;
  wallLeft.position.z = -0.04;
  room.add(wallLeft);

  const wallRight = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 5, 5),
    new THREE.MeshStandardMaterial({ color: "#FFFFFF" })
  );
  wallRight.position.x = 0.04;
  wallRight.position.y = 2.5;
  wallRight.position.z = -2.5;
  wallRight.rotateY(300);
  room.add(wallRight);

  const wallFloor = new THREE.Mesh(
    new THREE.BoxGeometry(5, 0.05, 5),
    new THREE.MeshStandardMaterial({ color: "#FFFFFF" })
  );
  wallFloor.position.y = 0;
  wallFloor.position.z = 0;
  wallFloor.rotateY(300);
  room.add(wallFloor);
    
  scene.add(room);

  return room;
}
