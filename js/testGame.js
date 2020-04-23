let scene, renderer, cube, floor, players=[], gravity, light;
//Set a keystate object that will have the state of every key that is pressed written to it
let keyState = {};

function createPlayer(name){
    let position = {x: 0, y: 0, z: 0};
    let rotation = {x: 0, y: 0, z: 0};
    let height = 2;
    let width = 1;
    let nickName = name;
    let isJumping = false;
    let isCrouching = false;
    let isSprinting = false;
    let isFlying = false;
    let isFalling = false;
    let moveForwardBack = 0;
    let moveLeftRight = 0;
    let velocity = 0.2;
    //Creates the camera to view the scene
    // ARGS: FOV, Aspect Ratio, Near Clipping Plane, Far Clipping Plane
    // Clipping Plane = when objects start being rendered on the camera and when they stop being rendered
    let camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    camera.position.y = position.y+height;
    return new player(nickName, position, rotation, height, width, isJumping, isCrouching, isSprinting, isFlying,
        isFalling, camera, moveForwardBack, moveLeftRight, velocity, false);
}

function player(name, position, rotation, h, w, jumping, crouching, sprinting, flying, falling,
                camera, moveForwardBack, moveLeftRight, velocity, remote){
    this.moveForwardBack = moveForwardBack;
    this.moveLeftRight = moveLeftRight;
    this.velocity = velocity;
    this.position = position;
    this.rotation = rotation;
    this.height = h;
    this.width = w;
    this.nickName = name;
    this.isJumping = jumping;
    this.isCrouching = crouching;
    this.isSprinting = sprinting;
    this.isFlying = flying;
    this.isFalling = falling;
    this.isRemote = remote;
    //Creates the camera to view the scene
    // ARGS: FOV, Aspect Ratio, Near Clipping Plane, Far Clipping Plane
    // Clipping Plane = when objects start being rendered on the camera and when they stop being rendered
    camera.rotation.order = "YXZ";
    this.camera = camera;
}

function handleKeys(player){
    if(keyState[87]===true){
        player.moveForwardBack = 1;
    }else if(keyState[83]===true){
        player.moveForwardBack = -1;
    }else{
        player.moveForwardBack = 0;
    }
    if(keyState[65]===true){
        player.moveLeftRight = -1;
    }else if(keyState[68]===true){
        player.moveLeftRight = 1;
    }else{
        player.moveLeftRight = 0;
    }
    if(keyState[38]===true){
        player.rotation.x += 0.03
    }
    if(keyState[40]===true){
        player.rotation.x -= 0.03
    }
    if(keyState[37]===true){
        player.rotation.y += 0.03
    }
    if(keyState[39]===true){
        player.rotation.y -= 0.03
    }
}

function handleMouse(event){
    let localP;
    for(let i = 0; i<players.length;i++)
        if(!players[i].isRemote) {
            localP = players[i];
            break;
        }
    if(localP!=null){
        mouseX =- ( event.clientX / renderer.domElement.clientWidth ) * 5 + 1;
        mouseY =- ( event.clientY / renderer.domElement.clientHeight ) * 5 + 1;
        localP.rotation.x = mouseY;
        localP.rotation.y = mouseX;

    }
}

function playerMovement(player){


    //console.log(player.moveForwardBack+":"+player.moveLeftRight);

    if(player.moveForwardBack === 1){
        player.position.z -= player.velocity;
    }
    if(player.moveForwardBack === -1){
        player.position.z += player.velocity;
    }
    if(player.moveLeftRight === 1){
        player.position.x += player.velocity;
    }
    if(player.moveLeftRight === -1){
        player.position.x -= player.velocity;
    }
}

function updateCameraPos(){
    for(let player in players){
        let tempPlayer = players[player];
        tempPlayer.camera.rotation.x = tempPlayer.rotation.x;
        tempPlayer.camera.rotation.y = tempPlayer.rotation.y;
        tempPlayer.camera.position.x = tempPlayer.position.x;
        tempPlayer.camera.position.y = tempPlayer.position.y+tempPlayer.height;
        tempPlayer.camera.position.z = tempPlayer.position.z;
        tempPlayer.camera.updateProjectionMatrix()
    }
}

function onKeyDown(event){
    //console.log(event.keyCode);
    keyState[event.keyCode || event.which] = true;
}

function onKeyUp(event){
    keyState[event.keyCode || event.which] = false;
}

function onWindowResize(event){
    renderer.setSize(window.innerWidth-17/window.innerHeight);
    console.log(renderer);
    for(let player in players){
        let tempPlayer = players[player];
        tempPlayer.camera.aspect = window.innerWidth-17/window.innerHeight;
        tempPlayer.camera.updateProjectionMatrix();
    }
}

function pointerLockChange(event) {
    if (document.pointerLockElement === requestedElement ||
        document.mozPointerLockElement === requestedElement ||
        document.webkitPointerLockElement === requestedElement) {
        // Pointer was just locked
        // Enable the mousemove listener
        document.addEventListener("mousemove", this.moveCallback, false);
    } else {
        // Pointer was just unlocked
        // Disable the mousemove listener
        document.removeEventListener("mousemove", this.moveCallback, false);
        this.unlockHook(this.element);
    }
}

function init(){

    //Creates the scene to display objects
    scene = new THREE.Scene();

    //creates the renderer in which all objects will be rendered
    renderer = new THREE.WebGLRenderer();
    //set the size of the renderer
    renderer.setSize(window.innerWidth-17,window.innerHeight);
    renderer.shadowMap.enabled = true;

    light = new THREE.DirectionalLight(0xFFFFFF,0.5);
    light.position.set(200, 200, 600);
    light.castShadow = true;

    //Create event listeners
    document.addEventListener("keydown",onKeyDown);
    document.addEventListener("keyup",onKeyUp);
    document.addEventListener("mousemove", handleMouse);
    window.addEventListener("resize",onWindowResize,false);
    // Hook pointer lock state change events
    document.addEventListener('pointerlockchange', pointerLockChange, false);
    document.addEventListener('mozpointerlockchange', pointerLockChange, false);
    document.addEventListener('webkitpointerlockchange', pointerLockChange, false);

    //Assigns the renderer to a canvas object to display the scene to us
    document.body.appendChild(renderer.domElement);

    //Create the 3D shape (Box with width, height and Depth dimensions)
    let geometry = new THREE.BoxGeometry(1,1,1);
    //Creates the mesh material to assign to the box
    let material = new THREE.MeshStandardMaterial({color: 0x00FF00});
    //Create a new mesh with the geometry of the box and the material
    cube = new THREE.Mesh(geometry,material);

    //Create a floor
    floor = new THREE.Mesh(
        new THREE.BoxGeometry(50,10,50),
        new THREE.MeshStandardMaterial({color: 0xFFFFFF})
    );

    cube.castShadow = true;
    cube.receiveShadow = true;
    floor.castShadow = false;
    floor.receiveShadow = true;

    scene.add(light);
    //Add the cube to the scene
    scene.add(cube);
    scene.add(floor);

    cube.position.y = 2;

    floor.position.y = -10;

    players.push(createPlayer("Master0r0"));
    for(let player in players){
        players[player].position.z = 5;
    }

    renderer.domElement.requestPointerLock = renderer.domElement.requestPointerLock ||
        renderer.domElement.mozRequestPointerLock ||
        renderer.domElement.webkitRequestPointerLock;
    // Ask the browser to lock the pointer
    renderer.domElement.requestPointerLock();

    // Ask the browser to release the pointer
    document.exitPointerLock = document.exitPointerLock ||
        document.mozExitPointerLock ||
        document.webkitExitPointerLock;
    document.exitPointerLock();

    renderLoop();
}

//Creates a render loop function
function renderLoop(){
    //Causes the renderer to redraw 60 times per second
    requestAnimationFrame(renderLoop);

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
    updateCameraPos();
    for(var player in players){
        handleKeys(players[player]);
        playerMovement(players[player]);
        renderer.render(scene,players[player].camera);
    }
}

init();
