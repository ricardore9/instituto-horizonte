/* ==========================================================================
   Instituto Horizonte - Máscaras, Persistência Local & Form Controle (mascaras.js)
   Experiência Prática III: Persistência com localStorage
   Compatível com Arquitetura SPA
   ========================================================================== */

/**
 * Salva o objeto de cadastro na lista de voluntários ('voluntarios_instituto')
 * e guarda a cópia recente sob a chave 'ultimo_voluntario' no localStorage.
 * 
 * @param {Object} dados - Objeto contendo os dados do formulário de cadastro.
 */
function salvarCadastroLocalStorage(dados) {
    try {
        // 1. Recupera a lista existente no localStorage ou inicia com array vazio []
        const listaExistente = localStorage.getItem('voluntarios_instituto');
        const lista = listaExistente ? JSON.parse(listaExistente) : [];

        // 2. Adiciona o novo objeto de cadastro com .push()
        lista.push(dados);

        // 3. Salva a lista atualizada no localStorage sob a chave 'voluntarios_instituto'
        localStorage.setItem('voluntarios_instituto', JSON.stringify(lista));

        // 4. Salva também o cadastro recente sob a chave 'ultimo_voluntario'
        localStorage.setItem('ultimo_voluntario', JSON.stringify(dados));
    } catch (erro) {
        console.error('Erro ao salvar cadastro no localStorage:', erro);
    }
}

/**
 * Ao carregar o formulário, busca a chave 'ultimo_voluntario' no localStorage.
 * Se houver dados salvos, pré-preenche os campos de contato (nome, email, telefone).
 */
function restaurarUltimoCadastro() {
    try {
        const dadosSalvos = localStorage.getItem('ultimo_voluntario');
        if (!dadosSalvos) return;

        const ultimoVoluntario = JSON.parse(dadosSalvos);
        if (!ultimoVoluntario) return;

        const nomeInput = document.getElementById('nome');
        const emailInput = document.getElementById('email');
        const telInput = document.getElementById('telefone');

        if (nomeInput && ultimoVoluntario.nome) {
            nomeInput.value = ultimoVoluntario.nome;
        }

        if (emailInput && ultimoVoluntario.email) {
            emailInput.value = ultimoVoluntario.email;
        }

        if (telInput && ultimoVoluntario.telefone) {
            telInput.value = ultimoVoluntario.telefone;
        }
    } catch (erro) {
        console.error('Erro ao restaurar último cadastro do localStorage:', erro);
    }
}

/**
 * Inicializa as máscaras de CPF, Telefone e CEP, trata a submissão do formulário,
 * gerencia a persistência no localStorage e controla a abertura/fechamento do Modal.
 */
function initMascarasEFormulario() {
    // 1. Máscara de CPF (Formato: 000.000.000-00)
    const cpfInput = document.getElementById('cpf');
    if (cpfInput && !cpfInput.dataset.maskBound) {
        cpfInput.dataset.maskBound = "true";
        cpfInput.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, '');
            if (valor.length > 11) valor = valor.slice(0, 11);
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = valor;
        });
    }

    // 2. Máscara de Telefone (Aceita 10 ou 11 dígitos: (11) 99999-9999)
    const telInput = document.getElementById('telefone');
    if (telInput && !telInput.dataset.maskBound) {
        telInput.dataset.maskBound = "true";
        telInput.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, '');
            if (valor.length > 11) valor = valor.slice(0, 11);
            if (valor.length <= 10) {
                valor = valor.replace(/^(\d{2})(\d)/, '($1) $2');
                valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
            } else {
                valor = valor.replace(/^(\d{2})(\d)/, '($1) $2');
                valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
            }
            e.target.value = valor;
        });
    }

    // 3. Máscara de CEP (Formato: 00000-000)
    const cepInput = document.getElementById('cep');
    if (cepInput && !cepInput.dataset.maskBound) {
        cepInput.dataset.maskBound = "true";
        cepInput.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, '');
            if (valor.length > 8) valor = valor.slice(0, 8);
            valor = valor.replace(/^(\d{5})(\d)/, '$1-$2');
            e.target.value = valor;
        });
    }

    // 4. Lógica do Formulário e Modal Centrado (Sucesso / Alerta)
    const formCadastro = document.querySelector('.volunteer-form');
    const modalOverlay = document.getElementById('modal-feedback');
    const modalBox = modalOverlay ? modalOverlay.querySelector('.modal-box') : null;
    const modalClose = document.getElementById('modal-close');
    const modalBtnConfirm = document.getElementById('modal-btn-confirm');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalIcon = document.getElementById('modal-icon');

    function abrirModal(tipo, titulo, mensagem) {
        if (!modalOverlay) return;

        modalTitle.textContent = titulo;
        modalMessage.textContent = mensagem;

        if (tipo === 'sucesso') {
            modalBox.className = 'modal-box modal-box--success';
            modalIcon.className = 'modal-icon modal-icon--success';
            modalIcon.innerHTML = '✓';
        } else {
            modalBox.className = 'modal-box modal-box--error';
            modalIcon.className = 'modal-icon modal-icon--error';
            modalIcon.innerHTML = '!';
        }

        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
    }

    function fecharModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
    }

    if (formCadastro && !formCadastro.dataset.formBound) {
        formCadastro.dataset.formBound = "true";

        // Tenta pré-preencher os dados de contato do último cadastro salvo no localStorage
        restaurarUltimoCadastro();

        formCadastro.addEventListener('submit', (e) => {
            e.preventDefault();

            if (formCadastro.checkValidity()) {
                // Captura os valores selecionados nos checkboxes de disponibilidade
                const disponibilidade = Array.from(
                    document.querySelectorAll('input[name="disponibilidade[]"]:checked')
                ).map(cb => cb.value);

                // Captura o perfil selecionado (radio)
                const perfilInput = document.querySelector('input[name="perfil"]:checked');

                // Monta o objeto completo de cadastro
                const dadosCadastro = {
                    nome: document.getElementById('nome')?.value || '',
                    email: document.getElementById('email')?.value || '',
                    cpf: document.getElementById('cpf')?.value || '',
                    telefone: document.getElementById('telefone')?.value || '',
                    cep: document.getElementById('cep')?.value || '',
                    dataNascimento: document.getElementById('data_nascimento')?.value || '',
                    perfil: perfilInput ? perfilInput.value : '',
                    areaInteresse: document.getElementById('area_interesse')?.value || '',
                    disponibilidade: disponibilidade,
                    mensagem: document.getElementById('mensagem')?.value || '',
                    dataRegistro: new Date().toISOString()
                };

                // Salva no localStorage antes de resetar o formulário
                salvarCadastroLocalStorage(dadosCadastro);

                abrirModal(
                    'sucesso',
                    'Cadastro Enviado com Sucesso!',
                    'Obrigado por se inscrever! Seus dados foram recebidos e salvos com sucesso.'
                );

                formCadastro.reset();
            } else {
                formCadastro.reportValidity();
                abrirModal(
                    'erro',
                    'Campos Pendentes ou Inválidos!',
                    'Atenção: Por favor, preencha todos os campos obrigatórios (*) corretamente antes de enviar o cadastro.'
                );
            }
        });
    }

    if (modalClose) modalClose.onclick = fecharModal;
    if (modalBtnConfirm) modalBtnConfirm.onclick = fecharModal;

    if (modalOverlay) {
        modalOverlay.onclick = (e) => {
            if (e.target === modalOverlay) {
                fecharModal();
            }
        };
    }

    document.onkeydown = (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            fecharModal();
        }
    };
}

// Expõe as funções globalmente para integração com a SPA
window.salvarCadastroLocalStorage = salvarCadastroLocalStorage;
window.restaurarUltimoCadastro = restaurarUltimoCadastro;
window.initMascarasEFormulario = initMascarasEFormulario;

document.addEventListener('DOMContentLoaded', () => {
    initMascarasEFormulario();
});

// Acessibilidade: fechar modal com a tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modal-feedback');
        if (modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    }
});