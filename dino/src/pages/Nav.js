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
import logo from "../imagenes/powerbit.svg";


import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { IconContext } from "react-icons";
import Cookies from 'js-cookie';


export const Nav = ({ dark, setDark }) => {



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

    const products = [
        { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
        { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
        { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
        { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
        { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
    ]
    const callsToAction = [
        { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
        { name: 'Contact sales', href: '#', icon: PhoneIcon },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }


    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)






    useEffect(() => {
        darkModeHandler();
        //GetCookie();
        //console.log("here we are")
        //console.log("dark?" + Cookies.get("tema"))
        if (Cookies.get("tema") == "true" || Cookies.get("tema") == undefined) {
            darkModeHandler();
        }
        //setDark(Cookies.get("tema"));
        //console.log("###")
        //console.log("primera vz que entra?")
    }, []);//setProductos


    return (

        <header className="bg-[#F6F7F8] dark:bg-[#141828] hidden">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">PowerBit</span>
                        <img class="block dark:hidden h-8 w-auto" src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/powerbit-light.svg"} alt="PowerBit Logo" />
                        <img class="hidden dark:block h-8 w-auto" src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/powerbit-dark.svg"} alt="PowerBit Logo" />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">

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
                    <div className='hidden'>
                        swicht on off
                    </div>

                    <div className='hidden'>
                        español select
                    </div>


                </div>
            </nav>
            <Dialog as="div" className="lg:hidden " open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10 bg-[#F6F7F8] dark:bg-[#141828]" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-powerbit-top px-6 py-6 lg:max-w-sm lg:ring-1 lg:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link to={process.env.REACT_APP_URL_FOLDER + "/"} className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                            <span className="sr-only">PowerBit</span>
                            <img className="h-8 w-auto" src={logo} alt="PowerBit" />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">

                                <Link to={process.env.REACT_APP_URL_FOLDER + "/"} onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black dark:text-[#c3c3cc] hover:bg-white">Inicio</Link>
                                <Link to={process.env.REACT_APP_URL_FOLDER + "/#planes"} onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black dark:text-[#c3c3cc] hover:bg-white">Habilidades</Link>
                                <Link to={process.env.REACT_APP_URL_FOLDER + "/#portafolio"} onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black dark:text-[#c3c3cc] hover:bg-white">Experiencia</Link>
                                <Link to={process.env.REACT_APP_URL_FOLDER + "/#portafolio"} onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black dark:text-[#c3c3cc] hover:bg-white">Portafolio</Link>
                                <Link to={process.env.REACT_APP_URL_FOLDER + "/#contacto"} onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black dark:text-[#c3c3cc] hover:bg-white">Contacto</Link>

                            </div>
                            <div className="py-6">


                                <div className="pr-2">
                                    <button onClick={() => darkModeHandler()}>
                                        {

                                            dark && <IoSunny className="ico-modedark fa-xl" />
                                        }
                                        {
                                            !dark && <IoMoon className="ico-modedark fa-xl" />
                                        }
                                    </button>
                                </div>



                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header >
    )
}