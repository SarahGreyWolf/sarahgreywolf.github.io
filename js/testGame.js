var scene, camera, renderer, cube;

function init(){
    //Creates the scene to display objects
    scene = new THREE.Scene();
    //Creates the camera to view the scene
    // ARGS: FOV, Aspect Ration, Near Clipping Plane, Far Clipping Plane
    // Clipping Plane = when objects start being rendered on the camera and when they stop being rendered
    camera = new THREE.PerspectiveCamera(75,1289/720,0.1,1000);

    //creates the renderer in which all objects will be rendered
    renderer = new THREE.WebGLRenderer();
    //set the size of the renderer
    renderer.setSize(1280,720);

    //Assigns the renderer to a canvas object to display the scene to us
    document.body.appendChild(renderer.domElement);

    //Create the 3D shape (Box with width, height and Depth dimensions)
    var geometry = new THREE.BoxGeometry(1,1,1);
    //Creates the mesh material to assign to the box
    var material = new THREE.MeshBasicMaterial({color: 0x00FF00});
    //Create a new mesh with the geometry of the box and the material
    cube = new THREE.Mesh(geometry,material);

    //Add the cube to the scene
    scene.add(cube);

    camera.position.z = 5;

    gameLoop();
}

//Creates a render loop function
function gameLoop(){
    //Causes the renderer to redraw 60 times per second
    requestAnimationFrame(gameLoop);

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    renderer.render(scene,camera);
}

init();
