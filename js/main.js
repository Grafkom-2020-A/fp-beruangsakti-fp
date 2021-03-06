import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/loaders/GLTFLoader.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});


    // ortho cam
    const cleft = canvas.clientWidth / -2;
    const cright = canvas.clientWidth / 2;
    const ctop = canvas.clientHeight / 2;
    const cbot = canvas.clientHeight / -2;

    const camera = new THREE.OrthographicCamera(cleft, cright, ctop, cbot);
    camera.position.set(30, 20, 30);
    camera.lookAt(0, 0, 0);
    camera.zoom=15;


    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );


    // controls
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 3, 0);
    controls.update();

    // light
    {
        const color = 0xD28F2A;
        const intensity = 0.8;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }
    {
        const skyColor = 0xB1E1FF;  // light blue
        const groundColor = 0xB97A20;  // brownish orange
        const intensity = 0.6;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
       
        
        scene.add(light);
    }

    // ! gltf loader
    const gltfLoader = new GLTFLoader();
    {
        gltfLoader.load('obj/ayam.gltf', (gltf) => {
            const root = gltf.scene;
            scene.add(root);
        });
    }
    {
        gltfLoader.load('obj/mobil.gltf', (gltf) => {
            const root = gltf.scene;
            root.rotation.y = Math.PI;
            scene.add(root);
        });
    }
    {
        gltfLoader.load('obj/StreetLamp.gltf', (gltf) => {
            const root = gltf.scene;
            scene.add(root);
        });
    }
    {
        gltfLoader.load('obj/Grass.gltf', (gltf) => {
            const root = gltf.scene;
            scene.add(root);
        });
    }
    {
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
    ground[1].position.set(0, -0.5, -15);

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
    var grass = THREE.Object3D;
    var grass2 = THREE.Object3D;
    var lamps = THREE.Object3D;
    var mobil = THREE.Object3D;
    
    console.log(jagung);

    ayamp1 = setTimeout(function(){ // nunggu async gltf di load 1 detik
        ayamp1 = scene.getObjectByName( "Ayam" );
        ayamp1.position.set(0, 0, 8);
        return ayamp1;
    }, 1000);

    lamps = setTimeout(function(){ // nunggu async gltf di load 1 detik
        lamps = scene.getObjectByName( "Lamps" );
        lamps.position.set(0, 0, -6);
        return lamps;
    }, 1000);

    mobil = setTimeout(function(){ // nunggu async gltf di load 1 detik
        mobil = scene.getObjectByName( "Mobil" );
        mobil.position.set(24, 0, 0);
        return mobil;
    }, 1000);

    grass = setTimeout(function(){ // nunggu async gltf di load 1 detik
        grass = scene.getObjectByName( "Grass" );
        grass.position.set(0, -0.2, 15);
        var xGrass=15; var zGrass=15;

        for(var i=0;i<2;i++){
            grass2 = grass.clone();
            grass2.position.set(xGrass, -0.2, zGrass);
            scene.add(grass2);
            xGrass *= -1;
        }
        for(var i=0;i<3;i++){
            grass2 = grass.clone();
            grass2.position.set(xGrass, -0.2, -15);
            scene.add(grass2);
            xGrass += -15;
        }
        
        return grass;
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
            // console.log(jagungPositionX, jagungPositionZ);
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
            score += 1;
            scoring();
            return true;
        }
    }

    function ayamMobilCollision() {
        if (ayamp1.position.x == mobil.position.x &&
            ayamp1.position.z == mobil.position.z) {
            score += -10;
            scoring();
            return true;
        }
    }

    //scoring
    var score=20;
    var jagungCountSprite=0;
    var hpSpriteParams = {
        'textColor': {
            r: 0,
            g: 0,
            b: 0,
        }
    };
    var scoreTitleSprite = makeTextSprite('Health Points',{'fontsize': 30});
    var scoreSprite = makeTextSprite(score, hpSpriteParams);
    scoreSprite.name = "idScore";
    scene.add(scoreSprite);
    scene.add(scoreTitleSprite, );
    scoreSprite.position.y = 15;
    scoreSprite.position.z = 10;
    scoreTitleSprite.position.y = 20;
    scoreTitleSprite.position.z = 15;
    scoreTitleSprite.position.x = -5;
    var jagungSpriteParams = {
        'textColor': {
            r: 255,
            g: 255,
            b: 0,
        }
    };
    var jagungCount=0;
    var jagungCountSprite = makeTextSprite(jagungCount,jagungSpriteParams);
    scene.add(jagungCountSprite);
    jagungCountSprite.name = "idJagungCount";
    jagungCountSprite.position.y = 15;
    jagungCountSprite.position.z = 20;
            
    var jagungLabel = makeTextSprite("Score",{'fontsize': 30});
    scene.add(jagungLabel);
    jagungLabel.name = "idJagungLabel";
    jagungLabel.position.y = 15;
    jagungLabel.position.z = 15;
    jagungLabel.position.x = -15;
    function scoring(){
            var selectedObject = scene.getObjectByName("idScore");
            scene.remove( selectedObject );

            scoreSprite = makeTextSprite(score, hpSpriteParams);
            scene.add(scoreSprite);
            
            var selectedObject2 = scene.getObjectByName("idJagungCount");
            scene.remove( selectedObject2 );

            var jagungCountSprite = makeTextSprite(jagungCount,jagungSpriteParams);
            scene.add(jagungCountSprite);
            jagungCountSprite.name = "idJagungCount";
            jagungCountSprite.position.y = 15;
            jagungCountSprite.position.z = 20;


          
            scoreSprite.name = "idScore";
            scoreSprite.position.y = 15;
            scoreSprite.position.z = 10;
            
            
    }

    // mobil jalan
    var mobilSpeed = 1;
    var mobilTimer = Math.floor(Math.random() * (300 - 200 + 1)) + 200;
    
    function mobilMove() {
            if (mobil.position.x <= 24) {
                mobil.position.x -= mobilSpeed;
            }
            if (mobil.position.x < -24) {
              
              mobil.visible = false;
                if(mobilTimer == 0){
                    mobilTimer = Math.floor(Math.random() * (300 - 200 + 1)) + 200;
                    mobil.position.x = 24;
                    mobil.visible = true;
                    
                } 
            }
    }

   



    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );
    var keydown =true;
    function onKeyUp(event) {
        if(event.keyCode == 68 && !keydown ) {
            keydown =true;
        }
        if(event.keyCode == 65 && !keydown) {
            keydown =true;
        }
        if(event.keyCode == 87 && !keydown) {
            keydown =true;
        }
        if(event.keyCode == 83 && !keydown) {
            keydown =true;
        }
        
    }
    function onKeyDown(event) {
        var xspeed = 4;
        var zspeed = 4;
        // keydown=true;
        if(event.keyCode == 68 && ayamp1.position.x < 24 && keydown ) {
            ayamp1.position.x += xspeed;
            ayamp1.rotation.y = 0;
            ayamp1.rotation.y += 1.55;
            keydown=false;
        }
        if(event.keyCode == 65 && ayamp1.position.x > -24 && keydown) {
            ayamp1.position.x -= xspeed;
            ayamp1.rotation.y = 0;
            ayamp1.rotation.y -= 1.55;
            keydown=false;
        }
        if(event.keyCode == 87 && ayamp1.position.z > -24 && keydown) {
            ayamp1.position.z -= zspeed;
            ayamp1.rotation.y = 0;
            ayamp1.rotation.y -= 3.10;
            keydown=false;
        }
        if(event.keyCode == 83 && ayamp1.position.z < 24 && keydown) {
            ayamp1.position.z += zspeed;
            ayamp1.rotation.y = 0;
            keydown=false;
        }
        console.log(ayamp1.position.x, ayamp1.position.z);
    }

    //textsprite
    function makeTextSprite( message, parameters )
    {
        if ( parameters === undefined ) parameters = {};
        var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
        var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 50;
        var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
        var borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
        var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
        var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:0, g:0, b:0, a:1.0 };

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;
        
        

        context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
        context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";

        context.lineWidth = borderThickness;
    
        context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
        context.fillText( message, borderThickness, fontsize + borderThickness);

        var texture = new THREE.Texture(canvas) 
        texture.needsUpdate = true;

        var spriteMaterial = new THREE.SpriteMaterial( { map: texture } );
        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
        return sprite;
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



    var timer=300;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    //render
    function render(time) {
        time *= 0.001; // time to seconds
        timer += -1;
        mobilTimer += -1;
        makeTextSprite(score);
        makeTextSprite(jagungCount,jagungSpriteParams);
        if (jagung.name == 'Jagung' &&
            ayamp1.name == "Ayam") { //cek udah di load atau belum

            // animasi idle jagung
            jagungIdle();
            ayamMobilCollision();
            // cek makan jagung
            if(ayamJagungCollision()) {
                jagungCount+=1;
                console.log('makan jagung' + jagungCount);
                spawnJagung();
                timer=300;
                scoring();
            }
            else if(timer==0){
                spawnJagung();
                timer=300;
                score-=2;
                scoring();
            }
        }

        // warna hp
        if (score>0 && score <= 10) {
            hpSpriteParams = {
                'textColor': {
                    r: 255,
                    g: 0,
                    b: 0,
                }
            };
            scoring();
            var shakeLabelY =  Math.floor(Math.random() * (15 - 14 + 1)) + 14;
            var shakeLabelZ =  Math.floor(Math.random() * (10 - 9 + 1)) + 9;
            var ScoreShake = scene.getObjectByName("idScore");
            ScoreShake.position.y = shakeLabelY;
            ScoreShake.position.z = shakeLabelZ;
        }else{
            hpSpriteParams = {
                'textColor': {
                    r: 0,
                    g: 0,
                    b: 0,
                }
            };
            scoring();
        }

        // mobil
        
        if (mobil.name == 'Mobil') {
                mobilMove();  
        }

        // game reset
        if (score <= 0){

            Swal.fire({
                position: 'top-enderro',
                icon: 'error',
                title: 'GAME OVER !',
                showConfirmButton: false,
                timer: 1500
              })
            score = 20;
            jagungCount = 0;
            scoring();
            ayamp1.position.set(0, 0, 8);

            }

        if (score <= 0) {
            
          
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

