/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

renderer.setClearColor(new THREE.Color('lightgrey'), 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0px';
renderer.domElement.style.left = '0px';
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
var camera = new THREE.Camera();
scene.add(camera);

var arToolkitSource = new THREEx.ArToolkitSource({
  sourceType: 'webcam'
});

arToolkitSource.init(function onReady() {
  onResize();
});

window.addEventListener('resize', function () {
  onResize();
});

var onResize = function onResize() {
  arToolkitSource.onResize();
  arToolkitSource.copySizeTo(renderer.domElement);
  if (arToolkitContext.arController !== null) {
    arToolkitSource.copySizeTo(arToolkitContext.arController.canvas);
  }
};

var arToolkitContext = new THREEx.ArToolkitContext({
  cameraParametersUrl: 'dat/camera_para.dat',
  detectionMode: 'mono',
  maxDetectionRate: 30,
  canvasWidth: 80 * 3,
  canvasHeight: 60 * 3
});

arToolkitContext.init(function onCompleted() {
  camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
});

var markerRoot = new THREE.Group();
scene.add(markerRoot);

var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
  type: 'pattern',
  patternUrl: 'pat/pattern-marker.patt'
});

var directionalLight = new THREE.DirectionalLight(0xFFFFCD, 0.8);
directionalLight.position.set(0, 60, 200);
var ambientLight = new THREE.AmbientLight(0xFFFFCD);
scene.add(directionalLight, ambientLight);

loader = new THREE.JSONLoader();

loader.load('car.json', function (geo, mat) {
  var faceMat = new THREE.MeshFaceMaterial(mat);
  var model = new THREE.Mesh(geo, faceMat);
  model.name = "car";
  model.position.set(0, 0.5, 0);
  model.scale.set(0.5, 0.5, 0.5);
  markerRoot.add(model);
});

requestAnimationFrame(function animate() {
  requestAnimationFrame(animate);
  arToolkitContext.update(arToolkitSource.domElement);
  renderer.render(scene, camera);
});

/***/ })
/******/ ]);