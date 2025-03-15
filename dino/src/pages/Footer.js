import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
    return (

        <footer className="footer centro bg-[#F6F7F8]  px-2 py-3 lg:px-8 lg:py-9  text-black dark:bg-[#040404] dark:text-[#ff1200] font-normal  bg-neutral text-neutral-content rounded-b-2xl ">
            <div className="text-center font-semibold dark:font-[10] pie_rights !text-stone-300 " >
                <p>
                    Desarrollado en React.js con <FontAwesomeIcon icon={faHeart} className="text-[#ff1200] text-xl relative top-[3px] ml-0.5 mr-0.5" /> por <a href='https://www.linkedin.com/in/marcosbrandolin/' target='_blank'>mi</a>.<br />
                </p>

                <p className='hidden'>Imagenes con I.A de Chat-GPT</p>
                <p>Todos los derechos reservados © {new Date().getFullYear()}.</p>

                <div className='hidden'>
                    <br />
                    Donacion para altar de perros.<br />
                    *icono manitos , pesos dando.<br />
                    *link de mercadopago, API PAGO MERCADOPAGO (desarrollo) ingrese el monto:<br />
                    *modal (la donacion sera destina a la direccion:xxx)<br />
                </div>

            </div>
        </footer>
    )
}


