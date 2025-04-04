import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

export default class player {
  constructor(camera, canvasElm) {
    this.camera = camera;
    this.canvas = canvasElm;
    
    this.cameraControls = new PointerLockControls(camera, document.body);
    this.cameraControls.pointerSpeed = 0.5;
    this.cameraControls.addEventListener("lock", ()=>{
      this.isCursorLocked = true;
      this.canvas.setAttribute("pointer-isLocked", "");
    });
    this.cameraControls.addEventListener("unlock", ()=>{
      this.isCursorLocked = false;
      this.canvas.removeAttribute("pointer-isLocked");
    });
    this.cameraControls.lock();
    this.isCursorLocked = this.cameraControls.isLocked;

    this.movementSpd = 1.25;
    this.moveDirection = {fwd:0, r:0};
    this.keysPressed = new Set(); //track keys

    this.assignAction();
  }
  assignAction() {
    window.addEventListener("keydown", (e) => {
      this.keysPressed.add(e.code);

      if (this.keysPressed.has("KeyW") || this.keysPressed.has("ArrowUp")) {
        this.moveDirection.fwd = 1;
      }
      if (this.keysPressed.has("KeyS") || this.keysPressed.has("ArrowDown")) {
        this.moveDirection.fwd = -1;
      }
      if (this.keysPressed.has("KeyA") || this.keysPressed.has("ArrowLeft")) {
        this.moveDirection.r = -1;
      }
      if (this.keysPressed.has("KeyD") || this.keysPressed.has("ArrowRight")) {
        this.moveDirection.r = 1;
      }
    });
    window.addEventListener("keyup", (e) => {
      this.keysPressed.delete(e.code);

      // Check remaining keys before stopping movement
      this.moveDirection.fwd =
        this.keysPressed.has("KeyW") || this.keysPressed.has("ArrowUp")
          ? 1
        : this.keysPressed.has("KeyS") || this.keysPressed.has("ArrowDown")
          ? -1
          : 0;

      this.moveDirection.r =
        this.keysPressed.has("KeyA") || this.keysPressed.has("ArrowLeft")
          ? -1
        : this.keysPressed.has("KeyD") || this.keysPressed.has("ArrowRight")
          ? 1 : 0;
    });
    window.addEventListener("mousedown", (e) => {
      this.keysPressed.delete(e.code);

      if (e.button === 1) {
        if (!this.isCursorLocked) {
          this.cameraControls.lock();
        } else {
          this.cameraControls.unlock();
        }
      }
    });
  }

  update(delta) {
    //if (!this.isCursorLocked) return;

    const MovementSpeed = this.movementSpd * delta;
    if (this.moveDirection.fwd != 0) {
      this.cameraControls.moveForward(this.moveDirection.fwd * MovementSpeed);
    } if (this.moveDirection.r != 0) {
      this.cameraControls.moveRight(this.moveDirection.r * MovementSpeed);
    }
  }
}