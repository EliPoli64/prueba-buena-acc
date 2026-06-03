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
  gradientBg: string;
}

const colorThemes = {
  nonAccessible: {
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    dark: '#4b5563',
    darkLight: '#6b7280',
    light: '#f3f4f6',
    lightBorder: '#d1d5db',
    white: '#ffffff',

    cardText: '#ffffff',
    buttonText: '#ffffff',
    cardShadow: '0 4px 12px rgba(0,0,0,0.08)'
  },

  accessible: {
    primary: '#1d4ed8',
    primaryDark: '#1e40af',
    secondary: '#6d28d9',
    success: '#047857',
    warning: '#b45309',
    danger: '#b91c1c',

    dark: '#111827',
    darkLight: '#1f2937',

    light: '#ffffff',
    lightBorder: '#374151',
    white: '#ffffff',

    cardText: '#ffffff',
    buttonText: '#ffffff',

    cardShadow: '0 8px 20px rgba(0,0,0,0.35)'
  }
};


const App: React.FC = () => {
  const [isAccessible, setIsAccessible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<number>(1);
  const [notification, setNotification] = useState<string>('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  
  const colors = isAccessible
    ? colorThemes.accessible
    : colorThemes.nonAccessible;

  const showNotification = (message: string): void => {
    setNotification(message);
    setTimeout((): void => setNotification(""), 5000);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!isAccessible) {
      showNotification('Formulario enviado correctamente');
      e.currentTarget.reset();
      return;
    }
    
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
      value: '12345',
      label: 'Usuarios Totales',
      change: '↑ 15%',
      changeType: 'increase',
      ariaLabel: 'Usuarios totales: 12345, incremento del 15 porciento',
      bgColor: '#3c3e8f',
      gradientBg: 'linear-gradient(135deg, #3c3d8f 0%, #4b2490 100%)'
    },
    {
      id: 'revenue',
      value: '$87234',
      label: 'Ingresos',
      change: '↑ 8%',
      changeType: 'increase',
      ariaLabel: 'Ingresos: 87 mil 234 dólares, incremento del 8 porciento',
      bgColor: '#0d7b57',
      gradientBg: 'linear-gradient(135deg, #0c7351 0%, #015a3e 100%)'
    },
    {
      id: 'orders',
      value: '3,456',
      label: 'Órdenes',
      change: '↓ 2%',
      changeType: 'decrease',
      ariaLabel: 'Órdenes: 3,456, disminución del 2 porciento',
      bgColor: '#b24929',
      gradientBg: 'linear-gradient(135deg, #b42a00 0%, #852001 100%)'
    },
    {
      id: 'conversion',
      value: '89.2%',
      label: 'Tasa Conversión',
      change: '↑ 5%',
      changeType: 'increase',
      ariaLabel: 'Tasa de conversión: 89.2 porciento, incremento del 5 porciento',
      bgColor: '#4f368a',
      gradientBg: 'linear-gradient(135deg, #4f368a 0%, #402867 100%)'
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

  // no accesible
  const NonAccessibleInterface = () => (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', backgroundColor: colors.light, minHeight: '100vh' }}>
      <div id="notification-status" style={{ position: 'absolute', left: '-9999px' }}>
        {notification}
      </div>

      <header style={{ backgroundColor: colors.white, borderBottom: `1px solid ${colors.lightBorder}`, padding: '1rem 1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setIsOpen(!isOpen)} style={{ fontSize: '1.5rem', cursor: 'pointer', background: 'none', border: 'none', color: colors.dark, padding: '0.5rem', borderRadius: '8px', transition: 'all 0.2s ease'}}>
              ☰
            </button>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.dark, margin: 0 }}>Dashboard</h1>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button onClick={() => showNotification('Tienes 3 notificaciones sin leer')} style={{ cursor: 'pointer', position: 'relative', background: 'none', border: 'none', fontSize: '1.2rem', padding: '0.5rem', borderRadius: '8px', transition: 'all 0.2s ease' }}>
              🔔
              <span style={{ backgroundColor: colors.danger, borderRadius: '50%', padding: '0.1rem 0.4rem', fontSize: '0.65rem', position: 'absolute', top: '-4px', right: '-8px', color: colors.white, fontWeight: '600' }}>3</span>
            </button>
            <img src="https://randomuser.me/api/portraits/lego/1.jpg" style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', border: `2px solid ${colors.primary}` }} alt="avatar" />
          </div>
        </div>
      </header>

      <div style={{ position: 'relative' }}>
        {isOpen && (
          <nav style={{ backgroundColor: colors.white, borderRight: `1px solid ${colors.lightBorder}`, padding: '1rem', position: 'absolute', width: '240px', zIndex: 1000, boxShadow: '2px 0 8px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button style={{ padding: '0.75rem 1rem', cursor: 'pointer', borderBottom: `1px solid ${colors.lightBorder}`, background: 'none', border: 'none', textAlign: 'left', color: colors.dark, borderRadius: '6px', transition: 'all 0.2s ease', fontWeight: '500' }}>Dashboard</button>
              <button style={{ padding: '0.75rem 1rem', cursor: 'pointer', borderBottom: `1px solid ${colors.lightBorder}`, background: 'none', border: 'none', textAlign: 'left', color: colors.dark, borderRadius: '6px', transition: 'all 0.2s ease', fontWeight: '500' }}>Estadísticas</button>
              <button style={{ padding: '0.75rem 1rem', cursor: 'pointer', borderBottom: `1px solid ${colors.lightBorder}`, background: 'none', border: 'none', textAlign: 'left', color: colors.dark, borderRadius: '6px', transition: 'all 0.2s ease', fontWeight: '500' }}>Configuración</button>
              <button style={{ padding: '0.75rem 1rem', cursor: 'pointer', background: 'none', border: 'none', textAlign: 'left', color: colors.danger, borderRadius: '6px', transition: 'all 0.2s ease', fontWeight: '500' }}>Cerrar Sesión</button>
            </div>
          </nav>
        )}
      </div>

      <main style={{ padding: '2rem 1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
        {notification && (
          <div style={{ backgroundColor: colors.primary, color: colors.white, padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 4px 12px rgba(99,102,241,0.15)', animation: 'slideIn 0.3s ease' }}>
            {notification}
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: `2px solid ${colors.lightBorder}`, paddingBottom: '1rem' }}>
          <button onClick={() => setActiveTab(1)} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer', backgroundColor: activeTab === 1 ? colors.primary : 'transparent', color: activeTab === 1 ? colors.white : colors.darkLight, border: 'none', borderRadius: '6px 6px 0 0', fontWeight: '600', transition: 'all 0.2s ease' }}>
            Información
          </button>
          <button onClick={() => setActiveTab(2)} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer', backgroundColor: activeTab === 2 ? colors.primary : 'transparent', color: activeTab === 2 ? colors.white : colors.darkLight, border: 'none', borderRadius: '6px 6px 0 0', fontWeight: '600', transition: 'all 0.2s ease' }}>
            Configuración
          </button>
        </div>

        <div id="tab-panel-1" style={{ display: activeTab === 1 ? 'block' : 'none' }}>
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {metrics.map((metric) => (
              <div key={metric.id} onClick={() => handleMetricClick(metric.id)} style={{ background: metric.gradientBg, padding: '1.75rem', borderRadius: '12px', color: colors.white, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', transform: 'translateY(0)' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>{metric.value}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: '600', opacity: 0.9 }}>{metric.label}</div>
                <div style={{ fontSize: '0.85rem', marginTop: '1rem', opacity: 0.8 }}>{metric.change}</div>
              </div>
            ))}
          </section>
        </div>

        <div id="tab-panel-2" style={{ display: activeTab === 2 ? 'block' : 'none' }}>
          <div style={{ backgroundColor: colors.white, padding: '2rem', borderRadius: '12px', textAlign: 'center', color: colors.darkLight, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            Panel de configuración (contenido ejemplo)
          </div>
        </div>

        <section style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <input type="text" placeholder="Buscar..." value={searchTerm} onChange={handleSearchChange} style={{ padding: '0.75rem 1rem', flex: 1, border: `1px solid ${colors.lightBorder}`, borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit' }} />
            <button onClick={handleSearchClick} style={{ backgroundColor: colors.primary, border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', color: colors.white, cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s ease' }}>
              Buscar
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <select style={{ padding: '0.75rem 1rem', border: `1px solid ${colors.lightBorder}`, borderRadius: '8px', flex: 1, fontSize: '0.95rem', fontFamily: 'inherit' }}>
              <option>Todas las categorías</option>
              <option>Electrónicos</option>
              <option>Ropa</option>
              <option>Hogar</option>
            </select>
            <select style={{ padding: '0.75rem 1rem', border: `1px solid ${colors.lightBorder}`, borderRadius: '8px', flex: 1, fontSize: '0.95rem', fontFamily: 'inherit' }}>
              <option>Ordenar por fecha</option>
              <option>Ordenar por nombre</option>
              <option>Ordenar por precio</option>
            </select>
          </div>
        </section>

        <section style={{ backgroundColor: colors.white, padding: '2rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: colors.dark }}>Ventas Mensuales</h2>
          <div style={{ height: '300px', backgroundColor: colors.light, borderRadius: '8px', position: 'relative' }}>
            {[
              { left: '10%', height: '45%', color: '#e5746f' },
              { left: '22%', height: '65%', color: '#63b0b9' },
              { left: '34%', height: '80%', color: '#e8c567' },
              { left: '46%', height: '55%', color: '#e5746f' },
              { left: '58%', height: '70%', color: '#63b0b9' },
              { left: '70%', height: '85%', color: '#e8c567' },
              { left: '82%', height: '60%', color: '#e5746f' }
            ].map((bar, idx) => (
              <div key={idx} style={{ position: 'absolute', bottom: 0, left: bar.left, width: '8%', height: bar.height, backgroundColor: bar.color, borderRadius: '4px 4px 0 0' }}></div>
            ))}
          </div>
        </section>

        <section style={{ backgroundColor: colors.white, padding: '2rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: colors.dark }}>Últimas Órdenes</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: colors.light, borderBottom: `2px solid ${colors.lightBorder}` }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: colors.dark }}>ID</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: colors.dark }}>Cliente</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: colors.dark }}>Producto</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: colors.dark }}>Total</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: colors.dark }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: `1px solid ${colors.lightBorder}`, cursor: 'pointer', transition: 'all 0.2s ease' }} onClick={() => handleRowClick('#1001')}>
                <td style={{ padding: '1rem', color: colors.dark }}>#1001</td>
                <td style={{ padding: '1rem', color: colors.dark }}>Juan Pérez</td>
                <td style={{ padding: '1rem', color: colors.dark }}>Laptop Pro</td>
                <td style={{ padding: '1rem', color: colors.dark }}>$1,299</td>
                <td style={{ padding: '1rem', color: colors.success, fontWeight: '600' }}>Completado</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${colors.lightBorder}`, cursor: 'pointer', transition: 'all 0.2s ease' }} onClick={() => handleRowClick('#1002')}>
                <td style={{ padding: '1rem', color: colors.dark }}>#1002</td>
                <td style={{ padding: '1rem', color: colors.dark }}>María García</td>
                <td style={{ padding: '1rem', color: colors.dark }}>Teléfono X</td>
                <td style={{ padding: '1rem', color: colors.dark }}>$899</td>
                <td style={{ padding: '1rem', color: colors.warning, fontWeight: '600' }}>Pendiente</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${colors.lightBorder}`, cursor: 'pointer', transition: 'all 0.2s ease' }} onClick={() => handleRowClick('#1003')}>
                <td style={{ padding: '1rem', color: colors.dark }}>#1003</td>
                <td style={{ padding: '1rem', color: colors.dark }}>Carlos López</td>
                <td style={{ padding: '1rem', color: colors.dark }}>Audífonos</td>
                <td style={{ padding: '1rem', color: colors.dark }}>$149</td>
                <td style={{ padding: '1rem', color: colors.danger, fontWeight: '600' }}>Cancelado</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${colors.lightBorder}`, cursor: 'pointer', transition: 'all 0.2s ease' }} onClick={() => handleRowClick('#1004')}>
                <td style={{ padding: '1rem', color: colors.dark }}>#1004</td>
                <td style={{ padding: '1rem', color: colors.dark }}>Ana Martínez</td>
                <td style={{ padding: '1rem', color: colors.dark }}>Monitor 4K</td>
                <td style={{ padding: '1rem', color: colors.dark }}>$549</td>
                <td style={{ padding: '1rem', color: colors.success, fontWeight: '600' }}>Completado</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section style={{ marginTop: '2rem', padding: '2rem', backgroundColor: colors.dark, borderRadius: '12px', color: colors.white, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '1.5rem', color: colors.white, fontSize: '1.25rem', fontWeight: '700' }}>Formulario de Contacto</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Nombre Completo</label>
              <input type="text" name="full-name" style={{ width: '97%', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', fontSize: '0.95rem', fontFamily: 'inherit', backgroundColor: colors.light, color: colors.dark }} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Correo Electrónico</label>
              <input type="email" name="email" style={{ width: '97%', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', fontSize: '0.95rem', fontFamily: 'inherit', backgroundColor: colors.light, color: colors.dark }} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Mensaje</label>
              <textarea name="message" rows={4} style={{ width: '97%', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', fontSize: '0.95rem', fontFamily: 'inherit', backgroundColor: colors.light, color: colors.dark }} ></textarea>
            </div>
            <button type="submit" style={{ backgroundColor: colors.primary, border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', color: colors.white, cursor: 'pointer', width: '100%', fontWeight: '600', transition: 'all 0.2s ease' }}>
              Enviar
            </button>
          </form>
        </section>
      </main>
    </div>
  );

  // accesible
  const AccessibleInterface = () => (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', backgroundColor: colors.light, minHeight: '100vh' }}>
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

      <header style={{ backgroundColor: colors.white, borderBottom: `1px solid ${colors.lightBorder}`, padding: '1rem 1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              id="menu-button"
              onClick={handleMenuToggle}
              aria-label="Menú principal"
              aria-expanded={isOpen}
              aria-haspopup={true}
              aria-controls="menu-panel"
              style={{ fontSize: '1.5rem', cursor: 'pointer', background: 'none', border: 'none', color: colors.dark, padding: '0.5rem', borderRadius: '8px', transition: 'all 0.2s ease' }}
            >
              ☰
            </button>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.dark, margin: 0 }}>Dashboard</h1>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button
              onClick={handleNotificationClick}
              aria-label="Notificaciones, 3 sin leer"
              style={{ cursor: 'pointer', position: 'relative', background: 'none', border: 'none', color: colors.dark, fontSize: '1.2rem', padding: '0.5rem', borderRadius: '8px', transition: 'all 0.2s ease' }}
            >
              🔔
              <span aria-hidden={true} style={{ backgroundColor: colors.danger, borderRadius: '50%', padding: '0.1rem 0.4rem', fontSize: '0.65rem', position: 'absolute', top: '-4px', right: '-8px', color: colors.white, fontWeight: '600' }}>3</span>
            </button>
            <img
              src="https://randomuser.me/api/portraits/lego/1.jpg"
              alt="Avatar de usuario: María González"
              style={{ width: '40px', height: '40px', borderRadius: '50%', border: `2px solid ${colors.primary}` }}
            />
          </div>
        </div>
      </header>

      {isOpen && (
        <nav
          id="menu-panel"
          aria-label="Menú de navegación"
          aria-labelledby="menu-button"
          style={{ backgroundColor: colors.white, borderRight: `1px solid ${colors.lightBorder}`, padding: '1rem', position: 'absolute', width: '240px', zIndex: 1000, boxShadow: '2px 0 8px rgba(0,0,0,0.1)' }}
        >
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>
              <button onClick={() => console.log('dashboard')} style={{ padding: '0.75rem 1rem', cursor: 'pointer', background: 'none', border: 'none', color: colors.dark, width: '100%', textAlign: 'left', borderRadius: '6px', transition: 'all 0.2s ease', fontWeight: '500', borderBottom: `1px solid ${colors.lightBorder}` }}>
                Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => console.log('analytics')} style={{ padding: '0.75rem 1rem', cursor: 'pointer', background: 'none', border: 'none', color: colors.dark, width: '100%', textAlign: 'left', borderRadius: '6px', transition: 'all 0.2s ease', fontWeight: '500', borderBottom: `1px solid ${colors.lightBorder}` }}>
                Estadísticas
              </button>
            </li>
            <li>
              <button onClick={() => console.log('settings')} style={{ padding: '0.75rem 1rem', cursor: 'pointer', background: 'none', border: 'none', color: colors.dark, width: '100%', textAlign: 'left', borderRadius: '6px', transition: 'all 0.2s ease', fontWeight: '500', borderBottom: `1px solid ${colors.lightBorder}` }}>
                Configuración
              </button>
            </li>
            <li>
              <button onClick={() => console.log('logout')} style={{ padding: '0.75rem 1rem', cursor: 'pointer', background: 'none', border: 'none', color: colors.danger, width: '100%', textAlign: 'left', borderRadius: '6px', transition: 'all 0.2s ease', fontWeight: '500' }}>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </nav>
      )}

      <main style={{ padding: '2rem 1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ position: 'absolute', left: '-9999px' }}>Dashboard Principal</h1>

        {notification && (
          <div style={{ backgroundColor: colors.primary, color: colors.white, padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 4px 12px rgba(99,102,241,0.15)', animation: 'slideIn 0.3s ease' }}>
            {notification}
          </div>
        )}

        <div role="tablist" aria-label="Navegación por pestañas" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: `2px solid ${colors.lightBorder}`, paddingBottom: '1rem' }}>
          <button
            role="tab"
            id="tab-1"
            aria-selected={activeTab === 1}
            aria-controls="tab-panel-1"
            onClick={() => handleTabChange(1)}
            style={{ padding: '0.75rem 1.5rem', cursor: 'pointer', backgroundColor: activeTab === 1 ? colors.primary : 'transparent', color: activeTab === 1 ? colors.white : colors.dark, border: 'none', borderRadius: '6px 6px 0 0', fontWeight: '600', transition: 'all 0.2s ease' }}
          >
            Información
          </button>
          <button
            role="tab"
            id="tab-2"
            aria-selected={activeTab === 2}
            aria-controls="tab-panel-2"
            onClick={() => handleTabChange(2)}
            style={{ padding: '0.75rem 1.5rem', cursor: 'pointer', backgroundColor: activeTab === 2 ? colors.primary : 'transparent', color: activeTab === 2 ? colors.white : colors.dark, border: 'none', borderRadius: '6px 6px 0 0', fontWeight: '600', transition: 'all 0.2s ease' }}
          >
            Configuración
          </button>
        </div>

        <div id="tab-panel-1" role="tabpanel" aria-labelledby="tab-1" hidden={activeTab !== 1}>
          <section aria-label="Tarjetas de métricas" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {metrics.map((metric: MetricData) => (
              <button
                key={metric.id}
                onClick={() => handleMetricClick(metric.id)}
                aria-label={metric.ariaLabel}
                style={{ background: metric.gradientBg, padding: '1.75rem', borderRadius: '12px', color: colors.white, border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', transform: 'translateY(0)', fontFamily: 'inherit' }}
              >
                <div aria-hidden={true} style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>{metric.value}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: '600', opacity: 0.9 }}>{metric.label}</div>
                <div aria-hidden={true} style={{ fontSize: '0.85rem', marginTop: '1rem', opacity: 0.8 }}>
                  {metric.change}
                </div>
              </button>
            ))}
          </section>
        </div>

        <div id="tab-panel-2" role="tabpanel" aria-labelledby="tab-2" hidden={activeTab !== 2}>
          <div style={{ backgroundColor: colors.white, padding: '2rem', borderRadius: '12px', textAlign: 'center', color: colors.dark, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            Panel de configuración (contenido ejemplo)
          </div>
        </div>

        <section aria-label="Búsqueda y filtros" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <label htmlFor="search-input" style={{ position: 'absolute', left: '-9999px' }}>Buscar</label>
            <input
              id="search-input"
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Campo de búsqueda"
              aria-describedby="search-error"
              style={{ padding: '0.75rem 1rem', flex: 1, border: `1px solid ${colors.lightBorder}`, borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit', backgroundColor: colors.white, color: colors.dark }}
            />
            <button
              onClick={handleSearchClick}
              aria-label="Ejecutar búsqueda"
              style={{ backgroundColor: colors.primary, border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', color: colors.white, cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s ease' }}
            >
              Buscar
            </button>
          </div>
          <div id="search-error" role="status" aria-live="polite" style={{ fontSize: '0.8rem', color: colors.dark }}></div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="category-select" style={{ display: 'block', marginBottom: '0.25rem', color: colors.dark, fontWeight: '600', fontSize: '0.95rem' }}>Categoría</label>
              <select id="category-select" aria-label="Filtrar por categoría" style={{ padding: '0.75rem 1rem', border: `2px solid ${colors.lightBorder}`, borderRadius: '8px', width: '100%', backgroundColor: colors.white, color: colors.dark, fontFamily: 'inherit', fontSize: '0.95rem', fontWeight: '500' }}>
                <option>Todas las categorías</option>
                <option>Electrónicos</option>
                <option>Ropa</option>
                <option>Hogar</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="order-select" style={{ display: 'block', marginBottom: '0.25rem', color: colors.dark, fontWeight: '600', fontSize: '0.95rem' }}>Ordenar por</label>
              <select id="order-select" aria-label="Ordenar resultados" style={{ padding: '0.75rem 1rem', border: `2px solid ${colors.lightBorder}`, borderRadius: '8px', width: '100%', backgroundColor: colors.white, color: colors.dark, fontFamily: 'inherit', fontSize: '0.95rem', fontWeight: '500' }}>
                <option>Ordenar por fecha</option>
                <option>Ordenar por nombre</option>
                <option>Ordenar por precio</option>
              </select>
            </div>
          </div>
        </section>

        <section aria-labelledby="sales-chart-title" style={{ backgroundColor: colors.white, padding: '2rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 id="sales-chart-title" style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: colors.dark }}>Ventas Mensuales</h2>
          <div
            role="img"
            aria-label="Gráfico de barras: Ene 45%, Feb 65%, Mar 80%, Abr 55%, May 70%, Jun 85%, Jul 60%"
            style={{ height: '300px', backgroundColor: colors.light, borderRadius: '8px', position: 'relative' }}
          >
            {[
              { left: '10%', height: '45%', color: '#e5746f' },
              { left: '22%', height: '65%', color: '#63b0b9' },
              { left: '34%', height: '80%', color: '#e8c567' },
              { left: '46%', height: '55%', color: '#e5746f' },
              { left: '58%', height: '70%', color: '#63b0b9' },
              { left: '70%', height: '85%', color: '#e8c567' },
              { left: '82%', height: '60%', color: '#e5746f' }
            ].map((bar, idx) => (
              <div key={idx} aria-hidden={true} style={{ position: 'absolute', bottom: 0, left: bar.left, width: '8%', height: bar.height, backgroundColor: bar.color, borderRadius: '4px 4px 0 0' }}></div>
            ))}
          </div>
        </section>

        <section aria-labelledby="orders-table-title" style={{ backgroundColor: colors.white, padding: '2rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 id="orders-table-title" style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: colors.dark }}>Últimas Órdenes</h2>
          <table aria-label="Tabla de últimas órdenes" style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: colors.white, color: colors.dark }}>
            <thead>
              <tr style={{ backgroundColor: colors.light, borderBottom: `2px solid ${colors.lightBorder}` }}>
                <th scope="col" style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: colors.dark }}>ID</th>
                <th scope="col" style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: colors.dark }}>Cliente</th>
                <th scope="col" style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: colors.dark }}>Producto</th>
                <th scope="col" style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: colors.dark }}>Total</th>
                <th scope="col" style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: colors.dark }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: `1px solid ${colors.lightBorder}`, cursor: 'pointer', transition: 'all 0.2s ease' }} onClick={() => handleRowClick('#1001')}>
                <td style={{ padding: '1rem', color: colors.dark }}>#1001</td>
                <td style={{ padding: '1rem', color: colors.dark }}>Juan Pérez</td>
                <td style={{ padding: '1rem', color: colors.dark }}>Laptop Pro</td>
                <td style={{ padding: '1rem', color: colors.dark }}>$1,299</td>
                <td style={{ padding: '1rem', color: colors.success, fontWeight: '600' }} aria-label="Estado: Completado">Completado</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${colors.lightBorder}`, cursor: 'pointer', transition: 'all 0.2s ease' }} onClick={() => handleRowClick('#1002')}>
                <td style={{ padding: '1rem', color: colors.dark }}>#1002</td>
                <td style={{ padding: '1rem', color: colors.dark }}>María García</td>
                <td style={{ padding: '1rem', color: colors.dark }}>Teléfono X</td>
                <td style={{ padding: '1rem', color: colors.dark }}>$899</td>
                <td style={{ padding: '1rem', color: colors.warning, fontWeight: '600' }} aria-label="Estado: Pendiente">Pendiente</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${colors.lightBorder}`, cursor: 'pointer', transition: 'all 0.2s ease' }} onClick={() => handleRowClick('#1003')}>
                <td style={{ padding: '1rem', color: colors.dark }}>#1003</td>
                <td style={{ padding: '1rem', color: colors.dark }}>Carlos López</td>
                <td style={{ padding: '1rem', color: colors.dark }}>Audífonos</td>
                <td style={{ padding: '1rem', color: colors.dark }}>$149</td>
                <td style={{ padding: '1rem', color: colors.danger, fontWeight: '600' }} aria-label="Estado: Cancelado">Cancelado</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${colors.lightBorder}`, cursor: 'pointer', transition: 'all 0.2s ease' }} onClick={() => handleRowClick('#1004')}>
                <td style={{ padding: '1rem', color: colors.dark }}>#1004</td>
                <td style={{ padding: '1rem', color: colors.dark }}>Ana Martínez</td>
                <td style={{ padding: '1rem', color: colors.dark }}>Monitor 4K</td>
                <td style={{ padding: '1rem', color: colors.dark }}>$549</td>
                <td style={{ padding: '1rem', color: colors.success, fontWeight: '600' }} aria-label="Estado: Completado">Completado</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section aria-labelledby="contact-form-title" style={{ marginTop: '2rem', padding: '2rem', backgroundColor: colors.dark, borderRadius: '12px', color: colors.white, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h2 id="contact-form-title" style={{ marginBottom: '1.5rem', color: colors.white, fontSize: '1.25rem', fontWeight: '700' }}>Formulario de Contacto</h2>
          <form onSubmit={handleSubmit} aria-label="Formulario de contacto">
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="full-name" style={{ display: 'block', marginBottom: '0.5rem', color: colors.white, fontWeight: '600', fontSize: '0.95rem' }}>Nombre Completo <span aria-hidden={true}>*</span></label>
              <input
                id="full-name"
                name="full-name"
                type="text"
                aria-required={true}
                aria-invalid={!!formErrors.name}
                aria-describedby={formErrors.name ? 'name-error' : undefined}
                style={{ width: '97%', padding: '0.75rem 1rem', borderRadius: '8px', border: formErrors.name ? `2px solid ${colors.danger}` : `2px solid transparent`, backgroundColor: colors.white, color: colors.dark, fontFamily: 'inherit', fontSize: '0.95rem' }}
              />
              {formErrors.name && (
                <div id="name-error" role="alert" style={{ color: colors.danger, marginTop: '0.25rem', fontSize: '0.8rem' }}>
                  {formErrors.name}
                </div>
              )}
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: colors.white, fontWeight: '600', fontSize: '0.95rem' }}>Correo Electrónico <span aria-hidden={true}>*</span></label>
              <input
                id="email"
                name="email"
                type="email"
                aria-required={true}
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? 'email-error' : undefined}
                style={{ width: '97%', padding: '0.75rem 1rem', borderRadius: '8px', border: formErrors.email ? `2px solid ${colors.danger}` : `2px solid transparent`, backgroundColor: colors.white, color: colors.dark, fontFamily: 'inherit', fontSize: '0.95rem' }}
              />
              {formErrors.email && (
                <div id="email-error" role="alert" style={{ color: colors.danger, marginTop: '0.25rem', fontSize: '0.8rem' }}>
                  {formErrors.email}
                </div>
              )}
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: colors.white, fontWeight: '600', fontSize: '0.95rem' }}>Mensaje <span aria-hidden={true}>*</span></label>
              <textarea
                id="message"
                name="message"
                rows={4}
                aria-required={true}
                aria-invalid={!!formErrors.message}
                aria-describedby={formErrors.message ? 'message-error' : undefined}
                style={{ width: '97%', padding: '0.75rem 1rem', borderRadius: '8px', border: formErrors.message ? `2px solid ${colors.danger}` : `2px solid transparent`, backgroundColor: colors.white, color: colors.dark, fontFamily: 'inherit', fontSize: '0.95rem' }}
              ></textarea>
              {formErrors.message && (
                <div id="message-error" role="alert" style={{ color: colors.danger, marginTop: '0.25rem', fontSize: '0.8rem' }}>
                  {formErrors.message}
                </div>
              )}
            </div>
            <button
              type="submit"
              aria-label="Enviar formulario"
              style={{ backgroundColor: colors.primary, border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', color: colors.white, cursor: 'pointer', width: '100%', fontWeight: '600', transition: 'all 0.2s ease' }}
            >
              Enviar
            </button>
          </form>
        </section>
      </main>
    </div>
  );

  return (
    <>
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 10000,
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: '0.75rem 1.25rem',
        borderRadius: '50px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        border: `2px solid ${colors.primary}`,
        fontFamily: 'inherit'
      }}>
        <span style={{ fontSize: '0.875rem', fontWeight: '600', color: colors.dark }}>
          {isAccessible ? '✓ Accesible' : '○ No Accesible'}
        </span>
        <button
          onClick={() => setIsAccessible(!isAccessible)}
          style={{
            backgroundColor: isAccessible ? colors.primary : colors.danger,
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '24px',
            color: colors.white,
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.875rem',
            transition: 'all 0.3s ease',
            fontFamily: 'inherit'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          Cambiar
        </button>
      </div>

      {isAccessible ? <AccessibleInterface /> : <NonAccessibleInterface />}
    </>
  );
};

export default App;