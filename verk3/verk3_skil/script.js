import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// const loader = new GLTFLoader();

// allt fyrir ofan er import og add-ons.


// cameran og rendera inn.
const scene = new THREE.Scene();    // 75 er fov (degrees), aspect ratio, near og far (nálægasti punktur og lengsti í burt.)
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
camera.position.y = 2;

// renderinn er webgl og setjum hann í stærðina á glugganum og bætum honum sem child við body.
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );  // þarf að færa eftir að cameran/renderinn er búin til.


// Cube code --------------------------------------------------------------------------------------------

// material 
const loader = new THREE.TextureLoader().load( "/verk3/verk3_skil/resources/floor.jpg" );

// cube fyrir neðan"
// default shape cube.                  x  y  z
const geometry = new THREE.BoxGeometry( 4, .5  , 4 ); // stærð
const material = new THREE.MeshBasicMaterial( { map:loader } ); // litur
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// -------------------------------------------------------------------------------------------------------

// Setja inn scannaða hlutinn.

let model;
let rocket;

function gltfMaker(path){
    const ScannedLoader = new GLTFLoader();
    ScannedLoader.load( path, ( gltf ) => {
    
        model = gltf.scene;
    
        scene.add( model );
    } );
    
}

function gltfScaleMaker(path){
    const ScannedLoader = new GLTFLoader();
    ScannedLoader.load( path, ( gltf ) => {
    
        rocket = gltf.scene;
        rocket.scale.set(0.2,0.2,0.2);
        rocket.position.x = 3.5;
        rocket.rotation.x = 5;
        
        scene.add( rocket );
    } );
}

gltfMaker("/verk3/verk3_skil/resources/basketball.glb");
gltfScaleMaker("/verk3/verk3_skil/resources/SpaceShuttle.gltf");

// --------------------------------------------------------------------------------------------------------

// ljósið.
const light = new THREE.AmbientLight( 0x404040,50 );
scene.add( light );



// loopa sem er alltaf að rendera og updatea.
function animate() {
    requestAnimationFrame( animate );
    // ef modelið (körfuboltinn er renderaður) þá má byrja animation, ef ekki fékk ég bara fullt af undefined og keyrði ekki.
    if (model){
        model.rotation.y += 0.01;   
    }
    if ( rocket ){
        rocket.rotation.y = 187;
        
    }
    
    renderer.render( scene, camera);
}

animate();