// ========== PAINEL ADMINISTRATIVO - DR. MATTHIAS BERGMAN ==========
let isAdmin = false;
let abaAtual = 'dashboard';

// ========== BANCO DE DADOS DE QUESTIONARIOS ==========
let questionariosSalvos = [];

function carregarQuestionarios() {
    const salvos = localStorage.getItem('aescula_questionarios');
    if (salvos) {
        try {
            questionariosSalvos = JSON.parse(salvos);
        } catch(e) {
            questionariosSalvos = [];
        }
    }
}

function salvarQuestionarios() {
    localStorage.setItem('aescula_questionarios', JSON.stringify(questionariosSalvos));
}

function adicionarQuestionario(dados) {
    const novo = {
        id: Date.now(),
        data: new Date().toISOString(),
        sujeito: dados.sujeito || 'Desconhecido',
        respostas: dados.respostas || [],
        total: dados.respostas?.length || 0
    };
    questionariosSalvos.unshift(novo);
    salvarQuestionarios();
    return novo;
}

carregarQuestionarios();

// ========== ARQUIVOS SECRETOS COM PDFS ==========
const arquivosSecretos = [
    { 
        nome: "EVA.pdf", 
        descricao: "Projeto EVA - Criacao de seres adaptados",
        pdf: "pdfs/eva.pdf",
        conteudo: "PROJETO EVA - RELATORIO FINAL\n\nO Projeto EVA foi iniciado em 2024..."
    },
    { 
        nome: "ADAM.pdf", 
        descricao: "Projeto ADAM - Criacao de seres adaptados",
        pdf: "pdfs/adam.pdf",
        conteudo: "PROJETO ADAM - RELATORIO INICIAL\n\n..."
    },
    { 
        nome: "NOVA_HUMANIDADE.docx", 
        descricao: "Plano de substituicao da humanidade",
        pdf: null,
        conteudo: "PLANO NOVA HUMANIDADE\n\nObjetivo: Substituir a populacao atual..."
    },
    { 
        nome: "PORTADORES.db", 
        descricao: "Banco de dados de portadores infectados",
        pdf: null,
        conteudo: "BANCO DE DADOS - PORTADORES\n\nTOTAL: 47 registros..."
    },
    { 
        nome: "FINAL_PROTOCOL.mp4", 
        descricao: "Protocolo final de destruicao em massa",
        pdf: "pdfs/protocolo_final.pdf",
        conteudo: "PROTOCOLO FINAL - NIVEL OMEGA-5\n\n..."
    }
];

// ========== CONFIGURACAO DE AUDIO PARA LOGS ==========
const logsAudio = {
    "LOG_01": { arquivo: "logs/log_01.mp3", duracao: 30 },
    "LOG_02": { arquivo: "logs/log_02.mp3", duracao: 45 },
    "LOG_03": { arquivo: "logs/log_03.mp3", duracao: 25 },
    "LOG_04": { arquivo: "logs/log_04.mp3", duracao: 38 },
    "LOG_05": { arquivo: "logs/log_05.mp3", duracao: 42 },
    "LOG_06": { arquivo: "logs/log_06.mp3", duracao: 35 },
    "LOG_07": { arquivo: "logs/log_07.mp3", duracao: 28 },
    "LOG_08": { arquivo: "logs/log_08.mp3", duracao: 50 },
    "LOG_09": { arquivo: "logs/log_09.mp3", duracao: 32 },
    "LOG_10": { arquivo: "logs/log_10.mp3", duracao: 40 },
    "LOG_11": { arquivo: "logs/log_11.mp3", duracao: 55 },
    "LOG_12": { arquivo: "logs/log_12.mp3", duracao: 28 },
    "LOG_13": { arquivo: "logs/log_13.mp3", duracao: 35 },
    "LOG_14": { arquivo: "logs/log_14.mp3", duracao: 42 },
    "LOG_15": { arquivo: "logs/log_15.mp3", duracao: 38 },
    "LOG_16": { arquivo: "logs/log_16.mp3", duracao: 45 },
    "LOG_17": { arquivo: "logs/log_17.mp3", duracao: 215 },
    "LOG_18": { arquivo: "logs/log_18.mp3", duracao: 60 }
};

// ========== CONFIGURACAO DE VIDEOS PARA SEGURANCA ==========
const videosSeguranca = {
    "28/08 - Corredor A": { arquivo: "videos/corredor_a.mp4", thumbnail: "🎥" },
    "28/08 - Corredor A (erro)": { arquivo: "videos/erro_video.mp4", thumbnail: "⚠️" },
    "27/08 - Laboratorio 3": { arquivo: "videos/lab3_movimento.mp4", thumbnail: "📹" },
    "26/08 - Setor B": { arquivo: "videos/setor_b_corrompido.mp4", thumbnail: "💀" },
    "25/08 - Corredor A": { arquivo: "videos/corredor_a_25.mp4", thumbnail: "🎥" }
};

// ========== DADOS MOCKADOS ==========
const dadosLaboratorios = [
    { nome: "Alagoinha", status: "Contencao Perdida", coordenadas: [-8.46, -35.72] },
    { nome: "Manaus", status: "Offline", coordenadas: [-3.07, -60.02] },
    { nome: "Curitiba", status: "Comunicacao Perdida", coordenadas: [-25.42, -49.27] },
    { nome: "Brasilia", status: "Evacuacao", coordenadas: [-15.79, -47.88] },
    { nome: "Sao Paulo", status: "Sem Resposta", coordenadas: [-23.55, -46.63] }
];

const dadosCobaias = [
    { id: "0032", nome: "Glauber Ferreira Amado", status: "Vivo", compatibilidade: "94%", idade: "17", historico: "Historico criminal" },
    { id: "0045", nome: "Marcus Oliver", status: "Vivo", compatibilidade: "12%", idade: "34", historico: "Sem antecedentes" },
    { id: "0051", nome: "[REDACTED]", status: "Infectado", compatibilidade: "45%", idade: "28", historico: "Sem antecedentes" },
    { id: "0068", nome: "[REDACTED]", status: "Portador", compatibilidade: "78%", idade: "41", historico: "Historico criminal" }
];

const dadosCepa = {
    estado: "Estavel",
    compatibilidade: "0.87%",
    taxaMortalidade: "98.9%",
    portadoresConfirmados: 12,
    casosAdaptacao: "Em analise"
};

const emailsInternos = [
    {
        de: "Diretoria Federal",
        para: "Dr. Matthias Bergman",
        assunto: "Destruicao da Cepa",
        data: "01/09/2029",
        corpo: "Por determinacao federal, todas as amostras restantes deverao ser eliminadas imediatamente.",
        resposta: "Solicitacao recebida."
    },
    {
        de: "Dr. Matthias Bergman",
        para: "Laboratorio Alagoinha",
        assunto: "Protocolo de Contencao",
        data: "28/08/2029",
        corpo: "Reforcar a seguranca no setor B. Relatar qualquer anomalia imediatamente.",
        resposta: "Compreendido. Setor B isolado."
    },
    {
        de: "Pesquisa Genetica",
        para: "Dr. Matthias Bergman",
        assunto: "Compatibilidade - Paciente 032",
        data: "25/08/2029",
        corpo: "O paciente 032 apresenta 94% de compatibilidade com a cepa. Recomendamos continuar os testes.",
        resposta: "Prosseguir com os testes. Monitoramento 24h."
    }
];

const logs = [
    "LOG_01 - Inicio do Projeto Lazarus",
    "LOG_02 - Primeiros testes em cobaias",
    "LOG_03 - Isolamento da cepa original",
    "LOG_04 - Falha no protocolo de seguranca",
    "LOG_05 - Relatorio de contencao",
    "LOG_06 - Perda do Laboratorio 4",
    "LOG_07 - Analise de compatibilidade",
    "LOG_08 - Evolucao da cepa",
    "LOG_09 - Primeiro caso de adaptacao",
    "LOG_10 - Relatorio interno",
    "LOG_11 - Protocolo OMEGA iniciado",
    "LOG_12 - Falha de comunicacao",
    "LOG_13 - Evacuacao de Brasilia",
    "LOG_14 - Perda de contato com Manaus",
    "LOG_15 - Analise final",
    "LOG_16 - Decisao da diretoria",
    "LOG_17 - Destruicao da cepa (pendente)",
    "LOG_18 - Fim do projeto"
];

const cameras = [
    { data: "28/08", local: "Corredor A", descricao: "Movimento detectado - Arquivo completo" },
    { data: "28/08", local: "Corredor A", descricao: "Erro de video - Arquivo corrompido" },
    { data: "27/08", local: "Laboratorio 3", descricao: "Movimento detectado - Sujeito nao identificado" },
    { data: "26/08", local: "Setor B", descricao: "Arquivo corrompido - Dano fisico" },
    { data: "25/08", local: "Corredor A", descricao: "Rutina - Sem anomalias" }
];

// ========== FUNCOES DE REPRODUCAO ==========
function reproduzirLog(logNome) {
    const logAudio = logsAudio[logNome];
    if (!logAudio) {
        alert(`[ ERRO ] Audio nao encontrado para: ${logNome}`);
        return;
    }
    
    const audioPlayer = document.createElement('audio');
    audioPlayer.src = logAudio.arquivo;
    audioPlayer.controls = true;
    audioPlayer.autoplay = true;
    audioPlayer.style.width = "100%";
    audioPlayer.style.marginTop = "10px";
    audioPlayer.style.background = "#000";
    audioPlayer.style.border = "1px solid #00ff00";
    
    const container = document.getElementById('playerContainer');
    if (container) {
        container.innerHTML = `
            <div style="border:1px solid #00ff00;padding:10px;margin-top:10px;background:rgba(0,0,0,0.5);">
                <div style="color:#ffaa00;font-size:12px;">>> REPRODUZINDO: ${logNome}</div>
                <div id="audioWrapper"></div>
                <button onclick="fecharPlayer()" style="margin-top:5px;padding:4px 12px;background:transparent;color:#ff4444;border:1px solid #ff4444;cursor:pointer;font-family:Consolas,monospace;font-size:11px;">[ FECHAR ]</button>
            </div>
        `;
        document.getElementById('audioWrapper').appendChild(audioPlayer);
    } else {
        alert(`Reproduzindo: ${logNome}\n\n(Em uma versao com servidor, o audio seria carregado.)`);
    }
}

function reproduzirVideo(titulo) {
    const videoData = videosSeguranca[titulo];
    if (!videoData) {
        alert(`[ ERRO ] Video nao encontrado para: ${titulo}`);
        return;
    }
    
    const videoPlayer = document.createElement('video');
    videoPlayer.src = videoData.arquivo;
    videoPlayer.controls = true;
    videoPlayer.autoplay = true;
    videoPlayer.style.width = "100%";
    videoPlayer.style.maxHeight = "400px";
    videoPlayer.style.marginTop = "10px";
    videoPlayer.style.background = "#000";
    videoPlayer.style.border = "1px solid #00ff00";
    
    const container = document.getElementById('playerContainer');
    if (container) {
        container.innerHTML = `
            <div style="border:1px solid #00ff00;padding:10px;margin-top:10px;background:rgba(0,0,0,0.8);">
                <div style="color:#ffaa00;font-size:12px;">>> REPRODUZINDO: ${titulo}</div>
                <div id="videoWrapper"></div>
                <button onclick="fecharPlayer()" style="margin-top:5px;padding:4px 12px;background:transparent;color:#ff4444;border:1px solid #ff4444;cursor:pointer;font-family:Consolas,monospace;font-size:11px;">[ FECHAR ]</button>
            </div>
        `;
        document.getElementById('videoWrapper').appendChild(videoPlayer);
    } else {
        alert(`Reproduzindo: ${titulo}\n\n(Em uma versao com servidor, o video seria carregado.)`);
    }
}

function fecharPlayer() {
    const container = document.getElementById('playerContainer');
    if (container) {
        container.innerHTML = '';
    }
}

// ========== VISUALIZADOR DE PDF ==========
function abrirPDF(arquivo) {
    const arquivoData = arquivosSecretos.find(a => a.nome === arquivo);
    if (!arquivoData) {
        alert(`[ ERRO ] Arquivo nao encontrado: ${arquivo}`);
        return;
    }
    
    if (arquivoData.pdf) {
        const modalHTML = `
            <div id="pdfModal" style="
                position:fixed;
                top:0;
                left:0;
                width:100%;
                height:100%;
                background:rgba(0,0,0,0.95);
                z-index:9999;
                display:flex;
                flex-direction:column;
                padding:20px;
                box-sizing:border-box;
            ">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;">
                    <div style="color:#00ff00;font-family:Consolas,monospace;font-size:18px;">
                        [ ${arquivoData.nome} ]
                    </div>
                    <button onclick="fecharPDF()" style="
                        padding:8px 20px;
                        background:transparent;
                        color:#ff4444;
                        border:1px solid #ff4444;
                        cursor:pointer;
                        font-family:Consolas,monospace;
                        font-size:14px;
                    ">[ FECHAR ]</button>
                </div>
                <div style="flex:1;background:#0a0a0a;border:1px solid #00ff00;overflow:hidden;">
                    <iframe src="${arquivoData.pdf}" style="
                        width:100%;
                        height:100%;
                        border:none;
                        background:#fff;
                    "></iframe>
                </div>
                <div style="margin-top:10px;color:#666;font-family:Consolas,monospace;font-size:12px;">
                    DESCRICAO: ${arquivoData.descricao}
                </div>
            </div>
        `;
        
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer.firstElementChild);
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                fecharPDF();
            }
        });
    } else {
        alert(`[ AVISO ] PDF INDISPONIVEL para: ${arquivoData.nome}\n\nExibindo conteudo em texto.`);
        mostrarConteudoTexto(arquivoData);
    }
}

function fecharPDF() {
    const modal = document.getElementById('pdfModal');
    if (modal) {
        modal.remove();
    }
}

function mostrarConteudoTexto(arquivoData) {
    const modalHTML = `
        <div id="pdfModal" style="
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:rgba(0,0,0,0.95);
            z-index:9999;
            display:flex;
            flex-direction:column;
            padding:20px;
            box-sizing:border-box;
        ">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;">
                <div style="color:#ffaa00;font-family:Consolas,monospace;font-size:18px;">
                    [ ${arquivoData.nome} - MODO TEXTO ]
                </div>
                <button onclick="fecharPDF()" style="
                    padding:8px 20px;
                    background:transparent;
                    color:#ff4444;
                    border:1px solid #ff4444;
                    cursor:pointer;
                    font-family:Consolas,monospace;
                    font-size:14px;
                ">[ FECHAR ]</button>
            </div>
            <div style="flex:1;background:#0a0a0a;border:1px solid #ffaa00;padding:20px;overflow-y:auto;font-family:Consolas,monospace;color:#00ff00;white-space:pre-wrap;font-size:14px;">
                ${arquivoData.conteudo || 'CONTEUDO NAO DISPONIVEL'}
            </div>
            <div style="margin-top:10px;color:#666;font-family:Consolas,monospace;font-size:12px;">
                DESCRICAO: ${arquivoData.descricao}
            </div>
        </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer.firstElementChild);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            fecharPDF();
        }
    });
}

// ========== TELA DE SENHA ==========
function telaSenha() {
    screen.innerHTML = "";
    
    setTimeout(async () => {
        await escrever("================================================", 25);
        await escrever("   [ ACESSO RESTRITO - NIVEL OMEGA-5 ]", 25);
        await escrever("");
        await escrever("   IDENTIFICACAO: DR. MATTHIAS BERGMAN", 25);
        await escrever("   CARGO: DIRETOR DE PESQUISA", 25);
        await escrever("");
        await escrever("   >>> INSIRA A SENHA DE ACESSO <<<", 25);
        await escrever("================================================", 25);
        
        screen.innerHTML += `
            <input id="senha" type="password" placeholder="Digite a senha..." style="width:100%;margin-top:20px;padding:12px;background:black;border:1px solid #ff4444;color:#ff4444;font-family:Consolas,monospace;font-size:18px;">
            <button onclick="verificarSenha()" style="width:100%;margin-top:15px;padding:12px;background:black;color:#ff4444;border:1px solid #ff4444;cursor:pointer;font-family:Consolas,monospace;font-size:16px;">[ VERIFICAR ]</button>
            <button onclick="mostrarFormulario()" style="width:100%;margin-top:10px;padding:12px;background:black;color:#666;border:1px solid #333;cursor:pointer;font-family:Consolas,monospace;font-size:14px;">[ VOLTAR ]</button>
        `;
        
        const input = document.getElementById("senha");
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
    }, 300);
}

// ========== VERIFICAR SENHA ==========
function verificarSenha() {
    const senha = document.getElementById("senha").value;
    
    if (senha === "OMEGA_5_2029" || senha === "orpheus9" || senha === "LAZARUS_PROTOCOL") {
        playEdenVoice();
        mostrarEdenModal();
    } else {
        playDeniedSound();
        
        // MENSAGEM CENTRALIZADA
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
        msgDiv.textContent = '[ SENHA INCORRETA ]';
        document.body.appendChild(msgDiv);
        
        setTimeout(() => {
            if (msgDiv.parentNode) msgDiv.remove();
        }, 2000);
    }
}

// ========== MOSTRAR MODAL EDEN ==========
function mostrarEdenModal() {
    const modal = document.getElementById('edenModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('active');
    }
}

// ========== FECHAR MODAL EDEN E ABRIR ADMIN ==========
function fecharEdenModal() {
    const modal = document.getElementById('edenModal');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
    }
    
    isAdmin = true;
    mostrarPainelAdmin();
}

// ========== PAINEL ADMIN PRINCIPAL (ESTILO ORIGINAL) ==========
function mostrarPainelAdmin() {
    const terminal = document.querySelector('.terminal');
    if (terminal) {
        terminal.style.width = "min(95vw, 1200px)";
        terminal.style.maxHeight = "95vh";
        terminal.style.transition = "all 0.5s ease";
    }
    
    screen.innerHTML = `
        <div style="font-family:Consolas,monospace;color:#00ff00;max-height:85vh;overflow-y:auto;padding:10px;">
            <!-- HEADER -->
            <div style="border-bottom:2px solid #00ff00;padding-bottom:10px;margin-bottom:20px;">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;">
                    <div>
                        <span style="color:#ff4444;font-size:20px;">█</span>
                        <span style="color:#fff;font-size:18px;">AESCULA BIOTECH</span>
                        <span style="color:#666;font-size:14px;"> | SISTEMA OMEGA-5</span>
                    </div>
                    <div style="font-size:12px;color:#666;">
                        ${new Date().toLocaleDateString()} — ${new Date().toLocaleTimeString()}
                    </div>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-top:5px;">
                    <div style="color:#fff;font-size:14px;">
                        BEM-VINDO, DR. MATTHIAS BERGMAN
                    </div>
                    <div style="color:#ffaa00;font-size:12px;">
                        NIVEL DE SEGURANCA: OMEGA-5
                    </div>
                </div>
            </div>

            <!-- MENU -->
            <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:20px;border-bottom:1px solid #333;padding-bottom:10px;">
                ${['dashboard','laboratorios','cobaias','relatorios','comunicacoes','seguranca','arquivos','logs','questionarios'].map(aba => `
                    <button onclick="mudarAba('${aba}')" id="btn_${aba}" style="
                        padding:8px 15px;
                        background:${abaAtual === aba ? '#00ff00' : 'transparent'};
                        color:${abaAtual === aba ? '#000' : '#00ff00'};
                        border:1px solid #00ff00;
                        cursor:pointer;
                        font-family:Consolas,monospace;
                        font-size:12px;
                        text-transform:uppercase;
                        transition: all 0.3s ease;
                    ">${aba.toUpperCase()}</button>
                `).join('')}
                <button onclick="sairAdmin()" style="padding:8px 15px;background:transparent;color:#ff4444;border:1px solid #ff4444;cursor:pointer;font-family:Consolas,monospace;font-size:12px;text-transform:uppercase;">[ SAIR ]</button>
            </div>

            <!-- CONTEUDO -->
            <div id="conteudoAdmin">
                ${renderizarAba(abaAtual)}
            </div>
            
            <!-- PLAYER CONTAINER -->
            <div id="playerContainer" style="margin-top:15px;"></div>
        </div>
    `;
}

// ========== RENDERIZAR ABA ==========
function renderizarAba(aba) {
    switch(aba) {
        case 'dashboard': return renderDashboard();
        case 'laboratorios': return renderLaboratorios();
        case 'cobaias': return renderCobaias();
        case 'relatorios': return renderRelatorios();
        case 'comunicacoes': return renderComunicacoes();
        case 'seguranca': return renderSeguranca();
        case 'arquivos': return renderArquivos();
        case 'logs': return renderLogs();
        case 'questionarios': return renderQuestionarios();
        default: return renderDashboard();
    }
}

// ========== DASHBOARD ==========
function renderDashboard() {
    return `
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:15px;margin-bottom:20px;">
            <div style="border:1px solid #00ff00;padding:15px;background:rgba(0,0,0,0.5);">
                <div style="color:#666;font-size:12px;">ESTADO DA CEPA</div>
                <div style="color:#00ff00;font-size:18px;">● ${dadosCepa.estado}</div>
            </div>
            <div style="border:1px solid #00ff00;padding:15px;background:rgba(0,0,0,0.5);">
                <div style="color:#666;font-size:12px;">COMPATIBILIDADE</div>
                <div style="color:#ffaa00;font-size:18px;">${dadosCepa.compatibilidade}</div>
            </div>
            <div style="border:1px solid #ff4444;padding:15px;background:rgba(0,0,0,0.5);">
                <div style="color:#666;font-size:12px;">TAXA DE MORTALIDADE</div>
                <div style="color:#ff4444;font-size:18px;">${dadosCepa.taxaMortalidade}</div>
            </div>
            <div style="border:1px solid #00ff00;padding:15px;background:rgba(0,0,0,0.5);">
                <div style="color:#666;font-size:12px;">PORTADORES CONFIRMADOS</div>
                <div style="color:#ffaa00;font-size:18px;">${dadosCepa.portadoresConfirmados}</div>
            </div>
            <div style="border:1px solid #ffaa00;padding:15px;background:rgba(0,0,0,0.5);">
                <div style="color:#666;font-size:12px;">CASOS DE ADAPTACAO</div>
                <div style="color:#ffaa00;font-size:18px;">${dadosCepa.casosAdaptacao}</div>
            </div>
        </div>
        
        <div style="border:1px solid #333;padding:15px;margin-top:10px;">
            <div style="color:#fff;font-size:14px;margin-bottom:10px;">ULTIMO ACESSO</div>
            <div style="color:#666;font-size:12px;">03/09/2029 — 01:43</div>
            <div style="color:#666;font-size:12px;margin-top:5px;">IP: 192.168.1.${Math.floor(Math.random() * 255)}</div>
        </div>
        
        <div style="border:1px solid #333;padding:15px;margin-top:10px;">
            <div style="color:#fff;font-size:14px;margin-bottom:10px;">SISTEMAS</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;">
                <div style="color:#00ff00;">● Database: Online</div>
                <div style="color:#00ff00;">● Seguranca: Ativa</div>
                <div style="color:#ffaa00;">● Laboratorios: 3/5 Online</div>
                <div style="color:#ff4444;">● Comunicacao: Parcial</div>
            </div>
        </div>
    `;
}

// ========== LABORATORIOS ==========
function renderLaboratorios() {
    return `
        <div style="border:1px solid #333;padding:15px;">
            <div style="color:#fff;font-size:14px;margin-bottom:15px;">MAPA DE LABORATORIOS</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;">
                ${dadosLaboratorios.map(lab => `
                    <div style="border:1px solid #333;padding:10px;background:rgba(0,0,0,0.3);">
                        <div style="color:#fff;font-weight:bold;">${lab.nome}</div>
                        <div style="color:${lab.status === 'Contencao Perdida' || lab.status === 'Offline' ? '#ff4444' : lab.status === 'Evacuacao' ? '#ffaa00' : '#00ff00'};font-size:12px;">● ${lab.status}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ========== COBAIAS ==========
function renderCobaias() {
    return `
        <div style="border:1px solid #333;padding:15px;overflow-x:auto;">
            <div style="color:#fff;font-size:14px;margin-bottom:15px;">REGISTRO DE COBAIAS</div>
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
                <thead>
                    <tr style="border-bottom:2px solid #00ff00;color:#666;text-align:left;">
                        <th style="padding:8px;">ID</th>
                        <th style="padding:8px;">NOME</th>
                        <th style="padding:8px;">STATUS</th>
                        <th style="padding:8px;">COMPATIBILIDADE</th>
                        <th style="padding:8px;">ACAO</th>
                    </tr>
                </thead>
                <tbody>
                    ${dadosCobaias.map(cobaia => `
                        <tr style="border-bottom:1px solid #222;">
                            <td style="padding:8px;color:#ffaa00;">${cobaia.id}</td>
                            <td style="padding:8px;color:#fff;">${cobaia.nome}</td>
                            <td style="padding:8px;color:${cobaia.status === 'Vivo' ? '#00ff00' : cobaia.status === 'Infectado' ? '#ffaa00' : '#ff4444'};">${cobaia.status}</td>
                            <td style="padding:8px;color:#00ff00;">${cobaia.compatibilidade}</td>
                            <td style="padding:8px;">
                                <button onclick="verCobaia('${cobaia.id}')" style="padding:5px 10px;background:transparent;color:#00ff00;border:1px solid #00ff00;cursor:pointer;font-family:Consolas,monospace;font-size:11px;">[ DETALHES ]</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function verCobaia(id) {
    playButtonClickSound();

    const cobaia = dadosCobaias.find(c => c.id === id);
    if (!cobaia) return;
    
    alert(`=== COBAIA ${cobaia.id} ===
    
NOME: ${cobaia.nome}
IDADE: ${cobaia.idade}
STATUS: ${cobaia.status}
COMPATIBILIDADE: ${cobaia.compatibilidade}
HISTORICO CRIMINAL: ${cobaia.historico}

ALTERACOES OBSERVADAS:
- Adaptacao genetica: ${cobaia.compatibilidade > 70 ? 'Em andamento' : 'Nao detectada'}
- Resposta a cepa: ${cobaia.status === 'Vivo' ? 'Positiva' : 'Negativa'}
`);
}

// ========== RELATORIOS ==========
function renderRelatorios() {
    return `
        <div style="border:1px solid #333;padding:15px;">
            <div style="color:#fff;font-size:14px;margin-bottom:15px;">RELATORIOS DISPONIVEIS</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;">
                <div style="border:1px solid #333;padding:10px;background:rgba(0,0,0,0.3);cursor:pointer;" onclick="playButtonClickSound(); alert('Relatorio de Contencao - 28/08/2029')">
                    <div style="color:#ffaa00;">RELATORIO_01</div>
                    <div style="color:#666;font-size:12px;">Contencao - 28/08/2029</div>
                </div>
                <div style="border:1px solid #333;padding:10px;background:rgba(0,0,0,0.3);cursor:pointer;" onclick="playButtonClickSound(); alert('Relatorio Genetico - 25/08/2029')">
                    <div style="color:#ffaa00;">RELATORIO_02</div>
                    <div style="color:#666;font-size:12px;">Genetico - 25/08/2029</div>
                </div>
                <div style="border:1px solid #333;padding:10px;background:rgba(0,0,0,0.3);cursor:pointer;" onclick="playButtonClickSound(); alert('Relatorio de Seguranca - 20/08/2029')">
                    <div style="color:#ffaa00;">RELATORIO_03</div>
                    <div style="color:#666;font-size:12px;">Seguranca - 20/08/2029</div>
                </div>
                <div style="border:1px solid #333;padding:10px;background:rgba(0,0,0,0.3);cursor:pointer;" onclick="playButtonClickSound(); alert('Relatorio Final - 15/08/2029')">
                    <div style="color:#ffaa00;">RELATORIO_04</div>
                    <div style="color:#666;font-size:12px;">Final - 15/08/2029</div>
                </div>
            </div>
            <div style="margin-top:15px;border-top:1px solid #333;padding-top:15px;">
                <div style="color:#666;font-size:12px;">ULTIMA ATUALIZACAO: ${new Date().toLocaleDateString()}</div>
            </div>
        </div>
    `;
}

// ========== COMUNICACOES ==========
function renderComunicacoes() {
    return `
        <div style="border:1px solid #333;padding:15px;max-height:400px;overflow-y:auto;">
            <div style="color:#fff;font-size:14px;margin-bottom:15px;">EMAILS INTERNOS</div>
            ${emailsInternos.map(email => `
                <div style="border:1px solid #222;padding:12px;margin-bottom:10px;background:rgba(0,0,0,0.3);">
                    <div style="display:flex;justify-content:space-between;flex-wrap:wrap;">
                        <span style="color:#ffaa00;">DE: ${email.de}</span>
                        <span style="color:#666;font-size:12px;">${email.data}</span>
                    </div>
                    <div style="color:#666;font-size:12px;">PARA: ${email.para}</div>
                    <div style="color:#fff;font-weight:bold;margin:5px 0;">ASSUNTO: ${email.assunto}</div>
                    <div style="color:#888;font-size:13px;padding:8px;background:rgba(0,0,0,0.5);border-left:2px solid #ffaa00;">
                        ${email.corpo}
                    </div>
                    <div style="color:#00ff00;font-size:12px;margin-top:5px;">
                        RESPOSTA: ${email.resposta}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ========== SEGURANCA ==========
function renderSeguranca() {
    return `
        <div style="border:1px solid #333;padding:15px;">
            <div style="color:#fff;font-size:14px;margin-bottom:15px;">CAMERAS DE SEGURANCA</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:10px;">
                ${cameras.map(cam => {
                    const videoKey = `${cam.data} - ${cam.local}`;
                    const hasVideo = videosSeguranca[videoKey];
                    return `
                        <div style="border:1px solid #333;padding:10px;background:rgba(0,0,0,0.3);">
                            <div style="display:flex;justify-content:space-between;">
                                <span style="color:#ffaa00;">${cam.data}</span>
                                <span style="color:#666;font-size:12px;">${cam.local}</span>
                            </div>
                            <div style="color:${cam.descricao.includes('Erro') || cam.descricao.includes('corrompido') ? '#ff4444' : '#fff'};font-size:13px;margin-top:5px;font-family:monospace;">
                                ${cam.descricao}
                            </div>
                            ${hasVideo ? `
                                <button onclick="reproduzirVideo('${videoKey}')" style="margin-top:8px;padding:4px 12px;background:transparent;color:#00ff00;border:1px solid #00ff00;cursor:pointer;font-family:Consolas,monospace;font-size:11px;">[ REPRODUZIR VIDEO ]</button>
                            ` : `
                                <div style="margin-top:8px;color:#666;font-size:10px;">[ VIDEO INDISPONIVEL ]</div>
                            `}
                        </div>
                    `;
                }).join('')}
            </div>
            
            <div style="margin-top:20px;border-top:1px solid #333;padding-top:15px;">
                <div style="color:#ffaa00;font-size:13px;">> MOVIMENTO DETECTADO - CORREDOR A - 28/08</div>
                <div style="color:#ff4444;font-size:13px;">> ARQUIVO CORROMPIDO - SETOR B - 26/08</div>
                <div style="color:#666;font-size:11px;margin-top:5px;">[ SISTEMA DE GRAVACAO: 85% OPERACIONAL ]</div>
            </div>
        </div>
    `;
}

// ========== ARQUIVOS ==========
function renderArquivos() {
    return `
        <div style="border:1px solid #333;padding:15px;">
            <div style="color:#fff;font-size:14px;margin-bottom:15px;">ARQUIVOS PESSOAIS - PASTA /OMEGA</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;">
                ${arquivosSecretos.map(arq => {
                    const temPDF = arq.pdf !== null && arq.pdf !== undefined;
                    const cor = temPDF ? '#ffaa00' : '#ff4444';
                    const statusPDF = temPDF ? '[ PDF DISPONIVEL ]' : '[ PDF INDISPONIVEL ]';
                    const corStatus = temPDF ? '#00ff00' : '#ff4444';
                    return `
                        <div style="border:1px solid #333;padding:12px;background:rgba(0,0,0,0.3);cursor:pointer;" onclick="playButtonClickSound(); abrirPDF('${arq.nome}')">
                            <div style="color:${cor};font-size:16px;">
                                [${arq.nome}]
                            </div>
                            <div style="color:#666;font-size:11px;margin-top:4px;">${arq.descricao}</div>
                            <div style="display:flex;gap:10px;margin-top:6px;flex-wrap:wrap;">
                                <span style="color:#00ff00;font-size:10px;">● ACESSO RESTRITO</span>
                                <span style="color:${corStatus};font-size:10px;">${statusPDF}</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <div style="margin-top:20px;border-top:2px solid #ff4444;padding-top:15px;">
                <div style="color:#ff4444;font-size:12px;">[ AVISO ] ARQUIVOS CLASSIFICADOS - NIVEL OMEGA-5</div>
                <div style="color:#666;font-size:11px;">Apenas o Diretor de Pesquisa tem autorizacao para acessar esta pasta.</div>
                <div style="color:#ffaa00;font-size:10px;margin-top:5px;">[ LARANJA ] PDF DISPONIVEL | [ VERMELHO ] PDF INDISPONIVEL</div>
            </div>
        </div>
    `;
}

// ========== LOGS ==========
function renderLogs() {
    return `
        <div style="border:1px solid #333;padding:15px;max-height:400px;overflow-y:auto;">
            <div style="color:#fff;font-size:14px;margin-bottom:15px;">REGISTRO DE LOGS - PROJETO LAZARUS</div>
            ${logs.map((log, i) => {
                const logNome = log.split(' - ')[0];
                const hasAudio = logsAudio[logNome];
                return `
                    <div style="padding:6px 10px;border-bottom:1px solid #1a1a1a;display:flex;justify-content:space-between;align-items:center;">
                        <span style="color:#ffaa00;">${log}</span>
                        <div style="display:flex;gap:5px;">
                            ${hasAudio ? `
                                <button onclick="playButtonClickSound(); reproduzirLog('${logNome}')" style="padding:2px 10px;background:transparent;color:#00ff00;border:1px solid #00ff00;cursor:pointer;font-family:Consolas,monospace;font-size:10px;">[ REPRODUZIR ]</button>
                            ` : `
                                <span style="color:#666;font-size:10px;">[ SEM AUDIO ]</span>
                            `}
                            <button onclick="playButtonClickSound(); alert('Carregando: ${log}...')" style="padding:2px 10px;background:transparent;color:#ffaa00;border:1px solid #ffaa00;cursor:pointer;font-family:Consolas,monospace;font-size:10px;">[ ABRIR ]</button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// ========== QUESTIONARIOS ==========
function renderQuestionarios() {
    carregarQuestionarios();
    
    if (questionariosSalvos.length === 0) {
        return `
            <div style="border:1px solid #333;padding:30px;text-align:center;">
                <div style="color:#666;font-size:14px;">NENHUM QUESTIONARIO ENVIADO AINDA</div>
                <div style="color:#444;font-size:12px;margin-top:10px;">Aguardando novos sujeitos...</div>
            </div>
        `;
    }
    
    return `
        <div style="border:1px solid #333;padding:15px;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:15px;">
                <div style="color:#fff;font-size:14px;">QUESTIONARIOS ENVIADOS (${questionariosSalvos.length})</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <button onclick="playButtonClickSound(); limparQuestionarios()" style="padding:6px 15px;background:transparent;color:#ff4444;border:1px solid #ff4444;cursor:pointer;font-family:Consolas,monospace;font-size:11px;">[ LIMPAR TUDO ]</button>
                    <button onclick="playButtonClickSound(); baixarQuestionarios()" style="padding:6px 15px;background:transparent;color:#00ff00;border:1px solid #00ff00;cursor:pointer;font-family:Consolas,monospace;font-size:11px;">[ BAIXAR ]</button>
                    <button onclick="playButtonClickSound(); enviarQuestionariosEmail()" style="padding:6px 15px;background:transparent;color:#ffaa00;border:1px solid #ffaa00;cursor:pointer;font-family:Consolas,monospace;font-size:11px;">[ ENVIAR EMAIL ]</button>
                </div>
            </div>
            
            <div style="max-height:500px;overflow-y:auto;">
                ${questionariosSalvos.map((q, index) => `
                    <div style="border:1px solid #222;padding:12px;margin-bottom:8px;background:rgba(0,0,0,0.3);">
                        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;margin-bottom:5px;">
                            <span style="color:#ffaa00;font-size:13px;">#${index + 1} - ${q.sujeito}</span>
                            <span style="color:#666;font-size:11px;">${new Date(q.data).toLocaleString()}</span>
                        </div>
                        <div style="color:#666;font-size:11px;">TOTAL DE RESPOSTAS: ${q.total}</div>
                        <button onclick="playButtonClickSound(); verQuestionario(${index})" style="margin-top:5px;padding:3px 12px;background:transparent;color:#00ff00;border:1px solid #00ff00;cursor:pointer;font-family:Consolas,monospace;font-size:10px;">[ VER DETALHES ]</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ========== VER QUESTIONARIO ==========
function verQuestionario(index) {
    const q = questionariosSalvos[index];
    if (!q) return;
    
    let texto = `=== QUESTIONARIO #${index + 1} ===\n\n`;
    texto += `SUJEITO: ${q.sujeito}\n`;
    texto += `DATA: ${new Date(q.data).toLocaleString()}\n`;
    texto += `TOTAL: ${q.total} respostas\n`;
    texto += `\n${'='.repeat(40)}\n\n`;
    
    q.respostas.forEach((r, i) => {
        texto += `P${i+1}: ${r.question}\n`;
        texto += `R: ${r.answer}\n\n`;
    });
    
    alert(texto);
}

// ========== LIMPAR QUESTIONARIOS ==========
function limparQuestionarios() {
    if (questionariosSalvos.length === 0) {
        alert('Nenhum questionario para limpar.');
        return;
    }
    
    if (confirm(`Tem certeza que deseja limpar TODOS os ${questionariosSalvos.length} questionarios?`)) {
        questionariosSalvos = [];
        salvarQuestionarios();
        mudarAba('questionarios');
        alert('Todos os questionarios foram removidos.');
    }
}

// ========== BAIXAR QUESTIONARIOS ==========
function baixarQuestionarios() {
    if (questionariosSalvos.length === 0) {
        alert('Nenhum questionario para baixar.');
        return;
    }
    
    let texto = "===============================================================================\n";
    texto += "   RELATORIO DE QUESTIONARIOS - AESCULA BIOTECH\n";
    texto += "===============================================================================\n\n";
    
    questionariosSalvos.forEach((q, index) => {
        texto += `=== QUESTIONARIO #${index + 1} ===\n`;
        texto += `SUJEITO: ${q.sujeito}\n`;
        texto += `DATA: ${new Date(q.data).toLocaleString()}\n`;
        texto += `TOTAL: ${q.total} respostas\n`;
        texto += `${'-'.repeat(40)}\n`;
        
        q.respostas.forEach((r, i) => {
            texto += `P${i+1}: ${r.question}\n`;
            texto += `R: ${r.answer}\n\n`;
        });
        texto += `\n${'='.repeat(50)}\n\n`;
    });
    
    texto += `\n===============================================================================\n`;
    texto += `   TOTAL DE QUESTIONARIOS: ${questionariosSalvos.length}\n`;
    texto += `   DATA DE EXPORTACAO: ${new Date().toLocaleString()}\n`;
    texto += "===============================================================================\n";
    
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `QUESTIONARIOS_AESCULA_${new Date().getTime()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// ========== ENVIAR QUESTIONARIOS POR EMAIL ==========
function enviarQuestionariosEmail() {
    if (questionariosSalvos.length === 0) {
        alert('Nenhum questionario para enviar.');
        return;
    }
    
    const email = prompt(
        "Digite o email para envio dos questionarios:\n\n" +
        "(Simulacao - os dados serao salvos localmente)"
    );
    
    if (email && isValidEmail(email)) {
        let texto = "RELATORIO DE QUESTIONARIOS - AESCULA BIOTECH\n";
        texto += "=".repeat(40) + "\n\n";
        
        questionariosSalvos.forEach((q, index) => {
            texto += `=== QUESTIONARIO #${index + 1} ===\n`;
            texto += `SUJEITO: ${q.sujeito}\n`;
            texto += `DATA: ${new Date(q.data).toLocaleString()}\n`;
            texto += `TOTAL: ${q.total} respostas\n`;
            texto += `${'-'.repeat(30)}\n`;
            
            q.respostas.forEach((r, i) => {
                texto += `Q${i+1}: ${r.question}\n`;
                texto += `R: ${r.answer}\n\n`;
            });
            texto += `\n${'='.repeat(40)}\n\n`;
        });
        
        const dados = {
            email: email,
            data: new Date().toISOString(),
            total: questionariosSalvos.length,
            questionarios: questionariosSalvos,
            relatorio: texto
        };
        localStorage.setItem('aescula_questionarios_export', JSON.stringify(dados));
        
        alert(`[ OK ] Relatorio preparado para envio!\n\nEmail: ${email}\nTotal: ${questionariosSalvos.length} questionarios\n\n(O relatorio foi salvo localmente.)`);
        
        console.log('[ DADOS PARA ENVIO ]');
        console.log(dados);
    } else if (email !== null) {
        alert('[ ERRO ] Email invalido. Tente novamente.');
    }
}

// ========== VALIDAR EMAIL ==========
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ========== MUDAR ABA ==========
function mudarAba(aba) {
    abaAtual = aba;
    playNavSound();

    document.querySelectorAll('[id^="btn_"]').forEach(btn => {
        const btnAba = btn.id.replace('btn_', '');
        if (btnAba === aba) {
            btn.style.background = '#00ff00';
            btn.style.color = '#000';
        } else {
            btn.style.background = 'transparent';
            btn.style.color = '#00ff00';
        }
    });
    
    const container = document.getElementById('conteudoAdmin');
    if (container) {
        container.innerHTML = renderizarAba(aba);
    }
    
    const playerContainer = document.getElementById('playerContainer');
    if (playerContainer) {
        playerContainer.innerHTML = '';
    }
}

// ========== SAIR DO ADMIN ==========
function sairAdmin() {
    playAdminExitSound();
    
    setTimeout(() => {
        isAdmin = false;
        const terminal = document.querySelector('.terminal');
        if (terminal) {
            terminal.style.width = "min(90vw, 700px)";
            terminal.style.maxHeight = "none";
            terminal.style.transition = "all 0.5s ease";
        }
        // Volta para o menu EDEN em vez de mostrarFormulario()
        mostrarEdenMenu();
    }, 400);
}   