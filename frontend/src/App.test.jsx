import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Portfolio App Component', () => {
  it('renders the main portfolio header successfully', () => {
    render(<App />);
    
    // Busca el texto exacto en el documento
    const headerElement = screen.getByText(/Mi Portafolio Creativo/i);
    
    // Verifica que el elemento exista
    expect(headerElement).toBeDefined();
  });
});