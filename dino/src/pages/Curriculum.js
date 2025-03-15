import { React, useState, useEffect } from "react";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Curriculum = () => {



    let experiencia = {
        10: {
            empresa: "El cazador GYM",
            cargo: "Desarrollador Full Stack",
            fecha_desde: "noviembre 2024",
            fecha_hasta: "diciembre 2024",
            experiencia: [
                {
                    descripcion: "Desarrollé el sitio web https://elcazadorgym.com.ar/fitnesscontrol",
                    url: "https://elcazadorgym.com.ar/fitnesscontrol",
                }
            ],
            stack: [
                "React.js",
                "Express.js",
                "Axios",
                "Rest API",
                "Json",
                "Mysql",
                "Tailwind",
                "Javascript",
                "CSS",
                "Git",
            ]
        },
        9: {
            empresa: "Power Bit",
            cargo: "Desarrollador Full Stack",
            fecha_desde: "enero 2024",
            fecha_hasta: "actualidad",
            experiencia: [
                {
                    descripcion: "Desarrollé el sitio web https://powerbit.com.ar",
                    url: "https://powerbit.com.ar",
                }
            ],
            stack: [
                "React.js",
                "Express.js",
                "Axios",
                "Rest API",
                "Json",
                "Mysql",
                "Tailwind",
                "Javascript",
                "CSS",
                "Git",
            ]
        },
        8: {
            empresa: "Tienda Brando",
            cargo: "Desarrollador Full Stack",
            fecha_desde: "enero 2019",
            fecha_hasta: "diciembre 2023",
            experiencia: [
                {
                    descripcion: "Desarrollé el sitio web https://tiendabrando.com.ar",
                    url: "https://tiendabrando.com.ar",
                },
                {
                    descripcion: "Aumenté en un 15% las ventas mensuales con las campañas publicitarias."
                },
            ],
            stack: [
                "React.js",
                "Express.js",
                "Axios",
                "Rest API",
                "Json",
                "Mysql",
                "Bootstrap",
                "Javascript",
                "CSS",
                "Git",
            ]
        },
        7: {
            empresa: "Les Amis",
            cargo: "Desarrollador Front End",
            fecha_desde: "enero 2018",
            fecha_hasta: "diciembre 2018",
            experiencia: [
                {
                    descripcion: "Desarrollé la actualización del sitio web.",
                },
                {
                    descripcion: "Aumenté en un 25% las ventas mediante la realización de un motor de búsqueda de vuelos y hoteles que presupuesta paquetes turísticos para el sitio web. A su vez se simplificó la tarea manual de presupuestar paquetes turísticos y se automatizó el proceso de búsqueda."
                },
            ],
            stack: [

                "Angular",
                "Express.js",
                "Bootstrap",
                "Php",
                "Javascript",
                "Sql",
                "Git",
            ]
        },
        6: {
            empresa: "Matrice consulting",
            cargo: "Desarrollador Front End",
            fecha_desde: "enero 2017",
            fecha_hasta: "diciembre 2017",
            experiencia: [
                {
                    descripcion: "Incrementé en un 35% la comunicación con el usuario mediante el desarrollo de un framework Php de stock de semillas.",
                },
            ],
            stack: [
                "Php",
                "Bootstrap",
                "Css",
                "Javascript",
                "Jquery",
                "Ajax",
                "Sql",
                "Git",
            ]
        },
        5: {
            empresa: "IPG Media Brand",
            cargo: "Desarrollador Full Stack",
            fecha_desde: "enero 2016",
            fecha_hasta: "diciembre 2016",
            experiencia: [
                {
                    descripcion: "Trabajé con varios frameworks Php para clientes de la empresa.",
                },
            ],
            stack: [
                "Php",
                "Wordpress",
                "Cakephp",
                "Drupal",
                "Bootstrap",
                "Css",
                "Javascript",
                "Jquery",
                "Ajax",
                "Sql",
                "Git",
            ]
        },
        4: {
            empresa: "Correo Argentino",
            cargo: "Desarrollador Front End",
            fecha_desde: "enero 2015",
            fecha_hasta: "diciembre 2015",
            experiencia: [
                {
                    descripcion: "Reduje en un 60% los tiempos de realización del trámite mediante el desarrollo del módulo de telegramas y cartas documento para hacer el trámite desde el sitio web.",
                },
            ],
            stack: [
                "Php",
                "Bootstrap",
                "Css",
                "Javascript",
            ]
        },
        3: {
            empresa: "Estado Digital",
            cargo: "Desarrollador Front End",
            fecha_desde: "enero 2013",
            fecha_hasta: "diciembre 2013",
            experiencia: [
                {
                    descripcion: "Desarrollé sitios web en frameworks Php para los clientes de la empresa.",
                },
            ],
            stack: [
                "Php",
                "Wordpress",
                "Drupal",
                "Cakephp",
                "Javascript",
                "Ajax",
                "Jquery",
                "Bootstrap",
                "Css",
                "Git",
            ]
        },
        2: {
            empresa: "Media 8",
            cargo: "Desarrollador Front End",
            fecha_desde: "enero 2008",
            fecha_hasta: "diciembre 2008",
            experiencia: [
                {
                    descripcion: "Reduje los tiempos de fecha de entrega en un 25% mediante la realización de sitios web con frameworks Php que permiten reutilizar módulos.",
                },
                {
                    descripcion: "Disminuí en un 40% los tiempos de implementación y fecha de entrega de los proyectos mediante el desarrollo de un framework MVC basado en Php.",
                },
            ],
            stack: [
                "Php",
                "Drupal",
                "Wordpress",
                "Symfony",
                "Javascript",
                "Css",
                "Git",
            ]
        },
        1: {
            empresa: "Colegio Bertrand Russell",
            cargo: "Desarrollador Full Stack",
            fecha_desde: "enero 2004",
            fecha_hasta: "diciembre 2004",
            experiencia: [
                {
                    descripcion: "Mejoré en un 40% los tiempos de carga del sitio web mediante la propuesta de migración de las tecnologías Asp, Access a Php, Sql. https://bertrandrussell.com.ar/",
                    url: "https://www.bertrandrussell.com.ar/",
                },
                {
                    descripcion: "Aumenté el número de inscripciones de alumnos mediante publicidad en internet a través del nuevo sitio web.",
                },
                {
                    descripcion: "Desarrollé páginas de boletines, presentismo, cuotas, comedor, para alumnos, profesores y familias.",
                },
            ],
            stack: [
                "Php",
                "Css",
                "Javascript",
                "Sql",
                "Asp",
                "Access",
                "Illustrator",
                "Photoshop",
                "Premiere",
                "After Effects",
            ]
        },
    };


    /*
  
      Les Amis, desarrollador front end
      enero, 2018 - diciembre, 2018

      Desarrollé la actualización del sitio web.

      Aumenté en un 25% las ventas mediante la realización de un motor de 
    búsqueda de vuelos y hoteles que presupuesta paquetes turísticos para 
    el sitio web. A su vez se simplificó la tarea manual de presupuestar 
    paquetes turísticos y se automatizó el proceso de búsqueda.

      Angular, Express, Bootstrap, Php, Javascript, Sql, Git.

    ----

      Matrice consulting, desarrollador front end
      enero, 2017 - diciembre, 2017

      Incrementé en un 35% la comunicación con el usuario mediante el 
      desarrollo de un framework Php de stock de semillas.

      Php, Bootstrap, Css, Javascript, Jquery, Ajax, Sql, Git.


      --


      IPG Media Brand, desarrollador web

      enero, 2016 - diciembre, 2016

      Trabajé con varios frameworks Php para clientes de la empresa.
       Php, Wordpress, Cakephp, Drupal, Bootstrap, Css, Javascript, Jquery, Ajax, Sql, Git.

       ---

       Correo Argentino, desarrollador front end
       enero, 2015 - diciembre, 2015
       Reduje en un 60% los tiempos de realización del trámite mediante el 
       desarrollo del módulo de telegramas y cartas documento para hacer el 
       trámite desde el sitio web.
        Php, Bootstrap, Css, Javascript.

        -----

        Estado Digital, desarrollador front end
        enero, 2013 - diciembre, 2013
        Desarrollé sitios web en frameworks Php para los clientes de la empresa.
        Php, Wordpress, Drupal, Cakephp, Javascript, Ajax, Jquery, Bootstrap, Css, Git.

        -----
        Media 8, desarrollador front end
        enero, 2008 - diciembre, 2008
        Reduje los tiempos de fecha de entrega en un 25% mediante la realización 
        de sitios web con frameworks Php que permiten reutilizar módulos.

        Disminuí en un 40% los tiempos de implementación y fecha de entrega de 
        los proyectos mediante el desarrollo de un framework MVC basado en Php.
         Php, Drupal, Wordpress, Symfony, Javascript, Css, Sql.

         -----
         Colegio Bertrand Russell, desarrollador web
         enero, 2004 - diciembre, 2004
         Mejoré en un 40% los tiempos de carga del sitio web mediante la 
         propuesta de migración de las tecnologías Asp, Access a Php, Sql.

         Aumenté el número de inscripciones de alumnos mediante publicidad 
         en internet a través del nuevo sitio web.

         Desarrollé páginas de boletines, presentismo, cuotas, comedor, para 
         alumnos, profesores y familias.
          Php, Css, Javascript, Sql, Asp, Access, Illustrator, 
          Photoshop, Premiere, After Effects.
      

-----


EDUCACIÓN
Leoardo Da Vinci, arte multimedial

Diseñador multimedial, 2008. Capital federal, Argentina.

Español: Nativo.

Inglés: Básico.

  */

    return (
        <section className="experiencia margen1  dark:bg-[#0f0f0f] text-[#fff]">
            <h1 className="titulo1 text-center mb-[3rem] ">Curriculum Vitae</h1>
            <h2 className="font-bold">EXPERIENCIA</h2>
            <ul className="experiencia mb-3 ">
                {Object.keys(experiencia).reverse().map((key) => (
                    <li key={key}>
                        <p><span className="font-bold">{experiencia[key].empresa}, {experiencia[key].cargo}.<br /><span className="hidden">(logos empresas)</span></span> <span className="italic">Desde {experiencia[key].fecha_desde} hasta {experiencia[key].fecha_hasta}.</span> </p>
                        <ul className="list-disc ml-5 lg:ml-9">
                            {experiencia[key].experiencia.map((item) => (
                                <li >
                                    {item.descripcion}
                                    {item.url &&
                                        <a href={item.url} target='_blank'><FontAwesomeIcon icon={faArrowUpRightFromSquare} size="md" className="ico-col3 ml-1 text-sm" /> </a>
                                    }

                                </li>
                            ))}

                            <li className="list-none">
                                <p><span className="italic font-semibold">Stack tecnológico: </span>
                                    {experiencia[key].stack.map((item, index) => (
                                        <>{item}{index < experiencia[key].stack.length - 1 && ', '}</>
                                    ))}.</p>
                            </li>
                        </ul>
                    </li>
                ))}
            </ul>
            <h2 className="font-bold">EDUCACIÓN</h2>
            <ul className="educacion mb-3">
                <li>
                    <p className=" font-bold">Leoardo Da Vinci, Arte multimedial</p>
                </li>
                <li>
                    <p className="">Diseñador multimedial, 2008 - Capital Federal, Argentina.</p>
                </li>
            </ul>
            <h2 className="font-bold">IDIOMAS</h2>
            <ul className="idiomas list-disc ml-9 mb-3">
                <li>
                    <p className="">Español: Nativo.</p>
                </li>
                <li>
                    <p className="">Inglés: Básico.</p>
                </li>
            </ul>
        </section>
    );
};


{
    /*
    
    
    
              Desacargar
          Curriculum Vitae *click: 2 opciones. <br />
          Ver
          <br />
    
    */
}