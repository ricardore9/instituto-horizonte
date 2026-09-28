# Instituto Horizonte - Plataforma Web (SPA)

Aplicação web desenvolvida para a organização do terceiro setor **Instituto Horizonte**, focada em inclusão social e capacitação profissional. O projeto foi construído como uma Single Page Application (SPA) em Vanilla JavaScript, sem frameworks pesados, priorizando desempenho, acessibilidade e padrões modernos da web.

---

## 🚀 Tecnologias Utilizadas

- **HTML5 Semântico:** Estruturação acessível com tags semânticas (`<header>`, `<nav>`, `<main>`, `<article>`, `<dialog>`), atributos ARIA e tags `<template>`.
- **CSS3 Moderno:** Arquitetura Mobile First, CSS Custom Properties (variáveis de tema), Flexbox, CSS Grid e conformidade de contraste WCAG 2.1 (Nível AA).
- **Vanilla JavaScript (ES6+):** Roteador SPA assíncrono via Fetch API, renderização dinâmica de listas com `.map()` e Template Literals.
- **Validação e Regex:** Formatação de máscaras em tempo real (CPF, Telefone, CEP) e consistência via API nativa de formulários (`checkValidity`).
- **Web Storage API:** Persistência de dados locais com `localStorage` (`setItem`, `getItem`, serialização JSON).
- **Git & GitHub:** Fluxo de trabalho profissional baseado em GitFlow (`main`, `develop`, `feature/*`), Conventional Commits e versionamento semântico (SemVer).

---

## 📂 Estrutura de Pastas

```text
.
├── css/
│   └── style.css            # Folha de estilos centralizada e variáveis
├── html/
│   ├── home.html            # Fragmento da página inicial
│   ├── projetos.html        # Fragmento com contêiner dinâmico de projetos
│   └── cadastro.html        # Fragmento do formulário de voluntários
├── imagens/                 # Ativos de mídia e imagens institucionais
├── js/
│   ├── main.js              # Roteador SPA, lista de dados e renderização
│   └── mascaras.js          # Validação, máscaras regex, modais e localStorage
├── index.html               # Shell da SPA e templates de contingência (fallback)
├── .gitignore               # Exclusão de arquivos temporários e sensíveis
└── README.md                # Documentação técnica do projeto
```
