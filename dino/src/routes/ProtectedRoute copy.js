/*import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import axios from "axios";
import { useEffect, useState } from "react";
*/


export const ProtectedRoute = () => {
    const { token } = useAuth();
    var [pasa, setPasa] = useState(false);

    const dni = 31966896;
    console.log("dame toke guardado en navegador")
    console.log(token)
    const tokenNavedador = token
    console.log("dame dni guardado en navegador");

    //consulta API, dame keyLogin
    const getKeyLogin = async (dni, tokenNavedador) => {
        console.log("getKeyLogin");

        try {
            const res = await axios.get(
                process.env.REACT_APP_URL_API + "/usuario/keyLogin/" + dni + "/" + tokenNavedador
            );
            if (res.status === 200) {
                console.log("status 200")
                console.log(res.data);
                console.log(res.data[1].mensaje)
                let keyLogin = res.data;
                console.log(keyLogin)

                setPasa(true)




                // If not authenticated, redirect to the login page
                return <Navigate to={process.env.PUBLIC_URL + "/login"} />;


            }
            if (res.status == 201) {
                // If authenticated, render the child routes
                return <Outlet />;

            }
        } catch (error) {
            console.log(error)
            //toast.error(error);
        }





    };




    getKeyLogin(dni, tokenNavedador);

    /*
        useEffect(() => {
            if (pasa === true) {
                return <Outlet />
            } else {
                // If not authenticated, redirect to the login page
    
            }
        }, [getKeyLogin]);
    
    */
    /*
        // Check if the user is authenticated
        if (!token) {
            // If not authenticated, redirect to the login page
            return <Navigate to={process.env.PUBLIC_URL + "/login"} />;
        }
    
        // If authenticated, render the child routes
        return <Outlet />;
    
    */
};

/*




    const { token } = useAuth();

    // Check if the user is authenticated
    if (!token) {
        // If not authenticated, redirect to the login page
        return <Navigate to={process.env.PUBLIC_URL + "/login"} />;
    }

    // If authenticated, render the child routes
    return <Outlet />;
    
    */