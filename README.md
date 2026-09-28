# Instituto Horizonte - Plataforma Web (SPA)

Aplicação web desenvolvida para a organização do terceiro setor **Instituto Horizonte**, focada em inclusão social e capacitação profissional. O projeto foi construído como uma Single Page Application (SPA) em Vanilla JavaScript, sem frameworks pesados, priorizando desempenho, acessibilidade e padrões modernos da web.

---

## 🚀 Tecnologias Utilizadas

- **HTML5 Semântico:** Estruturação acessível com tags semânticas (`<header>`, `<nav>`, `<main>`, `<article>`, `<dialog>`), atributos ARIA e tags `<template>`.
- **CSS3 Moderno:** Arquitetura Mobile First, CSS Custom Properties (variáveis de tema), Flexbox, CSS Grid, indicador visual de foco (WCAG 2.4.7) e suporte a Modo Escuro / Alto Contraste (`prefers-color-scheme: dark`, WCAG 2.1 AA).
- **Vanilla JavaScript (ES6+):** Roteador SPA assíncrono via Fetch API, renderização dinâmica de listas com `.map()`, Template Literals e gerenciamento acessível de foco.
- **Validação e Regex:** Formatação de máscaras em tempo real (CPF, Telefone, CEP) e consistência via API nativa de formulários (`checkValidity`).
- **Web Storage API:** Persistência de dados locais com `localStorage` (`setItem`, `getItem`, serialização JSON).
- **Vite Bundler:** Pipeline de compilação, desenvolvimento rápido (HMR), minificação de produção via `esbuild` e empacotamento em `dist/`.
- **Git & GitHub:** Fluxo de trabalho baseado em GitFlow (`main`, `develop`, `feature/*`), Conventional Commits e versionamento semântico (SemVer).

---

## 📂 Estrutura de Pastas e Arquivos

```text
.
├── css/
│   └── style.css            # Folha de estilos centralizada, variáveis CSS e suporte a modo escuro
├── dist/                    # Build final de produção empacotado pelo Vite (ignorado pelo Git)
├── html/
│   ├── cadastro.html        # Fragmento parcial do formulário de voluntários
│   ├── home.html            # Fragmento parcial da página inicial
│   └── projetos.html        # Fragmento parcial com contêiner dinâmico de projetos
├── imagens/                 # Ativos de mídia e imagens institucionais
│   └── projetos/            # Imagens dos cartões dos projetos sociais
├── js/
│   ├── main.js              # Roteador SPA, lista de dados mockados e controle de foco
│   └── mascaras.js          # Validação, máscaras regex, modais e persistência no localStorage
├── .gitignore               # Exclusão de node_modules/, dist/, .DS_Store e arquivos *.pdf
├── index.html               # Shell principal da SPA e templates de fallback local
├── package.json             # Dependências do ecossistema Node/Vite e scripts de build
├── README.md                # Documentação técnica oficial do projeto
└── vite.config.js           # Configurações do Vite bundler (minificação esbuild e cópia de assets)
```

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos
Possuir o **Node.js** instalado na sua máquina.

### 1. Clonar o repositório e instalar as dependências:
```bash
git clone https://github.com/ricardore9/instituto-horizonte.git
npm install
```

### 2. Iniciar o servidor de desenvolvimento (HMR):
```bash
npm run dev
```

### 3. Gerar o build de produção minificado (`dist/`):
```bash
npm run build
```

### 4. Executar a visualização do build de produção:
```bash
npm run preview
```
