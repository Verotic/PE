export function LoginForm({ onLogin, onNavigate }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await onLogin({
      email: formData.get('email'),
      password: formData.get('password'),
    });
  }

  return (
    <section className="auth-panel">
      <div>
        <p className="eyebrow">Area reservada</p>
        <h1>Entrar na plataforma</h1>
        <p>Acede ao teu perfil e as areas protegidas da aplicacao CACA.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" name="email" autoComplete="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" autoComplete="current-password" required />
        </label>
        {/* Tarefa da Iulia: substituir a validacao nativa por mensagens acessiveis personalizadas. */}
        <button className="btn btn-primary" type="submit">Entrar</button>
      </form>

      <button className="link-button" type="button" onClick={() => onNavigate('register')}>
        Ainda nao tens conta? Criar registo
      </button>
    </section>
  );
}

export function RegisterForm({ onRegister, onNavigate }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await onRegister({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    });
  }

  return (
    <section className="auth-panel">
      <div>
        <p className="eyebrow">Novo utilizador</p>
        <h1>Criar conta</h1>
        <p>Regista-te para testar a API de utilizadores, autenticacao e perfil.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Nome
          <input type="text" name="name" autoComplete="name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" autoComplete="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" autoComplete="new-password" minLength="8" required />
        </label>
        {/* Tarefa da Iulia: adicionar confirmacao de password e feedback acessivel antes do submit. */}
        <button className="btn btn-primary" type="submit">Criar conta</button>
      </form>

      <button className="link-button" type="button" onClick={() => onNavigate('login')}>
        Ja tens conta? Entrar
      </button>
    </section>
  );
}
