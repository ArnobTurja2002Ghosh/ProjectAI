import { NPC } from './NPC.js';
//import { State, PatrolState } from './State.js';
import * as THREE from 'three';


export class EnemyCroc extends NPC{
    constructor(mColor){
        super(mColor);
        //this.size = 20;
        let texture = new THREE.TextureLoader().load('./croc_copy.jpg');
        let cubeGeo = new THREE.BoxGeometry(10,10,10);//needs implementation
        let cubeMat = new THREE.MeshStandardMaterial({map: texture});

        let mesh =  new THREE.Mesh(cubeGeo,cubeMat);
        mesh.position.y = mesh.position.y+1;
		// Rotate our X value of the mesh so it is facing the +z axis
		mesh.rotateX(Math.PI/2);

        this.gameObject = new THREE.Group();
		this.gameObject.add(mesh);

    }
    update(deltaTime) {
		super.update(deltaTime,this.gameObject);
		//this.state.updateState(this, enemy);
	}
}