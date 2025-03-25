

import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorMessage } from "@hookform/error-message"
import { BotonEnviando } from './BotonEnviando';
import Datepicker from "react-tailwindcss-datepicker";
import { Modal } from './Modal';
import { ahora, prependZero, formatoNumero, fechaAlReves, simplificaFech, calcularEdad } from './Funciones';



const FormControlFit = ({ getUsuarioControlFit, dataUser, infoUser, getUsuario }) => {

    var [modal, setModal] = useState(false);

    const handleBotonRegistro = () => {
        //alert("dfsdf");
        setModal(false);
        navigate(process.env.PUBLIC_URL + "/");
    };




    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [fechaHoy, setfechaHoy] = useState(null);//arreglo con 0 

    var [mensajeEnviado, setMensajeEnviado] = useState(false);
    var [mensajeError, setMensajeError] = useState(false);


    const [passwordLength, setPasswordLength] = useState(6);
    const [uppercase, setUppercase] = useState(false);
    const [lowercase, setLowercase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(false);
    // const [errors1, setErrors1] = useState({});



    const [password, setPassword] = useState("");
    const generatePassword = () => {
        /*
                setErrors1({});
                if (!uppercase && !lowercase && !numbers && !symbols) {
                    return setErrors1("sdfsfsd");
                } else if (passwordLength === "0") {
                    return setErrors1("Password length cannot be 0");
                } else if (passwordLength === "") {
                    return setErrors1("Invalid password length");
                } else if (passwordLength >= 30) {
                    setPassword("");
                    return setErrors1("Password length cannot exceed 30 characters");
                }
        */
        let password = "";
        for (let i = 0; i < passwordLength; i++) {
            let choice = random(0, 3);
            if (lowercase && choice === 0) {
                password += randomLower();
            } else if (uppercase && choice === 1) {
                password += randomUpper();
            } else if (symbols && choice === 2) {
                password += randomSymbol();
            } else if (numbers && choice === 3) {
                password += random(0, 9);
            } else {
                i--;
            }
        }
        setPassword(password);
    };
    const random = (min = 0, max = 1) => {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    };

    const randomLower = () => {
        return String.fromCharCode(random(97, 122));
    };

    const randomUpper = () => {
        return String.fromCharCode(random(65, 90));
    };

    const randomSymbol = () => {
        const symbols = "~*$%@#^&!?*'-=/,.{}()[]<>";
        return symbols[random(0, symbols.length - 1)];
    };

    useEffect(() => {
        generatePassword();
    }, []);



    const handleCancel = () => {
        navigate(process.env.PUBLIC_URL + "/");
    };


    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();


    /*
    const onSubmit = async (data) => {
        //alert(password);
        console.log(data)

        await axios
            .post(process.env.REACT_APP_URL_API + "/controlfit/", data)
            .then(({ data }) => {
                console.log(data)
                //alert(data)
                setIsLoading(false);
                //getUsuarioControlFit(idUsuario);
                //alert("okaaayyyy")
                setModal(true);
                //setIsLoading(false);
            })
            .catch(({ data }) => console.log(data));//error
    };*/

    const onSubmit = async (data) => {
        //alert("enviando " + infoUser["id"]);
        var idUsuario = infoUser["id"];
        console.log(data)
        var myObjt = { data, idUsuario }
        await axios
            .post(process.env.REACT_APP_URL_API + "/controlfit/", myObjt)
            .then(({ data }) => {
                console.log(data)
                //alert("hello")
                setIsLoading(false);
                getUsuarioControlFit(idUsuario);
                getUsuario();
            })
            .catch(({ data }) => console.log(data));//error
    };

    function prependZero(number) {
        if (number <= 9)
            return "0" + number;
        else
            return number;
    }


    function calcularEdad(fechaNacimiento) {
        const hoy = new Date();
        const fechaNac = new Date(fechaNacimiento);

        // Asegurémonos de que la fecha de nacimiento sea válida
        if (isNaN(fechaNac)) {
            return "Fecha de nacimiento inválida. Por favor, ingresa una fecha válida en formato 'YYYY-MM-DD'.";
        }

        // Calculamos la diferencia en milisegundos entre hoy y la fecha de nacimiento
        const edadMilisegundos = hoy - fechaNac;

        // Convertimos la diferencia a años
        const edadAnios = Math.floor(edadMilisegundos / (365.25 * 24 * 60 * 60 * 1000));

        return edadAnios;
    }


    function fechaIngles(fecha) {
        let mm = fecha.split("-");
        let f = mm[2] + "-" + mm[1] + "-" + mm[0];
        return f;
    }



    useEffect(() => {
        const ahora = new Date();
        const año1 = ahora.getFullYear();
        const mes1 = ahora.getMonth() + 1;
        const dia1 = ahora.getDate();
        const fechaHoyTexto = String(año1 + "-" + prependZero(mes1) + "-" + prependZero(dia1));
        console.log(fechaHoyTexto);
        setfechaHoy(fechaHoyTexto);
        //console.log("hi")
        // console.log(infoUser.id)
        //setidUsuario(infoUser.id);
    }, []);

    return (
        <>

            <div className="px-2 lg:px-0 py-9 ">


                <form id='' onSubmit={handleSubmit((data) => {
                    onSubmit(data);
                    setIsLoading(true);
                })} noValidate >





                    <div class="registro__contenedor" >
                        <h1 class="registro__titulo">Fitness Control</h1>
                        <p class="registro__subtitulo">Completá el formulario con tus datos.</p>

                        <div class="registro__contenedorForm">











                            <div class="registro__contenedorForm__celda3">
                                <label for="city" class="registro__contenedorForm__celda__titulo">Peso</label>
                                <div class="registro__contenedorForm__celda__titulo input__contenedor">
                                    <input
                                        type="text"
                                        name="peso"
                                        {...register("peso", {
                                            required: 'requerido',
                                            min: 0,
                                            max: 500,
                                            pattern: /^\d+(\.\d{1,2})?$/,
                                        })}
                                        onKeyDown={(e) => {
                                            if (e.key === "," || e.key === "-") {
                                                e.preventDefault();
                                            }
                                        }}
                                        className={`registro__contenedorForm__celda__contenedor__input ${errors.peso ? '  formularioError' : ' formulario1'}`}
                                        placeholder='80'
                                        role="presentation"
                                        autoComplete="off"
                                    />
                                    <div class="etiqueta__input"><span class="axx cng">kg.</span></div>
                                </div>

                            </div>


                            {/*
                                  si es menor = a 24 años (pide altura )<br />
                                    si es mayor = de 25 y altura = vacio (pide altura.)


                                             {calcularEdad(fechaIngles(infoUser["fecha_nacimiento"]))}
                                -{infoUser["altura"]}-
                            */
                                (calcularEdad(infoUser["fecha_nacimiento"]) <= 24) || (calcularEdad(infoUser["fecha_nacimiento"]) >= 25 && infoUser["altura"] === '') ?
                                    <div class="registro__contenedorForm__celda3">
                                        <label for="city" class="registro__contenedorForm__celda__titulo">Altura</label>
                                        <div class="registro__contenedorForm__celda__titulo input__contenedor">

                                            <input
                                                type="text"
                                                name="altura"
                                                {...register("altura", {
                                                    required: 'requerido',
                                                    min: 0,
                                                    max: 3,
                                                    pattern: /^\d+(\.\d{1,2})?$/,
                                                })}
                                                className={`registro__contenedorForm__celda__contenedor__input ${errors.altura ? '  formularioError' : ' formulario1'}`}
                                                onKeyDown={(e) => {
                                                    if (e.key === "," || e.key === "-") {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                placeholder='1.70'
                                                role="presentation"
                                                autoComplete="off"
                                            />
                                            <div class="etiqueta__input"><span class="axx cng">mts.</span></div>
                                        </div>



                                    </div>
                                    :
                                    <></>
                            }

                            <div class="registro__contenedorForm__celda3">
                                <label for="city" class="registro__contenedorForm__celda__titulo">Espalda y Pecho</label>
                                <div class="registro__contenedorForm__celda__titulo input__contenedor">
                                    <input
                                        type="text"
                                        name="espaldaYpecho"
                                        {...register("espaldaYpecho", {
                                            required: 'requerido',
                                            min: 0,
                                            max: 500,
                                            pattern: /^\d+(\.\d{1,2})?$/,
                                        })}
                                        onKeyDown={(e) => {
                                            if (e.key === "," || e.key === "-") {
                                                e.preventDefault();
                                            }
                                        }}
                                        className={`registro__contenedorForm__celda__contenedor__input ${errors.espaldaYpecho ? '  formularioError' : ' formulario1'}`}
                                        placeholder='100'
                                        role="presentation"
                                        autoComplete="off"
                                    />
                                    <div class="etiqueta__input"><span class="axx cng">cm.</span></div>
                                </div>
                            </div>


                            <div class="registro__contenedorForm__celda3">
                                <label for="city" class="registro__contenedorForm__celda__titulo">Bíceps</label>
                                <div class="registro__contenedorForm__celda__titulo input__contenedor">
                                    <input
                                        type="text"
                                        name="biceps"
                                        {...register("biceps", {
                                            required: 'requerido',
                                            min: 0,
                                            max: 500,
                                            pattern: /^\d+(\.\d{1,2})?$/,
                                        })}
                                        onKeyDown={(e) => {
                                            if (e.key === "," || e.key === "-") {
                                                e.preventDefault();
                                            }
                                        }}
                                        className={`registro__contenedorForm__celda__contenedor__input ${errors.biceps ? '  formularioError' : ' formulario1'}`}
                                        placeholder='60'
                                        role="presentation"
                                        autoComplete="off"
                                    />
                                    <div class="etiqueta__input"><span class="axx cng">cm.</span></div>
                                </div>


                            </div>




                            <div class="registro__contenedorForm__celda3">
                                <label for="city" class="registro__contenedorForm__celda__titulo">Cintura</label>
                                <div class="registro__contenedorForm__celda__titulo input__contenedor">
                                    <input
                                        type="text"
                                        name="cintura"
                                        {...register("cintura", {
                                            required: 'requerido',
                                            min: 0,
                                            max: 500,
                                            pattern: /^\d+(\.\d{1,2})?$/,
                                        })}
                                        onKeyDown={(e) => {
                                            if (e.key === "," || e.key === "-") {
                                                e.preventDefault();
                                            }
                                        }}
                                        className={`registro__contenedorForm__celda__contenedor__input ${errors.cintura ? '  formularioError' : ' formulario1'}`}
                                        placeholder='95'
                                        role="presentation"
                                        autoComplete="off"
                                    />
                                    <div class="etiqueta__input"><span class="axx cng">cm.</span></div>
                                </div>


                            </div>








                            <div class="registro__contenedorForm__celda3">
                                <label for="city" class="registro__contenedorForm__celda__titulo">Cadera y Cola</label>
                                <div class="registro__contenedorForm__celda__titulo input__contenedor">
                                    <input
                                        type="text"
                                        name="colaYcadera"
                                        {...register("colaYcadera", {
                                            required: 'requerido',
                                            min: 0,
                                            max: 500,
                                            pattern: /^\d+(\.\d{1,2})?$/,
                                        })}
                                        onKeyDown={(e) => {
                                            if (e.key === "," || e.key === "-") {
                                                e.preventDefault();
                                            }
                                        }}
                                        className={`registro__contenedorForm__celda__contenedor__input ${errors.colaYcadera ? '  formularioError' : ' formulario1'}`}
                                        placeholder='60'
                                        role="presentation"
                                        autoComplete="off"
                                    />
                                    <div class="etiqueta__input"><span class="axx cng">cm.</span></div>
                                </div>


                            </div>













                            <div class="registro__contenedorForm__celda3">
                                <label for="city" class="registro__contenedorForm__celda__titulo">Cuadriceps</label>
                                <div class="registro__contenedorForm__celda__titulo input__contenedor">
                                    <input
                                        type="text"
                                        name="cuadriceps"
                                        {...register("cuadriceps", {
                                            required: 'requerido',
                                            min: 0,
                                            max: 500,
                                            pattern: /^\d+(\.\d{1,2})?$/,
                                        })}
                                        onKeyDown={(e) => {
                                            if (e.key === "," || e.key === "-") {
                                                e.preventDefault();
                                            }
                                        }}
                                        className={`registro__contenedorForm__celda__contenedor__input ${errors.cuadriceps ? '  formularioError' : ' formulario1'}`}
                                        placeholder='50'
                                        role="presentation"
                                        autoComplete="off"
                                    />
                                    <div class="etiqueta__input"><span class="axx cng">cm.</span></div>
                                </div>


                            </div>





                            <div class="registro__contenedorForm__celda3">
                                <label for="city" class="registro__contenedorForm__celda__titulo">Gemelos</label>
                                <div class="registro__contenedorForm__celda__titulo input__contenedor">
                                    <input
                                        type="text"
                                        name="gemelos"
                                        {...register("gemelos", {
                                            required: 'requerido',
                                            min: 0,
                                            max: 500,
                                            pattern: /^\d+(\.\d{1,2})?$/,
                                        })}
                                        onKeyDown={(e) => {
                                            if (e.key === "," || e.key === "-") {
                                                e.preventDefault();
                                            }
                                        }}
                                        className={`registro__contenedorForm__celda__contenedor__input ${errors.gemelos ? '  formularioError' : ' formulario1'}`}
                                        placeholder='35'
                                        role="presentation"
                                        autoComplete="off"
                                    />
                                    <div class="etiqueta__input"><span class="axx cng">cm.</span></div>
                                </div>


                            </div>






                            <div class="registro__contenedorForm__celda4">
                                <label for="region" class="registro__contenedorForm__celda__titulo">Porcentaje de Grasa</label>
                                <div class="registro__contenedorForm__celda__titulo input__contenedor">
                                    <input
                                        type="text"
                                        name="porcentajeDeGrasa"
                                        {...register("porcentajeDeGrasa", {
                                            required: 'requerido',
                                            min: 0,
                                            max: 100,
                                            pattern: /^\d+(\.\d{1,2})?$/,

                                        })}
                                        onKeyDown={(e) => {
                                            if (e.key === ",") {
                                                e.preventDefault();
                                            }
                                        }}
                                        className={` registro__contenedorForm__celda__contenedor__input ${errors.porcentajeDeGrasa ? ' formularioError' : ' formulario1'}`}
                                        placeholder='20.50'
                                        role="presentation"
                                        autoComplete="off"
                                    />

                                    <div class="etiqueta__input"><span class="axx cng">%</span></div>

                                </div>
                            </div>

                            <div class="registro__contenedorForm__celda4">
                                <label for="region" class="registro__contenedorForm__celda__titulo">Índice de Masa</label>
                                <div class="registro__contenedorForm__celda__titulo">
                                    <input
                                        type="text"
                                        name="indiceDeMasa"
                                        {...register("indiceDeMasa", {
                                            required: 'requerido',
                                            min: 0,
                                            max: 100,
                                            pattern: /^\d+(\.\d{1,2})?$/,
                                        })}
                                        onKeyDown={(e) => {
                                            if (e.key === ",") {
                                                e.preventDefault();
                                            }
                                        }}
                                        className={` registro__contenedorForm__celda__contenedor__input ${errors.indiceDeMasa ? ' formularioError' : ' formulario1'}`}
                                        placeholder='18.05'
                                        role="presentation"
                                        autoComplete="off"
                                    />



                                </div>
                            </div>






                            <div class="registro__contenedorForm__celda4">
                                <label for="country" class="registro__contenedorForm__celda__titulo">Grado muscular</label>
                                <div class="registro__contenedorForm__celda__titulo">

                                    <select
                                        name="gradosDeMusculacion"
                                        {...register("gradosDeMusculacion", {
                                            required: 'requerido' // JS only: <p>error message</p> TS only support string
                                        })}
                                        className={`registro__contenedorForm__celda__contenedor__input h-[40px] dto ${errors.gradosDeMusculacion ? ' formularioError' : ' formulario1'}`}
                                    >
                                        <option value="1">Bajo</option>
                                        <option value="2" selected>Normal</option>
                                        <option value="3">Alto</option>
                                        <option value="4">Muy alto</option>

                                    </select>
                                </div>

                            </div>





                        </div>
                    </div>



                    <div class="hidden">




                        <br />
                        contraseña
                        <input
                            type="text"
                            name="contrasena"
                            {...register('contrasena')}
                            value={password}

                        />
                        {password}
                    </div>

                    <div class="registro__pie registro__contenedor !justify-center lg:!justify-end">

                        <button type="button" onClick={() => { handleCancel() }} class="registro__cancelar hidden">Cancelar</button>
                        <button disabled={isLoading} type='submit' class="flex justify-center rounded-md bg-[#b70100] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#d40000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24]">
                            {isLoading ?
                                <BotonEnviando texto="Guardando"></BotonEnviando>
                                : 'Guardar'}
                        </button>
                    </div>



                </form>
            </div>

            <Modal modal={modal} titulo={"¡Te registraste correctamente!"} mensaje={1} icono={1} boton_texto={"Volver"} boton_script={() => { handleBotonRegistro(); }} password={password} />

        </>
    );
};

export default FormControlFit;
