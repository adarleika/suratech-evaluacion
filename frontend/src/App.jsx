import Products from './components/Products';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para consumir la API de Strapi
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/projects');
        if (!response.ok) throw new Error('Error al conectar con Strapi');
        
        const json = await response.json();
        setProjects(json.data); // Strapi v4 devuelve los datos dentro de un objeto "data"
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="portfolio-container">
      <header className="header">
        <h1>Mi Portafolio Creativo</h1>
        <p>Ingeniera en Informática | Desarrolladora Front-End</p>
      </header>
      
      <main>
        {loading && <p className="status">Cargando proyectos...</p>}
        {error && <p className="error">Hubo un problema: {error}</p>}
        
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              <h2>{project.attributes.title}</h2>
              <p>{project.attributes.description}</p>
              <div className="tech-stack">
                <strong>Tecnologías:</strong> {project.attributes.technologies}
              </div>
              {project.attributes.githubUrl && (
                <a href={project.attributes.githubUrl} target="_blank" rel="noreferrer" className="btn">
                  Ver en GitHub
                </a>
              )}
            </article>
          ))}
        </div>

        <Products />
      
      </main>
    </div>
  );
}

export default App;