import React, { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three';

const CrystalPyramid = () => {
  const pyramidRef = useRef();

  const vertexShader = `
    varying vec3 vUv;
    void main() {
      vUv = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec3 vUv;
    void main() {
      gl_FragColor = vec4(vUv, 1.0);
    }
  `;

  useFrame(() => {
    if (pyramidRef.current) {
      pyramidRef.current.rotation.y += 0.005; // Adjust the rotation speed as needed
    }
  });

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={pyramidRef}>
        <tetrahedronGeometry args={[5, 0]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </Canvas>
  );
};

export default CrystalPyramid;
