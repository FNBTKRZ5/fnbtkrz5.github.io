import * as THREE from "three";
import player from "./ObjectClasses/player.js"
import testObj from "./ObjectClasses/testObj.js";

// prep
const cnvs = document.querySelector("canvas#sceneContainer");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: cnvs, context: cnvs.getContext("webgl2")});
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const cpointer = new THREE.Vector2(0,0);
renderer.setSize(window.innerWidth, window.innerHeight);

// setup objects
const Player = new player(camera, cnvs);
const light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );
const tObj = new testObj(scene);
camera.position.z = 5;

// action-core
window.addEventListener("resize", ()=>{
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
});
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  Player.update(delta);
  raycaster.setFromCamera(cpointer, camera);
  tObj.update(raycaster);

  renderer.render(scene, camera);
}
animate();