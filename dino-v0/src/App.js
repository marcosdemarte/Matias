import React, { useRef, useState, useEffect } from 'react';
import { Engine, Scene } from 'react-babylonjs';
import { Vector3, HemisphericLight, FreeCamera, MeshBuilder } from '@babylonjs/core';

const DinoGame = () => {
  const dinoRef = useRef(null);
  const [isJumping, setIsJumping] = useState(false);
  const [jumpHeight, setJumpHeight] = useState(0);

  useEffect(() => {
    const onSceneReady = (scene) => {
      const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);
      camera.setTarget(Vector3.Zero());
      camera.attachControl(scene.getEngine().getRenderingCanvas(), true);

      new HemisphericLight('light1', new Vector3(0, 1, 0), scene);

      const ground = MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, scene);
      const dino = MeshBuilder.CreateBox('dino', { height: 1, width: 0.5, depth: 1 }, scene);
      dino.position.y = 0.5;
      dinoRef.current = dino;

      const cactus = MeshBuilder.CreateBox('cactus', { height: 2, width: 0.5, depth: 0.5 }, scene);
      cactus.position.y = 1;
      cactus.position.x = 3;
    };

    const onRender = (scene) => {
      if (dinoRef.current) {
        if (isJumping) {
          dinoRef.current.position.y += 0.1;
          setJumpHeight(jumpHeight + 0.1);
          if (jumpHeight >= 2) {
            setIsJumping(false);
          }
        } else if (!isJumping && dinoRef.current.position.y > 0.5) {
          dinoRef.current.position.y -= 0.1;
          setJumpHeight(jumpHeight - 0.1);
        }
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp' && !isJumping && jumpHeight === 0) {
        setIsJumping(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isJumping, jumpHeight]);

  return null;
};

const App = () => (
  <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
    <Scene onSceneReady={onSceneReady} onRender={onRender} />
    <DinoGame />
  </Engine>
);

export default App;
