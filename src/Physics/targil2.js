import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = document.querySelector("canvas.webgl1");

// Scene
const scene = new THREE.Scene();
const v0x = 10;
const v0y = 5;
const G = -9.8;

const linespace = (start, stop, steps) => {
  const array = [];
  const singleStep = (stop - start) / (steps - 1);

  for (let i = 0; i < steps; i++) {
    array.push(start + i * singleStep);
  }

  return array;
};

// Example usage:
const result = linespace(0, (v0y * 2) / (-1 * G), 300);
console.log(result);

// console.log(linespace(0, (v0y * 2) / (-1 * G), 300));
// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 0, 30);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
//

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Clock
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // group.lookAt(mesh);
  // mesh.rotation.y = elapsedTime;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
