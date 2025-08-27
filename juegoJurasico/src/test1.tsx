

import {
  Camera,
    Engine,
    EngineOptions,
    FreeCamera,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    Scene,
    SceneOptions,
    Vector3,
    KeyboardEventTypes ,
    Animation, 
    StandardMaterial, Texture,
  } from '@babylonjs/core'
  import { FC, useEffect, useRef } from 'react'


  
  type OnSceneReadyHandler = (scene: Scene) => void
  
  type OnRenderHandler = (scene: Scene) => void
  
  // import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
  
  type SceneComponentProps = {
    canvasId: string
    antialias?: boolean
    engineOptions?: EngineOptions
    adaptToDeviceRatio?: boolean
    sceneOptions?: SceneOptions
    onRender: OnRenderHandler
    onSceneReady: OnSceneReadyHandler
  }
  
  const SceneComponent: FC<SceneComponentProps> = (props) => {
    const reactCanvas = useRef(null)
  
    const {
      canvasId,
      antialias,
      engineOptions,
      adaptToDeviceRatio,
      sceneOptions,
      onRender,
      onSceneReady,
      ...rest
    } = props
  
    useEffect(() => {
      if (!reactCanvas.current) return
      const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio)
      const scene = new Scene(engine, sceneOptions)
      if (scene.isReady()) {
        onSceneReady(scene)
      } else {
        scene.onReadyObservable.addOnce(onSceneReady)
      }
  
      engine.runRenderLoop(() => {
        onRender(scene)
        scene.render()
      })
  
      const resize = () => {
        scene.getEngine().resize()
      }
  
      if (window) {
        window.addEventListener('resize', resize)
      }
  
      return () => {
        scene.getEngine().dispose()
  
        if (window) {
          window.removeEventListener('resize', resize)
        }
      }
    }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady])
  
    return <canvas id={canvasId} ref={reactCanvas} {...rest} />
  }
  
  let box: Mesh


  const onSceneReady: OnSceneReadyHandler = (scene) => {


// Crear una cámara
const camera = new FreeCamera('camara2d', new Vector3(0, 5, -10), scene);

// Configurar la cámara en modo ortográfico (2D)
camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
camera.orthoLeft = -10;
camera.orthoRight = 10;
camera.orthoBottom = -5;
camera.orthoTop = 5;
camera.setTarget(Vector3.Zero());
const canvas = scene.getEngine().getRenderingCanvas();
camera.inputs.clear();
camera.attachControl(canvas, false);

// Crear una luz hemisférica
const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
light.intensity = 0.7;

// Crear un plano en lugar de un box
const plane = MeshBuilder.CreatePlane('plane', { width: 2, height: 2 }, scene);

// Crear un material para el plano
const material = new StandardMaterial('planeMaterial', scene);
material.diffuseTexture = new Texture('./assets/images/personaje-quieto.png', scene); // Ruta a tu imagen
material.diffuseTexture.hasAlpha = true; // Habilitar transparencia
material.backFaceCulling = true; // Solo renderiza la cara frontal
plane.material = material;

// Ajustar la posición del plano
plane.position.y = 1;
plane.position.x = -7;

/*
    // Crear una cámara
    var camera = new FreeCamera('camara2d', new Vector3(0, 5, -10), scene);
  
    // Cambiar la cámara a modo ortográfico (2D)
    camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
  
    // Ajustar las dimensiones de la proyección ortográfica
    const orthoLeft = -10;
    const orthoRight = 10;
    const orthoBottom = -5;
    const orthoTop = 5;
  
    camera.orthoLeft = orthoLeft;
    camera.orthoRight = orthoRight;
    camera.orthoBottom = orthoBottom;
    camera.orthoTop = orthoTop;
  
    // Apuntar la cámara al origen de la escena
    camera.setTarget(Vector3.Zero());
  
    const canvas = scene.getEngine().getRenderingCanvas();
  

    // Desactivar los controles predeterminados
camera.inputs.clear();

    // Vincular la cámara al lienzo
    camera.attachControl(canvas, false);
  
    // Crear una luz hemisférica
    var light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  
    // Reducir ligeramente la intensidad de la luz
    light.intensity = 0.7;
  



    
    // Crear una caja
    box = MeshBuilder.CreateBox('box', { size: 1 }, scene);


     // Crear un material para el box
  const material = new StandardMaterial('boxMaterial', scene);
  //material.diffuseTexture = new Texture('./assets/', scene); // Ruta de tu PNG
 // material.diffuseTexture = new Texture('./assets/images/personaje-quieto.png', scene);
  material.diffuseTexture = new Texture('/assets/images/personaje-quieto.png', scene);



  // Permitir transparencia en el material
  material.diffuseTexture.hasAlpha = true;
  material.backFaceCulling = false; // Mostrar ambos lados si es necesario
  box.material = material;
  
    // Elevar la caja
    box.position.y = 1;


*/
  
    // Crear un suelo
    MeshBuilder.CreateGround('ground', { width: 33, height: 3 }, scene);




/*

    // Capturar las teclas para mover el BOX
scene.onKeyboardObservable.add((kbInfo) => {
  switch (kbInfo.type) {
    case KeyboardEventTypes.KEYDOWN:
      switch (kbInfo.event.key) {
        case 'ArrowUp': // Mover hacia arriba
          box.position.z += 0.1;
          break;
        case 'ArrowDown': // Mover hacia abajo
          box.position.z -= 0.1;
          break;
        case 'ArrowLeft': // Mover hacia la izquierda
          box.position.x -= 0.1;
          break;
        case 'ArrowRight': // Mover hacia la derecha
          box.position.x += 0.1;
          break;
      }
      break;
  }
});

*/



// Capturar la flecha hacia arriba para hacer saltar el BOX
scene.onKeyboardObservable.add((kbInfo) => {
  switch (kbInfo.type) {
    case KeyboardEventTypes.KEYDOWN:
      if (kbInfo.event.key === 'ArrowUp') {
        // Crear la animación para el salto
        const jumpAnimation = new Animation(
          'jumpAnimation',
          'position.y',
          30, // Fotogramas por segundo
          Animation.ANIMATIONTYPE_FLOAT,
          Animation.ANIMATIONLOOPMODE_CYCLE
        );

        // Claves de la animación (inicio, altura máxima, retorno)
        const keys = [
          { frame: 0, value: plane.position.y }, // Inicio (posición original)
          { frame: 10, value: plane.position.y + 2 }, // Altura máxima
          { frame: 20, value: plane.position.y } // Regreso a la posición original
        ];

        jumpAnimation.setKeys(keys);

        // Vincular la animación al box
        plane.animations = [];
        plane.animations.push(jumpAnimation);

        // Iniciar la animación
        scene.beginAnimation(plane, 0, 20, false); // No es en bucle
      }
      break;
  }
});


  };

  
  /*
  const onSceneReady: OnSceneReadyHandler = (scene) => {
    // This creates and positions a free camera (non-mesh)
    var camera = new FreeCamera('camara2d', new Vector3(0, 5, -10), scene)
    //camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA // Configuración para 2D
  
    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero())
  
    const canvas = scene.getEngine().getRenderingCanvas()
  
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true)
  
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)
  
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7
  
    //caja
    box = MeshBuilder.CreateBox('box', { size: 1 }, scene)
  
    // Move the box upward 1/2 its height
    box.position.y = 1
  
    // Our built-in 'ground' shape.
    MeshBuilder.CreateGround('ground', { width: 13, height: 3 }, scene)
  }
  */
  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  const onRender: OnRenderHandler = (scene) => {
    /*
    if (box !== undefined) {
      var deltaTimeInMillis = scene.getEngine().getDeltaTime()
  
      const rpm = 10
      box.rotation.x += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)
    }*/
  }
  
  const App: FC = () => (
    <div style={{ flex: 1, display: 'flex', height:'600px' }}>

      <SceneComponent
        canvasId="babylon-canvas"
        antialias
        onSceneReady={onSceneReady}
        onRender={onRender}
      />
    </div>
  )
  
  export default App
  