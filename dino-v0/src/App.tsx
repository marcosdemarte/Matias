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
  Texture,
} from "@babylonjs/core";
import { FC, useEffect, useRef } from "react";
import "@babylonjs/gui";
import { AdvancedDynamicTexture, TextBlock, Button } from "@babylonjs/gui";

type OnSceneReadyHandler = (scene: Scene) => void;

type OnRenderHandler = (scene: Scene) => void;

// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.

type SceneComponentProps = {
  canvasId: string;
  antialias?: boolean;
  engineOptions?: EngineOptions;
  adaptToDeviceRatio?: boolean;
  sceneOptions?: SceneOptions;
  onRender: OnRenderHandler;
  onSceneReady: OnSceneReadyHandler;
};

const SceneComponent: FC<SceneComponentProps> = (props) => {
  const reactCanvas = useRef(null);

  const {
    canvasId,
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    ...rest
  } = props;

  useEffect(() => {
    if (!reactCanvas.current) return;
    const engine = new Engine(
      reactCanvas.current,
      antialias,
      engineOptions,
      adaptToDeviceRatio
    );
    const scene = new Scene(engine, sceneOptions);
    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce(onSceneReady);
    }

    engine.runRenderLoop(() => {
      onRender(scene);
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
  ]);

  return <canvas id={canvasId} ref={reactCanvas} {...rest} />;
};

let plano: Mesh;
let cactus: Mesh;
let cartelGameOver: Mesh;
//let boton:Mesh
let boton: any;
let button: any;

const onSceneReady: OnSceneReadyHandler = (scene) => {
  function ajustarCamaraSegunDispositivo(camera) {
    if (window.innerWidth <= 1000) {
      // Si el ancho es menor a 768px, asumimos que es móvil
      camera.position.set(-30, 12, -15); // x horizontal, y vertical ,z profundidad
      // This targets the camera to scene origin
      camera.setTarget(new Vector3(-3, 0, 0));
    } else {
      camera.position.set(0, 5, -20); // Posición normal en escritorio
      // This targets the camera to scene origin
      camera.setTarget(new Vector3(0, 6, 0));
    }
  }

  // This creates and positions a free camera (non-mesh)
  var camera = new FreeCamera("camara2d", new Vector3(0, 5, -20), scene);

  // Ajustar la cámara al iniciar
  ajustarCamaraSegunDispositivo(camera);

  // Ajustar la cámara cuando la ventana cambie de tamaño
  window.addEventListener("resize", () => {
    ajustarCamaraSegunDispositivo(camera);
  });

  //camera.inputs.removeByType("FreeCameraMouseWheelInput"); // Desactivar zoom con el scroll

  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  //CREAR BOX
  //plano = MeshBuilder.CreatePlane('plano', { size: 2 }, scene)
  plano = MeshBuilder.CreatePlane("plano", { width: 2, height: 2.5 }, scene);

  // Crear un plano para mostrar el texto
  const barraSuperior = MeshBuilder.CreatePlane(
    "barraSuperior",
    { width: 30, height: 20 },
    scene
  );
  barraSuperior.position = new Vector3(10, 13, 0);

  const advancedTexture = AdvancedDynamicTexture.CreateForMesh(barraSuperior);
  const textBlock = new TextBlock();
  //textBlock.text = "Puntos: 0";

  setInterval(() => {
    textBlock.text = `Record: ${record}  Puntos: ${puntos}`;
  }, 1000);

  textBlock.color = "white";
  textBlock.fontSize = 40;
  advancedTexture.addControl(textBlock);

  //crear boton
  boton = AdvancedDynamicTexture.CreateFullscreenUI("UI");
  button = Button.CreateSimpleButton("btn", "Reiniciar");
  button.width = "150px";
  button.height = "40px";
  button.color = "white";
  button.background = "blue";

  let colisionesHabilitadas = true;

  async function reiniciar() {
    gameOver = false;
    eliminarTodosLosObjetos();
    ValoresIniciales();
    console.log("gameOver1: ", gameOver);
    colisionesHabilitadas = false; // Desactivar colisiones temporalmente
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Esperar antes de reactivar colisiones
    colisionesHabilitadas = true; // Reactivar colisiones
    SumaPuntos();
    createRandomObject();
    puntos = 0;
  }

  button.onPointerUpObservable.add(async () => {
    await reiniciar();
  });

  boton.addControl(button);

  let speed = 0.1;
  let timeoutId;
  let speedIntervalId;

  function createRandomObject() {
    if (gameOver) return; // No crear objetos si el juego terminó

    const box = MeshBuilder.CreateBox("box", {}, scene);
    const kaktus_chico = MeshBuilder.CreatePlane("kaktus_chico", { width: 2, height: 2.5 }, scene);
    //kaktus_chico.position.set (0,0,0);
    kaktus_chico.position.x = 0;
    kaktus_chico.position.y = plano.getBoundingInfo().boundingBox.extendSize.y;






//textura de los :D coliciones


/////////////////////////////////////////////////////////////////////////////////////
  //TEXTURA
  // Crear y configurar el material con una textura PNG
  const materialKaktusChico = new StandardMaterial("materialKaktusChico", scene);
  materialKaktusChico.diffuseTexture = new Texture(
    "./assets/kaktusChico.png",
    scene
  );

  //transparencia
  // Habilitar transparencia
  materialKaktusChico.diffuseTexture.hasAlpha = true; // Indicar que la textura tiene un canal alfa
  materialKaktusChico.alpha = 0.5; // Establecer el nivel de transparencia (1 significa completamente opaco)

  // Configurar la escala de la textura
  materialKaktusChico.diffuseTexture.uScale = 0.8; // Escala horizontal
  materialKaktusChico.diffuseTexture.vScale = 1; // Escala vertical

  // Asignar el material al box
  kaktus_chico.material = materialKaktusChico;

////////////////////////////////////////////////////////////////////////////////







    box.position.set(20, 0.5, 0);
    box.name = "box_" + Math.random(); // Asignar un nombre único
    let direction = -1;

    setTimeout(() => {
      const observer = scene.onBeforeRenderObservable.add(() => {
        if (gameOver) return; // Detener movimiento si el juego terminó

        box.position.x += direction * speed;

        if (colisionesHabilitadas && plano.intersectsMesh(box, false)) {
          console.log("¡Game Over! Colisión detectada con:", box.name); // Muest
          gameOver = true;
          console.log("gameOver2:", gameOver);
          speed = 0;
          clearTimeout(timeoutId);
          clearInterval(speedIntervalId);
        }
        if (box.position.x <= -20) {
          console.log(`Objeto fuera de límites eliminado: ${box.name}`);
          box.dispose();
          scene.onBeforeRenderObservable.remove(observer);
        }
      });
    }, 500); // Reducir el tiempo de espera para evitar colisiones inmediatas

    const randomTime = Math.random() * (4000 - 1000) + 1000;
    timeoutId = setTimeout(createRandomObject, randomTime);
  }
  // Iniciar la primera creación de objetos
  createRandomObject();

  // Incrementar velocidad cada 3 segundos
  speedIntervalId = setInterval(() => {
    if (!gameOver) {
      speed += 0.01;
      console.log(`Velocidad actual: ${speed}`);
    }
  }, 600);

  function eliminarTodosLosObjetos() {
    // Filtrar los objetos que comienzan con "box_"
    const objetosAEliminar = scene.meshes.filter((mesh) =>
      mesh.name.startsWith("box_")
    );

    objetosAEliminar.forEach((mesh) => {
      console.log(`Eliminando objeto: ${mesh.name}`);
      mesh.dispose(); // Eliminar el objeto visualmente
    });

    // Remover los objetos de la lista de meshes
    scene.meshes = scene.meshes.filter((mesh) => !mesh.name.startsWith("box_"));

    // Limpiar cualquier observable anterior para evitar detecciones de colisión falsas
    scene.onBeforeRenderObservable.clear();
    console.log(
      "Todos los objetos 'box_' han sido eliminados y los observables reseteados."
    );
  }

  //CREAR cartel
  cartelGameOver = MeshBuilder.CreatePlane("gameOver", { size: 10 }, scene);

  //TEXTURA
  // Crear y configurar el material con una textura PNG
  const Materialplano = new StandardMaterial("Materialplano", scene);
  Materialplano.diffuseTexture = new Texture(
    "./assets/images/personaje-quieto.png",
    scene
  );

  //transparencia
  // Habilitar transparencia
  Materialplano.diffuseTexture.hasAlpha = true; // Indicar que la textura tiene un canal alfa
  Materialplano.alpha = 0.5; // Establecer el nivel de transparencia (1 significa completamente opaco)

  // Configurar la escala de la textura
  Materialplano.diffuseTexture.uScale = 0.8; // Escala horizontal
  Materialplano.diffuseTexture.vScale = 1; // Escala vertical

  // Asignar el material al box
  plano.material = Materialplano;

  // Move the box upward 1/2 its height
  plano.position.x = -10;
  plano.position.y = plano.getBoundingInfo().boundingBox.extendSize.y;
  ValoresIniciales();









  function ValoresIniciales() {
    direction = 1; // Restablecer dirección del movimiento
    speed = 0.1; // Velocidad inicial
  }

  //TEXTURA
  // Crear y configurar el material con una textura PNG
  const materialGameOver = new StandardMaterial("materialGameOver", scene);
  materialGameOver.diffuseTexture = new Texture(
    "./assets/images/gameOver.png",
    scene
  );

  //transparencia
  // Habilitar transparencia
  materialGameOver.diffuseTexture.hasAlpha = true; // Indicar que la textura tiene un canal alfa
  materialGameOver.alpha = 1; // Establecer el nivel de transparencia (1 significa completamente opaco)

  // Asignar el material al box
  cartelGameOver.material = materialGameOver;

  // Move the box upward 1/2 its height
  cartelGameOver.position.x = 1;
  //Y ES HORIZONTE.
  cartelGameOver.position.y = 10;

  // PISO
  MeshBuilder.CreateGround("ground", { width: 60, height: 3 }, scene);

  let isJumping = false; // Bandera para evitar múltiples saltos

  function salto() {
    isJumping = true; // Evitar múltiples saltos simultáneos
    const jumpHeight = 4; // Altura del salto
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

  window.addEventListener("pointerdown", () => {
    if (!isJumping) {
      console.log("¡Salto activado desde celular o mouse!");
      // Aquí va tu lógica de salto
      salto();
    }
  });

  // Evento para hacer que el plano salte hacia arriba
  window.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !isJumping) {
      salto();
    }
  });

  window.addEventListener("keydown", async (event) => {
    if (event.code === "Enter" && !isJumping) {
      console.log("reiniciar");
      await reiniciar(); // Llamar a la función de reinicio
    }
  });
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */

let direction = 1; // Dirección inicial del movimiento: 1 significa hacia la derecha
let gameOver = false;

// Recuperar el récord guardado (si existe)
let record = localStorage.getItem("record")
  ? parseInt(localStorage.getItem("record"))
  : 0;

let intervaloPuntos;

let puntos = 0;
//let record = 0;

function SumaPuntos() {
  intervaloPuntos = setInterval(() => {
    puntos++;
    if (puntos >= record) {
      record = puntos;
      localStorage.setItem("record", record); // Guardar el nuevo récord en localStorage
    }
    //console.log(`Puntos: ${puntos}, Récord: ${record}`);
  }, 1000);
}

function detenerSumaPuntos() {
  clearInterval(intervaloPuntos);
}

SumaPuntos();
// Si quieres detener la acumulación de puntos en algún momento:
//detenerSumaPuntos();

const onRender: OnRenderHandler = (scene) => {
  //console.log("aaa" + gameOver);
  if (!gameOver) {
    cartelGameOver.isVisible = false;
    button.isVisible = false;
    //console.log("gameover false!!!")
  } else {
    cartelGameOver.isVisible = true;
    button.isVisible = true;
    detenerSumaPuntos();
    direction = 0;
  }

  /*
  if (cactus !== undefined) {
    const speed = 0.1; // Velocidad del movimiento
    cactus.position.x += direction * speed;

    // Cambiar la dirección al alcanzar los límites
    //if (cactus.position.x >= 10) {
    direction = -1; // Cambiar hacia la izquierda
    //} else if (cactus.position.x <= -15) {
    //direction = 1; // Cambiar hacia la derecha
    //}
  }*/

  /*
         // Hacer el mesh (el plano) invisible
         cartelGameOver.isVisible = false;
*/
  // Detectar colisión entre el plano y el cactus
};

const App: FC = () => (
  <div style={{ flex: 1, display: "flex", height: "100vh" }}>
    <SceneComponent
      canvasId="babylon-canvas"
      antialias
      onSceneReady={onSceneReady}
      onRender={onRender}
    />
  </div>
);

export default App;
