import { useEffect, useState } from 'react';

const heroImages = ['/assets/images/caca-1.avif', '/assets/images/caca-2.avif'];

const researchAreas = [
  [
    'desktop_windows',
    'e-Saude',
    'Desenvolvimento de plataformas digitais e sistemas de informacao em saude que integram registos eletronicos, prescricao eletronica e monitorizacao do paciente a distancia, promovendo a eficiencia dos servicos de saude nos Acores.',
  ],
  [
    'psychology',
    'Inteligencia Artificial em Saude',
    'Aplicacao de algoritmos de aprendizagem automatica e redes neuronais ao diagnostico por imagem, previsao de surtos epidemiologicos e personalizacao de tratamentos, utilizando dados clinicos do ecossistema de saude regional.',
  ],
  [
    'cell_tower',
    'Telemedicina',
    'Implementacao de solucoes de consultas remotas e telemonitorizacao para ultrapassar as barreiras geograficas da insularidade, garantindo o acesso equitativo a cuidados especializados em todas as ilhas do arquipelago.',
  ],
  [
    'biotech',
    'Epidemiologia Insular',
    'Estudo das particularidades epidemiologicas da populacao acoriana, com foco em doencas raras, genetica populacional e fatores ambientais unicos que influenciam a saude nas ilhas do Atlantico Norte.',
  ],
];

const opportunities = [
  [
    'Estagios',
    'Estagios Clinicos e de Investigacao',
    'Oportunidades de estagio em contexto hospitalar e laboratorios de investigacao, abertas a alunos de licenciatura e mestrado da Universidade dos Acores e outros parceiros nacionais.',
  ],
  [
    'Bolsas',
    'Bolsas de Investigacao',
    'Bolsas anuais de apoio a projetos de investigacao em saude, financiadas pelo Fundo CACA e pela FCT Acores, destinadas a investigadores juniores e seniores.',
  ],
  [
    'Teses',
    'Projetos de Tese e Dissertacao',
    'Acompanhamento e co-orientacao de teses de mestrado e doutoramento em areas prioritarias do CACA, com acesso a dados clinicos e infraestruturas laboratoriais.',
  ],
];

export function LandingPage({ events, onNavigate }) {
  const [activeHero, setActiveHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHero((current) => (current + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.16 });

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll('.area-card');

    function handleMove(event) {
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    }

    function handleLeave(event) {
      event.currentTarget.style.transform = '';
    }

    cards.forEach((card) => {
      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleMove);
        card.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <>
      <section className="react-hero" id="inicio" aria-label="Cabecalho e introducao">
        <div className="react-hero-carousel" aria-hidden="true">
          {heroImages.map((image, index) => (
            <img key={image} src={image} alt="" className={index === activeHero ? 'active' : ''} />
          ))}
        </div>
        <div className="react-hero-overlay" />
        <div className="react-hero-content">
          <h1>
            Centro Academico Clinico
            <span> dos Acores</span>
          </h1>
          <p>
            Um consorcio que pretende, pelas sinergias entre os seus membros, desenvolver e consolidar um centro de
            excelencia, reconhecido a nivel nacional e internacional, na formacao pre e pos-graduada de profissionais de
            saude, no desenvolvimento de estrategias de investigacao inovadoras.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#missao">
              Conhecer o CACA
            </a>
            <button className="btn btn-ghost" type="button" onClick={() => onNavigate('register')}>
              Criar conta
            </button>
          </div>
        </div>
      </section>

      <section className="mission reveal" id="missao">
        <div className="mission-layout">
          <div className="mission-text">
            <h2>A Nossa Missao</h2>
            <p>
              O Centro Academico Clinico dos Acores (CACA) e uma unidade de cooperacao entre instituicoes de ensino
              superior, unidades de saude e centros de investigacao no arquipelago dos Acores. Criado em parceria com o
              Governo Regional dos Acores e a Universidade dos Acores, o CACA tem por missao promover a excelencia na
              formacao de profissionais de saude, a investigacao translacional e a inovacao clinica ao servico da
              populacao acoriana.
            </p>
            <h3>Visao</h3>
            <p>
              Ser reconhecido nacional e internacionalmente como um polo de referencia em investigacao clinica e
              formacao avancada, valorizando a singularidade geografica e biodiversidade dos Acores como ativos
              estrategicos para a ciencia e a saude.
            </p>
            <h3>Enquadramento Regional</h3>
            <p>
              Localizado na Regiao Autonoma dos Acores, o CACA beneficia de uma posicao geografica privilegiada no
              Atlantico Norte. A insularidade e as caracteristicas epidemiologicas unicas da populacao acoriana oferecem
              oportunidades singulares para a investigacao em saude, nomeadamente em areas como a genetica populacional,
              doencas raras e saude ambiental.
            </p>
          </div>
          <div className="mission-image">
            <img src="/assets/images/mission-azores.jpg" alt="Paisagem dos Acores" />
          </div>
        </div>
      </section>

      <section className="stats reveal" id="estatisticas">
        <div className="stats-layout">
          <div className="stats-copy">
            <h2>Em 2025, o Centro Academico Clinico dos Acores:</h2>
            <p>
              Para 2026 queremos continuar a promover a investigacao, mas tambem as melhores praticas clinicas e de
              gestao, atraves da rede de sinergias entre todos os membros do CACA.
            </p>
            <span className="stats-divider" aria-hidden="true" />
          </div>
          <div className="stats-grid">
            <article className="stat-card"><span className="stat-number">10</span><p>Concursos de apoio a investigacao regional realizados.</p></article>
            <article className="stat-card"><span className="stat-number">€50k</span><p>Atribuidos em apoios a publicacoes e biobanco acoriano.</p></article>
            <article className="stat-card"><span className="stat-number">20+</span><p>Investigadores apoiados em projetos insulares.</p></article>
            <article className="stat-card"><span className="stat-number">1</span><p>Regulamento de reconhecimento mutuo desenvolvido.</p></article>
          </div>
        </div>
      </section>

      <section className="insights reveal" id="dados">
        <div className="insights-inner">
          <div className="insights-copy">
            <span className="insights-tag">Transparencia & Crescimento</span>
            <h2>Evolucao do Apoio a Investigacao</h2>
            <p>
              Ao longo dos ultimos 5 anos, o compromisso do CACA com a inovacao clinica nos Acores cresceu
              substancialmente. Em 2025, atingimos o marco historico de <strong>€50.000</strong> em financiamento direto
              a projetos, publicacoes e ao biobanco regional.
            </p>
            <ul className="insights-list">
              <li><span className="material-symbols-outlined" aria-hidden="true">trending_up</span> Crescimento progressivo desde 2021</li>
              <li><span className="material-symbols-outlined" aria-hidden="true">science</span> Foco na investigacao translacional</li>
            </ul>
          </div>
          <div className="insights-visual react-chart" aria-label="Grafico de evolucao do apoio a investigacao" role="img">
            {[12000, 18500, 24000, 38000, 50000].map((value, index) => (
              <span key={value} style={{ '--bar-height': `${(value / 50000) * 100}%`, '--delay': `${index * 0.08}s` }}>
                <strong>{2021 + index}</strong>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="areas reveal" id="areas">
        <div className="areas-inner">
          <h2>Areas de Investigacao</h2>
          <p className="areas-subtitle">
            O CACA desenvolve investigacao de excelencia em areas estrategicas para a saude da populacao acoriana e para
            a inovacao clinica.
          </p>
          <div className="areas-grid">
            {researchAreas.map(([icon, title, description]) => (
              <article className="area-card" key={title}>
                <span className="area-icon material-symbols-outlined" aria-hidden="true">{icon}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="consortium reveal" id="parceiros">
        <h2>O Consorcio</h2>
        <div className="consortium-grid">
          {[
            ['H', 'HOSPITAL DO DIVINO ESPIRITO SANTO', 'dot-green'],
            ['U', 'UNIVERSIDADE DOS ACORES', 'dot-blue'],
            ['U', 'UNIDADE DE SAUDE ILHA DE SAO MIGUEL', 'dot-red'],
            ['S', 'CENTRO DE ONCOLOGIA DOS ACORES', 'dot-purple'],
          ].map(([letter, name, color]) => (
            <article className="consortium-item" key={name}>
              <span className={`dot ${color}`}>{letter}</span>
              <p>{name}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="research reveal" id="investigacao">
        <article className="research-column left">
          <h2>Apoio a investigacao</h2>
          <p>
            Se ja so lhe falta apoio financeiro para investigar, o Fundo de Financiamento a Investigacao CACA esta a
            disposicao de todos os profissionais dos membros do consorcio, com apoios nao sujeitos a impostos.
          </p>
          <a href="#contactos" className="btn btn-light">Ver apoios disponiveis</a>
        </article>
        <article className="research-column right">
          <h2>Quer investigar?</h2>
          <p>
            Se quer investigar, mas ainda nao sabe por onde comecar, pode integrar uma bolsa de investigadores e
            aguardar o contacto. Se ja sabe, tambem pode submeter a sua proposta diretamente.
          </p>
          <a href="#contactos" className="btn btn-stroke">Aderir a bolsa de investigadores</a>
        </article>
      </section>

      <section className="opportunities reveal" id="oportunidades">
        <div className="opportunities-inner">
          <h2>Oportunidades</h2>
          <p className="opportunities-subtitle">
            O CACA disponibiliza diversas oportunidades para estudantes, investigadores e profissionais de saude que
            queiram contribuir para a investigacao e inovacao clinica nos Acores.
          </p>
          <div className="opportunities-grid">
            {opportunities.map(([tag, title, description]) => (
              <article className="opp-card" key={title}>
                <span className="opp-tag">{tag}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="notice reveal">
        <div className="notice-inner">
          <p>
            <span className="notice-icon">i</span>
            Os apoios CACA a publicacoes requerem, sempre, a mencao a afiliacao ao consorcio nos artigos concorrentes.
          </p>
          <a href="#contactos" className="btn btn-notice">Ver exemplos</a>
        </div>
      </section>

      <section className="news react-section reveal" id="noticias">
        <div className="news-head">
          <h2>Noticias</h2>
          <a href="#noticias">Ver todas as noticias</a>
        </div>
        <div className="news-grid">
          <article className="news-card">
            <div className="news-thumb"><img src="/assets/images/caca-2.avif" alt="" /></div>
            <div className="news-body">
              <p className="news-date">Saude e Investigacao</p>
              <h3>Rede CACA reforca colaboracao regional</h3>
              <p>Conteudo dinamico preparado para integracao com API de noticias.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="events react-section reveal" id="eventos">
        <div className="events-head">
          <h2>Eventos</h2>
          <button type="button" onClick={() => onNavigate('events')}>Gerir eventos</button>
        </div>
        <div className="events-grid">
          {events.length === 0 ? (
            <p>Nao ha eventos agendados de momento.</p>
          ) : (
            events.slice(0, 3).map((event) => (
              <article className="news-card" key={event.id}>
                <div className="news-thumb">
                  <img src={`https://picsum.photos/seed/${event.id}/420/260`} alt="" />
                </div>
                <div className="news-body">
                  <p className="news-date">{event.date} as {event.hour}</p>
                  <h3>{event.name}</h3>
                  <p>{event.description}</p>
                  <p>{event.local}</p>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="contact reveal" id="contactos">
        <div className="contact-layout">
          <div className="contact-info">
            <h2>Contactos e Localizacao</h2>
            <div className="contact-details">
              <div className="contact-item"><span className="contact-icon material-symbols-outlined" aria-hidden="true">mail</span><div><h3>E-mail</h3><p><a href="mailto:geral@caca.azores.pt">geral@caca.azores.pt</a></p></div></div>
              <div className="contact-item"><span className="contact-icon material-symbols-outlined" aria-hidden="true">phone</span><div><h3>Telefone</h3><p><a href="tel:+351296123456">+351 296 123 456</a></p></div></div>
              <div className="contact-item"><span className="contact-icon material-symbols-outlined" aria-hidden="true">location_on</span><div><h3>Morada</h3><p>Rua da Universidade, n.º 1<br />9500-321 Ponta Delgada<br />Ilha de Sao Miguel - Acores, Portugal</p></div></div>
            </div>
            <div className="contact-map">
              <img src="/assets/images/contact-map.jpg" alt="Mapa ilustrativo da localizacao do CACA em Ponta Delgada" />
            </div>
          </div>
          <div className="contact-form-wrapper">
            <h2>Envie-nos uma mensagem</h2>
            <form className="contact-form" action="#" method="post">
              <div className="form-group"><label htmlFor="contact-name">Nome</label><input id="contact-name" type="text" placeholder="O seu nome completo" /></div>
              <div className="form-group"><label htmlFor="contact-email">E-mail</label><input id="contact-email" type="email" placeholder="exemplo@email.com" /></div>
              <div className="form-group"><label htmlFor="contact-message">Mensagem</label><textarea id="contact-message" rows="5" placeholder="Escreva aqui a sua mensagem..." /></div>
              <button type="submit" className="btn btn-primary btn-submit">Enviar Mensagem</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
