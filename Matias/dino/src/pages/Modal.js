import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { toast, ToastContainer } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { BotonEnviando } from "./BotonEnviando";

export const Modal = ({ modal, setModal, titulo, mensajeModal, mensaje, icono, boton_texto, boton_script, password }) => {
    const handleCancel = () => {
        navigate(process.env.PUBLIC_URL + "/");
    };

    const navigate = useNavigate();


    /*
      var [mensajeEnviado, setMensajeEnviado] = useState(false);
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
  
   
  const handleLogin = (token) => {
      setToken("this is a test token");
      navigate("/", { replace: true });
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
              handleLogin(res.data[1].token);
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
  */
    return (
        <>
            {modal == true &&
                <section  >
                    <div class="modal__fondo" aria-hidden="true" data-headlessui-state="open" data-open="" >
                    </div>
                    <div className="registro__modal">
                        <div class="registro__exito ">
                            <div
                                class="registro__exito__modal mx-3 lg:mx-3 shadow-xl shadow-[#000] rounded-2xl dark:bg-[#0f0f0f]  ring-4 ring-outset ring-[#3d3838]"
                                id="headlessui-dialog-panel-:r1b:"
                                data-headlessui-state="open"
                                data-open=""
                            >
                                <div>
                                    {mensajeModal == 1 &&

                                        <div class="registro__exito__modal__icono__contenedor">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                                class="registro__exito__modal__icono__contenedor__imagen">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M4.5 12.75l6 6 9-13.5"></path>
                                            </svg>
                                        </div>

                                    }

                                    <div class="registro__exito__modal__icono__contenedor__texto">
                                        {mensajeModal == 1 &&
                                            <h3
                                                class="registro__exito__modal__icono__contenedor__texto__titulo"
                                                id="headlessui-dialog-title-:r1c:"
                                                data-headlessui-state="open"
                                                data-open="">
                                                ¡Te registraste correctamente!
                                            </h3>
                                        }
                                        <div class="registro__exito__modal__icono__contenedor__texto__descripcion__contenedor">
                                            <p class="registro__exito__modal__icono__contenedor__texto__descripcion__contenedor__texto ">

                                                {mensaje == 1 &&
                                                    <>
                                                        {mensajeModal == 1 &&
                                                            <div>
                                                                <div>Tu contraseña es: {password}</div>
                                                                <div className="mt-2 mb-3">
                                                                    <button
                                                                        className="m-auto flex  justify-center rounded-md bg-[#b70100] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#d40000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24]"
                                                                        onClick={() => navigator.clipboard.writeText(password)}
                                                                    >
                                                                        Copiar
                                                                    </button>
                                                                </div>
                                                                Anota la contraseña en algún lugar donde la puedas recordar.<div className="mt-2">Solicitá la <span className="font-bold">activación</span> de tu cuenta en recepción para ingresar al control fit.</div> </div>
                                                        }
                                                        {mensajeModal == 0 &&
                                                            <div>El D.N.I ya se encuentra registrado.</div>
                                                        }
                                                    </>
                                                }





                                                {mensaje == 0 &&
                                                    <div>Solicitá tu contraseña en recepción.</div>
                                                }


                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="registro__exito__modal__boton__contenedor">
                                    <button
                                        type="button"
                                        class="registro__exito__modal__boton flex w-full justify-center rounded-md bg-[#b70100] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#d40000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24]"
                                        onClick={mensajeModal == 0 ?
                                            () => setModal(false)
                                            :
                                            boton_script
                                        }
                                    >
                                        {boton_texto}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            }
        </>
    );
};
