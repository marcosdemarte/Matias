import { React, useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import parse from 'html-react-parser'
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const Portafolio = () => {
    const [open, setOpen] = useState(false);
    const [galeria, setGaleria] = useState([]);
    //const [index, setIndex] = useState(-1);
    const [currentIndex, setCurrentIndex] = useState(0);

    const selectedGaleria = (n) => {
        const selectedGaleria = portafolio[n].imagenes.galeria.map((imagen) => ({
            src: require(`../imagenes/portafolio/${portafolio[n].imagenes.carpeta}/${imagen}`),
            /*width: 1348, // Ajusta el tamaño según tus necesidades
            height: 767,*/
        }));
        setGaleria(selectedGaleria);
        setCurrentIndex(0);
        setOpen(true);
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };
    const handleNext = () => {
        if (currentIndex < galeria.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    let portafolio = {
        3: {
            titulo: "El Cazador GYM",
            url: "https://elcazadorgym.com.ar/fitnesscontrol/",
            demo: {
                descripcion: "<p classname='pb-1 font-bold'>Datos para el ingreso:</p><div classname='leading-4'>DNI: 11222333 <br> Contraseña: at4sk6</div>",
                //activar 1 vez por mes
            },
            descripcion: "Es un gimnasio el cual se le desarrolló un Fitness Control para sus clientes. Las personas que entrenan en el gimnasio cargan las medidas de su cuerpo en un formulario y pueden visualizar su evolución física mes a mes. Incluye un avatar que cambia de forma según el usuario, un historial con comparativas y gráficos. Utiliza tecnologías modernas como React.js. Se puede ingresar desde el navegador de un móvil u otros dispositivos. Cuenta con ingreso con contraseña y registro de usuarios. ",
            imagenes: {
                carpeta: "elcazadorgym",
                portada: "elcazadorgym1.jpg",
                galeria: [
                    "elcazadorgym1.jpg",
                    "elcazadorgym2.jpg",
                    "elcazadorgym3.jpg",
                    "elcazadorgym3.png",
                    "elcazadorgym4.jpg",
                    "elcazadorgym5.jpg",
                    "elcazadorgym6.jpg",
                ],
            },
            fechaIgnaguracion: "1/11/2024",
            version: "1.0",
        },
        2: {
            titulo: "Power Bit",
            url: "https://powerbit.com.ar/",
            descripcion: "Agencia de desarrollo de sitios web, publicidad y marketing.",
            imagenes: {
                carpeta: "powerbit",
                portada: "powerbit1.jpg",
                galeria: [
                    "powerbit1.jpg",
                    "powerbit2.jpg",
                    "powerbit3.jpg",
                    "powerbit4.jpg",
                    "powerbit5.jpg",
                ],
            },
            fechaIgnaguracion: "15/12/2023",
            version: "2.3",
        },
        1: {
            titulo: "Tienda Brando",
            url: "https://tiendabrando.com.ar/",
            descripcion: "Es una tienda virtual con catálogo de productos y carro de compra, para la empresa Group Brando, que se dedica al rubro de construcción. Enfocado al diseño responsive para móviles, utiliza tecnologías modernas como React.js. Incluye un panel de control, en donde se puede crear, actualizar o borrar productos. Se realizó una campaña publicitaria en redes sociales y una optimización S.E.O para mejorar el ranking en buscadores como Google.",
            imagenes: {
                carpeta: "tiendabrando",
                portada: "tiendabrando1.jpg",
                galeria: [
                    "tiendabrando1.jpg",
                    "tiendabrando2.jpg",
                    "tiendabrando3.jpg",
                    "tiendabrando4.jpg",
                    "tiendabrando5.jpg",
                    "tiendabrando6.jpg",
                    "tiendabrando7.jpg",
                    "tiendabrando8.jpg",
                    "tiendabrando9.jpg",
                    "tiendabrando10.jpg",
                ],
            },
            fechaIgnaguracion: "6/6/2023",
            version: "1.0",
        },
    };
    /*
                                      const onInit = () => {
                                          console.log('lightGallery has been initialized');
                                      };
                                  */

    //const singlePhoto = photos.slice(0, 1);

    return (
        <section className="margen1   dark:bg-[#ffffff] text-[#000] " id="portafolio">
            <h1 className="titulo2 text-center mb-[3rem] ">Portafolio</h1>
            <div className="portafolios">
                {Object.keys(portafolio).reverse().map((key) => (
                    <div key={key} className=" text-center grid grid-cols-1 lg:grid-cols-12 gap-7 p-2 lg:p-9 ">
                        <div className="order-2 lg:order-1 lg:col-span-6">
                            <h2 className="lg:text-3xl text-xl font-bold">{portafolio[key].titulo}</h2>
                            <p className="text-sm mb-2">{portafolio[key].url}<a href={portafolio[key].url} target="_blank" className=" underline font-semibold text-base underline underline-offset-4 dark:font-medium decoration-[#274dd8]  dark:hover:decoration-[#fff] hover:decoration-[#000]  text-white-600">
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="md" className="ico-col3 ml-1 text-sm" />
                            </a></p>
                            <p className=" text-base font-medium !leading-5 pt-1 pb-2">{parse(portafolio[key].descripcion)}</p>


                            {portafolio[key].demo && (
                                <p className="text-sm pt-2">
                                    {portafolio[key].demo.url && (
                                        <a href={portafolio[key].demo.url} target="_blank">
                                            {portafolio[key].demo.url}
                                        </a>
                                    )}
                                    {parse(portafolio[key].demo.descripcion)}
                                </p>
                            )}
                            <p className="text-sm pt-2"><span className="font-bold">Fecha:</span> {portafolio[key].fechaIgnaguracion}</p>
                            <p className="text-sm"><span className="font-bold">Versión:</span> {portafolio[key].version}</p>
                            <div className="hidden">
                                video?
                                <br />
                                *izq img_ der *click full pantallagaleria redit
                                <br />
                                *ver redit celu comportamiento galeria
                            </div>
                        </div>
                        <div className="lg:col-span-6 order-1 lg:order-2">
                            <img
                                src={require(`../imagenes/portafolio/${portafolio[key].imagenes.carpeta}/${portafolio[key].imagenes.portada}`)}
                                alt={portafolio[key].imagenes.galeria[0]}
                                className="object-contain w-full cursor-pointer"
                                onClick={() => {
                                    selectedGaleria(key);
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={galeria}
                index={currentIndex}
                render={{
                    slide: ({ slide }) => <img src={slide.src} alt="" className="lightbox-image" />,

                }}
                carousel={{
                    finite: true,
                    padding: "0px",
                    navigation: {
                        buttons: ["prev", "next"],
                    },
                    onClickNext: handleNext,
                    onClickPrev: handlePrev,

                }}

                plugins={[Counter]}
                counter={{ container: { style: { top: "unset", bottom: 0, left: 0 } } }}
            />

        </section >
    );
};
