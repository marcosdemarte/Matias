import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { toast, ToastContainer } from "react-toastify";
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { BotonEnviando } from './BotonEnviando';
import { Modal } from './Modal';
//import '../estilo/estilo.css';
//import '../estilo/estilo_autoprefixer.css';
//import '../../dist/estilo_autoprefixer.css';
import '../estilo/estilo_autoprefixer.css';
import { config } from "../pages/Constants";

const Login = ({ setUsuario }) => {

  var [mensajeEnviado, setMensajeEnviado] = useState(false);
  var [modal, setModal] = useState(false);
  var [mensajeError, setMensajeError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    console.log("data form")
    console.log(data);
    //        alert("enviando email2");
    getUsuario(data);


    //alert("enviado.");


  }

  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (keyLogin) => {
    console.log(keyLogin)
    setToken(keyLogin);//keyLogin
    navigate(process.env.PUBLIC_URL + "/", { replace: true });
  };

  const HandleOlvido = () => {
    setModal(true);
  };

  const handleRegistro = () => {
    navigate(process.env.PUBLIC_URL + "/registro");
  };

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const getUsuario = async (data) => {
    console.log("###");
    console.log(data.dni)
    try {
      const res = await axios.get(process.env.REACT_APP_URL_API + "/usuario/" + data.dni + "/" + data.password + "/");
      //alert("aqui2");
      console.log("$$$$$");
      //console.log(res);
      console.log("status");
      console.log(res.status)
      console.log(".");
      console.log(res.data)
      // console.log(res.data[1].token)
      if (res.status == 200) {
        handleLogin(res.data[1]);
        console.log("dni")
        console.log(res.data[0][0].dni);
        localStorage.setItem("dni", res.data[0][0].dni)
      }
      if (res.status == 201) {
        console.log("/////////////")
        console.log(res.data.mensaje)
        setMensajeError(res.data.mensaje);
      }

    } catch (error) {
      toast.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("Solo se ejecuta una vez (cuando se monta el componente)");
    console.log("config.url.API_URL")
    console.log(config.url.API_URL)
  }, []);

  return (
    <>

      <div className="container">
        <section className=" m-3 mb-6 shadow-xl shadow-[#000] fondo3 contenedor w-100  lg:m-auto  lg:w-96 rounded-2xl dark:bg-[#0f0f0f]  ring-4 ring-outset ring-[#d00201]" >
          <div class=" w-100 h-100 lg:mt-5 lg:mb-12 px-3 lg:px-12 pt-5 pb-12 rounded-2xl">
            <div class=" centro">
              <div>
                <div>
                  <img
                    class="login__logo"
                    src={require("../imagenes/elcazadorgym-logo.png")}
                    alt="El Cazador Gym"
                  />
                </div>
              </div>
            </div>
            <h2 class="hidden text-center text-2xl font-bold leading-9 tracking-tight text-white-900 mb-5">
              Ingresa a Control Fit
            </h2>

            <div class="mt-6 w-full m-auto bg-[#0f0f0f]">

              <form class="space-y-6" id='' onSubmit={handleSubmit((data) => {
                onSubmit(data);
                setIsLoading(true);
              })} noValidate>
                <div>
                  <label
                    for="email"
                    class="block text-sm font-semibold leading-6 text-white-900 text-center titulo">
                    D.N.I
                  </label>
                  <div class="mt-2">
                    <input
                      type="text"
                      name="dni"
                      {...register('dni', {
                        required: 'requerido',
                        pattern: /^[0-9]+$/,
                      })}
                      onKeyDown={(e) => {
                        if (e.key === "," || e.key === "." || e.key === "-") {
                          e.preventDefault();
                        }
                      }}
                      inputmode="numeric"
                      className={`registro__contenedorForm__celda__contenedor__input text-center focus:placeholder:opacity-0 ${errors.dni ? '  formularioError' : ' formulario1'}`}
                      placeholder='11222333'
                      role="presentation"


                    />

                  </div>

                </div>
                <div>
                  <div>
                    <label
                      for="password"
                      class="block text-sm font-semibold leading-6 text-white-900  text-center  titulo">
                      Contraseña
                    </label>
                  </div>
                  <div class="mt-2">
                    <input
                      type="password"
                      name="password"
                      {...register('password', {
                        required: "requerido"
                      })}
                      className={`registro__contenedorForm__celda__contenedor__input text-center ${errors.password ? '  formularioError' : ' formulario1'}`}
                      placeholder=''
                      role="presentation"


                    />
                  </div>
                </div>
                {mensajeError != false &&
                  <div className="login__form__status--error text-center font-semibold">
                    {mensajeError}
                  </div>
                }



                <div >
                  <button disabled={isLoading} type='submit' class="flex w-full justify-center rounded-md bg-[#b70100] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#d40000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24]">
                    {isLoading ?
                      <BotonEnviando texto="Ingresando"></BotonEnviando>
                      : 'Ingresar'}
                  </button>

                </div>
              </form>

              <p class="mt-9 text-center text-sm text-gray-100 ">
                ¿No te registraste?{" "}
                <a
                  onClick={() => { handleRegistro() }}
                  class="font-semibold text-[#d40000]  decoration-1 cursor-pointer hover:underline  underline-offset-[5px]">
                  Registrate
                </a>
              </p>

              <div class="text-sm  mt-3 text-center text-sm text-gray-500 " >
                <a

                  class="font-semibold text-[#d40000] decoration-1 cursor-pointer hover:underline  underline-offset-[5px]"
                  onClick={() => { HandleOlvido() }}
                >
                  ¿Olvidaste la contraseña?
                </a>
              </div>
            </div>

          </div>
        </section >
      </div>
      <Modal modal={modal} titulo={"¿Olvidaste tu contraseña?"} mensaje={0} icono={0} boton_texto={"Volver"} boton_script={() => { setModal(false) }} />
    </>
  );
};

export default Login;


/*
  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
*/