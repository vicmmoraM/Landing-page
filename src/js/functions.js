"use strict";


/**
 * Realiza una petición fetch a la URL proporcionada y normaliza la
 * respuesta en un objeto con la forma { success: boolean, body: any, message?: string }.
 *
 * Este helper envuelve fetch y captura errores de red o respuestas HTTP
 * no exitosas para que el consumidor reciba siempre un objeto uniforme.
 * (Documento generado con ayuda de cliente IAG)
 *
 * @param {string} url - URL del recurso JSON a obtener.
 * @returns {Promise<{success: boolean, body: any, message?: string}>} Promise que resuelve
 *          con success=true y body con los datos cuando la petición es correcta,
 *          o success=false y body con el mensaje de error si falla.
 */
let fetchProducts =  (url) => {

    return fetch(url)
        .then(response => {

            // Verificar si la respuesta no es exitosa
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            return response.json();

        })
        .then(data => {

            // Respuesta exitosa
            return {
                success: true,
                body: data
            };

        })
        .catch(error => {

            // Error en la solicitud
            return {
                success: false,
                body: error.message
            };

        });
}

export { fetchProducts }