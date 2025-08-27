
import React, { useRef, useState } from 'react';

const Test2 = () => {
    function generarNumeroAleatorio() {
        //return Math.floor(Math.random() * 3) - 1;
        //del 0 al 3
        //0 cactus chico
        //1 cactus grande 
        //2 telarodidactiuvo 
        //3 gato
         return Math.floor(Math.random()*4);
    }

    const numero = generarNumeroAleatorio();
    console.log(numero);

    return (<div>hola mundo test2.tsx</div>);
};

export default Test2;



