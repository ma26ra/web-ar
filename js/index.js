

/*!
 * Web AR
 * version 1.0
 *
 * Modules in this bundle
 * @license
 *  three.js:
 *  Copyright © 2010-2016 three.js authors
 *  Released under the MIT license
 *  https://github.com/mrdoob/three.js/blob/master/LICENSE
 *
 *  AR.js:
 *  Copyright 2017 Jerome Etienne
 *  https://github.com/jeromeetienne/AR.js
 *
 */
const renderer	= new THREE.WebGLRenderer({
  antialias	: true,
  alpha: true
});

renderer.setClearColor(new THREE.Color('lightgrey'), 0);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0px';
renderer.domElement.style.left = '0px';
document.body.appendChild( renderer.domElement );

const scene	= new THREE.Scene();
const camera = new THREE.Camera();
scene.add(camera);

const arToolkitSource = new THREEx.ArToolkitSource({
  sourceType : 'webcam'
});

arToolkitSource.init(function onReady(){
  onResize();
});

window.addEventListener('resize', function(){
  onResize();
});

const onResize = () => {
  arToolkitSource.onResize();
  arToolkitSource.copySizeTo(renderer.domElement);
  if( arToolkitContext.arController !== null ){
    arToolkitSource.copySizeTo(arToolkitContext.arController.canvas);
  }
}

const arToolkitContext = new THREEx.ArToolkitContext({
  cameraParametersUrl: 'dat/camera_para.dat',
  detectionMode: 'mono',
  maxDetectionRate: 30,
  canvasWidth: 80*3,
  canvasHeight: 60*3,
});

arToolkitContext.init(function onCompleted(){
  camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix());
});

const markerRoot = new THREE.Group;
scene.add(markerRoot);

const artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
  type : 'pattern',
  patternUrl : 'pat/pattern-marker.patt'
});

const directionalLight = new THREE.DirectionalLight(0xFFFFCD, 0.8);
directionalLight.position.set(0, 60, 200);
const ambientLight = new THREE.AmbientLight(0xFFFFCD);
scene.add(directionalLight, ambientLight);

loader = new THREE.JSONLoader();

loader.load('car.json', (geo, mat) => {
  const faceMat = new THREE.MeshFaceMaterial(mat);
  const model = new THREE.Mesh(geo, faceMat);
  model.name = "car";
  model.position.set(0, 0.5, 0);
  model.scale.set(0.5, 0.5, 0.5);
  markerRoot.add(model);
});

requestAnimationFrame(function animate(){
  requestAnimationFrame( animate );
  arToolkitContext.update( arToolkitSource.domElement );
  renderer.render(scene, camera);
});
