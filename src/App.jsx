import { useEffect, useState } from 'react';
import { Header } from './components/Header.jsx';
import { LandingPage } from './components/LandingPage.jsx';
import { LoginForm, RegisterForm } from './components/AuthForms.jsx';
import { Profile } from './components/Profile.jsx';
import { EventAdmin } from './components/EventAdmin.jsx';
import { apiClient, clearToken, getToken, setToken } from './services/apiClient.js';
import { eventStore } from './services/eventStore.js';

export function App() {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  function navigateTo(view) {
    setError('');
    setNotice('');
    setCurrentView(view);
  }

  async function loadEvents() {
    const storedEvents = await eventStore.list();
    setEvents(storedEvents);
  }

  async function loadProfile() {
    if (!getToken()) return;

    try {
      const data = await apiClient.getProfile();
      setUser(data.user);
    } catch {
      clearToken();
      setUser(null);
    }
  }

  useEffect(() => {
    loadEvents();
    loadProfile();
  }, []);

  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 420);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  async function runAction(action, successMessage) {
    setError('');
    setNotice('');

    try {
      await action();
      setNotice(successMessage);
    } catch (actionError) {
      setError(actionError.message);
    }
  }

  async function handleRegister(payload) {
    await runAction(async () => {
      const data = await apiClient.register(payload);
      setToken(data.token);
      setUser(data.user);
      navigateTo('profile');
    }, 'Conta criada com sucesso.');
  }

  async function handleLogin(payload) {
    await runAction(async () => {
      const data = await apiClient.login(payload);
      setToken(data.token);
      setUser(data.user);
      navigateTo('profile');
    }, 'Login efetuado com sucesso.');
  }

  async function handleProfileSave(payload) {
    await runAction(async () => {
      const data = await apiClient.updateProfile(payload);
      setUser(data.user);
    }, 'Perfil atualizado.');
  }

  function handleLogout() {
    clearToken();
    setUser(null);
    navigateTo('home');
    setNotice('Sessao terminada.');
  }

  async function handleCreateEvent(payload) {
    await eventStore.create(payload);
    await loadEvents();
    setNotice('Evento guardado.');
  }

  async function handleUpdateEvent(payload) {
    await eventStore.update(payload);
    await loadEvents();
    setNotice('Evento atualizado.');
  }

  async function handleRemoveEvent(id) {
    await eventStore.remove(id);
    await loadEvents();
    setNotice('Evento removido.');
  }

  return (
    <div className="react-app">
      <Header currentView={currentView} onNavigate={navigateTo} user={user} onLogout={handleLogout} />

      {(notice || error) && (
        <div className={`app-message ${error ? 'error' : 'success'}`} role="status">
          {error || notice}
        </div>
      )}

      <main>
        {currentView === 'home' && <LandingPage events={events} onNavigate={navigateTo} />}
        {currentView === 'login' && <LoginForm onLogin={handleLogin} onNavigate={navigateTo} />}
        {currentView === 'register' && <RegisterForm onRegister={handleRegister} onNavigate={navigateTo} />}
        {currentView === 'profile' && <Profile user={user} onSave={handleProfileSave} />}
        {currentView === 'events' && (
          <EventAdmin events={events} onCreate={handleCreateEvent} onUpdate={handleUpdateEvent} onRemove={handleRemoveEvent} />
        )}
      </main>

      <footer className="site-footer react-footer">
        <div className="footer-links">
          <div className="footer-col">
            <h3>Sobre o CACA</h3>
            <a href="#missao">Sabe o que e o CACA?</a>
            <a href="#investigacao">Apoio a minha investigacao</a>
            <a href="#oportunidades">Oportunidades</a>
            <a href="#noticias">Noticias e eventos</a>
            <a href="#contactos">Contactos</a>
          </div>
          <div className="footer-col">
            <h3>Informacao legal</h3>
            <a href="#inicio">Politica de privacidade</a>
            <a href="#inicio">Termos e condicoes</a>
            <a href="#inicio">Acessibilidade</a>
          </div>
          <div className="footer-col">
            <h3>Newsletter</h3>
            <p>Subscreva para receber as ultimas noticias e eventos.</p>
            <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
              <input type="text" placeholder="O seu nome" aria-label="Nome para newsletter" />
              <input type="email" placeholder="O seu e-mail" aria-label="Email para newsletter" />
              <button type="submit" className="btn btn-dark">Subscrever</button>
            </form>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-brands">
            <span>SERVICO REGIONAL DE SAUDE</span>
            <span>FCT ACORES</span>
            <span>GOVERNO DOS ACORES</span>
          </div>
          <div className="footer-copy">
            <p>&copy; 2026 Centro Academico Clinico dos Acores (CACA). Todos os direitos reservados.</p>
            <p>Universidade dos Acores - Tecnologias Web, 2025/2026</p>
          </div>
        </div>
      </footer>

      <button
        type="button"
        className={`react-scroll-top ${showScrollTop ? 'visible' : ''}`}
        aria-label="Voltar ao topo"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span className="material-symbols-outlined" aria-hidden="true">arrow_upward</span>
      </button>
    </div>
  );
}
