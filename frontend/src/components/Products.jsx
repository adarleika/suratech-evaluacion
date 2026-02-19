// src/components/Products.jsx
import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/productService';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <p className="status">Cargando catálogo externo...</p>;
  if (error) return <p className="error">Error en el catálogo: {error}</p>;

  return (
    <section style={{ marginTop: '60px', borderTop: '2px solid #ddd', paddingTop: '40px' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>
        Catálogo de Productos (FakeStore API)
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, maxWidth: '800px', margin: '0 auto' }}>
        {products.map((product) => (
          <li 
            key={product.id} 
            style={{ background: '#fff', padding: '15px', marginBottom: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            <strong>{product.title}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}