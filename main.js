import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { Character } from './Character.js';
import { Bot } from './Bot.js';
import { EnemyCroc } from './EnemyCroc.js';
import { GameMap } from './GameMap.js';
import { TileNode } from './TileNode.js';
// Create Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const orbitControls = new OrbitControls(camera, renderer.domElement);
// Create GameMap
const gameMap = new GameMap();
// Create clock
const clock = new THREE.Clock();
//camera.lookAt(scene.position)
const enemy = new EnemyCroc(new THREE.Color(0x00ffff));

let fishes=[];
for(let i=0; i<15; i++){
	let bot = new Bot(new THREE.Color(0xffff00));
	bot.edge_x=50; bot.edge_z=49;
	fishes.push(bot);
}
function randomWaterTile(){
	let a=gameMap.graph.nodes[Math.floor(gameMap.graph.nodes.length*Math.random())];
	while(a.type!=TileNode.Type.Water){
		a=gameMap.graph.nodes[Math.floor(gameMap.graph.nodes.length*Math.random())];
	}
	console.log(a);
	return a;
}
// Create NPC
//const bot = new Bot(new THREE.Color(0x0000ff));
// Setup our scene
function setup() {
	scene.background = new THREE.Color(0xffffff);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	camera.position.y = 80;
	camera.lookAt(0,0,0);
	//Create Light
	let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
	directionalLight.position.set(0, 25, 0);
	scene.add(directionalLight);
	// initialize our gameMap
	gameMap.init(scene);
	// set character locations 
	enemy.location = gameMap.localize(gameMap.graph.nodes[355]);
	// add our characters to the scene
	scene.add(enemy.gameObject);
	//bot.location = gameMap.localize(gameMap.graph.nodes[20]);
	//bot.location = gameMap.localize(gameMap.graph.nodes[20]);
	for(let i=0; i<15; i++){
		fishes[i].location=gameMap.localize(randomWaterTile());
		scene.add(fishes[i].gameObject);
	}
	// add our characters to the scene
	//scene.add(bot.gameObject);
	//First call to animate
	animate();
}
// animate
function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);

	let deltaTime = clock.getDelta();

	//let steer = enemy.followPlayer(gameMap, fishes[0]);
	//enemy.applyForce(steer);
	enemy.update(deltaTime,gameMap,fishes[0]);

	for(let i=0; i<fishes.length; i++){
		fishes[i].applyForce(fishes[i].wander());
		fishes[i].update(deltaTime, gameMap);
		if(gameMap.quantize(fishes[i].location)==gameMap.quantize(enemy.location)){
			console.log(i);
			scene.remove(fishes[i].gameObject);
			fishes.splice(i,1);
		}
	}


	orbitControls.update();
}
setup();