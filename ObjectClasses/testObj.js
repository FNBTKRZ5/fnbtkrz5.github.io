import * as THREE from "three";

export default class testObj {
  constructor(scene) {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    );
    scene.add(this.mesh);
  }

  update(raycaster) {
    const intersect = raycaster.intersectObject(this.mesh);
    if (intersect.length > 0) {
      this.mesh.material.color.set(0xff0000);
    } else {
      this.mesh.material.color.set(0x00ff00);
    }
  }

}