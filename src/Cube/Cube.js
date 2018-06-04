import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

class Cube extends Component {
     constructor(props) {
        super(props);
       // console.log(this.props.visibile)
    }




    componentWillMount() {

        if(this.cube && !this.props.visibile ){
              this.context.scene.remove(this.cube);
              this.cube = null;
             
        }

       else if(!this.cube && this.props.visibile){

            this.geometry = new THREE.BoxGeometry(1, 1, 1);


             this.geometry.faces[ 0 ].color.setHex(this.props.point.side0);
             this.geometry.faces[ 0 + 1 ].color.setHex(this.props.point.side0);

             this.geometry.faces[ 2 ].color.setHex(this.props.point.side1);
             this.geometry.faces[ 2 + 1 ].color.setHex(this.props.point.side1);

              this.geometry.faces[ 4 ].color.setHex(this.props.point.side2);
              this.geometry.faces[ 4 + 1 ].color.setHex(this.props.point.side2);

             this.geometry.faces[ 6 ].color.setHex(this.props.point.side3);
            this.geometry.faces[ 6 + 1 ].color.setHex(this.props.point.side3);

            this.geometry.faces[ 8 ].color.setHex(this.props.point.side4);
            this.geometry.faces[ 8 + 1 ].color.setHex(this.props.point.side4);

            this.geometry.faces[ 10 ].color.setHex(this.props.point.side5);
            this.geometry.faces[ 10 + 1 ].color.setHex(this.props.point.side5);


            this.material = new THREE.MeshBasicMaterial({ color: 0xFFFFF, vertexColors: THREE.FaceColors});

             this.cube = new THREE.Mesh(this.geometry, this.material);

            this.cube.rotation.x =  this.props.point.rotationX
                this.cube.rotation.y =  this.props.point.rotationY
                this.cube.rotation.z =  this.props.point.rotationZ

                this.cube.position.set(this.props.point.x, this.props.point.y, this.props.point.z);

           
            this.context.scene.add(this.cube);

            let geo = new THREE.EdgesGeometry( this.cube.geometry ); // or WireframeGeometry
            let mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 4 } );
            let wireframe = new THREE.LineSegments( geo, mat );
            this.cube.add( wireframe );
        }

    }



    componentWillUpdate(){
         if(!!this.cube && !this.props.visibile){
              this.context.scene.remove(this.cube);
              this.cube = null;
        }

        else if(!this.cube && this.props.visibile){
            this.geometry = new THREE.BoxGeometry(1, 1, 1);

            this.geometry.faces[ 0 ].color.setHex(this.props.point.side0);

             this.geometry.faces[ 0 + 1 ].color.setHex(this.props.point.side0);

             this.geometry.faces[ 2 ].color.setHex(this.props.point.side1);
             this.geometry.faces[ 2 + 1 ].color.setHex(this.props.point.side1);

              this.geometry.faces[ 4 ].color.setHex(this.props.point.side2);
              this.geometry.faces[ 4 + 1 ].color.setHex(this.props.point.side2);

             this.geometry.faces[ 6 ].color.setHex(this.props.point.side3);
            this.geometry.faces[ 6 + 1 ].color.setHex(this.props.point.side3);

            this.geometry.faces[ 8 ].color.setHex(this.props.point.side4);
            this.geometry.faces[ 8 + 1 ].color.setHex(this.props.point.side4);

            this.geometry.faces[ 10 ].color.setHex(this.props.point.side5);
            this.geometry.faces[ 10 + 1 ].color.setHex(this.props.point.side5);

            this.material = new THREE.MeshBasicMaterial({ color: 0xFFFFF, vertexColors: THREE.FaceColors});


            this.cube = new THREE.Mesh(this.geometry, this.material);

             this.cube.rotation.x =  this.props.point.rotationX
                this.cube.rotation.y =  this.props.point.rotationY
                this.cube.rotation.z =  this.props.point.rotationZ

                this.cube.position.set(this.props.point.x, this.props.point.y, this.props.point.z);


            this.context.scene.add(this.cube);

            let geo = new THREE.EdgesGeometry( this.cube.geometry ); // or WireframeGeometry
            let mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 4 } );
            let wireframe = new THREE.LineSegments( geo, mat );
            this.cube.add( wireframe );
        }

    }


    render() {
        return null;
    }
}

Cube.contextTypes = {
    scene: PropTypes.object
}


export default Cube;