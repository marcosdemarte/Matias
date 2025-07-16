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
  Skeleton,
  SceneLoader,
} from "@babylonjs/core";
import { FC, useEffect, useRef } from "react";
import "@babylonjs/gui";
import { AdvancedDynamicTexture, TextBlock, Button } from "@babylonjs/gui";

type OnSceneReadyHandler = (scene: Scene) => void;
type OnRenderHandler = (scene: Scene) => void;

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
      props.onRender(scene);
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
let cartelGameOver: Mesh;
let boton: any;
let button: any;
let skeleton: Skeleton;
let gameOver = false;
let record = localStorage.getItem("record")
  ? parseInt(localStorage.getItem("record")!)
  : 0;
let puntos = 0;

const onRender: OnRenderHandler = (scene) => {
  if (!gameOver) {
    cartelGameOver.isVisible = false;
    button.isVisible = false;
  } else {
    cartelGameOver.isVisible = true;
    button.isVisible = true;
  }
};

const onSceneReady: OnSceneReadyHandler = async (scene) => {
  // Configuración de la cámara
  const camera = new FreeCamera("camara2d", new Vector3(0, 5, -20), scene);
  camera.setTarget(Vector3.Zero());

  // Configuración de la luz
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  // Carga del modelo con esqueleto
  await SceneLoader.ImportMeshAsync(
    "",
    "./assets/models/",
    "character.glb",
    scene
  )
    .then((result) => {
      const character = result.meshes[0];
      skeleton = result.skeletons[0];
      character.position = new Vector3(0, 0, 0);
      scene.beginAnimation(skeleton, 0, 100, true);
    })
    .catch((error) => {
      console.error("Error al cargar el modelo:", error);
    });

  // Configuración del plano
  plano = MeshBuilder.CreatePlane("plano", { width: 2, height: 2.5 }, scene);
  plano.position = new Vector3(0, 0, 0);

  // Configuración del cartel de game over
  cartelGameOver = MeshBuilder.CreatePlane("gameOver", { size: 10 }, scene);
  cartelGameOver.position = new Vector3(0, 10, 0);

  // Configuración del botón de reinicio
  const ui = AdvancedDynamicTexture.CreateFullscreenUI("UI");
  button = Button.CreateSimpleButton("btn", "Reiniciar");
  button.width = "150px";
  button.height = "40px";
  button.color = "white";
  button.background = "blue";
  ui.addControl(button);
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
