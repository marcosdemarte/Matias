import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import axios from 'axios';

export const ProtectedRoute = () => {
    const { token } = useAuth();
    const { setToken } = useAuth();
    const [pasa, setPasa] = useState(null);
    const tokenNavedador = token;
    console.log("dame dni guardado en navegador");
    const dniNavegador = localStorage.getItem("dni");
    console.log(dniNavegador)

    useEffect(() => {
        const getKeyLogin = async (dni, tokenNavedador) => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_URL_API}/usuario/keyLogin/${dni}/${tokenNavedador}`
                );

                if (res.status === 200) {
                    setPasa(true);
                } else if (res.status === 201) {
                    setPasa(false);
                }
            } catch (error) {
                console.log(error);
                setPasa(false);
            }
        };

        getKeyLogin(dniNavegador, tokenNavedador);
    }, [dniNavegador, tokenNavedador]);

    if (pasa === null) {
        return <div>Loading...</div>; // Puedes mostrar un spinner o mensaje de carga aquí
    }

    if (pasa) {
        return <Outlet />;
    } else {

        setToken();
        return <Navigate to={process.env.PUBLIC_URL + "/login"} />;
    }
};
