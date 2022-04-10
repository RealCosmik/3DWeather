import * as THREE from "three";

export class Room {
  roomModel;
  static async CreateRoom() {
    const newRoom = new Room();
    newRoom.roomModel = new THREE.Group();
    const wallLeft = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 5, 5),
      new THREE.MeshStandardMaterial({ color: "#FFFFFF" })
    );

    wallLeft.position.x = -2.4;
    wallLeft.position.y = 2.5;
    wallLeft.position.z = -0.04;
    newRoom.roomModel.add(wallLeft);

    const wallRight = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 5, 5),
      new THREE.MeshStandardMaterial({ color: "#FFFFFF" })
    );
    wallRight.position.x = 0.04;
    wallRight.position.y = 2.5;
    wallRight.position.z = -2.5;
    wallRight.rotateY(300);
    newRoom.roomModel.add(wallRight);

    const wallFloor = new THREE.Mesh(
      new THREE.BoxGeometry(5, 0.05, 5),
      new THREE.MeshStandardMaterial({ color: "#FFFFFF" })
    );
    wallFloor.position.y = 0;
    wallFloor.position.z = 0;
    wallFloor.rotateY(300);
    newRoom.roomModel.add(wallFloor);
    return newRoom;
  }
}
