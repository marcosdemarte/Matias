import React from 'react'
import { Link } from 'react-router-dom'
export const Opps = () => {
    return (
        <div className="container px-2 pb-3 lg:px-5 lg:pb-5 ">
            <section class="grid min-h-full place-items-center bg-dark px-6 py-24 sm:py-32 lg:px-8 fondo3 w-full shadow-xl shadow-[#000]   rounded-b-2xl dark:bg-[#0f0f0f]">
                <div class="text-center">
                    <p class="text-medium font-semibold text-[#b70100]">404</p>
                    <h1 class="mt-4 text-3xl font-bold tracking-tight text-white-900 sm:text-5xl">Página no encontrada</h1>
                    <p class="mt-6 text-base leading-7 text-gray-100">Lo sentimos, no podemos encontrar la página que estás buscando.</p>
                    <div class="mt-10 flex items-center justify-center gap-x-6">
                        <Link to={process.env.PUBLIC_URL + "/"} class="flex justify-center rounded-md bg-[#b70100] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#d40000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24]">Regresar al inicio</Link>
                        {/* <Link to="/#contacto" class="hidden mt-5 text-sm font-semibold text-gray-900">Contactar al soporte <span aria-hidden="true">&rarr;</span></Link> */}
                    </div>
                </div>
            </section>
        </div >
    )
}