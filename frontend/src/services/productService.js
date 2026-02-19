// src/services/productService.js

export const fetchProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');

    // Manejo detallado de errores HTTP (Requisito del Ejercicio 2)
    if (!response.ok) {
      if (response.status >= 400 && response.status < 500) {
        throw new Error(`Client Error (${response.status}): Petición inválida o recurso no encontrado.`);
      } else if (response.status >= 500) {
        throw new Error(`Server Error (${response.status}): La API externa está fallando.`);
      }
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // Captura errores de red (ej. sin internet)
    console.error("Fallo al obtener productos:", error.message);
    throw new Error(error.message || "Network error: No se pudo conectar a FakeStore API.");
  }
};