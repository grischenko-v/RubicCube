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
        this.points = this._generatePoints(); //for group init    
        this.state = {
            rotation1: { x: 0, y: 0, z: 0 },
            cameraPosition: {x: 8.4, y: 3.8, z: 3.9},
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
            rotateSide: 'x',
            groupSide: 0,
            groupPoints: this._getGroup(this.points,'x', 0),
            points: this.points
        }


        this.stop = false;
        this.degToRad = Math.PI / 180;
        this.distance = 10;
        this.nextRotationState = 'y';
       
        this.cubePoints = [];

       
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
                     rotationZ: 0,
                     side0: '0x0000ff',
                     side1: '0xff0000',
                     side2: '0x00ff00',
                     side3: '0x4fab5b',
                     side4: '0xdf541e',
                     side5: '0xf9ae34'
                 });

        return points;    

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

    updateCoords(points1, arr){

        //let points;
        const points = JSON.parse(JSON.stringify(points1))
        points.forEach((function(point){
            arr.forEach((function(item){
                 if(item.name === point.name){
                    point.x = item.x;
                    point.y = item.y;
                    point.z = item.z;
                    point.rotationX = (item.rotationX) % (Math.PI * 2);
                    point.rotationY = (item.rotationY) % (Math.PI * 2);
                    point.rotationZ = (item.rotationZ) % (Math.PI * 2);
                 }
            }).bind(this))
        }).bind(this))

        return points;
    }

    gameLoop = () => {

        let rotation = this.state.rotation1;
         this.setState({
            rotation1: rotation,
         //   groupPoints: this._getGroup(this.state.points, this.nextRotationState, 0)

         })
        
        switch (this.state.rotateSide){
            case 'x':{
                rotation.y = 0;
                rotation.z = 0;
                if(rotation.x <= Math.PI/2  ){
                    rotation.x += 0.015;
                }else{  
                    switch(this.getRandomInt(0, 2)){
                        // case 0: newRotationSide = 'x'; break; 
                        // case 1: newRotationSide = 'y'; break; 
                        // case 2: newRotationSide = 'z'; break; 
                    }
                    //console.log(this.state.groupPoints);
                    this.nextRotationState = 'y';
                    let r =  this.groupRef.getNewCoords(this.state.rotateSide);
                   let newPoints =   this.updateCoords(this.state.points, r);
                   
                    let newGroup =  this._getGroup(newPoints, this.nextRotationState, 0);

                    rotation.x = 0;
                       this.setState({
                         rotation1: rotation,
                         rotateSide: this.nextRotationState,
                        // groupPoints: newGroup,
                         points: newPoints
                    });
                }
                break;
            }

            case 'y':{
                rotation.x = 0;
                rotation.z = 0;
                if(rotation.y <= Math.PI/2  ){
                    rotation.y += 0.015;
                }else{  
                    switch(this.getRandomInt(0, 2)){
                        // case 0: newRotationSide = 'x'; break; 
                        // case 1: newRotationSide = 'y'; break; 
                        // case 2: newRotationSide = 'z'; break; 
                    }
                    //console.log(this.state.groupPoints);
                    this.nextRotationState = 'y';
                    let r =  this.groupRef.getNewCoords(this.state.rotateSide);
                     let newPoints =   this.updateCoords(this.state.points, r);
                   
                    let newGroup =  this._getGroup(this.state.points, this.nextRotationState, 0);

                    rotation.y = 0;
                       this.setState({
                         rotation1: rotation,
                         rotateSide: this.nextRotationState,
                         groupPoints: newGroup,
                         points: newPoints
                    });
                }
                break;
            }
            case 'z':{
                if(rotation.z <= Math.PI/2  ){
                    rotation.z += 0.015;
                }else if(!this.stop){  
                    switch(this.getRandomInt(0, 2)){
                        // case 0: newRotationSide = 'x'; break; 
                        // case 1: newRotationSide = 'y'; break; 
                        // case 2: newRotationSide = 'z'; break; 
                    }
                    this.nextRotationState = 'x';
                    let r =  this.groupRef.getNewCoords(this.state.rotateSide);
                    let newPoints =   this.updateCoords(r);
                    let newGroup =  this._getGroup(newPoints, this.nextRotationState, 0);
                    rotation.z = 0;
                    this.stop = true
                       this.setState({
                         rotation1: rotation,
                         rotateSide: this.nextRotationState,
                         //groupPoints: newGroup,
                         points: newPoints
                    });
                }
                break;
            }
        }

        requestAnimationFrame(this.gameLoop); 
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

     _getSide(points,side, point){
        const a =  JSON.parse(JSON.stringify(points));
        return filter(a, function(o) { return o[side] == point; })
    }

    _getGroup(allPoints, rSide, side){
        let group = this._getSide(allPoints, rSide, side);

       // group.map((point)=>{
         //   point.visibile = false
        //})
       const points = JSON.parse(JSON.stringify(allPoints));
        // console.log(group);
        //   points.forEach((function(point){
        //     group.forEach((function(item){
        //           point.visibile = true;
        //     }).bind(this))
        // }).bind(this))


        // points.forEach((function(point){
        //     group.forEach((function(item){
        //          if(item.name === point.name)
        //             point.visibile = false;

        //     }).bind(this))
        // }).bind(this))
       // console.log(allPoints);
        return group

    }

    _setVisibleAll(allPoints){
        let points = allPoints;
        points.forEach(function(point){
            point.visibile=true;

        })
        return points
    }


    render() {
        const { rotation1, cameraPosition, x, y } = this.state;


        const group = <Group rotation = {this.state.rotation1} points = { this.state.groupPoints }
                                        onRef={ref => (this.groupRef = ref)}
                                        rotationSide = {this.state.rotateSide}

                                      />

        let points = [];

              {this.state.points.map((function(point, index){
                                       points.push( <Cube key = {point.name}
                                                        position={{
                                                            x: point.x, 
                                                            y: point.y, 
                                                            z: point.z
                                                        }}
                                                        rotation = {{
                                                            x: point.rotationX,
                                                            y: point.rotationY,
                                                            z: point.rotationZ 
                                                        }}
                                                        onRef={ref => (this.cubePoints[index] = ref)}
                                                        visibile = {point.visibile}
                                                        point = {point}
                                                    />
                                    )}).bind(this))} 
                                              

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
                                              {points}
                                   
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