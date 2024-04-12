import * as THREE from 'three';
import { Perlin } from './Perlin.js'; 

export class Snow {
    constructor(scene, count) {
        this.scene = scene;
        this.count = count;
        this.snowflakes = [];
        this.perlin = new Perlin(1); // Assuming Perlin noise size is 256
        this.init();
    }

    init() {
        const geometry = new THREE.SphereGeometry(1, 32,16);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
        
        for (let i = 0; i < this.count; i++) {
            let mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 200, // Randomize x position
                Math.random() * 100 + 50,   // Randomize y position above the scene
                (Math.random() - 0.5) * 200  // Randomize z position
            );
            this.snowflakes.push(mesh);
            this.scene.add(mesh);
        }
    }

    animate(deltaTime) {
        this.snowflakes.forEach(snowflake => {
            let noise = this.perlin.noise(snowflake.position.x, snowflake.position.z, Date.now() * 0.0001);
            snowflake.position.x += Math.cos(noise) * 0.5; // Horizontal drift
            snowflake.position.y -= deltaTime * 50; // Fall speed

            //if(snowflake.position.x<0){snowflake.position.x=0};
            //if(snowflake.position.z<0){snowflake.position.z=0};
            if (snowflake.position.y < -10) { // Reset snowflake to the top after falling to y = -10
                snowflake.position.y = 100;
                snowflake.position.x = (Math.random() - 0.5) * 200; // Randomize x position
                snowflake.position.z = (Math.random() - 0.5) * 200; // Randomize z position
            }
        });
    }
}