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
            rotateSide: 'z',
            groupSide: 1
        }


        this.stop = false;
        this.degToRad = Math.PI / 180;
        this.distance = 10;

        this.points = this._generatePoints();
        this.cubePoints = [];
        this.begin = true;
        this.groupPoints = this._getGroup()
    }

    _generatePoints(){
        let points = [];
        for (var x = -1; x < 2; x++) 
          for (var y = -1; y < 2; y++) 
            for (var z = -1; z < 2; z++)

                points.push({ 
                     name: "" + x + y + z, 
                     x: x,
                     y: y, 
                     z: z,
                     rotationX: 0,
                     rotationY: 0,
                     rotationZ: 0
                 });

        return points;    

    }

    _getSide(side, point){
        return filter(this.points, function(o) { return o[side] == point; })
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
                    ///console.log(point)
                    ///console.log(item)
                    point.x = item.x;
                    point.y = item.y;
                    point.z = item.z;
                    point.rotationX = item.rotationX % (Math.PI * 2);
                    point.rotationY = item.rotationY % (Math.PI * 2);
                    point.rotationZ = item.rotationZ % (Math.PI * 2);
                  //  console.log(point);
                 }
            }).bind(this))
        }).bind(this))
        
        
    }


    gameLoop = () => {
        requestAnimationFrame(this.gameLoop);
        const { rotation1 } = this.state;
        let rotation = this.state.rotation1;
        let newRotationSide = this.state.rotateSide;
         this.groupPoints = this._getGroup()
        switch (this.state.rotateSide){
           case 'x':{

                this.setState({
                       rotation1: rotation
          

                        });
              if(!this.stop){  
                var r =  this.groupRef.getNewCoords(this.rotateSide);
                console.log(r);
                this.updateCoords(r);
                this.stop = true;
            }

                rotation.z = 0;
                rotation.y = 0;
                if(rotation.x <= Math.PI/2  ){
                    rotation.x +=0.025;
                }

                else
                    {  
                       console.log( this.groupPoints)
                       var r =  this.groupRef.getNewCoords(this.state.rotateSide);
                      /* this.cubePoints.forEach(function(cube){
                            cube.deleteCube();
                       })*/
                       this.updateCoords(r);
                        rotation.x = 0;

                        switch(this.getRandomInt(0, 2)){
                            case 0: newRotationSide = 'x'; break; 
                            case 1: newRotationSide = 'y'; break; 
                            case 2: newRotationSide = 'z'; break; 
                        }
                         this.updateCoords(r);
                    this.setState({
                        rotateSide: newRotationSide
                    })
                      this.stop = false;
                    this.groupPoints = this._getGroup()
               
                   console.log( this.groupPoints)
                                this.setState({
                        rotation1: rotation
                      

                    });


                    }
                
                break;
            }



            case 'y':{

                this.setState({
                       rotation1: rotation
          

                        });
              if(!this.stop){  
                var r =  this.groupRef.getNewCoords(this.rotateSide);
                console.log(r);
                this.updateCoords(r);
                this.stop = true;
            }

                rotation.z = 0;
                rotation.x = 0;
                if(rotation.y <= Math.PI/2  ){
                    rotation.y +=0.025;
                }

                else
                    {  
                       console.log( this.groupPoints)
                       var r =  this.groupRef.getNewCoords(this.state.rotateSide);
                      /* this.cubePoints.forEach(function(cube){
                            cube.deleteCube();
                       })*/
                       this.updateCoords(r);
                        rotation.y = 0;

                        switch(this.getRandomInt(0, 2)){
                            case 0: newRotationSide = 'x'; break; 
                            case 1: newRotationSide = 'y'; break; 
                            case 2: newRotationSide = 'z'; break; 
                        }
                         this.updateCoords(r);
                    this.setState({
                        rotateSide: newRotationSide 
                    })
                      this.stop = false;
                    this.groupPoints = this._getGroup()
               
                   console.log( this.groupPoints)
                                this.setState({
                        rotation1: rotation
                      

                    });


                    }
                
                break;
            }
              case 'z':{

                this.setState({
                       rotation1: rotation
          

                        });
              if(!this.stop){  
                var r =  this.groupRef.getNewCoords(this.rotateSide);
                console.log(r);
                this.updateCoords(r);
                this.stop = true;
            }

                rotation.y = 0;
                rotation.x = 0;
                if(rotation.z <= Math.PI/2  ){
                    rotation.z +=0.025;
                }

                else
                    {  
                       console.log( this.groupPoints)
                       var r =  this.groupRef.getNewCoords(this.state.rotateSide);
                      /* this.cubePoints.forEach(function(cube){
                            cube.deleteCube();
                       })*/
                       this.updateCoords(r);
                        rotation.z = 0;

                       switch(this.getRandomInt(0, 2)){
                            case 0: newRotationSide = 'x'; break; 
                            case 1: newRotationSide = 'y'; break; 
                            case 2: newRotationSide = 'z'; break; 
                        }
                         this.updateCoords(r);
                    this.setState({
                        rotateSide: newRotationSide
                    })
                      this.stop = false;
                    this.groupPoints = this._getGroup()
               
                   console.log( this.groupPoints)
                                this.setState({
                        rotation1: rotation
                      

                    });


                    }
                
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

        return this._getSide(this.state.rotateSide, this.state.groupSide);

    }

    _getCubes(){
        let sides = [-1, 0, 1];
        let poitsSides = [];

        sides.forEach(function(side){
            if(this.state.groupSide != side)
                poitsSides.push(side);
        }.bind(this))

        let points1 = this._getSide(this.state.rotateSide,  poitsSides[0]);
        let points2 = this._getSide(this.state.rotateSide, poitsSides[1]);
      
        return points1.concat(points2);
    }


    render() {
        const { rotation1, cameraPosition, x, y } = this.state;


        const group = <Group rotation = {this.state.rotation1} points = { this.groupPoints }
                                        onRef={ref => (this.groupRef = ref)}
                                        rotationSide = {this.state.rotateSide}
                                      />

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
                                     
                                              {group} 
                                   
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