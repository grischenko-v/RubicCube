import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

class Cube extends Component {
     constructor(props) {
        super(props);
       // console.log(this.props.visibile)
    }




    componentWillMount() {

        if(this.cube && !this.props.visibile){
              this.context.scene.remove(this.cube);
              this.cube = null;
              console.log(123);
        }

       else if(!this.cube && this.props.visibile){

            this.geometry = new THREE.BoxGeometry(1, 1, 1);

           /* for ( let i = 0; i < this.geometry.faces.length; i +=2 ) {
                let color =  Math.random() * 0xffffff;
                this.geometry.faces[ i ].color.setHex(color);
                this.geometry.faces[ i + 1 ].color.setHex(color);
            }*/


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

            this.context.scene.add(this.cube);

            let geo = new THREE.EdgesGeometry( this.cube.geometry ); // or WireframeGeometry
            let mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 4 } );
            let wireframe = new THREE.LineSegments( geo, mat );
            this.cube.add( wireframe );
        }

         if(this.cube){
            this.cube.position.x =  this.props.position.x;
            this.cube.position.y =  this.props.position.y;
            this.cube.position.z =  this.props.position.z;

            this.cube.rotation.x =  this.props.rotation.x;
            this.cube.rotation.x =  this.props.rotation.y;
            this.cube.rotation.x =  this.props.rotation.z;
        }
    }

    deleteCube(){
     //   this.context.scene.remove(this.cube);
      //  this.cube = null;
    }


    
    componentWillUpdate(){
       
         if(!!this.cube && !this.props.visibile){
              this.context.scene.remove(this.cube);
              this.cube = null;
        }

        else if(!this.cube && this.props.visibile){
            this.geometry = new THREE.BoxGeometry(1, 1, 1);

            // for ( let i = 0; i < this.geometry.faces.length; i +=2 ) {
            //     let color =  Math.random() * 0xffffff;
            //     this.geometry.faces[ i ].color.setHex(color);
            //     this.geometry.faces[ i + 1 ].color.setHex(color);
            // }
            

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

            this.context.scene.add(this.cube);

            let geo = new THREE.EdgesGeometry( this.cube.geometry ); // or WireframeGeometry
            let mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 4 } );
            let wireframe = new THREE.LineSegments( geo, mat );
            this.cube.add( wireframe );
        }

         if(this.cube){
            this.cube.position.x =  this.props.position.x;
            this.cube.position.y =  this.props.position.y;
            this.cube.position.z =  this.props.position.z;

            this.cube.rotation.x =  this.props.rotation.x;
            this.cube.rotation.x =  this.props.rotation.y;
            this.cube.rotation.x =  this.props.rotation.z;
        }


    }

    
    componentDidUpdate() {


        const { position, rotation } = this.props;

       
    }



    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }


    render() {
        return null;
    }
}

Cube.contextTypes = {
    scene: PropTypes.object
}


export default Cube;