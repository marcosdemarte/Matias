import React, { useRef, useState } from 'react';
import { Engine, Scene, useScene } from 'react-babylonjs';
import { Vector3, HemisphericLight, FreeCamera, MeshBuilder } from '@babylonjs/core';

const DinoGame = () => {
    const dinoRef = useRef(null);
    const [isJumping, setIsJumping] = useState(false);

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
        if (isJumping && dinoRef.current) {
            dinoRef.current.position.y += 0.1;
            if (dinoRef.current.position.y >= 2) {
                setIsJumping(false);
            }
        } else if (!isJumping && dinoRef.current && dinoRef.current.position.y > 0.5) {
            dinoRef.current.position.y -= 0.1;
        }
    };

    const handleJump = () => {
        if (!isJumping) {
            setIsJumping(true);
        }
    };

    return (
        <div>
            <button onClick={handleJump}>Jump</button>
            <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
                <Scene onSceneReady={onSceneReady} onRender={onRender} />
            </Engine>
        </div>
    );
};

const App = () => (
    <div>
        <h1>Dino Game</h1>
        <DinoGame />
    </div>
);

export default App