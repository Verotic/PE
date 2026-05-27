const STORAGE_KEY = 'caca_events';

function readEvents() {
  const rawEvents = localStorage.getItem(STORAGE_KEY);
  return rawEvents ? JSON.parse(rawEvents) : [];
}

function writeEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export const eventStore = {
  async list() {
    return readEvents();
  },

  async create(event) {
    const events = readEvents();
    const nextEvent = {
      ...event,
      id: Date.now(),
    };

    writeEvents([...events, nextEvent]);
    return nextEvent;
  },

  async update(event) {
    const events = readEvents();
    writeEvents(events.map((currentEvent) => (currentEvent.id === event.id ? event : currentEvent)));
    return event;
  },

  async remove(id) {
    const events = readEvents();
    writeEvents(events.filter((event) => event.id !== id));
  },
};
