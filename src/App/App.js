import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import * as THREE from 'three';
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
            a: 0
        }

        this.degToRad = Math.PI / 180;
        this.distance = 6;


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

    gameLoop = () => {
        requestAnimationFrame(this.gameLoop);
         const { rotation1 } = this.state;

        this.setState({
            rotation1: { x: rotation1.x + 0.01,
                         y: rotation1.y + 0.01, },

        });
    }

    render() {
        const { rotation1, cameraPosition, x, y } = this.state;

        let cubes = [];


            cubes.push(
                    <Cube key = {123}  position={{x: 0, y: 0, z: 0}} 
                         onRef={ref => (this.cuce1 = ref)} 
                         rotation = {this.state.rotation1} />
                )
                   cubes.push(                       <Cube key = {124}  position={{x: 0, y: 0, z: 1}} 
                                               onRef={ref => (this.cuce2 = ref)} 

                                        rotation = {this.state.rotation1} />
                                        )
                  cubes.push(                        <Cube key = {125}  position={{x: 0, y: 1, z: 0}} 
                                               onRef={ref => (this.cuce3 = ref)} 

                                        rotation = {this.state.rotation1} />

                                        )

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
                                                <Group 
                                                        rotation = {this.state.rotation1}
                                                    />
                                                <Cube position={{x: 0, y: 0, z: -1}} rotation = {{x:0, y:0, z:0}}/>
                                                <Cube position={{x: 0, y: 1, z: -1}} rotation = {{x:0, y:0, z:0}}/>
                                                <Cube position={{x: 1, y: 1, z: -1}} rotation = {{x:0, y:0, z:0}}/>
                                                <Cube position={{x: 1, y: 0, z: -1}} rotation = {{x:0, y:0, z:0}}/>
                                                <Cube position={{x: 0, y: -1, z: -1}} rotation = {{x:0, y:0, z:0}}/> 
                                                <Cube position={{x: -1, y: 0, z: -1}} rotation = {{x:0, y:0, z:0}}/>
                                                <Cube position={{x: -1, y: -1, z: -1}} rotation = {{x:0, y:0, z:0}}/>
                                                <Cube position={{x: 1, y: -1, z: -1}} rotation = {{x:0, y:0, z:0}}/>
                                                <Cube position={{x:-1, y: 1, z: -1}} rotation = {{x:0, y:0, z:0}}/>
                                                
                                                <Cube position={{x: 0, y: 0, z: 1}} rotation = {{x:0, y:0, z:0}}/>
                                                <Cube position={{x: 0, y: 1, z: 1}} rotation = {{x:0, y:0, z:0}}/>
                                                <Cube position={{x: 1, y: 1, z: 1}} rotation = {{x:0, y:0, z:0}}/>
                                                <Cube position={{x: 1, y: 0, z: 1}} rotation = {{x:0, y:0, z:0}}/>
                                                <Cube position={{x: 0, y: -1, z: 1}} rotation = {{x:0, y:0, z:0}}/> 
                                                <Cube position={{x: -1, y: 0, z: 1}} rotation = {{x:0, y:0, z:0}}/>
                                                <Cube position={{x: -1, y: -1, z: 1}} rotation = {{x:0, y:0, z:0}}/>
                                                <Cube position={{x: 1, y: -1, z: 1}} rotation = {{x:0, y:0, z:0}}/>
                                                <Cube position={{x:-1, y: 1, z: 1}} rotation = {{x:0, y:0, z:0}}/>

                                       

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