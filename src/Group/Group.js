import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

class Group extends Component {



    componentWillMount() {
        
        this.group = new THREE.Group();;

        

        this.props.points.forEach((function(point){

            this.geometry = new THREE.BoxGeometry(1, 1, 1);
            for ( let i = 0; i < this.geometry.faces.length; i +=2 ) {
                    let color =  Math.random() * 0xffffff;
                    this.geometry.faces[ i ].color.setHex(color);
                    this.geometry.faces[ i + 1 ].color.setHex(color);
                }
                this.material = new THREE.MeshBasicMaterial({ color: 0xFFFFF, vertexColors: THREE.FaceColors});
                this.cube = new THREE.Mesh(this.geometry, this.material);
            

                this.cube.position.set(point.x,point.y,point.z);

                let geo = new THREE.EdgesGeometry( this.cube.geometry ); // or WireframeGeometry
                let mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 4 } );
                let wireframe = new THREE.LineSegments( geo, mat );
                this.cube.add( wireframe );

                this.group.add(this.cube);

        }).bind(this));       

                

        console.log(this.props.points);

      
        this.context.scene.add(this.group);
        

    }


    componentDidMount() {
        //this.props.onRef(this.group)
    }

    getCoords(){
        var position1 = new THREE.Vector3();
        position1.setFromMatrixPosition( this.cube1.matrixWorld );

    }

    componentWillUnmount() {
       // this.props.onRef(undefined)
    }


    componentDidUpdate() {
        const { rotation } = this.props;
       // console.log(this.group.rotation)

        this.group.rotation.z = rotation.z
        this.group.rotation.y = rotation.y
        this.group.rotation.x = rotation.x


        //this.group.rotation.z  <= Math.PI/2 ? this.group.rotation.z + 0.025 : this.group.rotation.z;
       // this.group.rotation.y +=0.01 ;
       // this.group.rotation.z = this.props.rotation.z;    
      /* if(this.group.rotation.z ){
       var position1 = new THREE.Vector3();
        position1.setFromMatrixPosition( this.cube1.matrixWorld );
      //  console.log(position1.x + ',' + position1.y + ',' + position1.z);
        position1.setFromMatrixPosition( this.cube2.matrixWorld );
      //  console.log(2222)
      //  console.log(position1.x + ',' + position1.y + ',' + position1.z);
       }*/
      
    }

    render() {
        return null;
    }
}

Group.contextTypes = {
    scene: PropTypes.object
}


export default Group;