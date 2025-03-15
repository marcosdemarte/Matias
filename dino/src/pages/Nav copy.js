import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { Helmet, HelmetProvider } from "react-helmet-async";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
//import logo from "../imagenes/powerbit.svg";


import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { IconContext } from "react-icons";
import Cookies from 'js-cookie';
import Logout from "./Logout";


export const Nav = () => {
    const [dark, setDark] = useState(false);


    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
        SetCookie(!dark);
        GetCookie();
    }

    const SetCookie = (x) => {
        Cookies.set("tema", x, {
            expires: 7,
        });
    };

    const GetCookie = () => {
        console.log("tema dark?" + Cookies.get("tema"));
    };



    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)



    /*
        const botonCarrito = () => {
            return (
                <div className="carrito-ico">
                    <Link to={process.env.REACT_APP_URL_FOLDER + "/carrito"} onClick={() => setMobileMenuOpen(false)} className="carrito-ico1"> <FontAwesomeIcon icon={faCartShopping} size="xl" className="ico-col3" />
                        {ObjectLength() != 0 &&
                            <div className="carrito-cantidad">{ObjectLength()}</div>
                        }
                    </Link>
                </div>
            );
        }
    */
    useEffect(() => {
        if (Cookies.get("tema") == "true" || Cookies.get("tema") == undefined) {
            darkModeHandler();
        }
    }, []);


    return (




        <header className="nav__fondo">
            <nav className="mx-auto flex max-w-7xl items-center justify-between lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to={process.env.REACT_APP_URL_FOLDER} className="-m-1.5 p-1.5">
                        <span className="sr-only">El Cazador GYM</span>
                        <img
                            class="h-28 w-auto"
                            src={require("../imagenes/elcazadorgym-logo1.png")}
                            alt="El Cazador Gym"
                        />
                        {/*require no anda con svg??? */}
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className=" lg:flex lg:gap-x-12">

                    <Link to={process.env.REACT_APP_URL_FOLDER + "/"} className="hidden  text-sm leading-6 font-semibold text-[#d40000] hover:text-[#b70100]">Fitness control</Link>

                    <Link to={process.env.REACT_APP_URL_FOLDER + "/"} className="text-sm font-semibold leading-6 text.black dark:text-[#c3c3cc]">Inicio</Link>
                    <Link to={process.env.REACT_APP_URL_FOLDER + "/#habilidades"} className="text-sm font-semibold leading-6  text.black dark:text-[#c3c3cc]">Habilidades</Link>
                    <Link to={process.env.REACT_APP_URL_FOLDER + "/#experiencia"} className="text-sm font-semibold leading-6  text.black dark:text-[#c3c3cc]">Experiencia</Link>
                    <Link to={process.env.REACT_APP_URL_FOLDER + "/#portafolio"} className="text-sm font-semibold leading-6  text.black dark:text-[#c3c3cc]">Portafolio</Link>
                    <Link to={process.env.REACT_APP_URL_FOLDER + "/#contacto"} className="text-sm font-semibold leading-6  text.black dark:text-[#c3c3cc]">Contacto</Link>






                </Popover.Group>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">

                    <div className="pr-2 ">
                        <button onClick={() => darkModeHandler()}>
                            {

                                dark && <IoSunny className="ico-modedark fa-xl" />
                            }
                            {
                                !dark && <IoMoon className="ico-modedark fa-xl" />
                            }
                        </button>
                    </div>

                    {/*
                      <Logout />
                    botonCarrito()*/}

                </div>

            </nav>
            <Dialog as="div" className="lg:hidden " open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10 bg-[#0f0f0f] dark:bg-[#0f0f0f]" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-powerbit-top px-2 py-0 lg:max-w-sm lg:ring-1 lg:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link to={process.env.REACT_APP_URL_FOLDER + "/"} className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                            <span className="sr-only">El Cazador GYM</span>

                            <img
                                class="h-28 w-auto"
                                src={require("../imagenes/elcazadorgym-logo1.png")}
                                alt="El Cazador Gym"
                            />
                        </Link>
                        <button
                            type="button"
                            className="m-2.5 rounded-md p-2.5 text-gray-700 mr-2.5"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Cerrar menu</span>
                            <XMarkIcon className=" h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6 hidden">

                                <Link to={process.env.REACT_APP_URL_FOLDER + "/"} onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black dark:text-[#c3c3cc] hover:bg-white">Inicio</Link>


                            </div>
                            <div className="px-2 py-2">


                                <div className="pr-2">
                                    {
                                        /*
                                        
                                        
                                                                           <button onClick={() => darkModeHandler()}>
                                        {

                                            dark && <IoSunny className="ico-modedark fa-xl" />
                                        }
                                        {
                                            !dark && <IoMoon className="ico-modedark fa-xl" />
                                        }
                                    </button> 
                                        
                                        
                                        */
                                    }

                                </div>

                                <Logout />
                                {/*botonCarrito()*/}

                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header >
    )
}