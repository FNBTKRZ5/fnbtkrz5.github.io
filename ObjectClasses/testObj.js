import * as THREE from "three";

export default class testObj {
  constructor(scene) {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    );
    scene.add(this.mesh);
    this.interactable = false;
    this.action = this.action.bind(this);
    window.addEventListener("keyup", this.action);
  }
  action(e) {
    if (e.code != "KeyE") return;
    let a = setInterval(()=>{
      this.mesh.rotation.x += 0.05;
      this.mesh.rotation.y += 0.1;
      this.mesh.rotation.z -= 0.07;
    }, 10);
    setTimeout(()=>{clearInterval(a)}, 2000);
  }

  update(whatshit) {
    if (whatshit.find(i=>i.object === this.mesh)) {
      this.mesh.material.color.set(0xff0000);
      this.interactable = true;
    } else {
      this.mesh.material.color.set(0x00ff00);
      this.interactable = false;
    }
  }

}