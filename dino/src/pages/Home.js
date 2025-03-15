import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import Logout from "./Logout";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Nav } from "./Nav";
//import Datepicker from "react-tailwindcss-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { newDate } from "react-datepicker/dist/date_utils";
import {
  fechaDesplazar,
  ahora,
  prependZero,
  formatoNumero,
  fechaAlReves,
  simplificaFecha,
  calcularEdad,
  diferenciaDias,
  convertirHoraArgentina,
  reemplazarComasPorPuntos,
} from "./Funciones";
import { Footer } from "./Footer";
import { Contacto } from "./Contacto";
import ReactWhatsappButton from "react-whatsapp-button";
import { Portafolio } from "./Portafolio";
import { Tecnologias } from "./Tecnologias";
import { Curriculum } from "./Curriculum";
import { AcercaDeMi } from "./AcercaDeMi";
import { Github } from "./Github";

import { useRef } from "react";
import { Engine, Scene, FreeCamera, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";
import { EngineCanvas } from "react-babylonjs"



const Home = () => {



  const [dark, setDark] = useState(false);
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    setToken();
    navigate(process.env.PUBLIC_URL + "/", { replace: true });
  };






  const canvasRef = useRef(null);



  useEffect(() => {
    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);

    const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvasRef.current, true);

    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    const box = MeshBuilder.CreateBox("box", { size: 2 }, scene);

    engine.runRenderLoop(() => {
      scene.render();
    });

    return () => {
      engine.dispose();
    };
  }, []);


  return (
    <>
      <div className="container ">
        <div className="break-words  ml-2 mr-2 mb-14 lg:mb-9 md:ml-9 md:mr-9  rounded-b-2xl shadow-xl shadow-[#000]  bg-[#fff] text-[#000] dark:text-[#fff] dark:bg-[#0f0f0f] ">
          <Nav dark={dark} setDark={setDark} />
          <main>

            <div className="text-[50px]">
              Matias Escuadra,Desarrolador de videojuegos WEB
            </div>



            <div id="renderCanvas">
              <canvas ref={canvasRef} style={{ width: "100%", height: "100vh" }} />;


            </div>
          </main>
          <Footer />
          <ToastContainer
            autoClose={3000}
            position={toast.POSITION.BOTTOM_RIGHT}
          />
        </div>
      </div>
      <ReactWhatsappButton
        countryCode="54"
        phoneNumber="91170980369"
        animated
        style={{
          right: "0.6rem",
          bottom: "0.5rem"
        }}
        message="Hola, quiero hacer una pregunta..."
      />
    </>
  );
};

export default Home;