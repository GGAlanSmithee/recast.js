"use strict";

//var recast = require('./../lib/recast.withworker');
//recast = new recast('../lib/recast');

// var recast = require('./../lib/recast'); // nodejs, recast is the recast.js file in the /lib folder
// // var recast = this.recast; // browser, include lib/recast.js

// recast.OBJLoader('simple.obj', function() {
//   // recast is ready
//   recast.buildSolo();
    
//   // get a random navigable point A
//   recast.getRandomPoint(recast.cb(function(x, y, z) {

//     // find the shortest route from origin to point A
//     // we asume 0,0,0 is a navigable point
//     recast.findPath(0, 0, 0, x, y, z, 1000, recast.cb(function(path) {
//       console.log('The shortest route contains', path.length, 'corners');
//       console.log('These corners are', path);
//     }));
//   }));
// });

import three from 'three';

const loader = new three.OBJLoader();

function load() {
    return new Promise((resolve, reject) => {
        loader.load('nav_test.obj', function(object) {
            resolve(object);
        });
    }).then(object => {
        object.traverse(function(child) {
            if (child instanceof three.Mesh) {
                child.material.side = three.DoubleSide;
                // child.material.shading = THREE.FlatShading;
            }
        });
        
        return object;
    }).catch(err => {
        console.error(err);
    });
}

function loadNavmesh() {
    return new Promise((resolve, reject) => {
       resolve(true);
    }).then(object => {
        return object;
    }).catch(err => {
        console.error(err);
    });
}

window.onload = async function() {
    const renderer = new three.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const scene = new three.Scene();
    const [ object, navmesh ] = await Promise.all([load(), loadNavmesh()]);
    scene.add(object);
    
    console.log(navmesh);
    
    const light = new three.AmbientLight(0x404040);
    scene.add(light);
    
    const directionalLight = new three.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);
    
    const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    camera.position.y = 20;
    camera.lookAt(new three.Vector3(0, 0, 0));
    
    function render() {
    	requestAnimationFrame(render);
    	renderer.render(scene, camera);
    }
    render();
};

/**
 * Load an .OBJ file
 */
// recast.OBJLoader('nav_test.obj', function(){

//     recast.buildTiled();
//     // recast.loadTileMesh('./navmesh.dist.bin', recast.cb(function(){
//     //recast.loadTileCache('./tilecache.dist.bin', recast.cb(function(){

//     recast.initCrowd(1000, 1.0);

//     recast.vent.on('update', function (agents) {
//         for (var i = 0; i < agents.length; i++) {
//             var agent = agents[i];

//             var angle = Math.atan2(- agent.velocity.z, agent.velocity.x);
//             if (Math.abs(agentsObjects[agent.idx].rotation.y - angle) > 0) {
//                 agentsObjects[agent.idx].rotation.y = angle;
//             }

//             agentsObjects[agent.idx].position.set(
//                 agent.position.x,
//                 agent.position.y,
//                 agent.position.z
//             );
//         }
//     });

//     /**
//      * Add some agents
//      */
//     for (var i = 0; i < agentsObjects.length; i++) {
//         agents.push(recast.addAgent({
//             position: {
//                 x: -25.8850,
//                 y: -1.64166,
//                 z: -5.41350
//             },
//             radius: 0.8,
//             height: 0.5,
//             maxAcceleration: 1.0,
//             maxSpeed: 2.0,
//             updateFlags: 0, // && recast.CROWD_OBSTACLE_AVOIDANCE, // & recast.CROWD_ANTICIPATE_TURNS & recast.CROWD_OPTIMIZE_TOPO & recast.CROWD_SEPARATION,
//             separationWeight: 20.0
//         }));
//     }

//     var routes;

//     var last = new Date().getTime();
//     var animate = function animate (time) {

//         setTimeout(function () {
//             recast.crowdUpdate(0.1);
//             recast.crowdGetActiveAgents();
//         }, 0);

//         window.requestAnimationFrame(animate);

//         last = time;
//         render();

//         if (stats) stats.update();
//     };

//     animate(new Date().getTime());

//     sequence = function() {
//         document.getElementById('sequence').style.display = 'none';
//         routes = 0;
//         goAway();
//     };

//     var goAway = function(){
//         for (var i = 0; i < agentsObjects.length; i++) {
//             (function (i) {
//                 recast.getRandomPoint(recast.cb(function(pt2x, pt2y, pt2z){
//                     recast.crowdRequestMoveTarget(i, pt2x, pt2y, pt2z);
//                     if (++routes < MAX_HOPS) {
//                         test.ok(true, 'route ' + routes + ': to ' + Math.round(pt2x, 2) + ',' + Math.round(pt2y, 2)+ ',' + Math.round(pt2z, 2));
//                         setTimeout(goAway, 8000 * Math.random());
//                     } else {
//                         document.getElementById('sequence').style.display = 'block';
//                         // test.done();
//                     }
//                 }));
//             })(i);
//         }
//     };

//     sequence();
//   }));
// });