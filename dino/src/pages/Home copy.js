import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import Logout from "./Logout";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form1 from "./Form1";
//import { Chart } from 'react-charts'
import FormControlFit from "./FormControlFit";

import { Line, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Nav } from "./Nav";
//import Datepicker from "react-tailwindcss-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { newDate } from "react-datepicker/dist/date_utils";
import { ahora, prependZero, formatoNumero, fechaAlReves, simplificaFecha, calcularEdad, diferenciaDias } from './Funciones';


const Home = () => {
  //inactivo a los 30 dias.
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken();
    navigate(process.env.PUBLIC_URL + "/", { replace: true });
  };
  /*
    function calcularEdad() {
      return 20;
    }*/







  function redondearNumero(numero) {
    const numeroComoEntero = Number(numero);
    if (Number.isNaN(numeroComoEntero)) {
      // Si no es un número válido, devolvemos el mismo valor
      return numero;
    }

    if (numero % 1 === 0) {
      // Si es un número entero, lo devolvemos sin decimales
      return numeroComoEntero.toString();
    } else {
      // Si tiene decimales, redondeamos a dos decimales
      return numero.toFixed(2);
    }
  }

  function esPositivo(n) {

    const numero = 345454;
    const numeroRedondeado = Number(numero).toFixed(2);
    console.log("numeroRedondeado");
    console.log(numeroRedondeado);

    let h = "";
    let x = Math.sign(n);
    let f = redondearNumero(n)
    if (x == 1) {
      h = "+";
      return h + f;
    } else {
      return f;
    }
  }


  const esMaximoRegla = () => {
    let valor3 = 100;

    let vacio = [0, 0, 0, 0, 0, 0];
    if (!dataFechaFin.every((value, index) => value === vacio[index]) || !dataFechaInicio.every((value, index) => value === vacio[index])) {
      // Aquí puedes agregar el código que deseas ejecutar si objt1 no es igual a vacio
      // console.log("objt1 no es igual a vacio");
      let valor1 = Math.ceil(Math.max(...dataFechaInicio));//150
      let valor2 = Math.ceil(Math.max(...dataFechaFin));//300
      //alert(valor1)
      let x = [valor1, valor2]
      valor3 = Math.ceil(Math.max(...x));//300
      //alert(valor3)

      //alert("h")
    } else {
      //alert("objt1 es igual a vacio");
    }
    setMaximoRegla(valor3);

  }
  //const [startDate, setStartDate] = useState(1659312000000);
  const [startDate, setStartDate] = useState(new Date()); //useState(1659312000000);

  var [fechaFinal, setFechaFinal] = useState(new Date());
  var [fechaInicial, setFechaInicial] = useState(new Date());

  const labels = ["Espalda y Pecho", "Bíceps", "Cintura", "Cola y Cadera", "Cuadriceps", "Gemelos", "Porentaje de Grasa"];

  const [dni, setDNI] = useState(() => {
    return localStorage.getItem("dni") || "";
  });

  const primeraLetraMayuscula = (cadena) => {
    return cadena
      .charAt(0)
      .toUpperCase()
      .concat(cadena.substring(1, cadena.length));
  };
  var [infoUser, setInfoUser] = useState(false);
  var [dataUser, setDataUser] = useState(false);

  var [dataFechaInicio, setDataFechaInicio] = useState([0, 0, 0, 0, 0, 0, 0]);
  var [dataFechaFin, setDataFechaFin] = useState([0, 0, 0, 0, 0, 0, 0]);

  var [maximoRegla, setMaximoRegla] = useState(100);



  var [myData1, setmyData1] = useState({
    labels: labels,
    datasets: [
      {
        axis: "y",
        label: "dfgdfgdfgdfg",
        data: dataFechaInicio, //dataFechaInicio [65, 59, 80, 81, 56, 55]
        fill: false,
        //backgroundColor: ["#ED1C24"],
        borderRadius: 1,
        borderWidth: 1,
        borderRadius: 20,
      },
    ],
  });

  var [myData2, setmyData2] = useState({
    labels: labels,
    datasets: [
      {
        axis: "y",
        label: "dfgdfgdfgdfg",
        data: dataFechaFin, //dataFechaInicio [65, 59, 80, 81, 56, 55]
        fill: false,
        //backgroundColor: ["#00A2E8"],
        borderRadius: 1,
        borderWidth: 1,
        borderRadius: 20,
      },
    ],
  });

  var [diasUltimoControlFit, setdiasUltimoControlFit] = useState(false);

  /*
  const diasEntreFechas = (fecha) => {
    function prependZero(number) {
      if (number <= 9) return "0" + number;
      else return number;
    }

    var timeStart = new Date(fecha + "T00:00:00");
    console.log("+++fecha start");
    console.log(timeStart);
    console.log("+++fecha ");
    console.log(fecha);

    const ahora = new Date();
    const año1 = ahora.getFullYear();
    const mes1 = ahora.getMonth() + 1;
    const dia1 = ahora.getDate();
    const fechaHoyTexto = String(
      año1 + "-" + prependZero(mes1) + "-" + prependZero(dia1)
    );

    console.log("+++fecha end ");
    var timeEnd = new Date(fechaHoyTexto + "T00:00:00");

    console.log("//////////////////////////////--------")
    console.log(timeStart);
    console.log(timeEnd);
    console.log("//////////////////////////////--------")
    var diff = timeEnd.getTime() - timeStart.getTime();
    var dias = Math.round(diff / (1000 * 60 * 60 * 24));
    console.log("diferencia dias---");
    console.log(dias);
    setdiasUltimoControlFit(dias);
  };
*/
  const compararFechaInicial = (fecha, grafico) => {
    if (fecha == undefined) {
    } else {
      //busca la fecha en la db y devuele valuor en el objeto mydata

      //filtra el array
      console.log("fecha ++++++++++++++++++");
      console.log(fecha);
      let mm = fecha.split("-");
      let formattedFecha = mm[1] + "-" + prependZero(mm[0]);
      console.log("formattedFecha++++++++");
      console.log(formattedFecha);
      let f = formattedFecha.toString();
      //2024-9
      let filtro = dataUser.filter((user) => {
        let kk = user.fecha.split("-");
        let m = kk[0] + "-" + kk[1];
        console.log(m);
        //puto cero
        //toString();
        return m === f; //formattedFecha.toString; //fecha //"2024-08"
      });
      console.log("compararFechaInicial");
      console.log("filtro+++++");
      console.log(filtro);

      if (filtro.length > 0) {
        console.log(filtro[0].biceps);
        var g = [
          filtro[0].espaldaYpecho,
          filtro[0].biceps,
          filtro[0].cintura,
          filtro[0].colaYcadera,
          filtro[0].cuadriceps,
          filtro[0].gemelos,
          filtro[0].porcentajeDeGrasa,
        ];
      } else {
        //console.log(filtro[0].biceps);
        var g = [0, 0, 0, 0, 0, 0, 0];
      }


      console.log(g);
      /*
          setDataFechaInicio(g);
          setmyData1();
          */
      if (grafico == 1) {
        setDataFechaInicio(g);

        setmyData1({
          labels: labels,
          datasets: [
            {
              axis: "y",
              data: g, //dataFechaInicio [65, 59, 80, 81, 56, 55]
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(255, 159, 64)',
                'rgba(255, 205, 86)',
                'rgba(75, 192, 192)',
                'rgba(54, 162, 235)',
                'rgba(153, 102, 255)',
                'rgba(201, 203, 207)',
                'rgba(201, 203, 207)'
              ],
              borderRadius: 1,
              borderWidth: 1,
              borderRadius: 20,
            },
          ],
        });
      } else {
        setDataFechaFin(g);

        setmyData2({
          labels: labels,
          datasets: [
            {
              axis: "y",
              data: g, //dataFechaInicio [65, 59, 80, 81, 56, 55]
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(255, 159, 64)',
                'rgba(255, 205, 86)',
                'rgba(75, 192, 192)',
                'rgba(54, 162, 235)',
                'rgba(153, 102, 255)',
                'rgba(201, 203, 207)',
                'rgba(201, 203, 207)'
              ],
              borderRadius: 1,
              borderWidth: 1,
              borderRadius: 20,
            },
          ],
        });
      }

      //myData1
      // [65, 59, 80, 81, 56, 55], //dataFechaInicio
    }
  };

  const comparativa = (ffin, finicio) => {
    if (ffin == 0 || finicio == 0) {
    } else {
      return (
        <span className="">({esPositivo(ffin - finicio)} cm)</span>
      );
    }
  };



  function MensajeSilueta(x) {
    if (x === 0)
      //return <span className="color-red-500">(No se encontr)</span>
      return <span className='text-red-500'>(No se encontró el rango de grasa corporal)</span>;
    else
      return <span>({x})</span>
  }



  function PorcentajeDeGrasa(sexo, edad, porcentajeGrasa) {

    console.log("sexo")
    console.log(sexo)
    console.log("edad")
    console.log(edad)
    console.log("PorcentajeDeGrasa")
    console.log(porcentajeGrasa)
    /*
    // Ajustar la edad para que coincida con los rangos de la tabla
    if (edad < 19) {
      edad = 19;
    } else if (edad >= 60) {
      edad = 61;
    }*/
    // Ajustar la edad para que coincida con los rangos de la tabla
    let edadAjustada;


    /*
    if (edad <= 18) {
      edadAjustada = 19;
    } else if (edad >= 19 || edad <= 24) {
      edadAjustada = 19;
    } else if (edad >= 25 || edad <= 29) {
      edadAjustada = 25;
    } else if (edad >= 30 || edad <= 34) {
      edadAjustada = 30;
    } else if (edad >= 35 || edad <= 39) {
      edadAjustada = 35;
    } else if (edad >= 40 || edad <= 44) {
      edadAjustada = 40;
    } else if (edad >= 45 || edad <= 49) {
      edadAjustada = 45;
    } else if (edad >= 50 || edad <= 54) {
      edadAjustada = 50;
    } else if (edad >= 55 || edad <= 59) {
      edadAjustada = 55;
    } else {
      edadAjustada = 61;
    }*/


    if (edad <= 18) {
      edadAjustada = 19;
    } else if (edad >= 19 && edad <= 24) {
      edadAjustada = 19;
    } else if (edad >= 25 && edad <= 29) {
      edadAjustada = 25;
    } else if (edad >= 30 && edad <= 34) {
      edadAjustada = 30;
    } else if (edad >= 35 && edad <= 39) {
      edadAjustada = 35;
    } else if (edad >= 40 && edad <= 44) {
      edadAjustada = 40;
    } else if (edad >= 45 && edad <= 49) {
      edadAjustada = 45;
    } else if (edad >= 50 && edad <= 54) {
      edadAjustada = 50;
    } else if (edad >= 55 && edad <= 59) {
      edadAjustada = 55;
    } else if (edad >= 60 && edad <= 64) {
      edadAjustada = 61;
    } else {
      edadAjustada = 61;
    }

    // Datos de la tabla
    const tablaHombres = {
      19: {
        'Esencial': [0, 2],
        'Competición': [3, 6],
        'Excelente': [7, 9],
        'Bueno': [10, 14],
        'Promedio': [15, 19],
        'Sobrepeso': [20, 23],
        'Obeso': [24, 100]
      },
      25: {
        'Esencial': [0, 2],
        'Competición': [3, 6],
        'Excelente': [7, 10],
        'Bueno': [11, 16],
        'Promedio': [17, 20],
        'Sobrepeso': [21, 24],
        'Obeso': [25, 100]
      },
      30: {
        'Esencial': [0, 2],
        'Competición': [3, 6],
        'Excelente': [7, 11],
        'Bueno': [12, 17],
        'Promedio': [18, 21],
        'Sobrepeso': [22, 25],
        'Obeso': [26, 100]
      },
      35: {
        'Esencial': [0, 2],
        'Competición': [3, 6],
        'Excelente': [7, 12],
        'Bueno': [13, 18],
        'Promedio': [19, 22],
        'Sobrepeso': [23, 26],
        'Obeso': [27, 100]
      },
      40: {
        'Esencial': [0, 2],
        'Competición': [3, 6],
        'Excelente': [7, 13],
        'Bueno': [14, 19],
        'Promedio': [20, 23],
        'Sobrepeso': [24, 27],
        'Obeso': [28, 100]
      },
      45: {
        'Esencial': [0, 2],
        'Competición': [null, null],
        'Excelente': [3, 15],
        'Bueno': [16, 21],
        'Promedio': [22, 25],
        'Sobrepeso': [26, 28],
        'Obeso': [29, 100]
      },
      50: {
        'Esencial': [0, 2],
        'Competición': [null, null],
        'Excelente': [3, 17],
        'Bueno': [18, 23],
        'Promedio': [24, 26],
        'Sobrepeso': [27, 29],
        'Obeso': [30, 100]
      },
      55: {
        'Esencial': [0, 2],
        'Competición': [null, null],
        'Excelente': [3, 19],
        'Bueno': [20, 24],
        'Promedio': [25, 28],
        'Sobrepeso': [29, 30],
        'Obeso': [31, 100]
      },
      61: {
        'Esencial': [0, 2],
        'Competición': [null, null],
        'Excelente': [3, 20],
        'Bueno': [21, 25],
        'Promedio': [26, 29],
        'Sobrepeso': [30, 31],
        'Obeso': [32, 100]
      }
    };

    const tablaMujeres = {
      19: {
        'Esencial': [0, 7],
        'Competición': [9, 12],
        'Excelente': [13, 15],
        'Bueno': [16, 20],
        'Promedio': [21, 25],
        'Sobrepeso': [26, 30],
        'Obeso': [31, 100]
      },
      25: {
        'Esencial': [0, 7],
        'Competición': [9, 12],
        'Excelente': [13, 16],
        'Bueno': [17, 21],
        'Promedio': [22, 26],
        'Sobrepeso': [27, 31],
        'Obeso': [32, 100]
      },
      30: {
        'Esencial': [0, 7],
        'Competición': [9, 12],
        'Excelente': [13, 17],
        'Bueno': [18, 22],
        'Promedio': [23, 27],// 27.99],
        'Sobrepeso': [28, 32],
        'Obeso': [33, 100]
      },
      35: {
        'Esencial': [0, 7],
        'Competición': [9, 12],
        'Excelente': [13, 19],
        'Bueno': [20, 23],
        'Promedio': [24, 28],
        'Sobrepeso': [29, 33],
        'Obeso': [34, 100]
      },
      40: {
        'Esencial': [0, 7],
        'Competición': [9, 12],
        'Excelente': [13, 21],
        'Bueno': [22, 24],
        'Promedio': [25, 29],
        'Sobrepeso': [30, 34],
        'Obeso': [35, 100]
      },
      45: {
        'Esencial': [0, 7],
        'Competición': [null, null],
        'Excelente': [8, 23],
        'Bueno': [24, 26],
        'Promedio': [27, 31],
        'Sobrepeso': [32, 36],
        'Obeso': [37, 100]
      },
      50: {
        'Esencial': [0, 7],
        'Competición': [null, null],
        'Excelente': [8, 25],
        'Bueno': [26, 28],
        'Promedio': [29, 33],
        'Sobrepeso': [34, 37],
        'Obeso': [38, 100]
      },
      55: {
        'Esencial': [0, 7],
        'Competición': [null, null],
        'Excelente': [8, 26],
        'Bueno': [27, 29],
        'Promedio': [30, 34],
        'Sobrepeso': [35, 38],
        'Obeso': [39, 100]
      },
      61: {
        'Esencial': [0, 7],
        'Competición': [null, null],
        'Excelente': [8, 27],
        'Bueno': [28, 30],
        'Promedio': [31, 35],
        'Sobrepeso': [36, 39],
        'Obeso': [40, 100]
      }
    };

    // Seleccionar la tabla según el sexo
    let tabla;
    if (sexo == 1) {//hombre
      tabla = tablaHombres[edadAjustada];
    } else if (sexo == 0) {//mujer
      console.log("////es mujer")
      tabla = tablaMujeres[edadAjustada];
    } else {
      throw new Error('Sexo no válido');
    }
    console.log("************")
    console.log("edadAjustada")
    console.log(edadAjustada)
    console.log("sexo")
    console.log(sexo)
    // Buscar el rango de grasa corporal

    let mensaje = "";

    for (const categoria in tabla) {
      const rango = tabla[categoria];
      console.log(rango)
      console.log("porcentajeGrasa")
      console.log(porcentajeGrasa)
      let redondeoPorcentajeGrasa = Math.floor(porcentajeGrasa)
      console.log("redondeoPorcentajeGrasa")
      console.log(redondeoPorcentajeGrasa)
      if (redondeoPorcentajeGrasa >= rango[0] && redondeoPorcentajeGrasa <= rango[1]) {
        return categoria;
        //     return <span>({categoria})</span>;
      }
    }


    // Si no se encuentra el rango, devolver un mensaje de error
    //return <span className='text-red-500'>(No se encontró el rango de grasa corporal)</span>;
    //return 'No se encontró el rango de grasa corporal';
    return 0;
  }






  const Silueta = (categoria, sexo) => {
    console.log("//////////silueta")
    console.log("categoria")
    console.log(categoria)
    console.log("///")
    var x = 12;

    //

    var imagen = {
      //hombre
      0: "404.png",//no hay flaco
      1: "silueta_4.png",// muy musculoso
      2: "silueta_3.png",//musculoso
      3: "silueta_2.png",//normal
      4: "silueta_1.png",//medio gordito
      5: "silueta.png",//muy gordo
      //mujer
      6: "",//no hay recontra flaca
      7: "silueta_7.png",//muy flaca
      8: "silueta_8.png",//flaca
      9: "silueta_9.png",//normal tirando a gordita
      10: "silueta_10.png",//gorda
      11: "silueta_11.png",//muy gorda
      12: "404.png"//no encontro rango
    };

    if (categoria == 'No se encontró') {//No se encontró el rango de grasa corporal
      x = 12;
    } else {
      if (sexo == 1) {
        //es hombre
        if (categoria == 'Esencial') {
          x = 2;
        }
        if (categoria == 'Competición' || categoria == 'Excelente') {
          x = 1;
        }
        if (categoria == 'Bueno') {
          x = 2;
        }
        if (categoria == 'Promedio') {
          x = 3;
        }
        if (categoria == 'Sobrepeso') {
          x = 4;
        }
        if (categoria == 'Obeso') {
          x = 5;
        }
      } else {
        //es mujer
        if (categoria == 'Esencial') {
          x = 7;
        }
        if (categoria == 'Competición' || categoria == 'Excelente') {
          x = 7;
        }
        if (categoria == 'Bueno') {
          x = 8;
        }
        if (categoria == 'Promedio') {
          x = 9;
        }
        if (categoria == 'Sobrepeso') {
          x = 10;
        }
        if (categoria == 'Obeso') {
          x = 11;
        }
      }
    }
    console.log("silueta::::::")
    console.log(x)
    var img = imagen[x]; //imagen[x];
    //alert(img);
    return img;
  };

  const getUsuario = async () => {
    console.log("###");
    console.log(dni);
    try {
      const res = await axios.get(
        process.env.REACT_APP_URL_API + "/usuario/" + dni
      );
      //alert("aqui2");

      //console.log(res);
      console.log("status");
      console.log(res.status);
      console.log(".");
      console.log(res.data);
      console.log(res.data[0].nombre);
      console.log(res.data[0].id);
      // console.log(res.data[1].token)
      if (res.status == 200) {
        setInfoUser(res.data[0]);
        getUsuarioControlFit(res.data[0].id);
        console.log("fecha_ultimoIngreso$$$$$");
        console.log(res.data[0].fecha_ultimoIngreso);
        let dias = diferenciaDias(res.data[0].fecha_ultimoIngreso, ahora());
        console.log("++++++++++++++++++++++++++++++++++++++dias")
        console.log(dias)
        if (dias >= Number(process.env.REACT_APP_INACTIVO_DIAS)) {
          usuarioInactivo(res.data[0].id);
          handleLogout();
        } else {
          updateFechaUltimoIngreso(res.data[0].id);
        }
      }
      if (res.status == 201) {
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const updateFechaUltimoIngreso = async (id) => {
    console.log("updateFechaUltimoIngreso###");
    console.log(id);
    try {
      const res = await axios.put(
        process.env.REACT_APP_URL_API + "/usuario/fechaUltimoIngreso/" + id
      );
      if (res.status == 200) {
        console.log("ultimo ingreso actualizado");
        //toast.success("ultimo ingreso actualizado");
      }
    } catch (error) {
      console.log("errrr----------------------------------");
      toast.error(error);
    }
  };

  const usuarioInactivo = async (id) => {
    console.log("usuarioInactivo*****************************");
    console.log(id);
    try {
      const res = await axios.put(
        process.env.REACT_APP_URL_API + "/usuario/inactivo/" + id
      );
      if (res.status == 200) {
        //toast.success("usuario inactivo");
      }
    } catch (error) {
      console.log("errrr----------------------------------");
      //toast.error(error);
    }
  };

  const getUsuarioControlFit = async (id) => {
    //alert("getusuariocontrolfit")
    console.log("###getusuariocontrolfit");
    console.log(id);
    try {
      const res = await axios.get(
        process.env.REACT_APP_URL_API + "/controlfit/" + id
      );
      //alert("aqui2");
      console.log("*****");
      //console.log(res);
      console.log("status");
      console.log(res.status);
      console.log(".");
      console.log(res.data);
      // console.log(res.data[1].token)
      if (res.status == 200) {
        console.log("datauser");
        setDataUser(res.data);

        console.log(res.data.length);
        if (res.data.length == 0) {
          console.log("sin datos");
          //diasEntreFechas("2024-01-01");
          setdiasUltimoControlFit(Number(process.env.REACT_APP_CONTROLFIT_DIAS));
        } else {
          //diasEntreFechas(res.data[0].fecha);
          setdiasUltimoControlFit(diferenciaDias(res.data[0].fecha, ahora()));
        }
      }
      if (res.status == 201) {
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsuario();
  }, []);

  useEffect(() => {

    esMaximoRegla(); // max of data

    /*
    if (dataFechaFin == vacio&&fecha inicio) {
      alert("esta vacio ")
    } else {
  
    }*/
  }, [dataFechaFin, dataFechaInicio]);


  useEffect(() => {
    if (dataUser.length > 0) {
      //alert("cargo." + dataUser.length)
      let date1 = new Date();
      let formattedDate1 = `${date1.getMonth() + 0}-${date1.getFullYear()}`;
      let formattedDate2 = `${date1.getMonth() + 1}-${date1.getFullYear()}`;
      setFechaInicial(date1.setMonth(date1.getMonth() - 1));
      compararFechaInicial(formattedDate1, 1);
      compararFechaInicial(formattedDate2, 2);
    }
  }, [dataUser]);

  useEffect(() => {
    console.log("Solo se ejecuta una vez (cuando se monta el componente)");
  }, []);

  return (
    <>
      <div className="container ">
        <div className="  ml-2 mr-2 mb-5 md:ml-9 md:mr-9 lg:mb-9 rounded-b-2xl shadow-xl shadow-[#000]   dark:bg-[#0f0f0f] ">
          <Nav />

          <div className="flex mb-5 hidden">
            <div>
              <img
                class="home__logo"
                src={"./imagenes/elcazadorgym-logo.png"}
                alt="El Cazador Gym"
              />
            </div>
            <div>MENU: inicio</div>
            <div className="cerrar">
              <Logout />
            </div>
          </div>

          {/*diasUltimoControlFit === false && <div>es false aunque es 0.</div>*/}
          {infoUser != false && diasUltimoControlFit !== false && (
            <>{/*
              {diasUltimoControlFit} {Number(process.env.REACT_APP_CONTROLFIT_DIAS)}
            */}

              {diasUltimoControlFit >= Number(process.env.REACT_APP_CONTROLFIT_DIAS) ? (
                <>
                  <FormControlFit
                    getUsuarioControlFit={getUsuarioControlFit}
                    dataUser={dataUser}
                    infoUser={infoUser}
                    getUsuario={getUsuario}
                  />

                  {/*
                      <Form1
                      getUsuarioControlFit={getUsuarioControlFit}
                      dataUser={dataUser}
                      infoUser={infoUser}
                    />
                  */}
                </>
              ) : (
                <div className="p-2 lg:p-8 ">
                  <div class="breadcrums__content">
                    <nav aria-label="Breadcrumb" class="breadcrums__content__1">
                      <ol role="list" class="breadcrums__content__1__list">
                        <li>
                          <div>
                            <a

                              class="breadcrums__content__1__list__link ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                                class="breadcrums__content__1__list__ico">
                                <path
                                  fill-rule="evenodd"
                                  d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                                  clip-rule="evenodd"></path>
                              </svg>
                              <span class="breadcrums__content__1__list__link__1">
                                Home
                              </span>
                            </a>
                          </div>
                        </li>
                        <li className="hidden">
                          <div class="lx zg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                              class="breadcrums__content__1__list__ico__flecha">
                              <path
                                fill-rule="evenodd"
                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                clip-rule="evenodd"></path>
                            </svg>
                            <a
                              href="#"
                              class="breadcrums__content__1__list__link__normal">
                              Projects
                            </a>
                          </div>
                        </li>
                        <li>
                          <div class="lx zg lg:ml-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                              class="breadcrums__content__1__list__ico__flecha">
                              <path
                                fill-rule="evenodd"
                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                clip-rule="evenodd"></path>
                            </svg>
                            <a

                              aria-current="page"
                              class="breadcrums__content__1__list__link__select !text-base !leading-4  lg:ml-4">
                              Fitness control
                            </a>
                          </div>
                        </li>
                      </ol>
                    </nav>
                  </div>


                  <h1 className="mt-0 text-center md:text-left py-2 lg:py-4" >
                    ¡Hola, {primeraLetraMayuscula(infoUser["nombre"])}!
                  </h1>



                  <div className="silueta__datos1  ">



                    <div className="fuente-lemon py-3 p-1 md:p-6 rounded-2xl ring-2 ring-outset ring-[#ffca00] text-[0.79rem] text-white">
                      <div className="mb-2">
                        <div>
                          <div className="grid grid-cols-1 xl:grid-cols-3">
                            <div className="text-center xl:text-left col-span-2">
                              Fecha nacimiento: {simplificaFecha(infoUser["fecha_nacimiento"], 0)}
                            </div>
                            <div className="text-center xl:text-right " >
                              Edad: {calcularEdad(infoUser["fecha_nacimiento"])} años
                            </div>
                          </div>
                        </div>

                        <div className=" grid grid-cols-1 xl:grid-cols-3">
                          <div className="text-center xl:text-left col-span-2">
                            Inicio al GYM: {simplificaFecha(infoUser["fecha_inicioGYM"], 0)}
                          </div>
                          <div className="text-center xl:text-right ">
                            Peso: {dataUser[0].peso} kg
                          </div>
                        </div>

                        <div>
                          <div className="grid grid-cols-1 xl:grid-cols-3">
                            <div className="text-center xl:text-left col-span-2">
                              Último control: {simplificaFecha(dataUser[0].fecha, 0)}
                            </div>
                            <div className="text-center xl:text-right " >
                              Altura: {infoUser["altura"]} <span className="text-[0.7rem]">mts</span>
                            </div>
                          </div>
                        </div>



                      </div>

                      <div className="  relative">



                        <div class="relative h-300 md:h-full lg:w-[238px] m-auto ">
                          <img
                            src={require("../imagenes/silueta/" + Silueta(PorcentajeDeGrasa(infoUser['sexo'], calcularEdad(simplificaFecha(infoUser["fecha_nacimiento"], 0)), Number(dataUser[0].porcentajeDeGrasa)), infoUser["sexo"]))}
                            alt=""
                            class="object-cover w-full h-full"
                          />
                        </div>
                        <div className=" block absolute w-full h-full top-0 left-0 leading-3 ">



                          <div className="absolute top-[17%] texto-sombra  ">
                            Espalda  y
                            <br />Pecho:<br />{dataUser[0].espaldaYpecho} cm
                          </div>
                          <div className="absolute top-[27%]  right-0 texto-sombra ">
                            Bíceps:<br /> {dataUser[0].biceps} cm
                          </div>
                          <div className="absolute  top-[42%] texto-sombra">
                            Cintura:<br /> {dataUser[0].cintura} cm
                          </div>
                          <div className="absolute  top-[48%] right-0 texto-sombra ">
                            Cadera y <br />Cola:<br /> {dataUser[0].colaYcadera} cm
                          </div>
                          <div className="absolute  top-[59%] texto-sombra">
                            Cuadriceps:<br /> {dataUser[0].cuadriceps} cm
                          </div>
                          <div className="absolute top-[79%] right-0 texto-sombra">
                            Gemelos:<br /> {dataUser[0].gemelos} cm
                          </div>




                        </div>
                      </div>

                      <div className="">
                        <div className="grid grid-cols-1 mt-2 ">


                          <div className="text-center text-nowrap ">
                            <span >Porcentaje de Grasa: {dataUser[0].porcentajeDeGrasa}%</span> {
                              //PorcentajeDeGrasa(infoUser['sexo'], calcularEdad(fechaIngles(infoUser["fecha_nacimiento"])), Number(dataUser[0].porcentajeDeGrasa));
                              MensajeSilueta(PorcentajeDeGrasa(infoUser['sexo'], calcularEdad(simplificaFecha(infoUser["fecha_nacimiento"], 0)), Number(dataUser[0].porcentajeDeGrasa)))//errror 1,38,13
                            }
                          </div>

                        </div>
                        <div className="text-center ">
                          <span>Grados de Musculación: </span>

                          {dataUser[0].gradosDeMusculacion == 1 && <>Baja</>}
                          {dataUser[0].gradosDeMusculacion == 2 && <>Normal</>}
                          {dataUser[0].gradosDeMusculacion == 3 && <>Alto</>}
                          {dataUser[0].gradosDeMusculacion == 4 && (
                            <>Muy alto</>
                          )}
                        </div>
                        <div className="text-center ">Índice de Masa: {dataUser[0].indiceDeMasa}</div>

                      </div>

                    </div>


                    <div>
                      <div className="p-1 md:p-6 mt-5 md:mt-0 md:ml-6 w-100 md:h-full  rounded-2xl ring-2 ring-outset ring-[#ffca00] text-white">{/*w-[610px] bg-[#fff]*/}
                        <div className="h-full grafico ">
                          <div>
                            <h2 className=" text-center lg:pb-4 lg:pt-0  py-4">
                              Comparativa
                            </h2>
                          </div>
                          <div className="grafico__comparativa1 ">

                            <div>

                              <div class="registro__contenedorForm__celda3 pb-2">

                                <div class="registro__contenedorForm__celda__titulo input__contenedor !w-28 m-auto md:ml-auto md:mr-0">
                                  <DatePicker
                                    selected={fechaInicial}
                                    onChange={(date) => {
                                      console.log("date++++");
                                      console.log(date);
                                      let formattedDate = `${date.getMonth() + 1
                                        }-${date.getFullYear()}`;
                                      setFechaInicial(date);
                                      compararFechaInicial(
                                        formattedDate,
                                        1
                                      );
                                    }}
                                    onFocus={(e) => e.target.readOnly = true}
                                    showMonthYearPicker
                                    dateFormat="MM-yyyy"
                                    className=" text-right !pt-2 !pr-10 registro__contenedorForm__celda__contenedor__input formulario1  hover:cursor-pointer"
                                  />
                                  <div class="etiqueta__input"><span class="axx cng">
                                    <svg
                                      class="home__fecha__input__ico"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor">
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"></path>
                                    </svg>
                                  </span></div>
                                </div>
                              </div>

                            </div>
                            <div></div>
                            <div>



                              <div class="registro__contenedorForm__celda3 pb-2">

                                <div class="registro__contenedorForm__celda__titulo input__contenedor !w-28 m-auto md:mr-auto md:ml-0 ">
                                  <DatePicker
                                    selected={fechaFinal}
                                    onChange={(date) => {
                                      console.log("date++++");
                                      console.log(date);
                                      let formattedDate = `${date.getMonth() + 1
                                        }-${date.getFullYear()}`;
                                      setFechaFinal(date);
                                      compararFechaInicial(formattedDate, 2);
                                    }}
                                    onFocus={(e) => e.target.readOnly = true}
                                    showMonthYearPicker
                                    dateFormat="MM-yyyy"
                                    className=" text-right !pt-2 !pr-10 registro__contenedorForm__celda__contenedor__input formulario1  hover:cursor-pointer"
                                  />
                                  <div class="etiqueta__input"><span class="axx cng">
                                    <svg
                                      class="home__fecha__input__ico"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor">
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"></path>
                                    </svg>
                                  </span></div>
                                </div>
                              </div>



                            </div>
                          </div>


                          <div className="grafico__descripcion grafico__comparativa   h-full">











                            <div className="h-full w-100 ">


                              <div className="chart-container">
                                <Bar
                                  plugins={[ChartDataLabels]}
                                  options={{

                                    layout: {
                                      padding: {
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        bottom: 0
                                      }
                                    },

                                    responsive: true,
                                    maintainAspectRatio: false,
                                    /*
                                    layout: {
                                      padding: {
                                        left: -10,
                                        right: -10,
                                        top: 50,
                                        bottom: 0
                                      }
                                    },*/
                                    scales: {

                                      y: {
                                        beginAtZero: false,
                                        // display: false // Hides labels and chart lines of the x-axis
                                        ticks: {
                                          display: false, // Hides only the labels of the x-axis
                                        },
                                        grid: {
                                          display: true,
                                        }
                                      },
                                      x: {

                                        display: true,
                                        grid: {
                                          display: true,
                                        },
                                        offset: false,
                                        beginAtZero: true,
                                        max: maximoRegla,
                                        stacked: true,
                                        reverse: true,

                                        ticks: {



                                          /*
                                          callback: function (value, index, values) {
                                            if (index % 2 === 0) {
                                              return value;
                                            }
                                            return null; // <- NOT ""
                                          },*/
                                          autoSkip: true,
                                          autoSkipPadding: 0,
                                          labelOffset: 0,
                                          crossAlign: 'near',
                                          align: 'end',
                                          padding: 0.1,
                                          beginAtZero: true,
                                          display: true, //cuando paso a true, los label no se tapan.
                                        },
                                        grid: {
                                          display: true,
                                          beginAtZero: false,
                                          color: '#232323',
                                        },
                                        border: {
                                          display: true,
                                          color: '#232323',
                                        },
                                      },
                                    },
                                    plugins: {



                                      tooltip: {

                                        xAlign: "left",
                                        enabled: true, // Disable tooltips
                                        /*
                                        filter: function (context) { // we don't need 'data'
                                          return context.raw <= 10 // i am displaying all values greater than 0. zero is filtered.
                                        },*/
                                        /*callbacks: {
  
                                          title: function (context) {
                                            return ''
                                          },
  
                                          label: function (context) {
                                            //console.log("/////////////////////////////////context")
                                            //console.log(context)
                                            //console.log(context.raw)
                                            if (context.raw > 10) {
                                              return (context.raw)
                                            }
  
                                          },
                                        },*/
                                      },
                                      title: {
                                        display: false,
                                      },
                                      datalabels: {
                                        anchor: "start",
                                        align: "right",
                                        offset: 0,
                                        color: "#fff",/*
                                            formatter: (val) => {
                                              if (val <= 10) {
                                                return '';//val + " cm"
                                              }
                                            },*/
                                        padding: {
                                          left: 10,

                                        },
                                        margin: {
                                          right: 0,

                                        }

                                        /* offset: 'center',
                                         clamp: true*/
                                      },
                                      legend: {
                                        display: false,
                                      }
                                    },
                                    indexAxis: "y",
                                  }
                                  }
                                  data={myData1}
                                />
                              </div>
                            </div>


                            <div className="leading-3 lg:!leading-4 fuente-lemon text-[0.79rem]  h-full relative  ">
                              <div className="w-full absolute top-[5%] md:top-[3%] p-0 md:p-1 text-center    content-center">
                                <span>Espalda y </span><span>Pecho</span>
                                <br />
                                {comparativa(
                                  dataFechaFin[0],
                                  dataFechaInicio[0]
                                )}
                              </div>
                              <div className="w-full absolute top-[20%] md:top-[18%] p-0 md:p-1 text-center  content-center ">
                                Bíceps
                                <br />
                                {comparativa(
                                  dataFechaFin[1],
                                  dataFechaInicio[1]
                                )}
                              </div>
                              <div className="w-full absolute top-[36%] md:top-[34%] p-0 md:p-1 text-center content-center">
                                Cintura
                                <br />
                                {comparativa(
                                  dataFechaFin[2],
                                  dataFechaInicio[2]
                                )}
                              </div>
                              <div className="w-full absolute top-[52%] md:top-[50%] p-0 md:p-1 text-center content-center ">
                                <span>Cadera y </span><span>Cola</span>
                                <br />
                                {comparativa(
                                  dataFechaFin[3],
                                  dataFechaInicio[3]
                                )}
                              </div>
                              <div className="w-full absolute top-[66%] md:top-[65%] p-0 md:p-1 text-center content-center">
                                Cuadriceps <br />
                                {comparativa(
                                  dataFechaFin[4],
                                  dataFechaInicio[4]
                                )}
                              </div>
                              <div className="w-full absolute top-[84%] md:top-[82%] p-0 md:p-1 text-center  content-center">
                                Gemelos
                                <br />
                                {comparativa(
                                  dataFechaFin[5],
                                  dataFechaInicio[5]
                                )}
                              </div>
                            </div>




                            <div className=" h-full w-100">
                              <div className="chart-container ">

                                <Bar

                                  plugins={[ChartDataLabels]}
                                  options={{
                                    layout: {
                                      padding: {
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        bottom: 0
                                      }
                                    },

                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {

                                      y: {
                                        display: false, // Hides labels and chart lines of the x-axis
                                        stacked: true,
                                        grid: {
                                          display: true,
                                        },
                                        border: {
                                          display: false,
                                        },
                                      },
                                      x: {
                                        display: true,
                                        grid: {
                                          display: true,
                                        },
                                        offset: false,
                                        beginAtZero: true,
                                        max: maximoRegla,
                                        stacked: true,


                                        ticks: {



                                          /*
                                          callback: function (value, index, values) {
                                            if (index % 2 === 0) {
                                              return value;
                                            }
                                            return null; // <- NOT ""
                                          },*/
                                          autoSkip: true,
                                          autoSkipPadding: 3,
                                          labelOffset: 0,
                                          crossAlign: 'near',
                                          align: 'start',
                                          padding: 0,
                                          beginAtZero: false,
                                          display: true, //cuando paso a true, los label no se tapan.
                                        },
                                        grid: {
                                          display: true,
                                          beginAtZero: false,
                                          color: '#232323',
                                        },
                                        border: {
                                          display: true,
                                          color: '#232323',
                                        },
                                      },
                                    },
                                    plugins: {
                                      tooltip: {

                                        xAlign: "left",
                                        enabled: true, // Disable tooltips
                                        /*
                                        filter: function (context) { // we don't need 'data'
                                          return context.raw <= 10 // i am displaying all values greater than 0. zero is filtered.
                                        },
                                        callbacks: {
                                        
                                          title: function (context) {
                                            return ''
                                          },
  
                                          label: function (context) {
                                            //console.log("/////////////////////////////////context")
                                            //console.log(context)
                                            //console.log(context.raw)
                                            if (context.raw > 10) {
                                              return (context.raw)
                                            }
  
                                          },
                                        },
  */
                                      },
                                      /*
                                      
                                      
                                      
                                      
                                        datalabels: {
                                        anchor: "start",
                                        align: "right",
                                        offset: 0,//-50
                                        color: "#fff",
                                        formatter: (val) => {
                                          return val + " cm";
                                        },
                                        padding: {
                                          left: 10,
   
                                        },
                                        margin: {
                                          right: 10,
   
                                        }
                                    
                                    },
   
   
                                    */
                                      datalabels: {
                                        anchor: "end",
                                        align: "left",
                                        offset: 0,
                                        color: "#fff",/*
                                            formatter: (val) => {
                                              if (val <= 10) {
                                                return '';//val + " cm"
                                              }
                                            },*/
                                        padding: {
                                          left: 10,

                                        },
                                        margin: {
                                          right: 10,

                                        }

                                        /* offset: 'center',
                                         clamp: true*/
                                      },
                                      legend: {
                                        display: false,
                                      },
                                    },
                                    indexAxis: "y",
                                  }}
                                  data={myData2}
                                />
                              </div>
                            </div>

                          </div>




                        </div>
                      </div>

                    </div>
                  </div>
                  <h1 className="mt-6 text-center lg:text-left">Plan Nutricional</h1>
                  <ul className="mt-1 text-center lg:text-left lg:ml-5 pb-6 lg:pb-0 fuente-lemon text-[0.79rem]">
                    <li className="mb-1.5">
                      <a
                        className="font-normal decoration-2 hover:decoration-[#f4d361] text-[#fff] hover:text-[#fff]  hover:cursor-pointer underline  underline-offset-4"
                        href="./pdf/El Cazador GYM - Plan Nutricional - Descenso de peso.pdf"
                        target="_blank">
                        Descenso de peso
                      </a>
                    </li>
                    <li className="mb-1.5">
                      <a
                        className="font-normal decoration-2 hover:decoration-[#f4d361] text-[#fff] hover:text-[#fff]  hover:cursor-pointer underline  underline-offset-4"
                        href="./pdf/El Cazador GYM - Plan Nutricional - Normocalorica.pdf"
                        target="_blank">
                        Normocalórica
                      </a>
                    </li>
                    <li className="mb-1.5">
                      <a
                        className="font-normal decoration-2 hover:decoration-[#f4d361] text-[#fff] hover:text-[#fff]  hover:cursor-pointer underline  underline-offset-4"
                        href="./pdf/El Cazador GYM - Plan Nutricional - Volumen.pdf"
                        target="_blank">
                        Volumen
                      </a>
                    </li>
                  </ul>


                </div>
              )}
            </>
          )}

          <footer className="footer bg-[#F6F7F8]  px-2 py-3 lg:px-8 lg:py-9  text-black dark:bg-[#040404] dark:text-[#ff1200] font-normal  bg-neutral text-neutral-content rounded-b-2xl ">
            <div className="flex flex-col-reverse lg:flex-row">
              <div className="text-center lg:text-left" >
                <div className=""></div>
                <p className="font-semibold dark:font-[10] pie_rights !text-stone-300">
                  © {new Date().getFullYear()}. Todos los derechos reservados.
                </p>
              </div>




              <div className="font-semibold  m-auto mb-3 lg:ml-auto lg:mz-0 lg:mr-0 lg:mb-0 lg:grid-cols-2 lg:grid ">

                <div className=" flex justify-center  pb-2 lg:pb-0">
                  <a
                    href="https://api.whatsapp.com/send/?phone=5491173649111&text=Hola,%20quiero%20hacer%20una%20pregunta..."
                    target="_blank">
                    <div className='flex text-left '>
                      <div className='pr-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ico-seguinos whatsapp" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                      </div>
                      <div className='leading-6 text-sm'>
                        <span class="">11 7364 9111</span>
                      </div>
                    </div>
                  </a>
                </div>


                <div className="">
                  <a
                    href="https://www.instagram.com/elcazadorgym/"
                    target="_blank">
                    <div className='flex text-left'>
                      <div className='pr-1 pt-0.5'>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="ico-seguinos instagram "
                          viewBox="0 0 448 512">
                          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                        </svg>
                      </div>
                      <div className='leading-6 text-sm'>
                        <span class="">ElCazadorGYM</span>
                      </div>
                    </div>
                  </a>
                </div>


              </div>
            </div>
          </footer>
          <ToastContainer
            autoClose={3000}
            position={toast.POSITION.BOTTOM_RIGHT}
          />
        </div >
      </div >
    </>
  );
};

export default Home;

{
  /*
  
  
           <Line

                          data={myData}
                          options={{
                            plugins: {
                              title: {
                                display: true,
                                text: "Periodo mes entre 6 al 9"
                              },
                              legend: {
                                display: true
                              }
                            }
                          }}
                        />
  
  */
}
