import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

class Group extends Component {




    componentWillMount() {
        
        this.group = new THREE.Group();
        this.counter = 0;
        
        this.cubes = [];
        this.props.points.forEach((function(point){

            this.geometry = new THREE.BoxGeometry(1, 1, 1);
             this.geometry.faces[ 0 ].color.setHex(0x0000ff);
                    this.geometry.faces[ 0 + 1 ].color.setHex(0x0000ff);

                    this.geometry.faces[ 2 ].color.setHex(0xff0000);
                    this.geometry.faces[ 2 + 1 ].color.setHex(0xff0000);

                    this.geometry.faces[ 4 ].color.setHex(0x00ff00);
                    this.geometry.faces[ 4 + 1 ].color.setHex(0x00ff00);

                    this.geometry.faces[ 6 ].color.setHex(0x4fab5b);
                    this.geometry.faces[ 6 + 1 ].color.setHex(0x4fab5b);

                    this.geometry.faces[ 8 ].color.setHex(0xdf541e);
                    this.geometry.faces[ 8 + 1 ].color.setHex(0xdf541e);

                    this.geometry.faces[ 10 ].color.setHex(0xf9ae34);
                    this.geometry.faces[ 10 + 1 ].color.setHex(0xf9ae34);
                this.material = new THREE.MeshBasicMaterial({ color: 0xFFFFF, vertexColors: THREE.FaceColors});
                this.cube = new THREE.Mesh(this.geometry, this.material);
            

                this.cube.position.set(point.x,point.y,point.z);
                this.cube.rotation.set(point.rotationX, point.rotationY, point.rotationY )

                let geo = new THREE.EdgesGeometry( this.cube.geometry ); // or WireframeGeometry
                let mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 4 } );
                let wireframe = new THREE.LineSegments( geo, mat );
                this.cube.add( wireframe );

                this.cube.name = point.name;
                
                this.cubes.push(this.cube);

        }).bind(this));       

        this.cubes.forEach((function(cube){
            this.group.add(cube);

        }).bind(this))

       
        this.context.scene.add(this.group);
        

    }



    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUpdate(){
        if(!this.group)

        {this.group = new THREE.Group();

        
        this.cubes = [];
        this.props.points.forEach((function(point){

            this.geometry = new THREE.BoxGeometry(1, 1, 1);
           // for ( let i = 0; i < this.geometry.faces.length; i +=2 ) {
                  //  let color =  Math.random() * 0xffffff;
                    this.geometry.faces[ 0 ].color.setHex(0x0000ff);
                    this.geometry.faces[ 0 + 1 ].color.setHex(0x0000ff);

                    this.geometry.faces[ 2 ].color.setHex(0xff0000);
                    this.geometry.faces[ 2 + 1 ].color.setHex(0xff0000);

                    this.geometry.faces[ 4 ].color.setHex(0x00ff00);
                    this.geometry.faces[ 4 + 1 ].color.setHex(0x00ff00);

                    this.geometry.faces[ 6 ].color.setHex(0x4fab5b);
                    this.geometry.faces[ 6 + 1 ].color.setHex(0x4fab5b);

                    this.geometry.faces[ 8 ].color.setHex(0xdf541e);
                    this.geometry.faces[ 8 + 1 ].color.setHex(0xdf541e);

                    this.geometry.faces[ 10 ].color.setHex(0xf9ae34);
                    this.geometry.faces[ 10 + 1 ].color.setHex(0xf9ae34);
              //  }
                this.material = new THREE.MeshBasicMaterial({ color: 0xFFFFF, vertexColors: THREE.FaceColors});
                this.cube = new THREE.Mesh(this.geometry, this.material);
                this.cube.rotation.y =  Math.PI/2 * this.counter;

                this.cube.position.set(point.x,point.y,point.z);

                let geo = new THREE.EdgesGeometry( this.cube.geometry ); // or WireframeGeometry
                let mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 4 } );
                let wireframe = new THREE.LineSegments( geo, mat );
                this.cube.add( wireframe );

                this.cube.name = point.name;
                
                this.cubes.push(this.cube);

        }).bind(this));       

                
         
        console.log(this.cubes);

        this.cubes.forEach((function(cube){
            this.group.add(cube);

        }).bind(this))

       
        this.context.scene.add(this.group);
        }
    }


    getCoords(){
        var position1 = new THREE.Vector3();
        position1.setFromMatrixPosition( this.cube1.matrixWorld );



    }

    getNewCoords(){
        var mas = [];
        this.counter++;
        this.cubes.forEach(function(cube){

            var position = new THREE.Vector3();

           position =  cube.matrixWorld.getPosition();
           // console.log(position);
            mas.push({
                name: cube.name,
                x: Math.round(position.x),
                y: Math.round(position.y),
                z: Math.round(position.z)
            })
        })
        this.group.matrixAutoUpdate = false;
        this.group.updateMatrix();
        this.context.scene.remove(this.group);
        this.group = null;

        return mas;
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }



    componentDidUpdate() {
        const { rotation } = this.props;
        //console.log(rotation.y);
        this.group.rotation.z = rotation.z
        this.group.rotation.y = rotation.y
        this.group.rotation.x = rotation.x
        
    }

    render() {
        return null;
    }
}

Group.contextTypes = {
    scene: PropTypes.object
}


export default Group;