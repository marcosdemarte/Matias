

import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorMessage } from "@hookform/error-message"
import { BotonEnviando } from './BotonEnviando';


const Form1 = ({ getUsuarioControlFit, dataUser, infoUser }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [fechaHoy, setfechaHoy] = useState(null);//arreglo con 0 
    const [idUsuario, setidUsuario] = useState(null);//arreglo con 0 
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        //        alert("enviando email2");
        console.log(data)
        await axios
            .post(process.env.REACT_APP_URL_API + "/controlfit/", data)
            .then(({ data }) => {
                console.log(data)
                //alert(data)
                setIsLoading(false);
                getUsuarioControlFit(idUsuario);
            })
            .catch(({ data }) => console.log(data));//error
    };

    function prependZero(number) {
        if (number <= 9)
            return "0" + number;
        else
            return number;
    }

    useEffect(() => {
        const ahora = new Date();
        const año1 = ahora.getFullYear();
        const mes1 = ahora.getMonth() + 1;
        const dia1 = ahora.getDate();
        const fechaHoyTexto = String(año1 + "-" + prependZero(mes1) + "-" + prependZero(dia1));
        console.log(fechaHoyTexto);
        setfechaHoy(fechaHoyTexto);
        console.log("hi")
        console.log(infoUser.id)
        setidUsuario(infoUser.id);
    }, []);

    return (
        <>
            {(idUsuario != null && fechaHoy != null) &&
                <form id='' onSubmit={handleSubmit((data) => {
                    onSubmit(data);
                    setIsLoading(true);
                })} noValidate>

                    altura cm
                    <br />
                    peso kg
                    <br />
                    biceps cm
                    <br />
                    espalda y pecho cm
                    <br />
                    cola y cadera cm
                    <br />
                    cintura centimetros.
                    <br />
                    cuadriceps cm.
                    <br />
                    gemelos
                    <br />
                    -----------------

                    <br />
                    indice de nasa
                    <br />
                    porcentaje de grasa
                    <br />
                    grados de musculacion baja/normal/alto/muy alto       <br />
                    ----------------
                    <br />
                    *es el mismo form que el de registro.

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                        <div>

                            <label htmlFor="first-name" className="block text-sm dark:font-medium font-semibold leading-6">
                                Altura (si es mayor a 25 años no preguntar mas?)
                            </label>
                            <div className="mt-2">




                                <input
                                    type="text"
                                    name="altura"
                                    {...register('altura', { required: "requerido" })}
                                    className={errors.altura ? 'formularioError' : 'formulario1'}
                                    placeholder='1,70'
                                    role="presentation"
                                    autoComplete="off"
                                />

                            </div>
                            <ErrorMessage errors={errors} name="altura" render={({ message }) => <p className='merror hidden'>{message}</p>} />


                        </div>

                        <div>


                            <label htmlFor="first-name" className="block text-sm dark:font-medium font-semibold leading-6">
                                Peso
                            </label>

                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="peso"
                                    {...register('peso', { required: "requerido" })}
                                    className={errors.peso ? 'formularioError' : 'formulario1'}
                                    placeholder='70'
                                    role="presentation"
                                    autoComplete="off"
                                />
                            </div>
                            <ErrorMessage errors={errors} name="peso" render={({ message }) => <p className='merror hidden'>{message}</p>} />


                        </div>
                    </div>




                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">


                        <div>


                            <label htmlFor="first-name" className="block text-sm dark:font-medium font-semibold leading-6">
                                Grasa
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="grasa"
                                    {...register('grasa', { required: "requerido" })}
                                    className={errors.grasa ? 'formularioError' : 'formulario1'}
                                    placeholder='100'
                                    role="presentation"
                                    autoComplete="off"
                                />
                                <ErrorMessage errors={errors} name="grasa" render={({ message }) => <p className='merror hidden'>{message}</p>} />
                            </div>


                        </div>


                        <div>



                            <label htmlFor="first-name" className="block text-sm dark:font-medium font-semibold leading-6">
                                Masa
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="masa"
                                    {...register('masa', { required: "requerido" })}
                                    className={errors.masa ? 'formularioError' : 'formulario1'}
                                    placeholder='100'
                                    role="presentation"
                                    autoComplete="off"
                                />
                                <ErrorMessage errors={errors} name="masa" render={({ message }) => <p className='merror hidden'>{message}</p>} />

                            </div>

                        </div>


                    </div>


                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">


                        <div>


                            <label htmlFor="first-name" className="block text-sm dark:font-medium font-semibold leading-6">
                                biceps
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="biceps"
                                    {...register('biceps', { required: "requerido" })}
                                    className={errors.biceps ? 'formularioError' : 'formulario1'}
                                    placeholder='100'
                                    role="presentation"
                                    autoComplete="off"
                                />
                                <ErrorMessage errors={errors} name="biceps" render={({ message }) => <p className='merror hidden'>{message}</p>} />
                            </div>


                        </div>





                    </div>


                    <div class="">




                        <input
                            type="text"
                            name="idUsuario"
                            {...register('idUsuario')}
                            value={idUsuario}
                        />x
                        <input
                            type="text"
                            name="fecha"
                            {...register('fecha')}
                            value={fechaHoy}

                        />





                    </div>






                    <div className='text-center pt-4 ml-20 mr-20 '>
                        <button className='boton1' disabled={isLoading} type='submit'>
                            {isLoading ?
                                <BotonEnviando texto="Guardando"></BotonEnviando>
                                : 'Guardar'}
                        </button>

                    </div>



                </form>
            }



        </>
    );
};

export default Form1;
