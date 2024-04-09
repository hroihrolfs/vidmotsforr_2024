import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// allt fyrir ofan eru imports og add-ons.


// global breytur 
const width = screen.width;


// scene 
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();


//create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );


for(let i = 0; i < 10; i++){
    // punktar fyrir línuna.
    const points = [];           // x  y  z
    points.push( new THREE.Vector3( i, 10, 0 ) );
    points.push( new THREE.Vector3( i, -10, 0 ) );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    // setur línuna í breytu (var)
    const line = new THREE.Line( geometry, material );

    scene.add( line );
    renderer.render( scene, camera );

}



