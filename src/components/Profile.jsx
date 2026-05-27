export function Profile({ user, onSave }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await onSave({
      name: formData.get('name'),
      email: formData.get('email'),
    });
  }

  if (!user) {
    return (
      <section className="auth-panel">
        <h1>Perfil protegido</h1>
        <p>Faz login para consultares os dados do utilizador autenticado.</p>
      </section>
    );
  }

  return (
    <section className="auth-panel">
      <div>
        <p className="eyebrow">Perfil</p>
        <h1>{user.name}</h1>
        <p>Role: {user.role}</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Nome
          <input type="text" name="name" defaultValue={user.name} required />
        </label>
        <label>
          Email
          <input type="email" name="email" defaultValue={user.email} required />
        </label>
        <button className="btn btn-primary" type="submit">Guardar perfil</button>
      </form>
    </section>
  );
}
