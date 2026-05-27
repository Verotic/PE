export function Header({ currentView, onNavigate, user, onLogout }) {
  return (
    <header className="app-header">
      <a className="brand" href="#inicio" onClick={() => onNavigate('home')}>
        <img
          src="/assets/images/logo-caduceus.png"
          alt="Logotipo do CACA"
          className="brand-logo"
          width="32"
          height="32"
        />
        <span className="brand-caca">CACA</span>
        <span className="brand-divider" />
        <span className="brand-full">CENTRO ACADEMICO CLINICO DOS ACORES</span>
      </a>

      <nav className="app-nav" aria-label="Navegacao principal">
        <button type="button" className={currentView === 'home' ? 'active' : ''} onClick={() => onNavigate('home')}>
          Inicio
        </button>
        <button type="button" className={currentView === 'events' ? 'active' : ''} onClick={() => onNavigate('events')}>
          Eventos
        </button>
        {user ? (
          <>
            <button type="button" className={currentView === 'profile' ? 'active' : ''} onClick={() => onNavigate('profile')}>
              Perfil
            </button>
            <button type="button" onClick={onLogout}>
              Sair
            </button>
          </>
        ) : (
          <>
            <button type="button" className={currentView === 'login' ? 'active' : ''} onClick={() => onNavigate('login')}>
              Login
            </button>
            <button type="button" className="nav-register" onClick={() => onNavigate('register')}>
              Registo
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
