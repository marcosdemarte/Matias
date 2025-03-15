import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import axios from 'axios';
//import jwt from 'jsonwebtoken';


//const secretKey = 'perrovolador'; // Debe coincidir con la clave secreta del backend

export const ProtectedRoute = () => {
    const { token, setToken } = useAuth();
    const [pasa, setPasa] = useState(null);
    const tokenNavedador = token;
    console.log("dame dni guardado en navegador");
    const dniNavegador = localStorage.getItem("dni");
    console.log(dniNavegador);
    //token: this is a test token

    useEffect(() => {
        const getKeyLogin = async (dni, tokenNavedador) => {
            if (!dniNavegador || !tokenNavedador) {
                setPasa(false);
                return;
            } else {
                try {
                    const res = await axios.get(
                        `${process.env.REACT_APP_URL_API}/usuario/keyLogin/${dni}/${tokenNavedador}`
                    );
                    if (res.status === 200) {
                        //const receivedToken = res.data.token;
                        //const decodedToken = jwt.verify(receivedToken, secretKey);
                        //console.log("entra")
                        //console.log(res.data)
                        //console.log(res.data[1].mensaje)
                        let tokenAPI = res.data[0][0].keyLogin;
                        //console.log("tokenAPI");
                        //console.log(tokenAPI);
                        if (tokenAPI === tokenNavedador) {//decodedToken.keyLogin === tokenNavedador
                            setPasa(true);
                        } else {
                            setPasa(false);
                        }
                    }
                    if (res.status === 201) {
                        setPasa(false);

                    }
                } catch (error) {
                    console.log(error);
                    setPasa(false);
                }
            }
        };
        getKeyLogin(dniNavegador, tokenNavedador);
    }, [dniNavegador, tokenNavedador]);//setToken

    if (pasa === null) {
        return <div>Cargando...</div>; // Puedes mostrar un spinner o mensaje de carga aquí
    }

    if (pasa) {
        return <Outlet />;
    } else {
        setToken();
        return <Navigate to={process.env.PUBLIC_URL + "/login"} />;
    }
};
