import { EventManager } from './modules/EventManager.js';
import { WeatherService } from './services/WeatherService.js';
import { MapService } from './services/MapService.js';

// Inicializa a classe EventManager (liga à DB criada pela Júlia)
const eventManager = new EventManager('CACADatabase', 1);
const weatherService = new WeatherService();
const mapService = new MapService();

// Elementos do DOM
const form = document.getElementById('eventForm');
const eventsContainer = document.getElementById('eventsContainer');
const eventIdInput = document.getElementById('eventId');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Variável para controlar se estamos a editar ou a criar
let isEditing = false;

// Função para carregar e renderizar os eventos
async function loadEvents() {
    try {
        const events = await eventManager.readEvents();
        renderEvents(events);
    } catch (error) {
        console.error("Erro ao carregar eventos:", error);
        eventsContainer.innerHTML = '<p style="color:red;">Erro ao carregar os eventos da base de dados.</p>';
    }
}

// Função para renderizar os eventos no ecrã
function renderEvents(events) {
    if (!events || events.length === 0) {
        eventsContainer.innerHTML = '<p>Ainda não há eventos registados.</p>';
        return;
    }

    eventsContainer.innerHTML = ''; // Limpar o container

    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        eventItem.style.flexDirection = 'column';
        eventItem.style.alignItems = 'stretch';
        
        eventItem.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                <div class="event-info" style="flex: 1;">
                    <strong>${event.name}</strong>
                    <small>
                        <span class="material-symbols-outlined" aria-hidden="true">calendar_month</span>
                        ${event.date} às ${event.hour} • 
                        <span class="material-symbols-outlined" aria-hidden="true" style="margin-left:4px;">location_on</span>
                        ${event.local}
                    </small>
                    <div class="weather-info" id="weather-${event.id}" style="margin: 8px 0; padding: 6px 10px; background: rgba(0,0,0,0.03); border-radius: 4px; display: inline-block;">
                        <small>A carregar previsão do tempo...</small>
                    </div>
                    <p style="margin-top: 10px;">${event.description}</p>
                </div>
                <div class="event-actions" style="margin-left: 20px;">
                    <button class="btn btn-edit" data-id="${event.id}">Editar</button>
                    <button class="btn btn-danger" data-id="${event.id}">Remover</button>
                </div>
            </div>
            
            <!-- Contentor do Mapa (Tarefa do Adriano) -->
            <div id="map-${event.id}" class="event-map" style="height: 250px; width: 100%; border-radius: 8px; border: 1px solid #eee; z-index: 1;"></div>
        `;
        eventsContainer.appendChild(eventItem);
        
        // Carregar meteorologia de forma assíncrona (Daniela)
        loadWeather(event.local, event.date, event.id);
        
        // Inicializar o Mapa 
        // Usamos um setTimeout para garantir que a div já foi renderizada e o Leaflet consegue calcular o tamanho
        setTimeout(() => {
            mapService.initMap(`map-${event.id}`, event.local);
        }, 100);
    });

    // Adicionar os listeners aos novos botões gerados
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => prepareEdit(Number(e.target.dataset.id)));
    });

    document.querySelectorAll('.btn-danger').forEach(btn => {
        btn.addEventListener('click', (e) => deleteEvent(Number(e.target.dataset.id)));
    });
}

// Função para carregar a meteorologia de um evento
async function loadWeather(local, date, eventId) {
    const weatherContainer = document.getElementById(`weather-${eventId}`);

    // Mostrar spinner enquanto carrega
    weatherContainer.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <div class="spinner"></div>
            <small>A carregar previsão...</small>
        </div>
    `;

    try {
        const weather = await weatherService.getWeatherForDate(local, date);
        if (weather) {
            weatherContainer.innerHTML = `
                <small title="${weather.weather.description}">
                    <img src="https://openweathermap.org/img/wn/${weather.weather.icon}.png" alt="${weather.weather.main}" style="width:20px; vertical-align:middle;"class="fundo">
                    ${weather.weather.description}
                     🌡️ ${weather.temperature.current}${weather.temperature.unit}
                     💨 ${weather.wind.speed}${weather.wind.unit}
                     💧 ${weather.humidity}%
                </small>
            `;
        } else {
            weatherContainer.innerHTML = '<small>Previsão indisponível</small>';
        }
    } catch (error) {
        console.error(`Erro ao carregar tempo para evento ${eventId}:`, error);
        weatherContainer.innerHTML = '<small>Erro ao carregar tempo</small>';
    }
}

// Submeter o Formulário (Criar ou Atualizar)
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('eventName').value;
    const description = document.getElementById('eventDescription').value;
    const date = document.getElementById('eventDate').value;
    const hour = document.getElementById('eventHour').value;
    const local = document.getElementById('eventLocal').value;

    try {
        if (isEditing) {
            const id = Number(eventIdInput.value);
            await eventManager.updateEvent(id, { name, description, date, hour, local });
            alert("Evento atualizado com sucesso!");
        } else {
            await eventManager.addEvent(name, description, date, hour, local);
            alert("Evento criado com sucesso!");
        }
        
        resetForm();
        loadEvents(); // Recarregar a lista
    } catch (error) {
        console.error("Erro ao guardar evento:", error);
        alert("Ocorreu um erro ao guardar o evento.");
    }
});

// Preparar o formulário para edição
async function prepareEdit(id) {
    try {
        const events = await eventManager.readEvents();
        const event = events.find(e => e.id === id);
        
        if (event) {
            document.getElementById('eventId').value = event.id;
            document.getElementById('eventName').value = event.name;
            document.getElementById('eventDescription').value = event.description;
            document.getElementById('eventDate').value = event.date;
            document.getElementById('eventHour').value = event.hour;
            document.getElementById('eventLocal').value = event.local;
            
            // Disparar evento de change para o mapa de seleção atualizar o pin
            document.getElementById('eventLocal').dispatchEvent(new Event('change'));
            
            isEditing = true;
            submitBtn.textContent = 'Atualizar Evento';
            cancelBtn.style.display = 'inline-block';
            
            // Fazer scroll suave para o formulário
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        console.error("Erro ao carregar dados do evento:", error);
    }
}

// Apagar Evento
async function deleteEvent(id) {
    if (confirm("Tem a certeza que deseja remover este evento? Esta ação não pode ser desfeita.")) {
        try {
            await eventManager.deleteEvent(id);
            loadEvents(); // Recarregar a lista
        } catch (error) {
            console.error("Erro ao apagar evento:", error);
            alert("Erro ao apagar o evento.");
        }
    }
}

// Reset ao formulário
function resetForm() {
    form.reset();
    isEditing = false;
    eventIdInput.value = '';
    submitBtn.textContent = 'Adicionar Evento';
    cancelBtn.style.display = 'none';
    
    // Disparar evento para limpar/voltar ao default o mapa de seleção (se aplicável)
    document.getElementById('eventLocal').dispatchEvent(new Event('change'));
}

// Cancelar Edição
cancelBtn.addEventListener('click', resetForm);

// Inicializar a lista quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    
    // Inicializar o mapa interativo de seleção de local para o formulário
    mapService.initSelectionMap('selectionMap', 'eventLocal');
});
