import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Texture } from 'three';
import { TextureLoader } from 'three';

// const controls = new OrbitControls( camera, renderer.domElement );  // þarf að færa eftir að cameran erbúin til.
// const loader = new GLTFLoader();

// allt fyrir ofan er import og add-ons.


// cameran og rendera inn.
const scene = new THREE.Scene();    // 75 er fov (degrees), aspect ratio, near og far (nálægasti punktur og lengsti í burt.)
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// renderinn er webgl og setjum hann í stærðina á glugganum og bætum honum sem child við body.
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



// material 
const loader = new THREE.TextureLoader().load( "/verk3/verk3_skil/resources/uv-test-bw.png" );

// cube fyrir neðan"
// default shape cube.                  x  y  z
const geometry = new THREE.BoxGeometry( 1, 1, 1 ); // stærð
const material = new THREE.MeshBasicMaterial( { map:loader } ); // litur
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

console.log("tengt");

// loopa sem er alltaf að rendera og updatea.
function animate() {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera);
}

animate();