import { TileNode } from './TileNode.js';
import * as THREE from 'three';
import { MapRenderer } from './MapRenderer';
import { Graph } from './Graph';


export class GameMap {
	
	// Constructor for our GameMap class
	constructor() {

		// Define some basics of our world
		// Let's use the previous area that we had
		// our character navigating around
		// This started at location (-25,0,-25)
		// and had width of 50 and a depth of 50
		this.start = new THREE.Vector3(-100,0,-50);

		this.width = 200;
		this.depth = 100;
		
		// We also need to define a tile size 
		// for our tile based map
		this.tileSize = 5;

		// Get our columns and rows based on
		// width, depth and tile size
		this.cols = this.width/this.tileSize;
		this.rows = this.depth/this.tileSize;

		// Create our graph
		// Which is an array of nodes
		this.graph = new Graph(this.tileSize, this.cols, this.rows);

		// Create our map renderer
		this.mapRenderer = new MapRenderer(this.start, this.tileSize, this.cols);
	}

	init(scene) {
		this.scene = scene; 
		this.graph.initGraph();
		// Set the game object to our rendering
		this.mapRenderer.createRendering(this.graph.nodes, scene);
	}

	// Method to get location from a node
	localize(node) {
		let x = this.start.x+(node.x*this.tileSize)+this.tileSize*0.5;
		let y = this.tileSize;
		let z = this.start.z+(node.z*this.tileSize)+this.tileSize*0.5;

		return new THREE.Vector3(x,y,z);
	}

	/**
	
	For use in A3:
	Sets the tile to a new type
	
	**/
	setTileType(node, type) {
		node.type = type;
		this.mapRenderer.setTile(node, this.scene);
		
	}
}
