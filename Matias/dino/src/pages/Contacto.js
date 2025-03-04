import { useForm, Controller } from 'react-hook-form';
//import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheck, } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faCartShopping, faPhone, faLocationDot, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import GoogleMapReact from 'google-map-react';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
//import Mailjet from 'node-mailjet';
import axios from "axios";
import { ErrorMessage } from "@hookform/error-message"
import confetti from "canvas-confetti";
import { BotonEnviando } from './BotonEnviando';


export const Contacto = () => {
    var [mensajeEnviado, setMensajeEnviado] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const confites = () => {
        setTimeout(() => {
            confetti({
                spread: 2500,
                origin: { y: 0 },
                particleCount: 200,
                startVelocity: 22,
                angle: 120,
                //spread: 90,
                // origin: { x: 1 }
                /*
                origin: {
                x: Math.random(),
                // since they fall down, start a bit higher than random
                y: Math.random() - 0.2
                }
                angle: 120,
                */
            });
        }, 1000);
    }
    const getMensajeEnviado = (nuevo) => {
        //sucursales1 = nuevo;
        setMensajeEnviado(nuevo);
        scrollIdentificador('contacto');
    }

    const scrollIdentificador = (nombre) => {
        const element = document.getElementById(nombre);
        if (element) {
            // 👇 Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    /*
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();*/

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();



    // Function that displays a success toast on bottom right of the page when form submission is successful
    const toastifySuccess = () => {
        toast('Form sent!', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            className: 'submit-feedback success',
            toastId: 'notifyToast'
        });
    };

    // Function called on submit that uses emailjs to send email of valid contact form
    const onSubmit = async (data) => {

        //        alert("enviando email2");


        console.log(data)


        await axios
            .post("https://marcosbrandolin-api.vercel.app/contactar/", data)
            .then(({ data }) => {
                reset();
                getMensajeEnviado(true);
                setIsLoading(false);
                //alert("holis")
                confites();
                //console.log("++++++++++++")
                //console.log(data)
                //idReturn = data.id;
                //copiar de temp a prodcutos/id
                //borrar temp
                // todo ok toast susecc
            })//toast.success(data)
            .catch(({ data }) => toast.error(data));


        // const Mailjet = require('node-mailjet');



        /*
                // Destrcture data object
                const { nombre, apellido, email, mensaje } = data;
                try {
                    const templateParams = {
                        nombre,
                        apellido,
                        email,
                        mensaje
                    };
                    /*
                                await emailjs.send(
                                    process.env.REACT_APP_SERVICE_ID,
                                    process.env.REACT_APP_TEMPLATE_ID,
                                    templateParams,
                                    process.env.REACT_APP_USER_ID
                                );
                    








        
        reset();
        getMensajeEnviado(true);
        toastifySuccess();
    } catch (e) {
        alert("nop");
        console.log(e);
    }

        */
    };

    const AnyReactComponent = ({ text }) => <div className='mapa'><FontAwesomeIcon icon={faLocationDot} className='icono-mapa' /><span className='texto-mapa'>{text}</span></div>;

    const defaultProps = {
        center: {
            lat: -34.707830789876986,
            lng: -58.378881311820436
        },
        zoom: 12
    };

    return (
        <section className='bg-[#F1F5F9] dark:bg-[#0f0f0f] dark margen1' id='contacto'>

            <h2 className='titulo1 text-center mb-[3rem] '>Contacto</h2>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>

                <div className='flex justify-center pt-2 font-bold dark:font-[10] text-base leading-6'>
                    <div>

                        <div className='flex text-left pb-4 '>
                            <div className='pr-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="ico-seguinos direccion" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>

                            </div>
                            <div className='  leading-6'>
                                <span class="font-bold ">Dirección:</span> <span class="">Capital Federal, Argentina.</span>
                            </div>
                        </div>
                        <div className='flex text-left pb-4'>
                            <div className='pr-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="ico-seguinos whatsapp" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                            </div>
                            <div className='leading-6 '>
                                <span class="font-bold">Whatsapp:</span>  <span class="">54 9 11 7098 0369</span>
                            </div>
                        </div>

                        {/**
 * 
 * 
 *


           <div className='flex text-left pb-4'>
                            <div className='pr-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="ico-seguinos email" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" /></svg>
                            </div>
                            <div className='leading-6 '>
                                <span class="font-bold">Email:</span> <span className='break-all'>marcosbrandolin@gmail.com</span>
                            </div>
                        </div>


 */}




                        <div class="flex items-center text-left pb-4 hidden">
                            <div class="pr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="ico-seguinos email" viewBox="0 0 512 512">
                                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                                </svg>
                            </div>
                            <div class="leading-6">
                                <span class="font-bold">Email:</span>
                                <span class="block sm:inline break-all">marcosbrandolin@gmail.com</span>
                            </div>
                        </div>








                        <div class="flex items-start sm:items-center text-left pb-4">
                            <div class="pr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="ico-seguinos email" viewBox="0 0 512 512">
                                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                                </svg>
                            </div>
                            <div class="leading-6">
                                <span class="font-bold">Email: </span>
                                <span class=" block sm:inline break-all">marcosbrandolin@gmail.com</span>
                            </div>
                        </div>



                        <div className=" flex justify-center pb-5">
                            <div>
                                <div className="text-center font-bold pt-6 pb-2 ">Seguime en</div>


                                <div className="block mt-2">
                                    <div className="flex  gap-5  justify-center">



                                        <div className="">

                                            <a href="https://www.linkedin.com/in/marcosbrandolin" target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="ico-seguinos linkedin" viewBox="0 0 448 512"><path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" /></svg>
                                            </a>
                                        </div>



                                        <div className="">

                                            <a href="https://github.com/marcosdemarte" target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="ico-seguinos github" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>
                                            </a>
                                        </div>

                                        <div className="hidden">

                                            <a href="https://wa.me/p/8140746209285050/5491125870303" target="_blank" >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="ico-seguinos ico_whatsapp" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                                            </a>
                                        </div>



                                        <div className="hidden">

                                            <a href="https://www.linkedin.com/company/power-bit" target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="ico-seguinos stackoverflow" viewBox="0 0 384 512"><path d="M290.7 311L95 269.7 86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8 153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24 119.3 160.3 32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z" /></svg>
                                            </a>
                                        </div>





                                    </div>

                                </div>



                            </div>

                        </div>
                    </div>



                </div>



                <div>


                    <p className='lg:mt-2 text-left pb-2   font-bold text-base'>Envíame un mensaje</p>



                    {mensajeEnviado == false
                        ?
                        <form id='' onSubmit={handleSubmit((data) => {
                            onSubmit(data);
                            setIsLoading(true);
                        })} noValidate>



                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                                <div>

                                    <label htmlFor="first-name" className="block text-sm dark:font-medium font-semibold leading-6">
                                        Nombre
                                    </label>
                                    <div className="mt-2">




                                        <input
                                            type="text"
                                            name="nombre"
                                            {...register('nombre', { required: "requerido" })}
                                            className={errors.nombre ? 'formularioError' : 'formulario1'}
                                            placeholder='Laura'
                                            role="presentation"
                                            autoComplete="off"
                                        />

                                    </div>
                                    <ErrorMessage errors={errors} name="nombre" render={({ message }) => <p className='merror hidden'>{message}</p>} />


                                </div>

                                <div>


                                    <label htmlFor="first-name" className="block text-sm dark:font-medium font-semibold leading-6">
                                        Apellido
                                    </label>

                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="apellido"
                                            {...register('apellido', { required: "requerido" })}
                                            className={errors.apellido ? 'formularioError' : 'formulario1'}
                                            placeholder='López'
                                            role="presentation"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <ErrorMessage errors={errors} name="apellido" render={({ message }) => <p className='merror hidden'>{message}</p>} />


                                </div>
                            </div>




                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">


                                <div>


                                    <label htmlFor="first-name" className="block text-sm dark:font-medium font-semibold leading-6">
                                        Teléfono
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="telefono"
                                            {...register('telefono', { required: "requerido" })}
                                            className={errors.telefono ? 'formularioError' : 'formulario1'}
                                            placeholder='54 9 11 0000 0000'
                                            role="presentation"
                                            autoComplete="off"
                                        />
                                        <ErrorMessage errors={errors} name="telefono" render={({ message }) => <p className='merror hidden'>{message}</p>} />
                                    </div>


                                </div>


                                <div>



                                    <label htmlFor="first-name" className="block text-sm dark:font-medium font-semibold leading-6">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="email"
                                            name="email"
                                            {...register('email', { required: "requerido", pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })}
                                            className={errors.email ? 'formularioError' : 'formulario1'}
                                            placeholder='LauraLopez@gmail.com'
                                            role="presentation"
                                            autoComplete="off"
                                        />
                                        <ErrorMessage errors={errors} name="email" render={({ message }) => <p className='merror hidden'>{message}</p>} />

                                    </div>

                                </div>


                            </div>









                            <label htmlFor="first-name" className="block text-sm dark:font-medium font-semibold leading-6">
                                Mensaje
                            </label>
                            <div className="mt-2">
                                <textarea
                                    rows={3}
                                    name='mensaje'
                                    {...register('mensaje', { required: "requerido" })}
                                    className={errors.mensaje ? 'formularioError' : 'formulario1'}
                                    placeholder='Hola, quiero hacerte una pregunta...'
                                    role="presentation"
                                    autoComplete="off"
                                />
                                <ErrorMessage errors={errors} name="mensaje" render={({ message }) => <p className='merror hidden'>{message}</p>} />
                            </div>

                            <div className='text-center pt-4'>
                                <button className='boton1' disabled={isLoading} type='submit'>
                                    {isLoading ?
                                        <BotonEnviando texto="Enviando"></BotonEnviando>
                                        : 'Enviar'}
                                </button>

                            </div>



                        </form>







                        :





                        <div className='text-center'>

                            <div className='mt-5'>
                                <span className="fa-layers fa-4x">
                                    <FontAwesomeIcon icon={faCircle} color="green" transform="grow-5" />
                                    <FontAwesomeIcon icon={faCheck} inverse />
                                </span>
                            </div>


                            <div className='comprastes font-bold mt-5 '>¡Mensaje enviado!</div>

                            <div >En breve nos pondremos en contacto.</div>
                            <div className='mt-1'>

                                <button onClick={() => { getMensajeEnviado(false); scrollIdentificador('contacto'); }} className=' boton1' type='submit'>
                                    Volver
                                </button>
                                <button onClick={() => { confites(); }} className=' boton1 hidden' type='submit'>
                                    confites
                                </button>
                            </div>



                        </div>






                    }
                </div>
            </div>




        </section >
    );
};