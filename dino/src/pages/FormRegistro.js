

import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorMessage } from "@hookform/error-message"
import { BotonEnviando } from './BotonEnviando';
import Datepicker from "react-tailwindcss-datepicker";
import { Modal } from './Modal';
import { toast, ToastContainer } from "react-toastify";
import { convertirHoraArgentina } from "./Funciones";


const FormRegistro = ({ }) => {

    var [modal, setModal] = useState(false);


    const handleBotonRegistro = () => {
        //alert("dfsdf");
        setModal(false);
        navigate(process.env.PUBLIC_URL + "/");
    };

    const [fecha1, setFecha1] = useState({
        startDate: null,
        endDate: null
    });

    const [fecha2, setFecha2] = useState({
        startDate: null,
        endDate: null
    });

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(false);
    const [fechaHoy, setfechaHoy] = useState(null);//arreglo con 0 
    const [idUsuario, setidUsuario] = useState(null);//arreglo con 0 

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
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    //const { control, handleSubmit, setValue } = useForm();

    const onSubmit = async (data, password) => {
        console.log("onSubmit")
        //alert(password);
        console.log(data)
        var f1 = convertirHoraArgentina(fecha1.startDate);
        var f2 = convertirHoraArgentina(fecha2.startDate);
        var myObjt = { data, password, f1, f2 };




        //const fechaArgentina = convertirHoraArgentina(data.fecha_nacimiento1.startDate);
        //console.log(


        try {
            const res = await axios.post(process.env.REACT_APP_URL_API + "/usuario/", myObjt)
            console.log(res)
            if (res.status === 200) {
                console.log(res.data)
                //toast.success(res.data);
                setIsLoading(false);
                setModal(true);
                setMensajeModal(1)
            } else if (res.status === 202) {//"dni duplicado."
                //toast.success(res.data.mensaje);
                setIsLoading(false);
                setModal(true);
                setMensajeModal(0)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data);

        }

    };



    return (
        <>


            <div class=" centro pt-5">
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

            <form id='' onSubmit={handleSubmit((data) => {
                console.log("handlesubmit")
                onSubmit(data, password);
                setIsLoading(true);
            })} noValidate >

                <div class="registro__contenedor px-3 lg:px-10 pb-10 pt-5" >
                    <h1 class="registro__titulo">Registrate</h1>
                    <p class="registro__subtitulo">Completá el formulario con tus datos.</p>

                    <div class="registro__contenedorForm">
                        <div class="registro__contenedorForm__celda3">
                            <label for="city" class="registro__contenedorForm__celda__titulo">D.N.I</label>
                            <div class="registro__contenedorForm__celda__titulo">
                                <input
                                    type="text"
                                    name="dni"
                                    {...register("dni", {
                                        required: 'requerido',
                                        pattern: /^[0-9]+$/,
                                    })}
                                    onKeyDown={(e) => {
                                        if (e.key === "," || e.key === "." || e.key === "-") {
                                            e.preventDefault();
                                        }
                                    }}
                                    inputmode="numeric"
                                    className={`registro__contenedorForm__celda__contenedor__input ${errors.dni ? '  formularioError' : ' formulario1'}`}
                                    placeholder='11222333'
                                    role="presentation"
                                    autoComplete="off"
                                />
                            </div>


                        </div>
                        <div class="registro__contenedorForm__celda3">
                            <label for="first-name" class="registro__contenedorForm__celda__titulo">Nombre</label>
                            <div class="registro__contenedorForm__celda__titulo">

                                <input
                                    type="text"
                                    name="nombre"
                                    {...register("nombre", {
                                        required: 'requerido' // JS only: <p>error message</p> TS only support string
                                    })}
                                    className={`registro__contenedorForm__celda__contenedor__input ${errors.nombre ? '  formularioError' : '  formulario1'}`}
                                    placeholder='Laura'
                                    role="presentation"
                                    autoComplete="off"
                                />
                            </div>

                        </div>
                        <div class="registro__contenedorForm__celda3">
                            <label for="last-name" class="registro__contenedorForm__celda__titulo">Apellido</label>
                            <div class="registro__contenedorForm__celda__titulo">
                                <input
                                    type="text"
                                    name="apellido"
                                    {...register("apellido", {
                                        required: 'requerido' // JS only: <p>error message</p> TS only support string
                                    })}
                                    className={`registro__contenedorForm__celda__contenedor__input ${errors.apellido ? '  formularioError' : ' formulario1'}`}
                                    placeholder='Lopez'
                                    role="presentation"
                                    autoComplete="off"
                                />
                            </div>

                        </div>


                        <div class="registro__contenedorForm__celda4">
                            <label for="country" class="registro__contenedorForm__celda__titulo">Sexo</label>
                            <div class="registro__contenedorForm__celda__titulo content-select ">
                                <select
                                    name="sexo"
                                    {...register("sexo", {
                                        required: 'requerido' // JS only: <p>error message</p> TS only support string
                                    })}
                                    className={`input__sexo registro__contenedorForm__celda__contenedor__input dto ${errors.sexo ? ' formularioError' : ' formulario1'}`}
                                >
                                    <option value="0" >Femenino</option>
                                    <option value="1">Masculino</option>


                                </select>
                            </div>

                        </div>






                        <div class="registro__contenedorForm__celda4">
                            <label for="region" class="registro__contenedorForm__celda__titulo">Fecha de nacimiento</label>
                            <div class="registro__contenedorForm__celda__titulo ">
                                <div className={`f_style ${errors.fecha_nacimiento ? ' f_style__ring--error ' : '   f_style__ring--normal '}`}>
                                    <Controller
                                        control={control}
                                        name="fecha_nacimiento"
                                        rules={{
                                            validate: value => value && value.startDate !== null || 'La fecha es requerida'
                                        }}
                                        defaultValue={fecha1}
                                        render={({ field }) => (
                                            <Datepicker
                                                displayFormat="DD-MM-YYYY"
                                                popoverDirection="up"
                                                i18n={"es"}
                                                primaryColor={"yellow"}
                                                asSingle={true}
                                                useRange={false}
                                                value={field.value}
                                                required={true}
                                                onChange={newValue => {
                                                    field.onChange(newValue);
                                                    setFecha1(newValue);
                                                    //alert(newValue);
                                                }}
                                                inputId="datepicker11"
                                                inputName="datepicker11"
                                                placeholder="01-01-1969"
                                                readOnly={true}
                                            />
                                        )}
                                    />
                                </div>

                            </div>
                        </div>



                        <div class="registro__contenedorForm__celda4">
                            <label for="region" class="registro__contenedorForm__celda__titulo">Fecha de inicio al GYM</label>
                            <div class="registro__contenedorForm__celda__titulo">
                                <div className={`f_style ${errors.fecha_inicioGYM ? ' f_style__ring--error ' : '   f_style__ring--normal '}`}>
                                    <Controller
                                        control={control}
                                        name="fecha_inicioGYM"
                                        rules={{
                                            validate: value => value && value.startDate !== null || 'La fecha es requerida'
                                        }}
                                        defaultValue={fecha2}
                                        render={({ field }) => (
                                            <Datepicker
                                                displayFormat="DD-MM-YYYY"
                                                popoverDirection="up"
                                                i18n={"es"}
                                                primaryColor={"yellow"}
                                                asSingle={true}
                                                useRange={false}
                                                value={field.value}
                                                required={true}
                                                onChange={newValue => {
                                                    field.onChange(newValue);
                                                    setFecha2(newValue);
                                                    //alert(newValue);
                                                }}
                                                inputId="datepicker11"
                                                inputName="datepicker11"
                                                placeholder="01-01-1969"
                                                readOnly={true}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>




                    <div class="registro__pie !justify-center lg:!justify-end registro__contenedor  pb-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="text-center pb-2 lg:text-left lg:pb-0 content-center">
                                <button type="button" onClick={() => { handleCancel() }} class="registro__cancelar">Cancelar</button>
                            </div>
                            <div>
                                <button disabled={isLoading} type='submit' class="flex  justify-center rounded-md bg-[#b70100] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#d40000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24]" onClick={() => {

                                }}>
                                    {isLoading ?
                                        <BotonEnviando texto="Guardando"></BotonEnviando>
                                        : 'Guardar'}
                                </button>
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




            </form >


            <Modal modal={modal} setModal={setModal} mensajeModal={mensajeModal} mensaje={1} icono={1} boton_texto={"Volver"} boton_script={() => { handleBotonRegistro(); }} password={password} />

            <ToastContainer
                autoClose={false}
                position={toast.POSITION.BOTTOM_RIGHT}
            />
        </>
    );
};

export default FormRegistro;
