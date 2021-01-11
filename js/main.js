import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/loaders/GLTFLoader.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});

    // perspective cam
    // const fov = 75;
    // const aspect = 2;
    // const near = 0.1;
    // const far = 100;
    // const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // camera.position.set(30, 20, 30);
    // camera.lookAt(0, 0, 0);

    // ortho cam
    const cleft = canvas.clientWidth / -2;
    const cright = canvas.clientWidth / 2;
    const ctop = canvas.clientHeight / 2;
    const cbot = canvas.clientHeight / -2;

    const camera = new THREE.OrthographicCamera(cleft, cright, ctop, cbot);
    camera.position.set(30, 20, 30);
    camera.lookAt(0, 0, 0);


    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );


    // controls
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 3, 0);
    controls.update();

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
    {
        const gltfLoader = new GLTFLoader();

        gltfLoader.load('obj/jagung.gltf', (gltf) => {
            const root = gltf.scene;
            scene.add(root);
        });
    }

    // ! level
    const grassgeom = new THREE.BoxBufferGeometry(50, 1, 20);
    const grassmat = new THREE.MeshPhongMaterial({
        color: 0x196309,
        // side: THREE.DoubleSide
    });
    const ground = [
        new THREE.Mesh(grassgeom, grassmat),
        new THREE.Mesh(grassgeom, grassmat)
    ]
    scene.add(ground[0]);
    ground[0].position.set(0, -0.5, 15);
    scene.add(ground[1]);
    ground[1].position.set(0, 0-0.5, -15);

    const roadgeom = new THREE.BoxBufferGeometry(50, 1, 10);
    const roadmat = new THREE.MeshPhongMaterial({
        color: 0x918483,
    });

    const road = new THREE.Mesh(roadgeom, roadmat);
    scene.add(road);
    road.position.set(0, -0.5, 0);
    
    
    // ! controls
    var ayamp1 = THREE.Object3D;
    var jagung = THREE.Object3D;
    console.log(jagung);

    ayamp1 = setTimeout(function(){ // nunggu async gltf di load 1 detik
        ayamp1 = scene.getObjectByName( "Ayam" );
        ayamp1.position.set(0, 0, 0);
        return ayamp1;
    }, 1000);

    jagung = setTimeout(function(){ // nunggu async gltf di load 1 detik
        jagung = scene.getObjectByName( "Jagung" );
        jagung.position.set(4, 0, 0);
        console.log(jagung);
        return jagung;
    }, 1000);

    // jagung random position
    var posx = 24;
    var netx = -24;
    var posz = 24;
    var netz = -24;
    var jagungPositionX = 0;
    var jagungPositionZ = 0;

    function spawnJagung() {
        jagungPositionX =  Math.floor(Math.random() * (posx - netx + 1)) + netx;
        jagungPositionZ =  Math.floor(Math.random() * (posz - netz + 1)) + netz;

        if (jagungPositionX < 0) {
            let tmpx = Math.abs(jagungPositionX);
            if (tmpx%4 != 0) {
                spawnJagung();
                return;
            }
        }
        if (jagungPositionZ < 0) {
            let tmpz = Math.abs(jagungPositionZ);
            if (tmpz%4 != 0) {
                spawnJagung();
                return;
            }
        }

        if (jagungPositionX%4 == 0 && jagungPositionZ%4 == 0) {
            console.log(jagungPositionX%4, jagungPositionZ%4);
            jagung.position.set(jagungPositionX, 1, jagungPositionZ);
        }else {
            spawnJagung();
            return;
        }
        
    }

    // animasi jagung
    var upJagung = true;
    var jagungMove = 0.005;
    function jagungIdle() {
        jagung.rotation.y += 0.05;

        if (upJagung) {
            jagung.position.y += jagungMove;
        }else{
            jagung.position.y -= jagungMove;
        }
        
        if (jagung.position.y > 2){
            upJagung = false;
        }else if (jagung.position.y < 1) {
            upJagung = true;
        }
    }

    // collision
    function ayamJagungCollision() {
        if (ayamp1.position.x == jagung.position.x &&
            ayamp1.position.z == jagung.position.z) {
            return true;
        }else if (
            ayamp1.position.x == jagung.position.x &&
            ayamp1.position.z == jagung.position.z ){
            return true;
        }else if (
            ayamp1.position.z == jagung.position.z &&
            ayamp1.position.x == jagung.position.x){
            return true;
        }else if (
            ayamp1.position.z == jagung.position.z &&
            ayamp1.position.x == jagung.position.x){
            return true;
        }
        
    }



    document.addEventListener( 'keydown', onKeyDown, false );
    function onKeyDown(event) {
        var xspeed = 4;
        var zspeed = 4;
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
        console.log(ayamp1.position.x, ayamp1.position.z);
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

        if (jagung.name == 'Jagung' && ayamp1.name == "Ayam") { //cek udah di load atau belum

            // animasi idle jagung
            jagungIdle();

            // cek makan jagung
            if(ayamJagungCollision()) {
                console.log('makan jagung');
                spawnJagung();
            }
        }

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
    requestAnimationFrame(render);
}

main();

