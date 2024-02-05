import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TDSLoader } from "three/addons/loaders/TDSLoader.js";
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
// Object
const texture = new THREE.TextureLoader().load("2k_earth_daymap.jpg");
const geometry = new THREE.SphereGeometry(5, 32, 16);
const material = new THREE.MeshBasicMaterial({
  map: texture,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 0, 30);
scene.add(camera);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 15);
camera.add(pointLight);
scene.add(camera);
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
//

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const normal = new THREE.TextureLoader().load(
  "Satelate/Textures/satellite_Satélite_Roughness.jpg"
);
const group = new THREE.Group();
const loader = new TDSLoader();
loader.setResourcePath("Satelate/Textures/");
loader.load("Satelate/Satellite.3ds", function (object) {
  object.traverse(function (child) {
    if (child.isMesh) {
      child.material.normalMap = normal;
    }
  });
  group.add(object);
  object.rotation.x = Math.cos(Math.PI) * 2;
});
scene.add(group);
group.lookAt(
  new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z)
);

// Clock
const clock = new THREE.Clock();

const get_theta_t = (time, t_cycle) => {
  return ((2 * Math.PI) / t_cycle) * time;
};
const tick = () => {
  //   mesh.position.x += 0.01;
  //   const currentTime = Date.now();
  //   const deltaTime = currentTime - time;
  //   time = currentTime;
  //   console.log(deltaTime);cv
  // clock
  const elapsedTime = clock.getElapsedTime();
  group.position.x = -20 * Math.cos(get_theta_t(elapsedTime, 14));
  group.position.y = -20 * Math.sin(get_theta_t(elapsedTime, 14));
  mesh.rotation.x = Math.cos(get_theta_t(elapsedTime, 24));
  mesh.rotation.y = Math.sin(get_theta_t(elapsedTime, 24));
  // group.lookAt(mesh);
  // mesh.rotation.y = elapsedTime;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
