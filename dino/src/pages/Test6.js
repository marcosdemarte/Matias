import { Colors } from 'chart.js';
import React from 'react';
import { useForm } from 'react-hook-form';

export const Test6 = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <>
            <div class="background-image5"></div>
            <div class="content5 ">

                <div class=" fondidi">
                    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                        <div className="form-col">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                {...register("nombre", { required: "El nombre es requerido" })}
                                id="nombre"
                                name="nombre"
                            />
                            {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
                        </div>
                        <div className="form-col">
                            <label htmlFor="email">Email</label>
                            <input
                                {...register("email", {
                                    required: "El email es requerido",
                                    pattern: {
                                        value: /^[^@]+@[^@]+\.[a-z]{2,}$/,
                                        message: "Email no válido",
                                    },
                                })}
                                id="email"
                                name="email"
                            />
                            {errors.email && <span className="error-message">{errors.email.message}</span>}
                        </div>
                        <div className="form-col">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                {...register("telefono", { required: "El teléfono es requerido" })}
                                id="telefono"
                                name="telefono"
                            />
                            {errors.telefono && <span className="error-message">{errors.telefono.message}</span>}
                        </div>
                        <div className="form-col">
                            <label htmlFor="direccion">Dirección</label>
                            <input
                                {...register("direccion", { required: "La dirección es requerida" })}
                                id="direccion"
                                name="direccion"
                            />
                            {errors.direccion && <span className="error-message">{errors.direccion.message}</span>}
                        </div>
                        <button type="submit" className="submit-button">Enviar</button>
                    </form>
                </div >
            </div>

        </>

    )
}
