import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import * as THREE from 'three';
import filter from 'lodash/filter'
import Cube from '../Cube/Cube';
import Group from '../Group/Group';
import PropTypes from 'prop-types';
import ThreeScene from '../ThreeScene/ThreeScene';
import PerspectiveCamera from '../Camera/PerspectiveCamera';

class App extends Component {

    constructor(props) {
        super(props);

        this.cubePositions = this._initCoords();

        this.state = {
            rotation1: { x: 0, y: 0, z: 0 },
            cameraPosition: {x: 0, y: 0, z: 10},
            x: 0,
            y: 0,
            clicked: false, 
            mdown: new THREE.Vector2(),
            mmove: new THREE.Vector2(),
            phi: 25,
            theta: -15,
            phim: 0,
            thetam: 0,
            fov: 53,
            a: 0,
            rotateSide: 'y',
            groupSide: 1
        }

        this.degToRad = Math.PI / 180;
        this.distance = 10;
        this.stop = false;
        this.stop1 = false;
        this.points = this._generatePoints();

    }

    _generatePoints(){
        let points = [];
        for (var x = -1; x < 2; x++) 
          for (var y = -1; y < 2; y++) 
            for (var z = -1; z < 2; z++)

                points.push({  name: "" + x + y + z, x: x, y: y, z: z});

        return points;    

    }

    _getSide(side, point){
        return filter(this.points, function(o) { return o[side] === point; })
    }

    _initCoords(){
        let mas = [];
        for(let x = -1; x < 2; x++){
            for(let y = -1; y < 2; y++){
                for(let z = -1; z < 2; z++){
                    mas.push({x: x, y: y, z: z});
                }
            }
        }
     
        return mas;
    }

    _updateCamera(){
        let position = {
            x: this.state.x,
            y: this.state.y,
            z: this.state.z
        }
        position.x = this.distance * Math.sin(this.state.theta * this.degToRad) * Math.cos(this.state.phi * this.degToRad);
        position.y = this.distance * Math.sin(this.state.phi * this.degToRad);
        position.z = this.distance * Math.cos(this.state.theta * this.degToRad) * Math.cos(this.state.phi * this.degToRad);

        this.setState({
            cameraPosition: position
        });

    }
    
    _onClick(e){
        this.setState({
            clicked: !this.state.clicked,
            mdown: this.state.mdown.set(e.clientX, e.clientY),
            thetam: this.state.theta,
            phim: this.state.phi
        })
    }


    _onMouseMove(e) {
        let cameraParams = Object.assign({}, this.state);

        if(this.state.clicked){
            cameraParams.mmove.set(e.clientX, e.clientY);
            cameraParams.theta = -(cameraParams.mmove.x - cameraParams.mdown.x) * 0.5 + cameraParams.thetam;
            cameraParams.phi = (cameraParams.mmove.y - cameraParams.mdown.y) * 0.5 + cameraParams.phim;
            cameraParams.phi = Math.min(90, Math.max(-90, cameraParams.phi));
            this.setState({ 
                x: e.screenX, 
                y: e.screenY,
                mmove: cameraParams.mmove,
                theta: cameraParams.theta,
                phi: cameraParams.phi
            });

            this._updateCamera();

        }
    }

    componentDidMount() {
        this.gameLoop();
    }

    updateCoords(arr){

        this.points.forEach((function(point){
            arr.forEach((function(item){
                 if(item.name === point.name){
                    console.log(point)
                    console.log(item)
                    point.x = item.x;
                    point.y = item.y;
                    point.z = item.z;
                    
                 }
            }).bind(this))
        }).bind(this))
        
        
    }


    gameLoop = () => {
        requestAnimationFrame(this.gameLoop);
        const { rotation1 } = this.state;
        let rotation = this.state.rotation1;
        
        switch (this.state.rotateSide){
            case 'x':{
                rotation.z = 0;
                rotation.y = 0;
                rotation.x += 0.025
                
                break;
            }
            case 'y':{
                rotation.z = 0;
                rotation.x = 0;
                if(rotation.y <= Math.PI/2  ){
                    console.log(rotation.y);
                    rotation.y +=0.025;}
                else// if(!this.stop1)
                    {  
                        console.log(rotation.y)
                     //  console.log( this.groupRef.getNewCoords());
                       this.updateCoords( this.groupRef.getNewCoords());
                       rotation.y = 0;
                       this.stop = true;
                       this.stop1 = true;
                       console.log(this.state.rotation1.y);
                    }
                
                break;
            }
            case 'z':{
                rotation.z += 0.25;
                rotation.y = 0;
                rotation.x = 0;
                
                break;
            }

        }

        this.setState({
            rotation1: rotation

        });
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }


    _getGroup(){
        let sides = [-1, 0, 1];
        let groupSide = this.getRandomInt(-1, 1);
        let group;

        return this._getSide(this.state.rotateSide, -1);

    }

    _getCubes(){
        let cubes = [];

        let points1 = this._getSide(this.state.rotateSide,  1);
        let points2 = this._getSide(this.state.rotateSide, 0);
      
        return points1.concat(points2);
    }


    render() {
        const { rotation1, cameraPosition, x, y } = this.state;


        return (
            <div className="App" >
                <div className="App-intro" onClick={this._onClick.bind(this)} onMouseMove={this._onMouseMove.bind(this)}>
                    <ThreeScene width={800} height={600}
                                style={{margin: '0 auto' }}

                                onRef={ref => (this.scene = ref)}
                                >
                        <PerspectiveCamera fov={75}
                                           aspect={800/600}
                                           near={0.1}
                                           far={1000}
                                           position={cameraPosition}
                                           cubePosition = {{x: 0, y: 0, z: 0}}
                                           >
                                     <Group rotation = {this.state.rotation1} points = {this._getGroup()}
                                        onRef={ref => (this.groupRef = ref)}
                                      />
                                               
                                    {this._getCubes().map(function(point){
                                        return  <Cube key = {point.name} position={{x: point.x, y: point.y, z: point.z}}/>
                                        })
                                    }
                        </PerspectiveCamera>
                    </ThreeScene>
                    <div>
                        <h1>Mouse coordinates: { x } { y }</h1>
                    </div>
                </div>
               
            </div>

        );
    }
}

App.contextTypes = {
    scene: PropTypes.object
}

export default App;