import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { toast, ToastContainer } from "react-toastify";
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { BotonEnviando } from './BotonEnviando';


import FormRegistro from "./FormRegistro";

const Registro = () => {

    /*
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
            <div className="container px-2 pb-3 lg:px-5 lg:pb-5 ">
                <section class=" w-full shadow-xl shadow-[#000]   rounded-b-2xl dark:bg-[#0f0f0f] ">

                    <FormRegistro />

                </section >
            </div>
        </>
    );
};

export default Registro;



