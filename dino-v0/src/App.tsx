

import {
    Engine,
    EngineOptions,
    FreeCamera,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    Scene,
    SceneOptions,
    Vector3,
    StandardMaterial,
    Texture
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
  
  let plano: Mesh
  let cactus: Mesh
  
  const onSceneReady: OnSceneReadyHandler = (scene) => {
    // This creates and positions a free camera (non-mesh)
    var camera = new FreeCamera('camara2d', new Vector3(0, 5, -20), scene)
  
    // This targets the camera to scene origin
    camera.setTarget(new Vector3(0, 6, 0))
  
    // This attaches the camera to the canvas

   /*
     const canvas = scene.getEngine().getRenderingCanvas()
    camera.attachControl(canvas, false)
    */
  
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)
  
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7
  
    //CREAR BOX
    plano = MeshBuilder.CreatePlane('plano', { size: 2 }, scene)

    //CREAR plano que sea kaktus
    cactus = MeshBuilder.CreateBox('cactus', { size: 1 }, scene)


    //TEXTURA
    // Crear y configurar el material con una textura PNG
    const Materialplano = new StandardMaterial('Materialplano', scene);
    Materialplano.diffuseTexture = new Texture('./assets/images/personaje-quieto.png', scene);

    //transparencia
    // Habilitar transparencia
    Materialplano.diffuseTexture.hasAlpha = true; // Indicar que la textura tiene un canal alfa
    Materialplano.alpha = 1; // Establecer el nivel de transparencia (1 significa completamente opaco)


    // Asignar el material al box
    plano.material = Materialplano;
   
  
    // Move the box upward 1/2 its height
    plano.position.x = 1
    plano.position.y = 1

    cactus.position.x=10
    cactus.position.y=0.5
  
    // PISO
    MeshBuilder.CreateGround('ground', { width: 60, height: 3 }, scene)



    let isJumping = false; // Bandera para evitar múltiples saltos


 // Evento para hacer que el plano salte hacia arriba
 window.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && !isJumping) {
    isJumping = true; // Evitar múltiples saltos simultáneos
    const jumpHeight = 3; // Altura del salto
    const duration = 1000; // Duración en milisegundos

    // Posición inicial y final del salto
    const startY = plano.position.y;
    const targetY = startY + jumpHeight;

    // Subir y bajar el plano animando únicamente el eje Y
    const startTime = performance.now();
    const animationInterval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      if (elapsed <= duration / 2) {
        // Fase ascendente
        plano.position.y = startY + (elapsed / (duration / 2)) * jumpHeight;
      } else if (elapsed <= duration) {
        // Fase descendente
        plano.position.y =
          targetY - ((elapsed - duration / 2) / (duration / 2)) * jumpHeight;
      } else {
        // Finaliza el salto
        plano.position.y = startY;
        clearInterval(animationInterval);
        isJumping = false; // Permitir otro salto
      }
    }, 16); // Aproximadamente 60 FPS
  }
});





    
  }
  
  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */

  let direction = 1; // Dirección inicial del movimiento: 1 significa hacia la derecha

  const onRender: OnRenderHandler = (scene) => {
    
    if (cactus !== undefined) {
      const speed = 0.1; // Velocidad del movimiento
      cactus.position.x += direction * speed;
  
      // Cambiar la dirección al alcanzar los límites
      if (cactus.position.x >= 10) {
        direction = -1; // Cambiar hacia la izquierda
      } else if (cactus.position.x <= -15) {
        direction = 1; // Cambiar hacia la derecha
      }
    }
  


      // Detectar colisión entre el plano y el cactus
      if (plano.intersectsMesh(cactus, false)) {
        console.log('Game Over');
        // Detener el movimiento si deseas
        direction = 0; // Detener el cactus
      }
  
  
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
  