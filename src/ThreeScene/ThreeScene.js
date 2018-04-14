import React, { Component } from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';
import './ThreeScene.scss';

class ThreeScene extends Component {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
   


    componentDidMount() {
        this.updateThree(this.props);
        this.scene.updateMatrixWorld(true);
        this.props.onRef(this)
        
        this.refs.anchor.appendChild(this.renderer.domElement);
    }
    componentDidUpdate() {
        this.updateThree(this.props);
    }

    updateThree(props) {
        const { width, height } = props;

        this.renderer.setSize(width, height);
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    getChildContext() {

        return {
            scene: this.scene,
            renderer: this.renderer
        }
    }

    render() {
        var divStyle = {
                width: this.props.width,
                height: this.props.height,
                margin: this.props.margin
            };
        return (
            <div ref="anchor" className='scene' style= {divStyle}>
                 {this.props.children}
            </div>
        )
    }
}

ThreeScene.childContextTypes = {
    scene: PropTypes.object,
    renderer: PropTypes.object
}

export default ThreeScene;