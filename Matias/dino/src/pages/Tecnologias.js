import { React, useState, useEffect } from "react";


export const Tecnologias = () => {


    return (

        <section className='margen1 bg-[#F8FAFF] dark:bg-[#f9f9f9]'>
            <h1 className=' titulo2 text-center !leading-[3.3rem]'>
                Tecnlogías
            </h1>
            <div className='mt-[3rem] mb-7'>

                <div className='flex justify-center '>


                    <div className="flex grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-8 justify-items-center items-center">
                        <div > <img src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/tecnologias/React.svg"} className='pepsi' alt="React" /></div>
                        <div > <img src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/tecnologias/Nextjs-logo.svg"} className='tiendabrando' alt="Next.js" /></div>
                        <div > <img src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/tecnologias/Typescript.svg"} className='typescript' alt="JavaScript" /></div>
                        <div > <img src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/tecnologias/Unofficial_JavaScript_logo_2.svg"} className='javascript' alt="JavaScript" /></div>
                        <div ><img src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/tecnologias/CSS3_logo_and_wordmark.svg"} className='css' alt="CSS" /></div>
                        <div > <img src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/tecnologias/Tailwind_CSS_logo.svg"} className='max-w-44 w-full lg:max-h-full' alt="Tailwind CSS" /></div>
                        <div > <img src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/tecnologias/axios.svg"} className='correoArgentino max-w-44 lg:max-h-full w-full' alt="Axios" /></div>
                        <div  > <img src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/tecnologias/Expressjs.png"} className=' max-w-44 w-full lg:max-h-full' alt="Express.js" /></div>
                        <div  > <img src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/tecnologias/Node.js_logo.svg"} className='correoArgentino' alt="Node" /></div>
                        <div > <img src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/tecnologias/MySQL_logo.svg"} className='supervielle' alt="MySQL" /></div>
                        <div ><img src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/tecnologias/Python-logo-notext.svg"} className='unilever' alt="Python" /></div>
                        <div > <img src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/tecnologias/C_Sharp_Logo_2023.svg"} className='supervielle' alt="C#" /></div>
                        <div > <img src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/tecnologias/WordPress_logo.svg"} className='supervielle max-w-44 lg:max-h-full w-full' alt="Wordpress" /></div>
                        <div > <img src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/tecnologias/Adobe_Systems_logo_and_wordmark.svg"} className='supervielle' alt="Adobe" /></div>
                        <div > <img src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/tecnologias/PHP-logo.svg"} className='pepsi' alt="PHP" /></div>
                        <div > <img src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/tecnologias/GitHub_Invertocat_Logo.svg"} className='afa' alt="Github" /></div>
                        <div > <img src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/tecnologias/Tux.svg"} className='supervielle' alt="Linux" /></div>
                        <div > <img src={process.env.REACT_APP_URL_FOLDER + "/./imagenes/tecnologias/Windows_logo_and_wordmark_-_2021.svg"} className='supervielle max-w-44 lg:max-h-full w-full' alt="Windows" /></div>
                    </div>
                </div>
            </div>

        </section>
    );
};
