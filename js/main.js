var targetRotation = 0;
    var targetRotationX = 0;

$( document ).ready(function() {
    console.log('document ready, starting stuff');
    var container;
    
    var camera, scene, renderer;
    
    var cube, plane;
    
    

        
    var mouseX = 0;
    var mouseXOnMouseDown = 0;
    
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    
    init();
    animate();
    console.log('everythings ready');
});

function init(){
    console.log('starting init');
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    /*
    var $div = $('<div />').appendTo('body');
    $div.attr('id', 'log');
    */
    //$('body').append($('<div/>', { id : 'log' } ));
    //log = document.createElement( 'div' );
    //document.body.appendChild( log );
 
    $(document).on('click', function(e){aRoll();});
    
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.y = 150;
        camera.position.z = 500;

        scene = new THREE.Scene();
           
    // Cube
    //var geometry = new THREE.CubeGeometry( 200, 200, 200 );
    /*
    for ( var i = 0; i < geometry.faces.length; i ++ ) {
        geometry.faces[ i ].color.setHex( 0xffffff ); //geometry.faces[ i ].color.setHex( Math.random() * 0xffffff );
    }
    */
    //console.log('quack');
    //var material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'assets/textures/d6.png' ) } );        
    
    
    var materials = [];
    for ( var i = 1; i < 7; i++ ) {
        materials.push( new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'assets/textures/d6_' + i + '.png'), overdraw : true } ) );
    }
    var dieMat = new THREE.MeshFaceMaterial(materials);
    var dieGeo = new THREE.CubeGeometry( 200, 200, 200, 5,5,5 );
    die = new THREE.Mesh( dieGeo, dieMat );
    die.position.y = 150;
    scene.add( die );    
        
    // Plane
    var geometry = new THREE.PlaneGeometry( 200, 200 );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    

    var material = new THREE.MeshBasicMaterial( { color: 0xe0e0e0 } );

    plane = new THREE.Mesh( geometry, material );
    plane.position.y = -50;
    scene.add( plane );

    renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    container.appendChild( renderer.domElement );
    //$('container').append(renderer.domElement);
    
    window.addEventListener( 'resize', onWindowResize, false );
    console.log('init done');
}


 
function aRoll() {
    //note: pi = 180 deg
    console.log('you clicked the roll button');
    var roll = Math.floor((Math.random()*6)+1);
    console.log(roll);
    
    $('#log').append('<br>'+roll);
    
    switch (roll) {
        case 1:
            targetRotation =  Math.PI/2;
            targetRotationX = Math.PI;
            break;
        case 2:
            targetRotation =  Math.PI/2;
            targetRotationX = 0;
            break;
        case 3:
            targetRotation =  Math.PI;
            targetRotationX = Math.PI/2;
            break;
        case 4:
            targetRotation =  0;
            targetRotationX = -Math.PI/2;
            break;
        case 5:
            targetRotation =  0;
            targetRotationX = 0;
            break;
        case 6:
            targetRotation =  Math.PI;
            targetRotationX = 0;
            break;
    }    
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}


function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    plane.rotation.y = die.rotation.y += ( targetRotation - die.rotation.y ) * 0.05;
    die.rotation.x += ( targetRotationX - die.rotation.x ) * 0.05;
    renderer.render( scene, camera );
}