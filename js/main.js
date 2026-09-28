/* ==========================================================================
   Instituto Horizonte - Roteador SPA & Templates Dinâmicos (main.js)
   Projeto Front-end: Experiência Prática III e IV - SPA, Acessibilidade & A11y
   ========================================================================== */

// Data Array dos Projetos Sociais (Mock Data de Projetos)
const listaDeProjetos = [
    {
        id: 1,
        titulo: "Projeto 1 — Inclusão Digital",
        imagem: "imagens/projetos/projeto1.webp",
        alt: "Estudantes e idosos em laboratório de informática aprendendo cidadania digital",
        badges: [
            { texto: "Tecnologia", classe: "badge--primary" },
            { texto: "Inscrições Abertas", classe: "badge--success" }
        ],
        descricao: "Curso gratuito de informática básica para adolescentes, adultos e idosos, abordando Windows, Internet, Word, Excel e cidadania digital.",
        duracao: "40 horas."
    },
    {
        id: 2,
        titulo: "Projeto 2 — Primeiro Emprego",
        imagem: "imagens/projetos/projeto2.webp",
        alt: "Jovens em sala de aula participando de oficina de capacitação profissional",
        badges: [
            { texto: "Carreira", classe: "badge--accent" },
            { texto: "Capacitação", classe: "badge--primary" }
        ],
        descricao: "Oficinas voltadas ao desenvolvimento de competências profissionais:",
        itens: [
            "Currículo",
            "Comunicação",
            "Excel básico",
            "E-mail corporativo",
            "Entrevista de emprego"
        ],
        publico: "15 a 21 anos."
    },
    {
        id: 3,
        titulo: "Projeto 3 — Voluntariado Comunitário",
        imagem: "imagens/projetos/projeto3.webp",
        alt: "Voluntários universitários auxiliando crianças e jovens estudantes",
        badges: [
            { texto: "Comunidade", classe: "badge--success" },
            { texto: "Mentoria", classe: "badge--accent" }
        ],
        descricao: "Programa destinado a profissionais e universitários interessados em atuar como voluntários em reforço escolar, informática e orientação profissional."
    }
];

// Função de Renderização Dinâmica dos Cartões de Projeto com .map() e Template Literals
function renderizarProjetos() {
    const container = document.getElementById('projetos-container');
    if (!container) return;

    const htmlCards = listaDeProjetos.map(projeto => {
        // Gera o HTML das etiquetas (badges)
        const htmlBadges = projeto.badges.map(b =>
            `<span class="badge ${b.classe}">${b.texto}</span>`
        ).join('');

        // Gera a lista de tópicos (se houver)
        const htmlItens = projeto.itens ? `
            <ul class="project-card__list">
                ${projeto.itens.map(item => `<li class="project-card__item">${item}</li>`).join('')}
            </ul>
        ` : '';

        // Gera a linha de Duração ou Público (se houver)
        const htmlExtra = projeto.duracao ? `<p class="project-card__text"><strong>Duração:</strong> ${projeto.duracao}</p>` :
            projeto.publico ? `<p class="project-card__text"><strong>Público:</strong> ${projeto.publico}</p>` : '';

        // Retorna o Template Literal do cartão de projeto
        return `
            <article class="project-card">
                <div class="project-card__media">
                    <img src="${projeto.imagem}" alt="${projeto.alt}" class="project-card__image" loading="lazy" decoding="async">
                </div>
                <div class="project-card__body">
                    <div class="project-card__badges">
                        ${htmlBadges}
                    </div>
                    <h3 class="card-title">${projeto.titulo}</h3>
                    <p class="project-card__text"><strong>Descrição:</strong> ${projeto.descricao}</p>
                    ${htmlItens}
                    ${htmlExtra}
                </div>
            </article>
        `;
    }).join('');

    container.innerHTML = htmlCards;
}

document.addEventListener('DOMContentLoaded', () => {
    const appContent = document.getElementById('app-content');
    const menuToggle = document.getElementById('menu-toggle');

    // Função assíncrona para carregar templates parciais
    async function carregarPagina(pagina, elementoAncora = null) {
        if (!appContent) return;

        let conteudoHtml = '';

        try {
            // Tenta buscar o arquivo parcial na pasta html/ via fetch API
            const resposta = await fetch(`html/${pagina}`);

            if (resposta.ok) {
                conteudoHtml = await resposta.text();
            } else {
                throw new Error(`HTTP ${resposta.status}`);
            }
        } catch (erroFetch) {
            // Fallback para execução direta por arquivo local (file://)
            console.warn(`Fetch local bloqueado para html/${pagina}. Ativando fallback de template local...`);

            const templateId = 'tpl-' + pagina.replace('.html', '');
            const templateElement = document.getElementById(templateId);

            if (templateElement) {
                conteudoHtml = templateElement.innerHTML;
            } else {
                conteudoHtml = `
                    <div class="alert alert--info" style="margin-top: 2rem;">
                        <p><strong>Aviso:</strong> Não foi possível carregar html/${pagina}.</p>
                    </div>
                `;
            }
        }

        // Injeta o conteúdo HTML dentro do container principal <main id="app-content">
        appContent.innerHTML = conteudoHtml;

        // Acessibilidade (WCAG): Desloca o foco para o início do novo ecrã carregado
        appContent.focus();

        // Renderiza dinamicamente os cartões de projetos se o container de projetos existir
        renderizarProjetos();

        // Atualiza a navegação visual
        atualizarMenuAtivo(pagina);

        // Re-inicializa máscaras e modal caso tenha carregado o formulário
        if (typeof window.initMascarasEFormulario === 'function') {
            window.initMascarasEFormulario();
        }

        // Fecha o menu hambúrguer no mobile após navegar
        if (menuToggle) {
            menuToggle.checked = false;
        }

        // Rolagem suave até âncoras (#missao, #historia, etc)
        if (elementoAncora) {
            setTimeout(() => {
                const elTarget = document.getElementById(elementoAncora);
                if (elTarget) {
                    elTarget.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Atualiza a classe ativa (.nav-menu__link--active) conforme a rota atual
    function atualizarMenuAtivo(paginaAtual) {
        const linksMenu = document.querySelectorAll('.nav-menu__link');

        linksMenu.forEach(link => {
            link.classList.remove('nav-menu__link--active');
            const rotaLink = link.getAttribute('data-route');

            if (rotaLink === paginaAtual) {
                link.classList.add('nav-menu__link--active');
            }
        });
    }

    // Interceptação global de cliques de navegação (Event Delegation)
    document.addEventListener('click', (e) => {
        const linkRota = e.target.closest('[data-route]');

        if (linkRota) {
            e.preventDefault();
            const rotaTarget = linkRota.getAttribute('data-route');
            const url = new URL(linkRota.href, window.location.origin);
            const ancoraHash = url.hash ? url.hash.substring(1) : null;

            if (rotaTarget) {
                carregarPagina(rotaTarget, ancoraHash);
            }
        }
    });

    // Carrega o template padrão (html/home.html) na inicialização
    carregarPagina('home.html');
});