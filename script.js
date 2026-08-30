// ========== VARIAVEIS GLOBAIS ==========
let respostas = [];
let perguntaAtual = 0;
let usuarioAtual = null;
let categoriaAtual = "";
let perguntasNaCategoria = 0;
let perguntasRespondidasNaCategoria = 0;
let categoriasConcluidas = [];
let modoTeste = false;

const screen = document.getElementById("screen");
const bg = document.getElementById("background");

// ========== PALAVRAS DO FUNDO ==========
const palavras = [
    "PROJECT", "HOST", "BIOHAZARD", "ERROR", "ACCESS", 
    "CELL", "DNA", "SPECIMEN", "INFECTED", "NULL", 
    "████", "010101", "SYSTEM", "CORE", "MATRIX", "GHOST",
    "LAZARUS", "HELIX", "EDEN", "ORPHEUS", "PROTOCOL"
];

// ========== ESCONDER O TERMINAL INICIALMENTE ==========
document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.getElementById('terminal');
    if (terminal) {
        terminal.style.display = 'none';
    }
});

// ========== FUNDO DINAMICO ==========
function fundo() {
    let txt = "";
    for (let i = 0; i < 450; i++) {
        txt += palavras[Math.floor(Math.random() * palavras.length)] + " ";
        if (Math.random() < 0.08) {
            txt += "\n";
        }
    }
    bg.textContent = txt;
}

setInterval(fundo, 400);
fundo();

// ========== FUNÇÃO PARA PEGAR NOME EXIBIDO DA CATEGORIA ==========
function getNomeCategoria(categoria) {
    const nomesExibicao = {
        "[IDENTIFICACAO]": "TESTE DE IDENTIFICACAO",
        "[EXPOSICAO]": "TESTE DE EXPOSICAO",
        "[ESTADO PSICOLOGICO]": "AVALIACAO PSICOLOGICA",
        "[SOBREVIVENCIA]": "TESTE DE SOBREVIVENCIA",
        "[SOBRE A ORGANIZACAO]": "AVALIACAO ORGANIZACIONAL",
        "[PERGUNTAS ESTRANHAS]": "TESTE DE PERCEPCAO",
        "[QUEBRA-CABECA]": "TESTE COGNITIVO",
        "[PERGUNTAS ESPECIFICAS]": "ANALISE"
    };
    return nomesExibicao[categoria] || categoria;
}

// ========== VERIFICA SE É UMA PERGUNTA BLOQUEADA ==========
function isPerguntaBloqueada(pergunta) {
    const idsBloqueados = [
        "organizacao_3",
        "organizacao_4",
        "organizacao_5"
    ];
    return idsBloqueados.includes(pergunta.id);
}

// ========== HUD DE CATEGORIA ==========
async function mostrarHUDCategoria(categoria) {
    const nomeExibicao = getNomeCategoria(categoria);
    
    screen.innerHTML = "";
    
    playCompletionSound();
    
    await escrever("");
    await escrever("════════════════════════════════════════");
    await escrever(`   [ OK ] TESTE CONCLUIDO: ${nomeExibicao}`);
    await escrever("");
    await escrever(`   >> AVANCANDO PARA PROXIMA FASE...`);
    await escrever("════════════════════════════════════════");
    
    if (categoriasConcluidas.length > 0) {
        await escrever("");
        await escrever(`   CATEGORIAS CONCLUIDAS: ${categoriasConcluidas.length}/${Object.keys(categoriasPerguntas).length}`);
        await escrever(`   PROGRESSO: ${Math.round((categoriasConcluidas.length / Object.keys(categoriasPerguntas).length) * 100)}%`);
        await escrever("");
        
        let barra = "   [";
        const progresso = Math.round((categoriasConcluidas.length / Object.keys(categoriasPerguntas).length) * 20);
        for (let i = 0; i < 20; i++) {
            barra += i < progresso ? "#" : ".";
        }
        barra += "]";
        await escrever(barra);
    }
    
    await esperar(2000);
    
    if (categoriasConcluidas.length >= Object.keys(categoriasPerguntas).length) {
        playAnalysisCompleteSound();

        await escrever("");
        await escrever("   >> TODAS AS CATEGORIAS CONCLUIDAS!");
        await escrever("   >> INICIANDO ANALISE ...");
        await esperar(1500);
    }
}

// ========== TELA DE INICIO DO TERMINAL ==========
async function iniciar() {
    await escrever("╔════════════════════════════════════════╗", 5, true);
    await escrever("║                                        ║", 5);
    await escrever("║   ███████╗██████╗ ███████╗███╗   ██╗   ║");
    await escrever("║   ██╔════╝██╔══██╗██╔════╝████╗  ██║   ║");
    await escrever("║   █████╗  ██║  ██║█████╗  ██╔██╗ ██║   ║");
    await escrever("║   ██╔══╝  ██║  ██║██╔══╝  ██║╚██╗██║   ║");
    await escrever("║   ███████╗██████╔╝███████╗██║ ╚████║   ║");
    await escrever("║   ╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═══╝   ║");
    await escrever("║                                        ║", 5);
    await escrever("║   Experimental Data Exchange Network   ║");
    await escrever("║                                        ║", 5);
    await escrever("║    SISTEMA DE EXPERIMENTOS  - V.3.0    ║");
    await escrever("║                                        ║", 5);
    await escrever("╚════════════════════════════════════════╝", 5);
    await esperar(1000);

    await escrever("");
    await escrever("> Inicializando Kernel... [▓▓▓▓▓▓▓▓▓▓] 100%");
    await escrever("> Verificando Database... [▓▓▓▓▓▓▓▓▓▓] 100%");
    await escrever("> Conectando ao servidor... [▓▓▓▓▓▓▓▓▓▓] 100%");
    await escrever("");
    await escrever("[ SISTEMA ONLINE ]");
    await escrever("");
    await escrever("════════════════════════════════════════");
    await escrever("   AGUARDANDO IDENTIFICACAO");
    await escrever("════════════════════════════════════════");

    await esperar(800);
    mostrarFormulario();
}

// ========== INICIAR TERMINAL (CHAMADO PELO EDEN) ==========
function iniciarTerminal() {
    const terminal = document.querySelector('.terminal');
    if (terminal) {
        terminal.style.width = "min(90vw, 700px)";
        terminal.style.maxHeight = "90vh";
        terminal.style.borderColor = 'red';
        terminal.style.boxShadow = '0 0 30px rgba(255,0,0,0.2)';
        terminal.style.transition = "all 0.5s ease";
        terminal.style.opacity = '1';
        terminal.style.transform = 'translate(-50%, -50%) scale(1)';
    }
    
    const container = document.getElementById('edenContent');
    if (container) {
        container.innerHTML = '';
    }
    
    iniciar();
}

// ========== FUNÇÃO DE INICIALIZAÇÃO DO SISTEMA (BOOT) ==========
function iniciarSistema() {
    const bootBtn = document.getElementById('bootButton');
    if (bootBtn) {
        bootBtn.disabled = true;
        bootBtn.style.opacity = '0.5';
        bootBtn.style.cursor = 'default';
    }
    
    playBootSound();
    
    const bootScreen = document.getElementById('bootScreen');
    if (bootScreen) {
        bootScreen.classList.add('flash');
    }
    
    if (bootBtn) {
        bootBtn.classList.add('loading');
        bootBtn.innerHTML = '<span class="boot-btn-icon">⟳</span> CARREGANDO...';
    }
    
    setTimeout(() => {
        if (bootScreen) {
            bootScreen.classList.add('fade-out');
        }
        
        const terminal = document.getElementById('terminal');
        if (terminal) {
            terminal.classList.add('boot-opening');
            terminal.style.display = 'block';
        }
        
        setTimeout(() => {
            mostrarEdenMenu();
        }, 600);
        
        setTimeout(() => {
            if (bootScreen) {
                bootScreen.style.display = 'none';
            }
        }, 1000);
        
    }, 800);
}

// ========== LOGIN ==========
function mostrarFormulario() {
    if (typeof isAdmin !== 'undefined' && isAdmin) {
        mostrarPainelAdmin();
        return;
    }
    
    screen.innerHTML = `
        <div style="font-family:Consolas,monospace;color:#ff1a1a;">
            <pre style="margin:0;font-family:Consolas,monospace;white-space:pre;background:transparent;border:none;font-size:inherit;">
════════════════════════════════════════
   ACESSO RESTRITO - NIVEL 2

   IDENTIFIQUE-SE PARA CONTINUAR

   > NOME DO SUJEITO:
════════════════════════════════════════
            </pre>

            <input id="nome" placeholder="Digite seu nome..." style="width:100%;margin-top:10px;padding:12px;background:black;border:1px solid red;color:red;font-family:Consolas,monospace;font-size:18px;">
            <button id="btnIdentificar" onclick="identificar()" style="width:100%;margin-top:15px;padding:12px;background:black;color:red;border:1px solid red;cursor:pointer;font-family:Consolas,monospace;font-size:16px;">[ ENTER ]</button>
            <button onclick="mostrarEdenMenu()" style="width:100%;margin-top:10px;padding:10px;background:transparent;color:#666;border:1px solid #333;cursor:pointer;font-family:Consolas,monospace;font-size:12px;">[ VOLTAR AO EDEN ]</button>
        </div>
    `;
    
    const input = document.getElementById("nome");
    if (input) {
        input.addEventListener('input', function() {
            isUserTyping = true;
            playTypeSound_User();
            clearTimeout(window.userTypingTimeout);
            window.userTypingTimeout = setTimeout(() => {
                isUserTyping = false;
            }, 100);
        });
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                playSubmitSound();
            }
        });
        input.focus();
    }
}

// ========== IDENTIFICACAO ==========
async function identificar() {
    // Impede múltiplos cliques
    const btn = document.getElementById('btnIdentificar');
    if (btn && btn.dataset.clicado === 'true') {
        return;
    }
    if (btn) {
        btn.dataset.clicado = 'true';
        btn.style.opacity = '0.5';
        btn.style.cursor = 'default';
    }
    
    playSubmitSound();

    const nome = document
        .getElementById("nome")
        .value
        .toLowerCase()
        .trim();

    // ========== VERIFICAÇÃO ZOMBOID ==========
    if (nome === "zomboid") {
        await sequenciaZomboid();
        if (btn) {
            btn.dataset.clicado = 'false';
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        }
        return;
    }

    // NOME VAZIO
    if (!nome) {
        playEmptyFieldSound();
        
        const msgDiv = document.createElement('div');
        msgDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ff4444;
            font-size: 18px;
            font-family: Consolas, monospace;
            text-align: center;
            background: rgba(0, 0, 0, 0.95);
            padding: 30px 40px;
            border: 2px solid #ff4444;
            z-index: 9999;
            animation: glitch 0.1s infinite;
            box-shadow: 0 0 50px rgba(255, 0, 0, 0.3);
        `;
        msgDiv.textContent = '[ POR FAVOR, DIGITE SEU NOME ]';
        document.body.appendChild(msgDiv);
        
        const input = document.getElementById("nome");
        if (input) {
            input.style.borderColor = '#ff4444';
            input.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.5)';
            input.placeholder = 'DIGITE SEU NOME...';
        }
        
        setTimeout(() => {
            if (msgDiv.parentNode) msgDiv.remove();
            if (input) {
                input.style.borderColor = 'red';
                input.style.boxShadow = 'none';
                input.placeholder = 'Digite seu nome...';
                input.focus();
            }
            if (btn) {
                btn.dataset.clicado = 'false';
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            }
        }, 2000);
        
        return;
    }

    // MATTHIAS REMOVIDO - AGORA VIA LOGIN EDEN

    if (subjects[nome]) {
        const s = subjects[nome];
        mostrarVerificacaoID(nome, s);
        if (btn) {
            btn.dataset.clicado = 'false';
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        }
    } else {
        // NOME NÃO ENCONTRADO
        await esperar(500);
        await escrever("> Buscando no Database...", 20, true);
        await esperar(1000);

        await escrever("");
        await escrever("[ ACESSO NEGADO ]");
        await escrever("");
        await escrever("════════════════════════════════════════");
        await escrever(`   SUJEITO NAO ENCONTRADO`);
        await escrever("");
        await escrever(`   "${nome}" nao consta nos arquivos`);
        await escrever(`   da Aescula Biotech.`);
        await escrever("");
        await escrever("   [ OPCOES ]");
        await escrever("════════════════════════════════════════");

        screen.innerHTML += `
            <div style="display:flex; gap:10px; margin-top:20px; flex-wrap:wrap;">
                <button onclick="continuarComoVisitante('${nome}')" style="flex:1;padding:12px;background:black;color:#ffaa00;border:1px solid #ffaa00;cursor:pointer;font-family:Consolas,monospace;font-size:14px;">[ CONTINUAR SEM CADASTRO ]</button>
                <button onclick="mostrarEdenMenu()" style="flex:1;padding:12px;background:black;color:#666;border:1px solid #333;cursor:pointer;font-family:Consolas,monospace;font-size:14px;">[ VOLTAR AO EDEN ]</button>
            </div>
        `;
        
        if (btn) {
            btn.dataset.clicado = 'false';
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        }
    }
}

// ========== CONTINUAR COMO VISITANTE ==========
function continuarComoVisitante(nome) {
    playSubmitSound();
    
    usuarioAtual = {
        nome: nome,
        numero: "---",
        estado: "NAO REGISTRADO",
        relacao: "NONE",
        verificado: false,
        isVisitante: true,
        id: null
    };
    
    screen.innerHTML = "";
    
    setTimeout(async () => {
        await escrever("", 30);
        await escrever("════════════════════════════════════════", 30);
        await escrever("   [ ACESSO COMO VISITANTE ]", 35);
        await escrever("", 30);
        await escrever(`   BEM-VINDO, ${nome.toUpperCase()}`, 40);
        await escrever("", 30);
        await escrever(`   STATUS   : NAO REGISTRADO`, 35);
        await escrever(`   RELACAO  : NENHUMA`, 35);
        await escrever("", 30);
        await escrever("   VOCE NAO ESTA NOS ARQUIVOS OFICIAIS.", 35);
        await escrever("   APENAS PERGUNTAS GERAIS SERAO EXIBIDAS.", 35);
        await escrever("", 30);
        await escrever("   [ ACESSO PARCIAL ]", 35);
        await escrever("════════════════════════════════════════", 30);
        
        setTimeout(() => {
            carregarQuestionarioVisitante();
        }, 4000);
    }, 300);
}

// ========== QUESTIONARIO ==========
function carregarQuestionario() {
    screen.innerHTML = "";
    perguntaAtual = 0;
    categoriasConcluidas = [];
    categoriaAtual = "";
    perguntasNaCategoria = 0;
    perguntasRespondidasNaCategoria = 0;
    window.isVisitante = false;
    desativarGlitch();
    mostrarPergunta();
}

// ========== QUESTIONARIO PARA VISITANTE ==========
function carregarQuestionarioVisitante() {
    const perguntasGerais = questions.filter(q => {
        const categoriasPermitidas = [
            "[IDENTIFICACAO]",
            "[EXPOSICAO]",
            "[ESTADO PSICOLOGICO]",
            "[SOBREVIVENCIA]",
            "[SOBRE A ORGANIZACAO]"
        ];
        return categoriasPermitidas.includes(q.category);
    });
    
    window.perguntasVisitante = perguntasGerais;
    window.isVisitante = true;
    
    screen.innerHTML = "";
    perguntaAtual = 0;
    categoriasConcluidas = [];
    categoriaAtual = "";
    perguntasNaCategoria = 0;
    perguntasRespondidasNaCategoria = 0;
    desativarGlitch();
    mostrarPerguntaVisitante();
}

// ========== TELA DE VERIFICAÇÃO DE ID ==========
function mostrarVerificacaoID(nome, dados) {
    screen.innerHTML = `
        <div style="font-family:Consolas,monospace;color:#ff1a1a;">
            <pre style="margin:0;font-family:Consolas,monospace;white-space:pre;background:transparent;border:none;font-size:inherit;">
════════════════════════════════════════
   [ AUTENTICACAO ]

   SUJEITO IDENTIFICADO: ${dados.nome || nome}
   NUMERO: ${dados.numero}

   >>> INSIRA SEU CODIGO DE VERIFICACAO <<<

   O código foi fornecido no momento do cadastro.
════════════════════════════════════════
            </pre>

            <input id="codigo" placeholder="Digite seu código de verificação..." style="width:100%;margin-top:20px;padding:12px;background:black;border:1px solid red;color:red;font-family:Consolas,monospace;font-size:18px;">
            <button id="btnVerificar" onclick="verificarID('${nome}')" style="width:100%;margin-top:15px;padding:12px;background:black;color:red;border:1px solid red;cursor:pointer;font-family:Consolas,monospace;font-size:16px;">[ VERIFICAR ]</button>
            <button onclick="continuarSemID('${nome}')" style="width:100%;margin-top:10px;padding:12px;background:black;color:#666;border:1px solid #333;cursor:pointer;font-family:Consolas,monospace;font-size:14px;">[ NAO TENHO CODIGO ]</button>
        </div>
    `;
    
    const input = document.getElementById("codigo");
    if (input) {
        input.addEventListener('input', function() {
            isUserTyping = true;
            playTypeSound_User();
            clearTimeout(window.userTypingTimeout);
            window.userTypingTimeout = setTimeout(() => {
                isUserTyping = false;
            }, 100);
        });
        input.focus();
    }
}

// ========== VERIFICAR ID ==========
function verificarID(nome) {
    // Impede múltiplos cliques
    const btn = document.getElementById('btnVerificar');
    if (btn && btn.dataset.clicado === 'true') {
        return;
    }
    if (btn) {
        btn.dataset.clicado = 'true';
        btn.style.opacity = '0.5';
        btn.style.cursor = 'default';
    }
    
    const codigo = document.getElementById("codigo").value.trim();
    const dados = subjects[nome];
    
    if (!dados) {
        alert("[ ERRO ] Dados do sujeito nao encontrados.");
        if (btn) {
            btn.dataset.clicado = 'false';
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        }
        return;
    }
    
    if (codigo === dados.codigo) {
        playSubmitSound();
        usuarioAtual = dados;
        usuarioAtual.nome = nome;
        usuarioAtual.verificado = true;
        
        screen.innerHTML = "";
        
        setTimeout(async () => {
            await escrever("", 30);
            await escrever("════════════════════════════════════════", 30);
            await escrever("   [ ACESSO LIBERADO ]", 35);
            await escrever("", 30);
            await escrever(`   BEM-VINDO, SUJEITO ${dados.numero}`, 40);
            await escrever("", 30);
            await escrever(`   NUMERO   : ${dados.numero}`, 35);
            await escrever(`   STATUS   : ${dados.estado}`, 35);
            await escrever(`   RELACAO  : ${dados.relacao}`, 35);
            if (dados.idade) await escrever(`   IDADE    : ${dados.idade}`, 35);
            if (dados.nascimento) await escrever(`   NASCIMENTO: ${dados.nascimento}`, 35);
            if (dados.titulo) await escrever(`   TITULO   : ${dados.titulo}`, 35);
            await escrever("", 30);
            await escrever("   [ ACESSO LIBERADO ]", 35);
            await escrever("════════════════════════════════════════", 30);
            
            setTimeout(() => {
                carregarQuestionario();
            }, 4000);
        }, 300);
        
    } else {
        playDeniedSound();
        
        const msgDiv = document.createElement('div');
        msgDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ff4444;
            font-size: 18px;
            font-family: Consolas, monospace;
            text-align: center;
            background: rgba(0, 0, 0, 0.95);
            padding: 30px 40px;
            border: 2px solid #ff4444;
            z-index: 9999;
            animation: glitch 0.1s infinite;
            box-shadow: 0 0 50px rgba(255, 0, 0, 0.3);
        `;
        msgDiv.textContent = '[ CODIGO INCORRETO ]';
        document.body.appendChild(msgDiv);
        
        document.getElementById("codigo").value = '';
        document.getElementById("codigo").focus();
        
        setTimeout(() => {
            if (msgDiv.parentNode) msgDiv.remove();
            if (btn) {
                btn.dataset.clicado = 'false';
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            }
        }, 2000);
    }
}

// ========== CONTINUAR SEM ID ==========
function continuarSemID(nome) {
    const dados = subjects[nome];
    if (!dados) return;
    
    const overlay = document.createElement('div');
    overlay.id = 'confirmOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: edenFadeIn 0.5s ease-out;
    `;
    
    overlay.innerHTML = `
        <div style="
            background: rgba(10, 0, 0, 0.95);
            border: 2px solid #ff4444;
            padding: 40px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 0 60px rgba(255, 0, 0, 0.1);
            font-family: Consolas, monospace;
        ">
            <div style="color: #ff4444; font-size: 20px; margin-bottom: 10px;">ATENCAO</div>
            <div style="color: #ffaa00; font-size: 14px; margin-bottom: 5px;">SUJEITO ${dados.numero}</div>
            <div style="color: #fff; font-size: 14px; margin-bottom: 15px;">${dados.nome}</div>
            <div style="color: #888; font-size: 13px; margin-bottom: 20px; line-height: 1.6;">
                Voce esta acessando <span style="color: #ff4444;">SEM VERIFICACAO DE ID</span>.<br>
                Algumas perguntas especificas <span style="color: #ff4444;">nao serao exibidas</span>.
            </div>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button onclick="confirmarSemID('${nome}')" style="
                    padding: 12px 30px;
                    background: transparent;
                    color: #ff4444;
                    border: 1px solid #ff4444;
                    cursor: pointer;
                    font-family: Consolas, monospace;
                    font-size: 14px;
                    transition: all 0.3s;
                " onmouseover="this.style.background='#ff4444';this.style.color='#000';" onmouseout="this.style.background='transparent';this.style.color='#ff4444';">
                    [ CONTINUAR ]
                </button>
                <button onclick="fecharConfirmOverlay()" style="
                    padding: 12px 30px;
                    background: transparent;
                    color: #666;
                    border: 1px solid #333;
                    cursor: pointer;
                    font-family: Consolas, monospace;
                    font-size: 14px;
                    transition: all 0.3s;
                " onmouseover="this.style.borderColor='#ff4444';this.style.color='#ff4444';" onmouseout="this.style.borderColor='#333';this.style.color='#666';">
                    [ VOLTAR ]
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

function fecharConfirmOverlay() {
    const overlay = document.getElementById('confirmOverlay');
    if (overlay) overlay.remove();
}

function confirmarSemID(nome) {
    fecharConfirmOverlay();
    
    const dados = subjects[nome];
    if (!dados) return;
    
    playSubmitSound();
    usuarioAtual = dados;
    usuarioAtual.nome = nome;
    usuarioAtual.verificado = false;
    usuarioAtual.isVisitante = true;
    
    screen.innerHTML = "";
    
    setTimeout(async () => {
        await escrever("", 30);
        await escrever("════════════════════════════════════════", 30);
        await escrever("   [ ACESSO PARCIAL ]", 35);
        await escrever("", 30);
        await escrever(`   BEM-VINDO, SUJEITO ${dados.numero}`, 40);
        await escrever("", 30);
        await escrever(`   NUMERO   : ${dados.numero}`, 35);
        await escrever(`   STATUS   : ${dados.estado}`, 35);
        await escrever(`   RELACAO  : ${dados.relacao}`, 35);
        if (dados.idade) await escrever(`   IDADE    : ${dados.idade}`, 35);
        if (dados.nascimento) await escrever(`   NASCIMENTO: ${dados.nascimento}`, 35);
        if (dados.titulo) await escrever(`   TITULO   : ${dados.titulo}`, 35);
        await escrever("", 30);
        await escrever("   [ ACESSO PARCIAL ]", 35);
        await escrever("   PERGUNTAS ESPECIFICAS BLOQUEADAS.", 35);
        await escrever("════════════════════════════════════════", 30);
        
        setTimeout(() => {
            carregarQuestionarioVisitante();
        }, 4000);
    }, 300);
}

// ========== GET PERGUNTA ATUAL ==========
function getPerguntaAtual() {
    if (perguntaAtual < questions.length) {
        return questions[perguntaAtual];
    } else {
        const userId = usuarioAtual?.id;
        if (userId && perguntasPersonalizadas[userId]) {
            const index = perguntaAtual - questions.length;
            if (index < perguntasPersonalizadas[userId].length) {
                return {
                    id: `personalizada_${index}`,
                    category: "[PERGUNTAS ESPECIFICAS]",
                    question: perguntasPersonalizadas[userId][index],
                    type: "text"
                };
            }
        }
    }
    return null;
}

// ========== RESPONDER SIM ==========
function responder(resposta) {
    playSimSound();
    
    const p = getPerguntaAtual();
    if (p) {
        respostas.push({
            question: p.question,
            answer: resposta,
            category: p.category || "Geral"
        });
        perguntasRespondidasNaCategoria++;
    }
    perguntaAtual++;
    telaLoading();
}

// ========== RESPONDER NAO ==========
function responderNao(isBloqueado) {
    const bloqueado = isBloqueado === true || isBloqueado === 'true';
    
    if (bloqueado) {
        playDeniedSound();
        
        const btnNao = document.getElementById('btnNao');
        if (btnNao) {
            btnNao.style.borderColor = '#ff4444';
            btnNao.style.color = '#ff4444';
            btnNao.style.background = 'rgba(255,0,0,0.2)';
            btnNao.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btnNao.style.transform = 'scale(1)';
                btnNao.style.borderColor = '#333';
                btnNao.style.color = '#555';
                btnNao.style.background = '#1a1a1a';
            }, 300);
        }
        
        const msgDiv = document.createElement('div');
        msgDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ff4444;
            font-size: 18px;
            font-family: Consolas, monospace;
            text-align: center;
            background: rgba(0, 0, 0, 0.95);
            padding: 30px 40px;
            border: 2px solid #ff4444;
            z-index: 9999;
            animation: glitch 0.1s infinite;
            box-shadow: 0 0 50px rgba(255, 0, 0, 0.3);
        `;
        msgDiv.textContent = '[ ACESSO NEGADO - VOCE NAO PODE RECUSAR ]';
        document.body.appendChild(msgDiv);
        
        setTimeout(() => {
            if (msgDiv.parentNode) msgDiv.remove();
        }, 2000);
        
        return;
    }
    
    playNaoSound();
    
    const p = getPerguntaAtual();
    if (p) {
        respostas.push({
            question: p.question,
            answer: 'Nao',
            category: p.category || "Geral"
        });
        perguntasRespondidasNaCategoria++;
    }
    perguntaAtual++;
    telaLoading();
}

// ========== PROXIMA PERGUNTA (TEXT) ==========
// ========== PROXIMA PERGUNTA (TEXT) ==========
function proximaPergunta() {
    const btn = document.querySelector('button[onclick="proximaPergunta()"]');
    if (btn && btn.dataset.clicado === 'true') {
        return;
    }
    if (btn) {
        btn.dataset.clicado = 'true';
        btn.style.opacity = '0.5';
        btn.style.cursor = 'default';
    }
    
    const input = document.getElementById("answer");
    if (!input) {
        console.error("Input não encontrado!");
        const p = getPerguntaAtual();
        if (p) {
            respostas.push({
                question: p.question,
                answer: "[SEM RESPOSTA]",
                category: p.category || "Geral"
            });
            perguntasRespondidasNaCategoria++;
        }
        perguntaAtual++;
        telaLoading();
        if (btn) {
            btn.dataset.clicado = 'false';
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        }
        return;
    }
    
    const resposta = input.value.trim();

    if (!resposta) {
        playEmptyFieldSound();
        
        const msgDiv = document.createElement('div');
        msgDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ff4444;
            font-size: 18px;
            font-family: Consolas, monospace;
            text-align: center;
            background: rgba(0, 0, 0, 0.95);
            padding: 30px 40px;
            border: 2px solid #ff4444;
            z-index: 9999;
            animation: glitch 0.1s infinite;
            box-shadow: 0 0 50px rgba(255, 0, 0, 0.3);
        `;
        msgDiv.textContent = '[ POR FAVOR, ESCREVA ALGO ]';
        document.body.appendChild(msgDiv);
        
        input.style.borderColor = '#ff4444';
        input.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.5)';
        input.placeholder = 'DIGITE ALGO...';
        
        setTimeout(() => {
            if (msgDiv.parentNode) msgDiv.remove();
            input.style.borderColor = 'red';
            input.style.boxShadow = 'none';
            input.placeholder = 'Digite sua resposta...';
            if (btn) {
                btn.dataset.clicado = 'false';
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            }
            input.focus();
        }, 2000);
        
        return;
    }

    playSubmitSound();

    const p = getPerguntaAtual();
    if (p) {
        respostas.push({
            question: p.question,
            answer: resposta,
            category: p.category || "Geral"
        });
        perguntasRespondidasNaCategoria++;
    }
    perguntaAtual++;
    telaLoading();
    
    if (btn) {
        btn.dataset.clicado = 'false';
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
    }
}

// ========== PULAR CATEGORIA (MODO TESTE) ==========
function pularCategoria() {
    if (!modoTeste) return;
    
    if (categoriaAtual && !categoriasConcluidas.includes(categoriaAtual)) {
        categoriasConcluidas.push(categoriaAtual);
    }
    
    let proximaCategoria = null;
    let proximoIndex = perguntaAtual;
    
    const listaPerguntas = window.isVisitante ? (window.perguntasVisitante || []) : questions;
    
    for (let i = perguntaAtual + 1; i < listaPerguntas.length; i++) {
        if (listaPerguntas[i].category !== categoriaAtual) {
            proximaCategoria = listaPerguntas[i].category;
            proximoIndex = i;
            break;
        }
    }
    
    if (proximaCategoria) {
        perguntaAtual = proximoIndex;
        categoriaAtual = proximaCategoria;
        perguntasNaCategoria = categoriasPerguntas[proximaCategoria]?.length || 0;
        perguntasRespondidasNaCategoria = 0;
        screen.innerHTML = "";
        
        if (window.isVisitante) {
            mostrarPerguntaVisitante();
        } else {
            mostrarPergunta();
        }
    } else {
        fim();
    }
}

// ========== TELA DE LOADING ==========
async function telaLoading() {
    screen.innerHTML = "";

    await escrever("> Salvando resposta...");
    await esperar(300);
    await escrever("> Criptografando dados...");
    await esperar(300);
    await escrever("> Enviando para servidor...");
    await esperar(500);
    await escrever("");
    await escrever("[ OK ] Dados sincronizados.");

    await esperar(900);
    mostrarPergunta();
}

// ========== MOSTRAR PERGUNTA ==========
async function mostrarPergunta() {
    let p = null;
    const totalPerguntas = questions.length + (perguntasPersonalizadas[usuarioAtual?.id]?.length || 0);
    
    if (perguntaAtual < questions.length) {
        p = questions[perguntaAtual];
    } else {
        const userId = usuarioAtual?.id;
        if (userId && perguntasPersonalizadas[userId]) {
            const index = perguntaAtual - questions.length;
            if (index < perguntasPersonalizadas[userId].length) {
                p = {
                    id: `personalizada_${index}`,
                    category: "[PERGUNTAS ESPECIFICAS]",
                    question: perguntasPersonalizadas[userId][index],
                    type: "text"
                };
            }
        }
    }

    if (!p) {
        fim();
        return;
    }

    if (p.category !== categoriaAtual && categoriaAtual !== "") {
        if (!categoriasConcluidas.includes(categoriaAtual)) {
            categoriasConcluidas.push(categoriaAtual);
        }
        await mostrarHUDCategoria(categoriaAtual);
        perguntasRespondidasNaCategoria = 0;
    }

    if (p.category !== categoriaAtual) {
        categoriaAtual = p.category;
        perguntasNaCategoria = categoriasPerguntas[categoriaAtual]?.length || 0;
        perguntasRespondidasNaCategoria = 0;
    }

    // ========== CONTROLE DE GLITCH ==========
    const categoriasGlitch = {
        "[PERGUNTAS ESTRANHAS]": 1,
        "[QUEBRA-CABECA]": 2,
        "[PERGUNTAS ESPECIFICAS]": 3
    };

    if (categoriasGlitch[p.category]) {
        const nivel = categoriasGlitch[p.category];
        
        if (p.category === "[PERGUNTAS ESPECIFICAS]") {
            const perguntasEspecificas = perguntasPersonalizadas[usuarioAtual?.id] || [];
            const totalEspecificas = perguntasEspecificas.length;
            const indexAtual = perguntaAtual - questions.length;
            
            if (indexAtual >= totalEspecificas / 2) {
                ativarGlitch(3);
            } else {
                ativarGlitch(2);
            }
        } else {
            ativarGlitch(nivel);
        }
    } else {
        desativarGlitch();
    }

    screen.innerHTML = "";

    const nomeExibicao = getNomeCategoria(p.category);

    const progressoCategoria = perguntasNaCategoria > 0 
        ? `[${'#'.repeat(Math.min(Math.round((perguntasRespondidasNaCategoria / perguntasNaCategoria) * 10), 10))}${'.'.repeat(Math.max(10 - Math.min(Math.round((perguntasRespondidasNaCategoria / perguntasNaCategoria) * 10), 10), 0))}]`
        : "[..........]";

    await escrever("");
    await escrever("════════════════════════════════════════");
    await escrever(`   ${nomeExibicao}`);
    await escrever(`   ${progressoCategoria} ${perguntasRespondidasNaCategoria}/${perguntasNaCategoria}`);
    await escrever("");
    await escrever(`   PERGUNTA ${perguntaAtual + 1}/${totalPerguntas}`);
    await escrever("");
    
    if (p.category === "[PERGUNTAS ESPECIFICAS]") {
        const palavrasPergunta = p.question.split(' ');
        let linhaAtual = '';
        for (let palavra of palavrasPergunta) {
            if ((linhaAtual + ' ' + palavra).length < 40) {
                linhaAtual += (linhaAtual ? ' ' : '') + palavra;
            } else {
                await escrever(`   ${linhaAtual}`);
                linhaAtual = palavra;
            }
        }
        if (linhaAtual) {
            await escrever(`   ${linhaAtual}`);
        }
    } else {
        await escrever(`   ${p.question}`);
    }
    
    await escrever("════════════════════════════════════════");

    const isBloqueada = isPerguntaBloqueada(p);

        if (p.type === "text") {
        screen.innerHTML += `
            <div style="position:relative; width:100%; margin-top:20px;">
                <textarea id="answer" 
                    placeholder="Digite sua resposta..." 
                    rows="1"
                    style="
                        width:100%;
                        padding:12px;
                        background:black;
                        border:1px solid red;
                        color:red;
                        font-size:18px;
                        font-family:Consolas,monospace;
                        resize:none;
                        overflow:hidden;
                        min-height:50px;
                        max-height:300px;
                        box-sizing:border-box;
                        transition: all 0.1s ease;
                    "
                ></textarea>
                <button onclick="proximaPergunta()" style="
                    width:100%;
                    margin-top:15px;
                    padding:12px;
                    background:black;
                    color:red;
                    border:1px solid red;
                    cursor:pointer;
                    font-family:Consolas,monospace;
                    font-size:16px;
                    transition: all 0.3s;
                " onmouseover="this.style.background='#ff1a1a';this.style.color='#000';" onmouseout="this.style.background='black';this.style.color='red';">[ ENVIAR ]</button>
            </div>
        `;
        
        const input = document.getElementById("answer");
        if (input) {
            // Auto-expandir enquanto digita
            input.addEventListener('input', function() {
                // Reseta a altura para calcular o scrollHeight correto
                this.style.height = 'auto';
                // Define a altura baseada no conteúdo
                this.style.height = Math.min(this.scrollHeight, 300) + 'px';
                
                isUserTyping = true;
                playTypeSound_User();
                clearTimeout(window.userTypingTimeout);
                window.userTypingTimeout = setTimeout(() => {
                    isUserTyping = false;
                }, 100);
            });
            
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    proximaPergunta();
                }
            });
            
            setTimeout(() => {
                input.focus();
            }, 100);
        }
    } else {
        const btnSimStyle = `
            flex:1;
            padding:12px;
            background:black;
            color:red;
            border:1px solid red;
            cursor:pointer;
            font-family:Consolas,monospace;
            font-size:16px;
            transition: all 0.3s;
        `;
        
        const btnNaoStyle = isBloqueada ? `
            flex:1;
            padding:12px;
            background:#1a1a1a;
            color:#555;
            border:1px solid #333;
            cursor:pointer;
            font-family:Consolas,monospace;
            font-size:16px;
            transition: all 0.3s;
            opacity:0.6;
        ` : `
            flex:1;
            padding:12px;
            background:black;
            color:red;
            border:1px solid red;
            cursor:pointer;
            font-family:Consolas,monospace;
            font-size:16px;
            transition: all 0.3s;
        `;

        screen.innerHTML += `
            <div style="display:flex; gap:10px; margin-top:20px;">
                <button onclick="responder('Sim')" style="${btnSimStyle}">[ SIM ]</button>
                <button id="btnNao" onclick="responderNao(${isBloqueada})" style="${btnNaoStyle}">[ NAO ]</button>
            </div>
            ${isBloqueada ? `<div style="color:#555;font-size:11px;margin-top:8px;text-align:center;">[ TENTA. ]</div>` : ''}
        `;
        
        if (isBloqueada) {
            const btnNao = document.getElementById('btnNao');
            if (btnNao) {
                btnNao.addEventListener('mouseenter', function() {
                    this.style.borderColor = '#ff4444';
                    this.style.color = '#ff4444';
                    this.style.background = 'rgba(255,0,0,0.1)';
                });
                btnNao.addEventListener('mouseleave', function() {
                    this.style.borderColor = '#333';
                    this.style.color = '#555';
                    this.style.background = '#1a1a1a';
                });
                btnNao.addEventListener('click', function(e) {
                    this.style.transform = 'skewX(5deg)';
                    setTimeout(() => {
                        this.style.transform = 'skewX(-5deg)';
                    }, 100);
                    setTimeout(() => {
                        this.style.transform = 'skewX(0deg)';
                    }, 200);
                });
            }
        }
    }
    
    if (modoTeste) {
        screen.innerHTML += `
            <div style="margin-top:10px;display:flex;gap:5px;justify-content:center;">
                <button onclick="pularCategoria()" style="
                    padding:4px 12px;
                    background:transparent;
                    color:#ffaa00;
                    border:1px solid #ffaa00;
                    cursor:pointer;
                    font-family:Consolas,monospace;
                    font-size:10px;
                    opacity:0.5;
                ">[ PULAR CATEGORIA ]</button>
            </div>
        `;
    }
}

// ========== MOSTRAR PERGUNTA VISITANTE ==========
async function mostrarPerguntaVisitante() {
    const perguntas = window.perguntasVisitante || [];
    
    if (perguntaAtual >= perguntas.length) {
        fim();
        return;
    }
    
    const p = perguntas[perguntaAtual];
    
    if (p.category !== categoriaAtual && categoriaAtual !== "") {
        if (!categoriasConcluidas.includes(categoriaAtual)) {
            categoriasConcluidas.push(categoriaAtual);
        }
        await mostrarHUDCategoria(categoriaAtual);
        perguntasRespondidasNaCategoria = 0;
    }

    if (p.category !== categoriaAtual) {
        categoriaAtual = p.category;
        perguntasNaCategoria = categoriasPerguntas[categoriaAtual]?.length || 0;
        perguntasRespondidasNaCategoria = 0;
    }

    desativarGlitch();

    screen.innerHTML = "";

    const nomeExibicao = getNomeCategoria(p.category);

    const progressoCategoria = perguntasNaCategoria > 0 
        ? `[${'#'.repeat(Math.min(Math.round((perguntasRespondidasNaCategoria / perguntasNaCategoria) * 10), 10))}${'.'.repeat(Math.max(10 - Math.min(Math.round((perguntasRespondidasNaCategoria / perguntasNaCategoria) * 10), 10), 0))}]`
        : "[..........]";

    await escrever("");
    await escrever("════════════════════════════════════════");
    await escrever(`   ${nomeExibicao}`);
    await escrever(`   ${progressoCategoria} ${perguntasRespondidasNaCategoria}/${perguntasNaCategoria}`);
    await escrever("");
    await escrever(`   PERGUNTA ${perguntaAtual + 1}/${perguntas.length}`);
    await escrever("");
    await escrever(`   ${p.question}`);
    await escrever("════════════════════════════════════════");

    const isBloqueada = isPerguntaBloqueada(p);

        if (p.type === "text") {
        screen.innerHTML += `
            <div style="position:relative; width:100%; margin-top:20px;">
                <textarea id="answer" 
                    placeholder="Digite sua resposta..." 
                    rows="1"
                    style="
                        width:100%;
                        padding:12px;
                        background:black;
                        border:1px solid red;
                        color:red;
                        font-size:18px;
                        font-family:Consolas,monospace;
                        resize:none;
                        overflow:hidden;
                        min-height:50px;
                        max-height:300px;
                        box-sizing:border-box;
                        transition: all 0.1s ease;
                    "
                ></textarea>
                <button onclick="proximaPergunta()" style="
                    width:100%;
                    margin-top:15px;
                    padding:12px;
                    background:black;
                    color:red;
                    border:1px solid red;
                    cursor:pointer;
                    font-family:Consolas,monospace;
                    font-size:16px;
                    transition: all 0.3s;
                " onmouseover="this.style.background='#ff1a1a';this.style.color='#000';" onmouseout="this.style.background='black';this.style.color='red';">[ ENVIAR ]</button>
            </div>
        `;
        
        const input = document.getElementById("answer");
        if (input) {
            // Auto-expandir enquanto digita
            input.addEventListener('input', function() {
                // Reseta a altura para calcular o scrollHeight correto
                this.style.height = 'auto';
                // Define a altura baseada no conteúdo
                this.style.height = Math.min(this.scrollHeight, 300) + 'px';
                
                isUserTyping = true;
                playTypeSound_User();
                clearTimeout(window.userTypingTimeout);
                window.userTypingTimeout = setTimeout(() => {
                    isUserTyping = false;
                }, 100);
            });
            
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    proximaPergunta();
                }
            });
            
            setTimeout(() => {
                input.focus();
            }, 100);
        }
    } else {
        const btnSimStyle = `
            flex:1;
            padding:12px;
            background:black;
            color:red;
            border:1px solid red;
            cursor:pointer;
            font-family:Consolas,monospace;
            font-size:16px;
            transition: all 0.3s;
        `;
        
        const btnNaoStyle = isBloqueada ? `
            flex:1;
            padding:12px;
            background:#1a1a1a;
            color:#555;
            border:1px solid #333;
            cursor:pointer;
            font-family:Consolas,monospace;
            font-size:16px;
            transition: all 0.3s;
            opacity:0.6;
        ` : `
            flex:1;
            padding:12px;
            background:black;
            color:red;
            border:1px solid red;
            cursor:pointer;
            font-family:Consolas,monospace;
            font-size:16px;
            transition: all 0.3s;
        `;

        screen.innerHTML += `
            <div style="display:flex; gap:10px; margin-top:20px;">
                <button onclick="responderVisitante('Sim')" style="${btnSimStyle}">[ SIM ]</button>
                <button id="btnNao" onclick="responderNaoVisitante(${isBloqueada})" style="${btnNaoStyle}">[ NAO ]</button>
            </div>
            ${isBloqueada ? `<div style="color:#555;font-size:11px;margin-top:8px;text-align:center;">[ TENTA. ]</div>` : ''}
        `;
        
        if (isBloqueada) {
            const btnNao = document.getElementById('btnNao');
            if (btnNao) {
                btnNao.addEventListener('mouseenter', function() {
                    this.style.borderColor = '#ff4444';
                    this.style.color = '#ff4444';
                    this.style.background = 'rgba(255,0,0,0.1)';
                });
                btnNao.addEventListener('mouseleave', function() {
                    this.style.borderColor = '#333';
                    this.style.color = '#555';
                    this.style.background = '#1a1a1a';
                });
                btnNao.addEventListener('click', function(e) {
                    this.style.transform = 'skewX(5deg)';
                    setTimeout(() => {
                        this.style.transform = 'skewX(-5deg)';
                    }, 100);
                    setTimeout(() => {
                        this.style.transform = 'skewX(0deg)';
                    }, 200);
                });
            }
        }
    }
}

// ========== RESPONDER VISITANTE ==========
function responderVisitante(resposta) {
    const perguntas = window.perguntasVisitante || [];
    const p = perguntas[perguntaAtual];
    if (p) {
        respostas.push({
            question: p.question,
            answer: resposta,
            category: p.category || "Geral"
        });
        perguntasRespondidasNaCategoria++;
    }
    perguntaAtual++;
    telaLoadingVisitante();
}

function responderNaoVisitante(isBloqueado) {
    const bloqueado = isBloqueado === true || isBloqueado === 'true';
    
    if (bloqueado) {
        playDeniedSound();
        
        const msgDiv = document.createElement('div');
        msgDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ff4444;
            font-size: 18px;
            font-family: Consolas, monospace;
            text-align: center;
            background: rgba(0, 0, 0, 0.95);
            padding: 30px 40px;
            border: 2px solid #ff4444;
            z-index: 9999;
            animation: glitch 0.1s infinite;
            box-shadow: 0 0 50px rgba(255, 0, 0, 0.3);
        `;
        msgDiv.textContent = '[ ACESSO NEGADO - VOCE NAO PODE RECUSAR ]';
        document.body.appendChild(msgDiv);
        
        setTimeout(() => {
            if (msgDiv.parentNode) msgDiv.remove();
        }, 2000);
        return;
    }
    
    playNaoSound();
    const perguntas = window.perguntasVisitante || [];
    const p = perguntas[perguntaAtual];
    if (p) {
        respostas.push({
            question: p.question,
            answer: 'Nao',
            category: p.category || "Geral"
        });
        perguntasRespondidasNaCategoria++;
    }
    perguntaAtual++;
    telaLoadingVisitante();
}

// ========== PROXIMA PERGUNTA (TEXT) ==========
function proximaPergunta() {
    const btn = document.querySelector('button[onclick="proximaPergunta()"]');
    if (btn && btn.dataset.clicado === 'true') {
        return;
    }
    if (btn) {
        btn.dataset.clicado = 'true';
        btn.style.opacity = '0.5';
        btn.style.cursor = 'default';
    }
    
    const input = document.getElementById("answer");
    if (!input) {
        console.error("Input não encontrado!");
        const p = getPerguntaAtual();
        if (p) {
            respostas.push({
                question: p.question,
                answer: "[SEM RESPOSTA]",
                category: p.category || "Geral"
            });
            perguntasRespondidasNaCategoria++;
        }
        perguntaAtual++;
        telaLoading();
        if (btn) {
            btn.dataset.clicado = 'false';
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        }
        return;
    }
    
    const resposta = input.value.trim();

    if (!resposta) {
        playEmptyFieldSound();
        
        const msgDiv = document.createElement('div');
        msgDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ff4444;
            font-size: 18px;
            font-family: Consolas, monospace;
            text-align: center;
            background: rgba(0, 0, 0, 0.95);
            padding: 30px 40px;
            border: 2px solid #ff4444;
            z-index: 9999;
            animation: glitch 0.1s infinite;
            box-shadow: 0 0 50px rgba(255, 0, 0, 0.3);
        `;
        msgDiv.textContent = '[ POR FAVOR, ESCREVA ALGO ]';
        document.body.appendChild(msgDiv);
        
        input.style.borderColor = '#ff4444';
        input.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.5)';
        input.placeholder = 'DIGITE ALGO...';
        
        setTimeout(() => {
            if (msgDiv.parentNode) msgDiv.remove();
            input.style.borderColor = 'red';
            input.style.boxShadow = 'none';
            input.placeholder = 'Digite sua resposta...';
            if (btn) {
                btn.dataset.clicado = 'false';
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            }
            input.focus();
        }, 2000);
        
        return;
    }

    playSubmitSound();

    const p = getPerguntaAtual();
    if (p) {
        respostas.push({
            question: p.question,
            answer: resposta,
            category: p.category || "Geral"
        });
        perguntasRespondidasNaCategoria++;
    }
    perguntaAtual++;
    telaLoading();
    
    if (btn) {
        btn.dataset.clicado = 'false';
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
    }
}

async function telaLoadingVisitante() {
    screen.innerHTML = "";
    await escrever("> Salvando resposta...");
    await esperar(300);
    await escrever("> Criptografando dados...");
    await esperar(300);
    await escrever("> Enviando para servidor...");
    await esperar(500);
    await escrever("");
    await escrever("[ OK ] Dados sincronizados.");
    await esperar(900);
    mostrarPerguntaVisitante();
}

// ========== SOM DE NEGACAO ==========
function playDeniedSound() {
    if (!audioEnabled) return;
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
            return;
        }
        
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.3);
        
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.3);
        
        setTimeout(() => {
            try {
                const osc2 = audioCtx.createOscillator();
                const gain2 = audioCtx.createGain();
                osc2.connect(gain2);
                gain2.connect(audioCtx.destination);
                osc2.type = 'square';
                osc2.frequency.setValueAtTime(200, audioCtx.currentTime);
                gain2.gain.setValueAtTime(0.03, audioCtx.currentTime);
                gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
                osc2.start(audioCtx.currentTime);
                osc2.stop(audioCtx.currentTime + 0.15);
            } catch(e) {}
        }, 200);
        
    } catch(e) {}
}

// ========== ENVIAR PARA FORMSPREE ==========
const FORMSPREE_ID = 'xnjevooo';

async function enviarParaFormspree() {
    if (FORMSPREE_ID === 'ID') {
        console.log('Formspree não configurado. Configure o FORMSPREE_ID.');
        return false;
    }
    
    const dados = {
        sujeito: usuarioAtual?.nome || 'Desconhecido',
        numero: usuarioAtual?.numero || 'N/A',
        status: usuarioAtual?.estado || 'N/A',
        total_respostas: respostas.length,
        respostas: respostas.map(r => `${r.question}\nResposta: ${r.answer}`).join('\n\n'),
        timestamp: new Date().toLocaleString()
    };
    
    try {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        
        if (response.ok) {
            console.log('Questionário enviado com sucesso para o Formspree!');
            return true;
        } else {
            console.error('Erro ao enviar para Formspree:', response.status);
            return false;
        }
    } catch(e) {
        console.error('Erro de rede ao enviar para Formspree:', e);
        return false;
    }
}

// ========== TELA DE AGRADECIMENTO FINAL ==========
async function fim() {
    if (categoriaAtual && !categoriasConcluidas.includes(categoriaAtual)) {
        categoriasConcluidas.push(categoriaAtual);
    }
    
    desativarGlitch();
    
    if (typeof adicionarQuestionario === 'function') {
        adicionarQuestionario({
            sujeito: usuarioAtual?.nome || 'Desconhecido',
            respostas: respostas
        });
    }
    
    if (typeof enviarParaFormspree === 'function') {
        await enviarParaFormspree();
    }
    
    screen.innerHTML = "";

    await escrever("");
    await escrever("════════════════════════════════════════");
    await escrever("   [ # ] OBRIGADO POR PARTICIPAR.");
    await escrever("");
    await escrever("   Sua inscricao foi registrada com sucesso.");
    await escrever("════════════════════════════════════════");

    await esperar(1000);
    
    screen.innerHTML = `
        <div style="font-family: Consolas, monospace; color: #ff1a1a; padding: 10px 0;">
            <div style="color: #666; font-size: 13px; line-height: 1.8; margin-bottom: 20px; text-align: justify;">
                Em nome de toda a equipe da <span style="color: #ff1a1a; font-weight: bold;">Aescula Biotech Industries</span>, 
                agradecemos por dedicar seu tempo ao preenchimento deste questionário e por demonstrar 
                interesse em participar de nossos programas de pesquisa clínica.
                <br><br>
                Cada voluntário representa um passo importante para o desenvolvimento de novas tecnologias 
                capazes de transformar o futuro da medicina e melhorar a qualidade de vida de milhões de pessoas.
                <br><br>
                Nas próximas semanas, nossa equipe analisará cuidadosamente suas informações. 
                Caso seu perfil seja compatível com os critérios do estudo, entraremos em contato.
            </div>
            
            <div style="border-top: 1px solid #333; padding-top: 15px; margin-top: 15px;">
                <div style="color: #ffaa00; font-size: 14px; margin-bottom: 8px;">— Uma mensagem do Diretor de Pesquisa</div>
                <div style="color: #888; font-size: 13px; line-height: 1.8; font-style: italic; text-align: justify; padding: 10px 15px; border-left: 2px solid #ff1a1a;">
                    "Durante séculos, a humanidade sobreviveu graças à coragem daqueles que aceitaram dar o primeiro passo rumo ao desconhecido. 
                    Cada avanço da medicina, cada cura e cada descoberta nasceram porque alguém acreditou que o amanhã poderia ser melhor do que o hoje.
                    <br><br>
                    Obrigado por caminhar conosco nessa direção."
                    <br><br>
                    <span style="color: #ff1a1a;">— Dr. Matthias Bergman</span>
                    <span style="color: #666; font-size: 12px;">Diretor de Pesquisa Avançada</span>
                    <br>
                    <span style="color: #666; font-size: 12px;">Aescula Biotech Industries</span>
                </div>
            </div>
            
            <div style="border-top: 2px solid #ff1a1a; padding-top: 15px; margin-top: 15px; text-align: center;">
                <div style="color: #ff1a1a; font-size: 18px; font-weight: bold; letter-spacing: 4px;">AESCULA BIOTECH</div>
                <div style="color: #666; font-size: 12px; letter-spacing: 3px;">"Advancing Human Potential."</div>
            </div>
            
            <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
                <button onclick="mostrarEdenMenu()" style="flex:1; padding: 12px; background: black; color: #666; border: 1px solid #333; cursor: pointer; font-family: Consolas, monospace; font-size: 14px;">
                    [ VOLTAR AO EDEN ]
                </button>
                ${window.usuarioEden?.nivel === "OMEGA" || isAdmin ? `
                <button onclick="if(typeof mostrarPainelAdmin === 'function') mostrarPainelAdmin()" style="flex:1; padding: 12px; background: black; color: #ffaa00; border: 1px solid #ffaa00; cursor: pointer; font-family: Consolas, monospace; font-size: 14px;">
                    [ ADMIN - OMEGA-5 ]
                </button>
                ` : ''}
            </div>
        </div>
    `;
}