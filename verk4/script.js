import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



async function activateXR() {
    // Add a canvas element and initialize a WebGL context that is compatible with WebXR.
        const canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        const gl = canvas.getContext("webgl", {xrCompatible: true});


        const scene = new THREE.Scene();
        
        // kubbur með mismunandi lit á hverri hlið.
        const materials =[
            new THREE.MeshBasicMaterial({color: 0xff0000}),
            new THREE.MeshBasicMaterial({color: 0x0000ff}),
            new THREE.MeshBasicMaterial({color: 0x00ff00}),
            new THREE.MeshBasicMaterial({color: 0xff00ff}),
            new THREE.MeshBasicMaterial({color: 0x00ffff}),
            new THREE.MeshBasicMaterial({color: 0xffff00})
        ];

        const cube = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), materials);
        cube.position.set(1,1,1);
        scene.add(cube);

        // setja upp renderer
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            preserveDrawingBuffer: true,
            canvas: canvas,
            context: gl
        });
        renderer.autoClear = false;

        // The API directly updates the camera matrices.
        // Disable matrix auto updates so three.js doesn't attempt
        // to handle the matrices independently.
        const camera = new THREE.PerspectiveCamera();
        camera.matrixAutoUpdate = false;


        // Initialize a WebXR session using "immersive-ar".
        const session = await navigator.xr.requestSession("immersive-ar");
        session.updateRenderState({
            baseLayer: new XRWebGLLayer(session, gl)
        });

        // A 'local' reference space has a native origin that is located
        // near the viewer's position at the time the session was created.
        const referenceSpace = await session.requestReferenceSpace('local');

        // Create a render loop that allows us to draw on the AR view.
        const onXFrame = (time, frame) => {
            //que up the next draw request.
            session.requestAnimationFrame(onXFrame);

            // Bind the graphics framebuffer to the baseLayer's framebuffer
            gl.bindFramebuffer(gl.FRAMEBUFFER, session.renderState.baseLayer.framebuffer);

            // Retrieve the pose of the device.
            // XRFrame.getViewerPose can return null while the session attempts to establish tracking.
            const pose = frame.getViewerPose(referenceSpace);
            if (pose) {
                // In mobile AR, we only have one view.
                const view = pose.views[0];
            
                const viewport = session.renderState.baseLayer.getViewport(view);
                renderer.setSize(viewport.width, viewport.height)
            
                // Use the view's transform matrix and projection matrix to configure the THREE.camera.
                camera.matrix.fromArray(view.transform.matrix)
                camera.projectionMatrix.fromArray(view.projectionMatrix);
                camera.updateMatrixWorld(true);
            
                // Render the scene with THREE.WebGLRenderer.
                renderer.render(scene, camera)
              }
            }
            session.requestAnimationFrame(onXRFrame);       
}

document.querySelector("button").click(activateXR());
