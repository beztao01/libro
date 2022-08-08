const section = document.querySelector("section.libro");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer( { alpha : true, antialias : true });
renderer.setSize( window.innerWidth, window.innerHeight );
section.appendChild( renderer.domElement );

const ambient = new THREE.AmbientLight(0x333333);
scene.add( ambient );

const light = new THREE.DirectionalLight(0xffffff);
light.position.set( 0, 0, 7);
scene.add( light );

const loader = new THREE.TextureLoader()

const urls = [
    "edge.png", "spine.png",
    "top.png", "bottom.png",
    "front.png", "back.png"
]

const materials = urls.map(url => {
    return new THREE.MeshLambertMaterial({
        map: loader.load(url)
    })
});

const geometry = new THREE.BoxGeometry( 3.5, 5, 0.5);
const cube = new THREE.Mesh( geometry, materials );

scene.add( cube );

camera.position.z = 7;

let currentTimeLine = window.pageYOffset / 3000;
let aimTimeline = window.pageYOffset /3000 ;

function animate(){
    requestAnimationFrame( animate );

    currentTimeLine += (aimTimeline - currentTimeLine) * 0.1;

    const rx = currentTimeLine * Math.PI * 0.5 + 0.5;
    const ry = (currentTimeLine * 0.9 + 0.1) * Math.PI * 2;
    cube.rotation.set (0, ry, 0);

   
    renderer.render( scene, camera );
}
animate();

window.addEventListener ("scroll", function (){
    aimTimeline = window.pageYOffset /3000 ;
})