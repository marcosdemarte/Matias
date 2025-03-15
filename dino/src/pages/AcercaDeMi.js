import { React, useState, useEffect } from "react";


export const AcercaDeMi = () => {

    const handleCV = () => {
        const url = 'https://drive.google.com/file/d/1wFm6JDE0dRr30xPzfTrbDgJF05G5LSwg/view?usp=drive_link';
        window.open(url, '_blank');
    };

    const handleGitHub = () => {
        const url = 'https://github.com/marcosdemarte';
        window.open(url, '_blank');
    };

    return (
        <section className="margen1  dark:bg-[#0f0f0f]">
            <div >

                <div className="lg:flex w-100">
                    <div className="lg:flex-none xl:pr-[125px] order-1 lg:order-2 flex justify-center lg:justify-start mb-3 lg:mb-0">
                        <div className="max-h-60 h-100 lg:max-h-full lg:h-[300px] w-full flex justify-center lg:justify-start">
                            <img
                                src={require("../imagenes/marcos-brandolin.jpg")}
                                alt=""
                                className="object-cover rounded-full h-full"
                            />
                        </div>
                    </div>
                    <div className="grow self-center order-2 lg:order-1 lg:text-left text-center">
                        <h1 className="fx1 !text-[1.6rem]  md:!text-[2.5rem] lg:!text-[3.5rem] xl:!text-[3.5rem] !leading-[2rem] lg:!leading-[3.5rem] xl:!leading-[4rem] ">
                            Hola, mi nombre es
                            <br />
                            <span className="!text-[2rem] md:!text-[2rem] lg:!text-[3.8rem] xl:!text-[4.5rem]">Marcos Brandolin</span>
                            <br />
                            <span className="!text-[1.5rem] md:!text-[2rem] lg:!text-[2.9rem] xl:!text-[3.5rem]">Soy desarrollador web</span>
                            <br />
                        </h1>
                    </div>
                </div>




                {/*



              <div className="lg:flex w-100 ">
                    <div className="lg:flex-none pr-[125px] order-1 lg:order-2 bg-red-500 ">
                        <div className="h-[300px] w-full bg-gray-500 ">
                            <img
                                src={require("../imagenes/marcos-brandolin.jpg")}
                                alt=""
                                className="object-cover rounded-full h-full ml-auto"
                            />
                        </div>
                    </div>
                    <div className="grow self-center order-2 lg:order-1 lg:text-left text-center">
                        <h1 className="fx1 !text-[3.5rem] !leading-[4rem]">
                            Hola, mi nombre es
                            <br />
                            <span className="!text-[4.5rem]">Marcos Brandolin</span>
                            <br />
                            <span className="!text-[3.5rem]">Soy desarrollador web</span>
                            <br />
                        </h1>
                    </div>
                </div>



*/}

                {/*
                
                
                <div className="lg:flex w-100 ">
                    <div className=" grow self-center order-2 lg:order-1 ">
                        <h1 className="  fx1 !text-[3.5rem] !leading-[4rem]">
                            Hola, mi nombre es
                            <br />
                            <span className=" !text-[4.5rem]">
                                Marcos Brandolin
                            </span>
                            <br />
                            <span className="!text-[3.5rem]">
                                Soy desarrollador web
                            </span>

                            <br />
                        </h1>


                    </div>
                    <div className=" lg:flex-none pr-[125px] order-1 lg:order-2 ">
                        <div class="h-[300px] w-full">
                            <img
                                src={require("../imagenes/marcos-brandolin.jpg")}
                                alt=""
                                class="object-cover rounded-full h-full ml-auto"
                            />
                        </div>
                    </div>
                </div>

                
                */}


                <div className=" w-100 m-auto">
                    <div>

                        <div className="flex pt-6 w-full justify-center " >
                            <p className="mb-5 text-center  text-xl lg:text-left">
                                Tengo más de 20 años de experiencia como Desarrollador Full Stack. En mi tiempo libre, me gusta hacer ejercicio en bicicleta y salir a caminar para disfrutar de la naturaleza.
                            </p>
                            {/*
                            
                            
                               Cuento con más de 20 años de experiencia y actualmente me desempeño como Desarrollador Full Stack.

                                Después del horario de trabajo mis hobbies son caminar por la naturaleza y andar en bicicleta.
                                    despues de hora o hobbis(soy humano): perros, naturaleza,
                                    caminar, musica. roller, skate.

                                    ----


                                    Cuento con más de 20 años de experiencia en el rubro y actualmente me desempeño como Desarrollador Full Stack.
                                    Soy responsable en los proyectos y presto mucha atencion a los detalles visuales de la interfaz grafica del usuario.
                                    Me considero resolutivo para el funcionamiento de los sistemas y soy creativo a la hora de aportar mejoras.<br />

                                    Despues del horario de trabajo  mis hobbis  son caminar, escuchar musica, pasar una rato al aire libre en la naturaleza, jugar con perros, y andar en skate o rollers.

                             
                            */}
                        </div>
                    </div>
                    <div className="pb-6  block lg:flex justify-center">
                        <div className="pb-3 lg:pb-0  lg:mr-4 text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    handleGitHub();
                                }}
                                class="boton1">
                                Github
                            </button>
                        </div>
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    handleCV();
                                }}
                                class="boton1">
                                Curriculum Vitae
                            </button>
                        </div>
                    </div>
                </div>

            </div>




        </section>
    );
};
