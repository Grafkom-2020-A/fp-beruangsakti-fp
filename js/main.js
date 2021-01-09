import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/loaders/GLTFLoader.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});

    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.set(30, 20, 30);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );


    // controls
    // const controls = new OrbitControls(camera, canvas);
    // controls.target.set(0, 3, 0);
    // controls.update();

    // light
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }
    {
        const skyColor = 0xB1E1FF;  // light blue
        const groundColor = 0xB97A20;  // brownish orange
        const intensity = 1;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);
    }

    // ! gltf loader
    {
        const gltfLoader = new GLTFLoader();

        gltfLoader.load('obj/ayam.gltf', (gltf) => {
            const root = gltf.scene;
            scene.add(root);
        });
    }

    const planegeom = new THREE.PlaneBufferGeometry(50, 50, 5, 5);
    const planemat = new THREE.MeshPhongMaterial({
        color: 0x196309,
        // side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(planegeom, planemat);
    scene.add(ground);
    ground.rotation.x = -Math.PI / 2;
    
    // ! controls
    var ayamp1 = THREE.Object3D;

    ayamp1 = setTimeout(function(){ // nunggu async gltf di load 1 detik
        ayamp1 = scene.getObjectByName( "Ayam" );
        ayamp1.position.set(0, 0, 0);
        return ayamp1
    }, 1000);



    document.addEventListener( 'keydown', onKeyDown, false );
    function onKeyDown(event) {
        var xspeed = 1;
        var zspeed = 1;
        var vright = new THREE.Vector3(0, 0, 1);
        if(event.keyCode == 39 && ayamp1.position.x < 24 ) {
            ayamp1.position.x += xspeed;
            ayamp1.rotation.y = 0;
            ayamp1.rotation.y += 1.55;
        }
        if(event.keyCode == 37 && ayamp1.position.x > -24) {
            ayamp1.position.x -= xspeed;
            ayamp1.rotation.y = 0;
            ayamp1.rotation.y -= 1.55;
        }
        if(event.keyCode == 38 && ayamp1.position.z > -24) {
            ayamp1.position.z -= zspeed;
            ayamp1.rotation.y = 0;
            ayamp1.rotation.y -= 3.10;
        }
        if(event.keyCode == 40 && ayamp1.position.z < 24) {
            ayamp1.position.z += zspeed;
            ayamp1.rotation.y = 0;
        }
    }
    
    
    

    // aspect ratio
    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time) {
        time *= 0.001; // time to seconds

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    scene.traverse(function(object) {
        console.log(object);
    });
    requestAnimationFrame(render);
}

main();

