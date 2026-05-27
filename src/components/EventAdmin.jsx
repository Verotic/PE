export function EventAdmin({ events, onCreate, onUpdate, onRemove }) {
  const editingEvent = null;

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const id = formData.get('id');
    const payload = {
      id: id ? Number(id) : undefined,
      name: formData.get('name'),
      description: formData.get('description'),
      date: formData.get('date'),
      hour: formData.get('hour'),
      local: formData.get('local'),
    };

    if (payload.id) {
      await onUpdate(payload);
    } else {
      await onCreate(payload);
    }

    form.reset();
  }

  function fillForm(event) {
    const form = document.getElementById('event-admin-form');
    form.elements.id.value = event.id;
    form.elements.name.value = event.name;
    form.elements.description.value = event.description;
    form.elements.date.value = event.date;
    form.elements.hour.value = event.hour;
    form.elements.local.value = event.local;
  }

  return (
    <section className="event-admin">
      <div className="admin-intro">
        <p className="eyebrow">CRUD migrado</p>
        <h1>Gestao de eventos</h1>
        <p>Funcionalidade migrada para React, mantendo armazenamento local no browser.</p>
      </div>

      <form id="event-admin-form" className="auth-form" onSubmit={handleSubmit}>
        <input type="hidden" name="id" defaultValue={editingEvent?.id || ''} />
        <label>
          Titulo
          <input type="text" name="name" required />
        </label>
        <label>
          Descricao
          <textarea name="description" rows="4" required />
        </label>
        <div className="form-row">
          <label>
            Data
            <input type="date" name="date" required />
          </label>
          <label>
            Hora
            <input type="time" name="hour" required />
          </label>
        </div>
        <label>
          Local
          <input type="text" name="local" required />
        </label>
        <button className="btn btn-primary" type="submit">Guardar evento</button>
      </form>

      <div className="event-list">
        {events.length === 0 ? (
          <p>Ainda nao existem eventos registados.</p>
        ) : (
          events.map((event) => (
            <article className="event-row" key={event.id}>
              <div>
                <strong>{event.name}</strong>
                <p>{event.date} as {event.hour} - {event.local}</p>
                <p>{event.description}</p>
              </div>
              <div className="row-actions">
                <button type="button" onClick={() => fillForm(event)}>Editar</button>
                <button type="button" className="danger" onClick={() => onRemove(event.id)}>Remover</button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
