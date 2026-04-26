import React, { useState } from 'react';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <header style={{ backgroundColor: '#1a1a2e', color: 'white', padding: '1rem' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú principal"
          aria-expanded={isOpen}
          aria-haspopup="true"
          style={{ fontSize: '1.5rem', cursor: 'pointer', display: 'inline-block', background: 'none', border: 'none', color: 'white' }}
        >
          ☰
        </button>
        <div style={{ float: 'right', display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => console.log('notifications')}
            aria-label="Notificaciones, 3 sin leer"
            style={{ cursor: 'pointer', position: 'relative', background: 'none', border: 'none', color: 'white', fontSize: '1.2rem' }}
          >
            🔔
            <span aria-hidden="true" style={{ backgroundColor: 'red', borderRadius: '50%', padding: '0.1rem 0.4rem', fontSize: '0.7rem', position: 'absolute', top: '-8px', right: '-12px' }}>3</span>
          </button>
          <img
            src="https://randomuser.me/api/portraits/lego/1.jpg"
            alt="Avatar de usuario: María González"
            style={{ width: '35px', height: '35px', borderRadius: '50%' }}
          />
        </div>
      </header>

      {isOpen && (
        <nav
          aria-label="Menú de navegación"
          style={{ backgroundColor: '#16213e', color: 'white', padding: '1rem', position: 'absolute', width: '200px', zIndex: 1000 }}
        >
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li><button style={{ padding: '0.5rem', cursor: 'pointer', background: 'none', border: 'none', color: 'white', width: '100%', textAlign: 'left' }} onClick={() => console.log('dashboard')}>Dashboard</button></li>
            <li><button style={{ padding: '0.5rem', cursor: 'pointer', background: 'none', border: 'none', color: 'white', width: '100%', textAlign: 'left' }} onClick={() => console.log('analytics')}>Estadísticas</button></li>
            <li><button style={{ padding: '0.5rem', cursor: 'pointer', background: 'none', border: 'none', color: 'white', width: '100%', textAlign: 'left' }} onClick={() => console.log('settings')}>Configuración</button></li>
            <li><button style={{ padding: '0.5rem', cursor: 'pointer', background: 'none', border: 'none', color: 'white', width: '100%', textAlign: 'left' }} onClick={() => console.log('logout')}>Cerrar sesión</button></li>
          </ul>
        </nav>
      )}

      <main style={{ padding: '1.5rem' }}>
        <h1 style={{ position: 'absolute', left: '-9999px' }}>Dashboard Principal</h1>

        <section aria-label="Tarjetas de métricas" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          <div
            style={{ backgroundColor: '#2d2d2d', padding: '1.5rem', borderRadius: '10px', color: '#ffffff' }}
            aria-label="Usuarios totales: 12,345, incremento del 15 porciento"
          >
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>12,345</div>
            <div>Usuarios Totales</div>
            <div aria-hidden="true" style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#4ecdc4' }}>↑ 15%</div>
          </div>
          <div
            style={{ backgroundColor: '#1e3a3a', padding: '1.5rem', borderRadius: '10px', color: '#ffffff' }}
            aria-label="Ingresos: 87 mil 234 dólares, incremento del 8 porciento"
          >
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>$87,234</div>
            <div>Ingresos</div>
            <div aria-hidden="true" style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#ccffcc' }}>↑ 8%</div>
          </div>
          <div
            style={{ backgroundColor: '#3a3a1a', padding: '1.5rem', borderRadius: '10px', color: '#ffffff' }}
            aria-label="Órdenes: 3,456, disminución del 2 porciento"
          >
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>3,456</div>
            <div>Órdenes</div>
            <div aria-hidden="true" style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#ffae42' }}>↓ 2%</div>
          </div>
          <div
            style={{ backgroundColor: '#2d2d2d', padding: '1.5rem', borderRadius: '10px', color: '#ffffff' }}
            aria-label="Tasa de conversión: 89.2 porciento, incremento del 5 porciento"
          >
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>89.2%</div>
            <div>Tasa Conversión</div>
            <div aria-hidden="true" style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#4ecdc4' }}>↑ 5%</div>
          </div>
        </section>

        <section aria-label="Búsqueda y filtros" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <label htmlFor="search-input" style={{ position: 'absolute', left: '-9999px' }}>Buscar</label>
            <input
              id="search-input"
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Campo de búsqueda"
              style={{ padding: '0.75rem', flex: 1, border: '1px solid #555', borderRadius: '5px', backgroundColor: '#fff', color: '#000' }}
            />
            <button
              onClick={() => console.log('search:', searchTerm)}
              aria-label="Ejecutar búsqueda"
              style={{ backgroundColor: '#005c5c', border: 'none', padding: '0.75rem 2rem', borderRadius: '5px', color: '#ffffff', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Buscar
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="category-select" style={{ display: 'block', marginBottom: '0.25rem', color: '#000', fontWeight: '500' }}>Categoría</label>
              <select id="category-select" aria-label="Filtrar por categoría" style={{ padding: '0.75rem', border: '1px solid #555', borderRadius: '5px', width: '100%', backgroundColor: '#fff', color: '#000' }}>
                <option>Todas las categorías</option>
                <option>Electrónicos</option>
                <option>Ropa</option>
                <option>Hogar</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="order-select" style={{ display: 'block', marginBottom: '0.25rem', color: '#000', fontWeight: '500' }}>Ordenar por</label>
              <select id="order-select" aria-label="Ordenar resultados" style={{ padding: '0.75rem', border: '1px solid #555', borderRadius: '5px', width: '100%', backgroundColor: '#fff', color: '#000' }}>
                <option>Ordenar por fecha</option>
                <option>Ordenar por nombre</option>
                <option>Ordenar por precio</option>
              </select>
            </div>
          </div>
        </section>

        <section aria-labelledby="sales-chart-title" style={{ backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #ccc' }}>
          <h2 id="sales-chart-title" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#000' }}>Ventas Mensuales</h2>
          <div
            role="img"
            aria-label="Gráfico de barras: Ene 45%, Feb 65%, Mar 80%, Abr 55%, May 70%, Jun 85%, Jul 60%"
            style={{ height: '300px', backgroundColor: '#e0e0e0', borderRadius: '8px', position: 'relative' }}
          >
            <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: '10%', width: '8%', height: '45%', backgroundColor: '#b03a3a' }}></div>
            <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: '22%', width: '8%', height: '65%', backgroundColor: '#2d6a6a' }}></div>
            <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: '34%', width: '8%', height: '80%', backgroundColor: '#b0851a' }}></div>
            <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: '46%', width: '8%', height: '55%', backgroundColor: '#b03a3a' }}></div>
            <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: '58%', width: '8%', height: '70%', backgroundColor: '#2d6a6a' }}></div>
            <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: '70%', width: '8%', height: '85%', backgroundColor: '#b0851a' }}></div>
            <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: '82%', width: '8%', height: '60%', backgroundColor: '#b03a3a' }}></div>
          </div>
        </section>

        <section aria-labelledby="orders-table-title">
          <h2 id="orders-table-title" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#000' }}>Últimas Órdenes</h2>
          <table
            aria-label="Tabla de últimas órdenes"
            style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', color: '#000' }}
          >
            <thead>
              <tr style={{ backgroundColor: '#e0e0e0' }}>
                <th scope="col" style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #999', color: '#000' }}>ID</th>
                <th scope="col" style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #999', color: '#000' }}>Cliente</th>
                <th scope="col" style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #999', color: '#000' }}>Producto</th>
                <th scope="col" style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #999', color: '#000' }}>Total</th>
                <th scope="col" style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #999', color: '#000' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '1rem' }}>#1001</td>
                <td style={{ padding: '1rem' }}>Juan Pérez</td>
                <td style={{ padding: '1rem' }}>Laptop Pro</td>
                <td style={{ padding: '1rem' }}>$1,299</td>
                <td style={{ padding: '1rem', color: '#006400', fontWeight: 'bold' }} aria-label="Estado: Completado">Completado</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '1rem' }}>#1002</td>
                <td style={{ padding: '1rem' }}>María García</td>
                <td style={{ padding: '1rem' }}>Teléfono X</td>
                <td style={{ padding: '1rem' }}>$899</td>
                <td style={{ padding: '1rem', color: '#b08500', fontWeight: 'bold' }} aria-label="Estado: Pendiente">Pendiente</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '1rem' }}>#1003</td>
                <td style={{ padding: '1rem' }}>Carlos López</td>
                <td style={{ padding: '1rem' }}>Audífonos</td>
                <td style={{ padding: '1rem' }}>$149</td>
                <td style={{ padding: '1rem', color: '#8b0000', fontWeight: 'bold' }} aria-label="Estado: Cancelado">Cancelado</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '1rem' }}>#1004</td>
                <td style={{ padding: '1rem' }}>Ana Martínez</td>
                <td style={{ padding: '1rem' }}>Monitor 4K</td>
                <td style={{ padding: '1rem' }}>$549</td>
                <td style={{ padding: '1rem', color: '#006400', fontWeight: 'bold' }} aria-label="Estado: Completado">Completado</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section aria-labelledby="contact-form-title" style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#1a1a2e', borderRadius: '8px', color: 'white' }}>
          <h2 id="contact-form-title" style={{ marginBottom: '1rem', color: '#ffffff' }}>Formulario de Contacto</h2>
          <form onSubmit={(e) => { e.preventDefault(); console.log('submitted'); }} aria-label="Formulario de contacto">
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="full-name" style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff' }}>Nombre Completo</label>
              <input
                id="full-name"
                type="text"
                aria-required="true"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: '1px solid #555', backgroundColor: '#fff', color: '#000' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff' }}>Correo Electrónico</label>
              <input
                id="email"
                type="email"
                aria-required="true"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: '1px solid #555', backgroundColor: '#fff', color: '#000' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff' }}>Mensaje</label>
              <textarea
                id="message"
                rows={3}
                aria-required="true"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: '1px solid #555', backgroundColor: '#fff', color: '#000' }}
              ></textarea>
            </div>
            <button
              type="submit"
              aria-label="Enviar formulario"
              style={{ backgroundColor: '#005c5c', border: 'none', padding: '0.75rem 2rem', borderRadius: '5px', color: '#ffffff', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}
            >
              Enviar
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default App;