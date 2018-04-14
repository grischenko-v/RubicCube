import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

class Group extends Component {



    componentWillMount() {
        
        this.group = new THREE.Group();;
        
        this.geometry = new THREE.BoxGeometry(1, 1, 1);

        for ( let i = 0; i < this.geometry.faces.length; i +=2 ) {
            let color =  Math.random() * 0xffffff;
            this.geometry.faces[ i ].color.setHex(color);
            this.geometry.faces[ i + 1 ].color.setHex(color);
        }


        this.material = new THREE.MeshBasicMaterial({ color: 0xFFFFF, vertexColors: THREE.FaceColors});
        this.cube1 = new THREE.Mesh(this.geometry, this.material);
        this.cube1.position.set(0,1,0);

        for ( let i = 0; i < this.geometry.faces.length; i +=2 ) {
            let color =  Math.random() * 0xffffff;
            this.geometry.faces[ i ].color.setHex(color);
            this.geometry.faces[ i + 1 ].color.setHex(color);
        }


        this.material = new THREE.MeshBasicMaterial({ color: 0xFFFFF, vertexColors: THREE.FaceColors});
        this.cube2 = new THREE.Mesh(this.geometry, this.material);
        this.cube2.position.set(1,1,0);
        for ( let i = 0; i < this.geometry.faces.length; i +=2 ) {
            let color =  Math.random() * 0xffffff;
            this.geometry.faces[ i ].color.setHex(color);
            this.geometry.faces[ i + 1 ].color.setHex(color);
        }


        this.material = new THREE.MeshBasicMaterial({ color: 0xFFFFF, vertexColors: THREE.FaceColors});
        this.cube3 = new THREE.Mesh(this.geometry, this.material);

        this.cube3.position.set(0,0,0);

        this.material = new THREE.MeshBasicMaterial({ color: 0xFFFFF, vertexColors: THREE.FaceColors});
        this.cube4 = new THREE.Mesh(this.geometry, this.material);

        this.cube4.position.set(1,0,0);

        this.material = new THREE.MeshBasicMaterial({ color: 0xFFFFF, vertexColors: THREE.FaceColors});
        this.cube5 = new THREE.Mesh(this.geometry, this.material);

        this.cube5.position.set(-1,0,0);

        this.material = new THREE.MeshBasicMaterial({ color: 0xFFFFF, vertexColors: THREE.FaceColors});
        this.cube6 = new THREE.Mesh(this.geometry, this.material);

        this.cube6.position.set(-1,-1,0);

        this.material = new THREE.MeshBasicMaterial({ color: 0xFFFFF, vertexColors: THREE.FaceColors});
        this.cube7 = new THREE.Mesh(this.geometry, this.material);

        this.cube7.position.set(-1,1,0);


        this.material = new THREE.MeshBasicMaterial({ color: 0xFFFFF, vertexColors: THREE.FaceColors});
        this.cube8= new THREE.Mesh(this.geometry, this.material);

        this.cube8.position.set(0,-1,0);

        this.material = new THREE.MeshBasicMaterial({ color: 0xFFFFF, vertexColors: THREE.FaceColors});
        this.cube9= new THREE.Mesh(this.geometry, this.material);

        this.cube9.position.set(1,-1,0);



        this.group.add(this.cube1);
        this.group.add(this.cube2);
        this.group.add(this.cube3);
        this.group.add(this.cube4);
        this.group.add(this.cube5);
        this.group.add(this.cube6);
        this.group.add(this.cube7);
        this.group.add(this.cube8);
        this.group.add(this.cube9);
        this.context.scene.add(this.group);
        

    }


    componentDidMount() {
        //this.props.onRef(this.group)
    }

    getCoords(){
        var position1 = new THREE.Vector3();
        position1.getPositionFromMatrix( this.cube1.matrixWorld );

    }

    componentWillUnmount() {
       // this.props.onRef(undefined)
    }


    componentDidUpdate() {
        const { rotation, position } = this.props;
       // console.log(this.group.rotation)
        this.group.rotation.z = this.group.rotation.z  <= Math.PI/2 ? this.group.rotation.z + 0.01 : this.group.rotation.z;
       // this.group.rotation.y +=0.01 ;
       // this.group.rotation.z = this.props.rotation.z;    
       if(this.group.rotation.z ){
       var position1 = new THREE.Vector3();
        position1.getPositionFromMatrix( this.cube1.matrixWorld );
        console.log(position1.x + ',' + position1.y + ',' + position1.z);
        position1.getPositionFromMatrix( this.cube2.matrixWorld );
        console.log(2222)
        console.log(position1.x + ',' + position1.y + ',' + position1.z);
       }
      
    }

    render() {
        return null;
    }
}

Group.contextTypes = {
    scene: PropTypes.object
}


export default Group;