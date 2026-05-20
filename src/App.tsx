import React, { useState, type FormEvent, type ChangeEvent } from 'react';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface MetricData {
  id: string;
  value: string;
  label: string;
  change: string;
  changeType: 'increase' | 'decrease';
  ariaLabel: string;
  bgColor: string;
}

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<number>(1);
  const [notification, setNotification] = useState<string>('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const showNotification = (message: string): void => {
    setNotification(message);
    setTimeout((): void => setNotification(""), 5000);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const errors: FormErrors = {};
    const formData = new FormData(e.currentTarget);
    
    const name = formData.get('full-name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    if (!name?.trim()) errors.name = 'El nombre es obligatorio';
    if (!email?.trim()) errors.email = 'El correo es obligatorio';
    if (!message?.trim()) errors.message = 'El mensaje es obligatorio';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showNotification('Error: Complete todos los campos obligatorios');
    } else {
      setFormErrors({});
      showNotification('Formulario enviado correctamente');
      e.currentTarget.reset();
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const metrics: MetricData[] = [
    {
      id: 'users',
      value: '12,345',
      label: 'Usuarios Totales',
      change: '↑ 15%',
      changeType: 'increase',
      ariaLabel: 'Usuarios totales: 12,345, incremento del 15 porciento',
      bgColor: '#2d2d2d'
    },
    {
      id: 'revenue',
      value: '$87,234',
      label: 'Ingresos',
      change: '↑ 8%',
      changeType: 'increase',
      ariaLabel: 'Ingresos: 87 mil 234 dólares, incremento del 8 porciento',
      bgColor: '#1e3a3a'
    },
    {
      id: 'orders',
      value: '3,456',
      label: 'Órdenes',
      change: '↓ 2%',
      changeType: 'decrease',
      ariaLabel: 'Órdenes: 3,456, disminución del 2 porciento',
      bgColor: '#3a3a1a'
    },
    {
      id: 'conversion',
      value: '89.2%',
      label: 'Tasa Conversión',
      change: '↑ 5%',
      changeType: 'increase',
      ariaLabel: 'Tasa de conversión: 89.2 porciento, incremento del 5 porciento',
      bgColor: '#2d2d2d'
    }
  ];

  const handleMetricClick = (metricId: string): void => {
    console.log(`Metric clicked: ${metricId}`);
  };

  const handleMenuToggle = (): void => {
    setIsOpen(!isOpen);
  };

  const handleTabChange = (tabNumber: number): void => {
    setActiveTab(tabNumber);
  };

  const handleNotificationClick = (): void => {
    showNotification('Tienes 3 notificaciones sin leer');
  };

  const handleSearchClick = (): void => {
    console.log('search:', searchTerm);
  };

  const handleRowClick = (rowId: string): void => {
    console.log(`row clicked: ${rowId}`);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <div
        role="status"
        aria-live="polite"
        aria-atomic={true}
        style={{ position: 'absolute', left: '-9999px' }}
      >
        {notification}
      </div>

      <div
        role="alert"
        aria-live="assertive"
        style={{ position: 'absolute', left: '-9999px' }}
      >
        {Object.keys(formErrors).length > 0 && 'Hay errores en el formulario'}
      </div>

      <header style={{ backgroundColor: '#1a1a2e', color: 'white', padding: '1rem' }}>
        <button
          id="menu-button"
          onClick={handleMenuToggle}
          aria-label="Menú principal"
          aria-expanded={isOpen}
          aria-haspopup={true}
          aria-controls="menu-panel"
          style={{ fontSize: '1.5rem', cursor: 'pointer', display: 'inline-block', background: 'none', border: 'none', color: 'white' }}
        >
          ☰
        </button>
        <div style={{ float: 'right', display: 'flex', gap: '1rem' }}>
          <button
            onClick={handleNotificationClick}
            aria-label="Notificaciones, 3 sin leer"
            style={{ cursor: 'pointer', position: 'relative', background: 'none', border: 'none', color: 'white', fontSize: '1.2rem' }}
          >
            🔔
            <span aria-hidden={true} style={{ backgroundColor: 'red', borderRadius: '50%', padding: '0.1rem 0.4rem', fontSize: '0.7rem', position: 'absolute', top: '-8px', right: '-12px' }}>3</span>
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
          id="menu-panel"
          aria-label="Menú de navegación"
          aria-labelledby="menu-button"
          style={{ backgroundColor: '#16213e', color: 'white', padding: '1rem', position: 'absolute', width: '200px', zIndex: 1000 }}
        >
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <button 
                onClick={() => console.log('dashboard')} 
                style={{ padding: '0.5rem', cursor: 'pointer', background: 'none', border: 'none', color: 'white', width: '100%', textAlign: 'left' }}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button 
                onClick={() => console.log('analytics')} 
                style={{ padding: '0.5rem', cursor: 'pointer', background: 'none', border: 'none', color: 'white', width: '100%', textAlign: 'left' }}
              >
                Estadísticas
              </button>
            </li>
            <li>
              <button 
                onClick={() => console.log('settings')} 
                style={{ padding: '0.5rem', cursor: 'pointer', background: 'none', border: 'none', color: 'white', width: '100%', textAlign: 'left' }}
              >
                Configuración
              </button>
            </li>
            <li>
              <button 
                onClick={() => console.log('logout')} 
                style={{ padding: '0.5rem', cursor: 'pointer', background: 'none', border: 'none', color: 'white', width: '100%', textAlign: 'left' }}
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </nav>
      )}

      <main style={{ padding: '1.5rem' }}>
        <h1 style={{ position: 'absolute', left: '-9999px' }}>Dashboard Principal</h1>

        <div 
          role="tablist" 
          aria-label="Navegación por pestañas" 
          style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', borderBottom: '2px solid #ddd' }}
        >
          <button
            role="tab"
            id="tab-1"
            aria-selected={activeTab === 1}
            aria-controls="tab-panel-1"
            onClick={() => handleTabChange(1)}
            style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: activeTab === 1 ? '#4ecdc4' : 'transparent', color: activeTab === 1 ? 'white' : '#333', border: 'none', borderRadius: '5px 5px 0 0' }}
          >
            Información
          </button>
          <button
            role="tab"
            id="tab-2"
            aria-selected={activeTab === 2}
            aria-controls="tab-panel-2"
            onClick={() => handleTabChange(2)}
            style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: activeTab === 2 ? '#4ecdc4' : 'transparent', color: activeTab === 2 ? 'white' : '#333', border: 'none', borderRadius: '5px 5px 0 0' }}
          >
            Configuración
          </button>
        </div>

        <div
          id="tab-panel-1"
          role="tabpanel"
          aria-labelledby="tab-1"
          hidden={activeTab !== 1}
        >
          <section aria-label="Tarjetas de métricas" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            {metrics.map((metric: MetricData) => (
              <button
                key={metric.id}
                onClick={() => handleMetricClick(metric.id)}
                aria-label={metric.ariaLabel}
                style={{ backgroundColor: metric.bgColor, padding: '1.5rem', borderRadius: '10px', color: '#ffffff', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
              >
                <div aria-hidden={true} style={{ fontSize: '2rem', fontWeight: 'bold' }}>{metric.value}</div>
                <div>{metric.label}</div>
                <div aria-hidden={true} style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: metric.changeType === 'increase' ? '#4ecdc4' : '#ffae42' }}>
                  {metric.change}
                </div>
              </button>
            ))}
          </section>
        </div>

        <div
          id="tab-panel-2"
          role="tabpanel"
          aria-labelledby="tab-2"
          hidden={activeTab !== 2}
        >
          <div style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '8px', textAlign: 'center', color: '#666' }}>
            Panel de configuración (contenido ejemplo)
          </div>
        </div>

        <section aria-label="Búsqueda y filtros" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <label htmlFor="search-input" style={{ position: 'absolute', left: '-9999px' }}>Buscar</label>
            <input
              id="search-input"
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Campo de búsqueda"
              aria-describedby="search-error"
              style={{ padding: '0.75rem', flex: 1, border: '1px solid #555', borderRadius: '5px', backgroundColor: '#fff', color: '#000' }}
            />
            <button
              onClick={handleSearchClick}
              aria-label="Ejecutar búsqueda"
              style={{ backgroundColor: '#005c5c', border: 'none', padding: '0.75rem 2rem', borderRadius: '5px', color: '#ffffff', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Buscar
            </button>
          </div>
          <div id="search-error" role="status" aria-live="polite" style={{ fontSize: '0.8rem', color: '#666' }}></div>

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
            <div aria-hidden={true} style={{ position: 'absolute', bottom: 0, left: '10%', width: '8%', height: '45%', backgroundColor: '#b03a3a' }}></div>
            <div aria-hidden={true} style={{ position: 'absolute', bottom: 0, left: '22%', width: '8%', height: '65%', backgroundColor: '#2d6a6a' }}></div>
            <div aria-hidden={true} style={{ position: 'absolute', bottom: 0, left: '34%', width: '8%', height: '80%', backgroundColor: '#b0851a' }}></div>
            <div aria-hidden={true} style={{ position: 'absolute', bottom: 0, left: '46%', width: '8%', height: '55%', backgroundColor: '#b03a3a' }}></div>
            <div aria-hidden={true} style={{ position: 'absolute', bottom: 0, left: '58%', width: '8%', height: '70%', backgroundColor: '#2d6a6a' }}></div>
            <div aria-hidden={true} style={{ position: 'absolute', bottom: 0, left: '70%', width: '8%', height: '85%', backgroundColor: '#b0851a' }}></div>
            <div aria-hidden={true} style={{ position: 'absolute', bottom: 0, left: '82%', width: '8%', height: '60%', backgroundColor: '#b03a3a' }}></div>
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
              <tr style={{ borderBottom: '1px solid #ccc' }} onClick={() => handleRowClick('#1001')}>
                <td style={{ padding: '1rem' }}>#1001</td>
                <td style={{ padding: '1rem' }}>Juan Pérez</td>
                <td style={{ padding: '1rem' }}>Laptop Pro</td>
                <td style={{ padding: '1rem' }}>$1,299</td>
                <td style={{ padding: '1rem', color: '#006400', fontWeight: 'bold' }} aria-label="Estado: Completado">Completado</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ccc' }} onClick={() => handleRowClick('#1002')}>
                <td style={{ padding: '1rem' }}>#1002</td>
                <td style={{ padding: '1rem' }}>María García</td>
                <td style={{ padding: '1rem' }}>Teléfono X</td>
                <td style={{ padding: '1rem' }}>$899</td>
                <td style={{ padding: '1rem', color: '#b08500', fontWeight: 'bold' }} aria-label="Estado: Pendiente">Pendiente</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ccc' }} onClick={() => handleRowClick('#1003')}>
                <td style={{ padding: '1rem' }}>#1003</td>
                <td style={{ padding: '1rem' }}>Carlos López</td>
                <td style={{ padding: '1rem' }}>Audífonos</td>
                <td style={{ padding: '1rem' }}>$149</td>
                <td style={{ padding: '1rem', color: '#8b0000', fontWeight: 'bold' }} aria-label="Estado: Cancelado">Cancelado</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ccc' }} onClick={() => handleRowClick('#1004')}>
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
          <form onSubmit={handleSubmit} aria-label="Formulario de contacto">
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="full-name" style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff' }}>Nombre Completo <span aria-hidden={true}>*</span></label>
              <input
                id="full-name"
                name="full-name"
                type="text"
                aria-required={true}
                aria-invalid={!!formErrors.name}
                aria-describedby={formErrors.name ? 'name-error' : undefined}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: formErrors.name ? '2px solid #ff6b6b' : '1px solid #555', backgroundColor: '#fff', color: '#000' }}
              />
              {formErrors.name && (
                <div id="name-error" role="alert" style={{ color: '#ff6b6b', marginTop: '0.25rem', fontSize: '0.8rem' }}>
                  {formErrors.name}
                </div>
              )}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff' }}>Correo Electrónico <span aria-hidden={true}>*</span></label>
              <input
                id="email"
                name="email"
                type="email"
                aria-required={true}
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? 'email-error' : undefined}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: formErrors.email ? '2px solid #ff6b6b' : '1px solid #555', backgroundColor: '#fff', color: '#000' }}
              />
              {formErrors.email && (
                <div id="email-error" role="alert" style={{ color: '#ff6b6b', marginTop: '0.25rem', fontSize: '0.8rem' }}>
                  {formErrors.email}
                </div>
              )}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff' }}>Mensaje <span aria-hidden={true}>*</span></label>
              <textarea
                id="message"
                name="message"
                rows={3}
                aria-required={true}
                aria-invalid={!!formErrors.message}
                aria-describedby={formErrors.message ? 'message-error' : undefined}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: formErrors.message ? '2px solid #ff6b6b' : '1px solid #555', backgroundColor: '#fff', color: '#000' }}
              ></textarea>
              {formErrors.message && (
                <div id="message-error" role="alert" style={{ color: '#ff6b6b', marginTop: '0.25rem', fontSize: '0.8rem' }}>
                  {formErrors.message}
                </div>
              )}
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