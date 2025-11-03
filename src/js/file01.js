"use strict";
import { fetchProducts } from "./functions.js";

/**
 * Muestra el toast interactivo (lo hace visible en pantallas md+).
 * Generado con ayuda de cliente IAG (documentación automática).
 *
 * @returns {void}
 */
const showToast = () => {
    const toast = document.getElementById("toast-interactive");
    if (toast) {
        // Make the toast visible on all screen sizes when requested
        toast.classList.add("block");
    }
};

/**
 * Adjunta el evento click al botón demo para abrir un vídeo en nueva pestaña.
 *
 * @returns {void}
 */
const showVideo = () => {
    const demo = document.getElementById("demo");
    if (demo) {
        demo.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        });
    }
};

/**
 * Obtiene productos remotos y renderiza los primeros 6 en el contenedor
 * con id `products-container`.
 *
 * Llama a `fetchProducts(url)` y espera un objeto con la forma:
 * { success: boolean, body: Array, message?: string }
 *
 * @returns {Promise<void>} Promise que se resuelve cuando termina el renderizado.
 */
const renderProducts = () => {
    return fetchProducts('https://data-dawm.github.io/datum/reseller/products.json')
        .then(result => {
            if (result && result.success) {
                const container = document.getElementById('products-container');
                if (!container) return;
                container.innerHTML = '';

                                const products = (result.body || []).slice(0, 6);
                                                // build each product using a placeholder template then replaceAll
                                                products.forEach(product => {
                                                        const imgUrl = product.imgUrl || (product.images && product.images[0]) || 'https://placehold.co/600x400?text=No+Image';
                                                        const titleText = product.title || product.name || 'Producto';
                                                        const shortTitle = titleText.length > 20 ? titleText.substring(0, 20) + '...' : titleText;
                                                        const priceText = product.price || '';
                                                        const priceHTML = priceText ? `$${priceText}` : '';
                                                        const productURL = product.productURL || product.url || product.link || '#';
                                                        const categoryId = product.category_id || product.categoryId || '';

                                                        let productHTML = `
                <div class="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
                        <img
                                class="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg object-cover transition-transform duration-300 hover:scale-[1.03]"
                                src="[PRODUCT.IMGURL]" alt="[PRODUCT.TITLE]">
                        <h3 class="h-6 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                [PRODUCT.PRICE]
                        </h3>
                        <div class="w-full text-sm text-gray-700 dark:text-gray-300 break-words leading-snug">[PRODUCT.TITLE]</div>
                        <div class="space-y-2">
                                <a href="[PRODUCT.PRODUCTURL]" target="_blank" rel="noopener noreferrer"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full inline-block">
                                        Ver en Amazon
                                </a>
                                <div class="hidden"><span class="category-id">[PRODUCT.CATEGORY_ID]</span></div>
                        </div>
                </div>`;

                                                        // replace placeholders with actual values
                                                        productHTML = productHTML.replaceAll('[PRODUCT.IMGURL]', imgUrl);
                                                        productHTML = productHTML.replaceAll('[PRODUCT.TITLE]', shortTitle);
                                                        productHTML = productHTML.replaceAll('[PRODUCT.PRICE]', priceHTML);
                                                        productHTML = productHTML.replaceAll('[PRODUCT.PRODUCTURL]', productURL);
                                                        productHTML = productHTML.replaceAll('[PRODUCT.CATEGORY_ID]', categoryId);

                                                        // append to container
                                                        container.innerHTML += productHTML;
                                                });
            } else {
                const msg = (result && (result.message || result.error)) || 'Error fetching products';
                alert(`Error: ${msg}`);
                console.warn('fetchProducts returned success=false or invalid result', result);
            }
        })
        .catch(err => console.error('Error fetching products:', err));
};


// ejecuta funciones al cargar el módulo
(async () => {
    showToast();
    showVideo();
    await renderProducts();
})();

