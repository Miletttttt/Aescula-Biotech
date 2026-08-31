// ========== SISTEMA EDEN ==========

// ========== BANCO DE DADOS DE LOGIN ==========
const usuariosEDEN = {
    "m.bergman@aesculacorp.com": {
        nome: "Matthias Bergman",
        nivel: "OMEGA",
        senha: "OMEGA_5_2029",
        saudacao: "Bem-vindo de volta, Matthias.",
        frase: "Toda criação começa com uma única célula."
    },
    "pesquisa@aesculacorp.com": {
        nome: "Pesquisador",
        nivel: "CLASSE-B",
        senha: "research2029",
        saudacao: "Bem-vindo, Pesquisador.",
        frase: null
    },
    "visitante@aesculacorp.com": {
        nome: "Visitante",
        nivel: "PUBLICO",
        senha: "visit2029",
        saudacao: "Bem-vindo ao EDEN.",
        frase: null
    }
};

// ========== CONTROLE DE CLICK ÚNICO ==========
let botoesClicados = new Set();

function resetarBotoes() {
    botoesClicados.clear();
}

// ========== ANIMAÇÃO DE TRANSIÇÃO ==========
function transicaoEden(callback) {
    const container = document.getElementById('edenContent');
    if (!container) {
        if (callback) callback();
        return;
    }
    
    container.style.transition = 'opacity 0.2s ease';
    container.style.opacity = '0';
    
    setTimeout(() => {
        if (callback) callback();
        setTimeout(() => {
            container.style.transition = 'opacity 0.3s ease';
            container.style.opacity = '1';
        }, 80);
    }, 200);
}

function transicaoTela(callback) {
    const terminal = document.querySelector('.terminal');
    if (!terminal) {
        if (callback) callback();
        return;
    }
    
    terminal.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    terminal.style.opacity = '0';
    terminal.style.transform = 'translate(-50%, -50%) scale(0.98)';
    
    setTimeout(() => {
        if (callback) callback();
        setTimeout(() => {
            terminal.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            terminal.style.opacity = '1';
            terminal.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 80);
    }, 200);
}

// ========== ATUALIZAR CONTEÚDO ==========
function atualizarConteudoEden(html) {
    const container = document.getElementById('edenContent');
    if (!container) {
        screen.innerHTML += html;
        return;
    }
    
    transicaoEden(() => {
        container.innerHTML = html;
    });
}

// ========== TELA EDEN (MENU PRINCIPAL) ==========
function mostrarEdenMenu() {
    resetarBotoes();
    
    transicaoTela(() => {
        screen.innerHTML = `
            <div style="font-family: Consolas, monospace; color: #ff1a1a; padding: 10px 0;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 48px; color: #ff1a1a; font-family: Georgia, serif; letter-spacing: 8px; text-shadow: 0 0 30px rgba(255,0,0,0.2);">
                        E.D.E.N.
                    </div>
                    <div style="color: #666; font-size: 12px; letter-spacing: 3px; margin-top: 5px;">
                        Rede de Dados e Experimentos
                    </div>
                </div>
                
                <div style="border-top: 1px solid #333; border-bottom: 1px solid #333; padding: 15px 0; margin-bottom: 15px;">
                    <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
                        <button onclick="mostrarAbout()" style="flex:1; min-width: 100px; padding: 10px; background: transparent; color: #ff1a1a; border: 1px solid #333; cursor: pointer; font-family: Consolas, monospace; font-size: 12px; transition: all 0.3s;" onmouseover="this.style.borderColor='#ff1a1a'; this.style.color='#ff4444';" onmouseout="this.style.borderColor='#333'; this.style.color='#ff1a1a';">
                            [ SOBRE ]
                        </button>
                        <button id="btnResearch" onclick="mostrarResearch()" style="flex:1; min-width: 100px; padding: 10px; background: transparent; color: #666; border: 1px solid #333; cursor: not-allowed; font-family: Consolas, monospace; font-size: 12px; transition: all 0.3s; opacity: 0.5;">
                            [PESQUISA]
                        </button>
                        <button onclick="mostrarVolunteer()" style="flex:1; min-width: 100px; padding: 10px; background: transparent; color: #ff1a1a; border: 1px solid #333; cursor: pointer; font-family: Consolas, monospace; font-size: 12px; transition: all 0.3s;" onmouseover="this.style.borderColor='#ff1a1a'; this.style.color='#ff4444';" onmouseout="this.style.borderColor='#333'; this.style.color='#ff1a1a';">
                            [VOLUNTÁRIO]  
                        </button>
                        <button onclick="mostrarContact()" style="flex:1; min-width: 100px; padding: 10px; background: transparent; color: #ff1a1a; border: 1px solid #333; cursor: pointer; font-family: Consolas, monospace; font-size: 12px; transition: all 0.3s;" onmouseover="this.style.borderColor='#ff1a1a'; this.style.color='#ff4444';" onmouseout="this.style.borderColor='#333'; this.style.color='#ff1a1a';">
                            [ CONTATO ]
                        </button>
                        <button onclick="mostrarLogin()" style="flex:1; min-width: 100px; padding: 10px; background: transparent; color: #ff1a1a; border: 1px solid #ff1a1a; cursor: pointer; font-family: Consolas, monospace; font-size: 12px; transition: all 0.3s;" onmouseover="this.style.background='#ff1a1a'; this.style.color='#000';" onmouseout="this.style.background='transparent'; this.style.color='#ff1a1a';">
                            [ LOGIN ]
                        </button>
                    </div>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <div style="color: #ffaa00; font-size: 13px; margin-bottom: 8px; letter-spacing: 2px;">Últimas Notícias</div>
                    <div style="color: #666; font-size: 12px; line-height: 2;">
                        <span style="color: #444;">08/03/2029</span> — Programa de Pesquisa Clínica Expandido.<br>
                        <span style="color: #444;">02/02/2029</span> — Novo Laboratório Inaugurado.<br>
                        <span style="color: #444;">11/01/2029</span> — Inscrições para Voluntários Abertas.
                    </div>
                </div>
                
                <div style="border-top: 1px solid #333; padding-top: 10px; text-align: center;">
                    <div style="color: #333; font-size: 10px; letter-spacing: 2px;">
                        AESCULA BIOTECH INDUSTRIES — v.3.0
                    </div>
                </div>
                
                <div id="edenContent" style="margin-top: 15px; min-height: 50px; opacity: 1; transition: opacity 0.3s ease;"></div>
            </div>
        `;
        
        setTimeout(() => {
            const terminal = document.querySelector('.terminal');
            if (terminal) {
                terminal.style.opacity = '1';
                terminal.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        }, 50);
    });
    
    // Verifica se o usuário está logado e é OMEGA
    if (window.usuarioEden && window.usuarioEden.nivel === "OMEGA") {
        const btnResearch = document.getElementById('btnResearch');
        if (btnResearch) {
            btnResearch.style.color = '#ff1a1a';
            btnResearch.style.borderColor = '#ff1a1a';
            btnResearch.style.cursor = 'pointer';
            btnResearch.style.opacity = '1';
            btnResearch.onclick = function() { mostrarResearchOmega(); };
            btnResearch.onmouseover = function() { this.style.borderColor='#ff1a1a'; this.style.color='#ff4444'; };
            btnResearch.onmouseout = function() { this.style.borderColor='#ff1a1a'; this.style.color='#ff1a1a'; };
            btnResearch.textContent = '[ PESQUISA ⚡ ]';
        }
    }
}

// ========== FUNÇÕES DOS BOTÕES DO MENU ==========
function mostrarAbout() {
    playButtonClickSound();
    atualizarConteudoEden(`
        <div style="padding: 15px; border: 1px solid #333; background: rgba(0,0,0,0.3);">
            <div style="color: #ffaa00; font-size: 14px; margin-bottom: 10px;">SOBRE O E.D.E.N.</div>
            <div style="color: #888; font-size: 13px; line-height: 1.8;">
                O E.D.E.N. (Rede de Dados e Experimentos) é o sistema proprietário da Aescula Biotech
                para gerenciamento de pesquisa e dados. Projetado para lidar com as demandas complexas
                da pesquisa biológica avançada e gerenciamento de ensaios clínicos.
            </div>
            <button onclick="fecharConteudoEden()" style="margin-top: 10px; padding: 6px 20px; background: transparent; color: #666; border: 1px solid #333; cursor: pointer; font-family: Consolas, monospace; font-size: 11px; width: auto;" onmouseover="this.style.borderColor='#ff1a1a'; this.style.color='#ff1a1a';" onmouseout="this.style.borderColor='#333'; this.style.color='#666';">
                [ FECHAR ]
            </button>
        </div>
    `);
}

function mostrarResearch() {
    playButtonClickSound();
    atualizarConteudoEden(`
        <div style="padding: 15px; border: 1px solid #333; background: rgba(0,0,0,0.3);">
            <div style="color: #ffaa00; font-size: 14px; margin-bottom: 10px;">ACESSO RESTRITO</div>
            <div style="color: #888; font-size: 13px; line-height: 1.8;">
                Esta área é restrita a pesquisadores autorizados.<br>
                <span style="color: #666;">Faça login com uma conta de nível OMEGA para acessar.</span>
            </div>
            <button onclick="fecharConteudoEden()" style="margin-top: 10px; padding: 6px 20px; background: transparent; color: #666; border: 1px solid #333; cursor: pointer; font-family: Consolas, monospace; font-size: 11px; width: auto;" onmouseover="this.style.borderColor='#ff1a1a'; this.style.color='#ff1a1a';" onmouseout="this.style.borderColor='#333'; this.style.color='#666';">
                [ FECHAR ]
            </button>
        </div>
    `);
}

function mostrarResearchOmega() {
    playNavSound();
    atualizarConteudoEden(`
        <div style="padding: 15px; border: 1px solid #ff1a1a; background: rgba(255,0,0,0.05);">
            <div style="color: #ffaa00; font-size: 14px; margin-bottom: 10px;">ACESSO OMEGA — PESQUISA AVANÇADA</div>
            <div style="color: #888; font-size: 13px; line-height: 1.8;">
                • <span style="color: #ff1a1a;">Projeto Lazarus</span> — Estudos de adaptação genética avançada<br>
                • <span style="color: #ff1a1a;">Projeto A.D.A.M.</span> — Sistemas biológicos sintéticos<br>
                • <span style="color: #ff1a1a;">Projeto E.V.A.</span> — Protocolos de adaptação evolutiva<br>
                • <span style="color: #ffaa00;">Fase III de Ensaios Clínicos</span> — Inscrições abertas
            </div>
            <div style="margin-top: 10px; padding: 10px; border-top: 1px solid #333;">
                <div style="color: #666; font-size: 12px; font-style: italic; text-align: center;">
                    "A evolução é lenta demais." — M.B.
                </div>
            </div>
            <button onclick="fecharConteudoEden()" style="margin-top: 10px; padding: 6px 20px; background: transparent; color: #666; border: 1px solid #333; cursor: pointer; font-family: Consolas, monospace; font-size: 11px; width: auto;" onmouseover="this.style.borderColor='#ff1a1a'; this.style.color='#ff1a1a';" onmouseout="this.style.borderColor='#333'; this.style.color='#666';">
                [ FECHAR ]
            </button>
        </div>
    `);
}

function mostrarVolunteer() {
    playButtonClickSound();
    
    // Limpa o container do EDEN
    const container = document.getElementById('edenContent');
    if (container) {
        container.innerHTML = '';
    }
    
    // Transição suave para o terminal
    transicaoTela(() => {
        iniciarTerminal();
    });
}

function mostrarContact() {
    playButtonClickSound();
    atualizarConteudoEden(`
        <div style="padding: 15px; border: 1px solid #333; background: rgba(0,0,0,0.3);">
            <div style="color: #ffaa00; font-size: 14px; margin-bottom: 10px;">CONTATO</div>
            <div style="color: #888; font-size: 13px; line-height: 1.8;">
                <span style="color: #666;">Consultas Gerais:</span> pesquisa@aesculacorp.com<br>
                <span style="color: #666;">Programa de Voluntários:</span> voluntarios@aesculacorp.com<br>
                <span style="color: #666;">Ensaios Clínicos:</span> clinicos@aesculacorp.com
            </div>
            <button onclick="fecharConteudoEden()" style="margin-top: 10px; padding: 6px 20px; background: transparent; color: #666; border: 1px solid #333; cursor: pointer; font-family: Consolas, monospace; font-size: 11px; width: auto;" onmouseover="this.style.borderColor='#ff1a1a'; this.style.color='#ff1a1a';" onmouseout="this.style.borderColor='#333'; this.style.color='#666';">
                [ FECHAR ]
            </button>
        </div>
    `);
}

function fecharConteudoEden() {
    const container = document.getElementById('edenContent');
    if (container) {
        transicaoEden(() => {
            container.innerHTML = '';
        });
    }
}

// ========== TELA DE LOGIN ==========
function mostrarLogin() {
    const container = document.getElementById('edenContent');
    if (container) {
        container.innerHTML = '';
    }
    
    transicaoTela(() => {
        screen.innerHTML = `
            <div style="font-family: Consolas, monospace; color: #ff1a1a; padding: 10px 0;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 24px; color: #ff1a1a; font-family: Georgia, serif; letter-spacing: 6px;">
                        E.D.E.N.
                    </div>
                    <div style="color: #666; font-size: 11px; letter-spacing: 2px; margin-top: 3px;">
                        Autenticação de Funcionário
                    </div>
                </div>
                
                <div style="border-top: 1px solid #333; padding-top: 20px; max-width: 400px; margin: 0 auto;">
                    <div style="color: #888; font-size: 12px; margin-bottom: 5px;">Email</div>
                    <input id="loginEmail" placeholder="email@aesculacorp.com" style="width:100%; padding: 10px; background: black; border: 1px solid #333; color: #ff1a1a; font-size: 14px; font-family: Consolas, monospace; margin-bottom: 15px;">
                    
                    <div style="color: #888; font-size: 12px; margin-bottom: 5px;">Senha</div>
                    <input id="loginPassword" type="password" placeholder="••••••••" style="width:100%; padding: 10px; background: black; border: 1px solid #333; color: #ff1a1a; font-size: 14px; font-family: Consolas, monospace; margin-bottom: 20px;">
                    
                    <button id="loginButton" onclick="processarLogin()" style="width:100%; padding: 12px; background: transparent; color: #ff1a1a; border: 1px solid #ff1a1a; cursor: pointer; font-family: Consolas, monospace; font-size: 14px; transition: all 0.3s;" onmouseover="this.style.background='#ff1a1a'; this.style.color='#000';" onmouseout="this.style.background='transparent'; this.style.color='#ff1a1a';">
                        [ ENTRAR ]
                    </button>
                    
                    <button onclick="mostrarEdenMenu()" style="width:100%; margin-top: 10px; padding: 10px; background: transparent; color: #666; border: 1px solid #333; cursor: pointer; font-family: Consolas, monospace; font-size: 12px; transition: all 0.3s;" onmouseover="this.style.borderColor='#ff1a1a'; this.style.color='#ff1a1a';" onmouseout="this.style.borderColor='#333'; this.style.color='#666';">
                        [ VOLTAR ]
                    </button>
                </div>
                
                <div style="border-top: 1px solid #333; margin-top: 20px; padding-top: 10px; text-align: center;">
                    <div style="color: #333; font-size: 10px; letter-spacing: 2px;">
                        AESCULA BIOTECH INDUSTRIES
                    </div>
                </div>
                
                <div id="edenContent" style="margin-top: 15px; min-height: 50px; opacity: 1; transition: opacity 0.3s ease;"></div>
            </div>
        `;
        
        setTimeout(() => {
            const terminal = document.querySelector('.terminal');
            if (terminal) {
                terminal.style.opacity = '1';
                terminal.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        }, 50);
    });
    
    const emailInput = document.getElementById('loginEmail');
    const senhaInput = document.getElementById('loginPassword');
    
    if (emailInput) {
        emailInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('loginPassword').focus();
            }
        });
        emailInput.addEventListener('input', function() {
            isUserTyping = true;
            playTypeSound_User();
            clearTimeout(window.userTypingTimeout);
            window.userTypingTimeout = setTimeout(() => {
                isUserTyping = false;
            }, 100);
        });
        setTimeout(() => {
            emailInput.focus();
        }, 400);
    }
    
    if (senhaInput) {
        senhaInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                processarLogin();
            }
        });
        senhaInput.addEventListener('input', function() {
            isUserTyping = true;
            playTypeSound_User();
            clearTimeout(window.userTypingTimeout);
            window.userTypingTimeout = setTimeout(() => {
                isUserTyping = false;
            }, 100);
        });
    }
}

// ========== PROCESSAR LOGIN ==========
function processarLogin() {
    const btn = document.getElementById('loginButton');
    if (btn && btn.dataset.clicado === 'true') {
        return;
    }
    if (btn) {
        btn.dataset.clicado = 'true';
        btn.style.opacity = '0.5';
        btn.style.cursor = 'default';
    }
    
    playSubmitSound();
    
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginPassword').value.trim();
    
    if (!email || !senha) {
        playEmptyFieldSound();
        const msgDiv = document.createElement('div');
        msgDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ff4444;
            font-size: 16px;
            font-family: Consolas, monospace;
            text-align: center;
            background: rgba(0, 0, 0, 0.95);
            padding: 20px 30px;
            border: 2px solid #ff4444;
            z-index: 9999;
        `;
        msgDiv.textContent = '[ PREENCHA TODOS OS CAMPOS ]';
        document.body.appendChild(msgDiv);
        
        setTimeout(() => {
            if (msgDiv.parentNode) msgDiv.remove();
            if (btn) {
                btn.dataset.clicado = 'false';
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            }
        }, 2000);
        return;
    }
    
    const usuario = usuariosEDEN[email];
    
    if (!usuario || usuario.senha !== senha) {
        playDeniedSound();
        const msgDiv = document.createElement('div');
        msgDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ff4444;
            font-size: 16px;
            font-family: Consolas, monospace;
            text-align: center;
            background: rgba(0, 0, 0, 0.95);
            padding: 20px 30px;
            border: 2px solid #ff4444;
            z-index: 9999;
            animation: glitch 0.1s infinite;
        `;
        msgDiv.textContent = '[ CREDENCIAIS INCORRETAS ]';
        document.body.appendChild(msgDiv);
        
        setTimeout(() => {
            if (msgDiv.parentNode) msgDiv.remove();
            if (btn) {
                btn.dataset.clicado = 'false';
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            }
        }, 2000);
        return;
    }
    
    // LOGIN BEM-SUCEDIDO
    playAdminAccessSound();
    window.usuarioEden = usuario;
    window.usuarioEden.email = email;
    
    if (usuario.nivel === "OMEGA") {
        mostrarEdenOmegaWelcome();
    } else {
        mostrarEdenDashboard(window.usuarioEden);
    }
}

// ========== TELA DE BOAS-VINDAS OMEGA (ESTILO ORIGINAL) ==========
function mostrarEdenOmegaWelcome() {
    const usuario = window.usuarioEden;
    if (!usuario) return;
    
    playEdenVoice();
    
    transicaoTela(() => {
        screen.innerHTML = `
            <div style="font-family: Consolas, monospace; color: #ff1a1a; padding: 10px 0;">
                <div style="text-align: center; margin-bottom: 25px;">
                    <div style="font-size: 48px; color: #ff1a1a; font-family: Georgia, serif; letter-spacing: 6px; text-shadow: 0 0 30px rgba(255,0,0,0.15);">
                        ⟡ EDEN
                    </div>
                </div>
                
                <div style="text-align: center; padding: 20px 10px; margin-bottom: 20px; border-top: 1px solid rgba(255,0,0,0.1); border-bottom: 1px solid rgba(255,0,0,0.1);">
                    <div style="color: #fff; font-size: 17px; font-style: italic; margin-bottom: 8px; font-family: Georgia, serif;">
                        "E plantou o Senhor Deus um jardim no Éden, para o oriente."
                    </div>
                    <div style="color: #666; font-size: 13px;">
                        — Gênesis 2:8
                    </div>
                </div>
                
                <div style="text-align: center; color: #fff; font-size: 16px; margin-bottom: 25px;">
                    Bem-vindo de volta,<br>
                    <span style="color: #ff1a1a; font-size: 19px;">Dr. Matthias Bergman.</span>
                </div>
                
                <button onclick="mostrarEdenDashboard(window.usuarioEden)" style="width:100%; padding: 12px; background: transparent; color: #ff1a1a; border: 1px solid #ff1a1a; cursor: pointer; font-family: Consolas, monospace; font-size: 14px; transition: all 0.3s;" onmouseover="this.style.background='#ff1a1a'; this.style.color='#000';" onmouseout="this.style.background='transparent'; this.style.color='#ff1a1a';">
                    [ ACESSAR SISTEMA ]
                </button>
                
                <div id="edenContent" style="margin-top: 15px; min-height: 50px; opacity: 1; transition: opacity 0.3s ease;"></div>
            </div>
        `;
        
        setTimeout(() => {
            const terminal = document.querySelector('.terminal');
            if (terminal) {
                terminal.style.opacity = '1';
                terminal.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        }, 50);
    });
}

// ========== PAINEL EDEN ==========
function mostrarEdenDashboard(usuario) {
    if (!usuario) {
        usuario = window.usuarioEden;
        if (!usuario) {
            mostrarEdenMenu();
            return;
        }
    }
    
    const isOmega = usuario.nivel === "OMEGA";
    
    transicaoTela(() => {
        screen.innerHTML = `
            <div style="font-family: Consolas, monospace; color: #ff1a1a; padding: 10px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; border-bottom: 2px solid #ff1a1a; padding-bottom: 10px; margin-bottom: 15px;">
                    <div>
                        <span style="color: #ff1a1a; font-size: 20px;">⟡</span>
                        <span style="color: #fff; font-size: 16px;">E.D.E.N.</span>
                        <span style="color: #666; font-size: 11px;"> | ${usuario.nivel}</span>
                    </div>
                    <div style="font-size: 11px; color: #666;">
                        ${usuario.email}
                    </div>
                </div>
                
                ${isOmega ? `
                <div style="border-top: 1px solid rgba(255,0,0,0.1); border-bottom: 1px solid rgba(255,0,0,0.1); padding: 10px; margin-bottom: 15px;">
                    <div style="color: #ffaa00; font-size: 13px; font-style: italic; text-align: center;">
                        "${usuario.frase}"
                    </div>
                </div>
                ` : `
                <div style="border: 1px solid #333; padding: 10px; margin-bottom: 15px;">
                    <div style="color: #888; font-size: 14px; text-align: center;">
                        ${usuario.saudacao}
                    </div>
                </div>
                `}
                
                <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 10px;">
                    <button onclick="mostrarEdenProjects()" style="padding: 8px 15px; background: transparent; color: #ff1a1a; border: 1px solid #333; cursor: pointer; font-family: Consolas, monospace; font-size: 11px; transition: all 0.3s;" onmouseover="this.style.borderColor='#ff1a1a'; this.style.color='#ff4444';" onmouseout="this.style.borderColor='#333'; this.style.color='#ff1a1a';">
                        [ PROJETOS ]
                    </button>
                    <button onclick="mostrarEdenDocuments()" style="padding: 8px 15px; background: transparent; color: #ff1a1a; border: 1px solid #333; cursor: pointer; font-family: Consolas, monospace; font-size: 11px; transition: all 0.3s;" onmouseover="this.style.borderColor='#ff1a1a'; this.style.color='#ff4444';" onmouseout="this.style.borderColor='#333'; this.style.color='#ff1a1a';">
                        [ DOCUMENTOS ]
                    </button>
                    <button onclick="mostrarEdenPortadores()" style="padding: 8px 15px; background: transparent; color: #ff1a1a; border: 1px solid #333; cursor: pointer; font-family: Consolas, monospace; font-size: 11px; transition: all 0.3s;" onmouseover="this.style.borderColor='#ff1a1a'; this.style.color='#ff4444';" onmouseout="this.style.borderColor='#333'; this.style.color='#ff1a1a';">
                        [ PORTADORES ]
                    </button>
                    <button onclick="mostrarEdenLazarus()" style="padding: 8px 15px; background: transparent; color: #ff1a1a; border: 1px solid #333; cursor: pointer; font-family: Consolas, monospace; font-size: 11px; transition: all 0.3s;" onmouseover="this.style.borderColor='#ff1a1a'; this.style.color='#ff4444';" onmouseout="this.style.borderColor='#333'; this.style.color='#ff1a1a';">
                        [ LAZARUS ]
                    </button>
                    <button onclick="mostrarEdenAdam()" style="padding: 8px 15px; background: transparent; color: #ff1a1a; border: 1px solid #333; cursor: pointer; font-family: Consolas, monospace; font-size: 11px; transition: all 0.3s;" onmouseover="this.style.borderColor='#ff1a1a'; this.style.color='#ff4444';" onmouseout="this.style.borderColor='#333'; this.style.color='#ff1a1a';">
                        [ ADAM ]
                    </button>
                    <button onclick="mostrarEdenEva()" style="padding: 8px 15px; background: transparent; color: #ff1a1a; border: 1px solid #333; cursor: pointer; font-family: Consolas, monospace; font-size: 11px; transition: all 0.3s;" onmouseover="this.style.borderColor='#ff1a1a'; this.style.color='#ff4444';" onmouseout="this.style.borderColor='#333'; this.style.color='#ff1a1a';">
                        [ EVA ]
                    </button>
                    <button onclick="mostrarEdenSecurity()" style="padding: 8px 15px; background: transparent; color: #ff1a1a; border: 1px solid #333; cursor: pointer; font-family: Consolas, monospace; font-size: 11px; transition: all 0.3s;" onmouseover="this.style.borderColor='#ff1a1a'; this.style.color='#ff4444';" onmouseout="this.style.borderColor='#333'; this.style.color='#ff1a1a';">
                        [ SEGURANÇA ]
                    </button>
                    <button onclick="mostrarEdenLogs()" style="padding: 8px 15px; background: transparent; color: #ff1a1a; border: 1px solid #333; cursor: pointer; font-family: Consolas, monospace; font-size: 11px; transition: all 0.3s;" onmouseover="this.style.borderColor='#ff1a1a'; this.style.color='#ff4444';" onmouseout="this.style.borderColor='#333'; this.style.color='#ff1a1a';">
                        [ LOGS ]
                    </button>
                    ${isOmega ? `
                    <button onclick="mostrarEdenOmega()" style="padding: 8px 15px; background: transparent; color: #ffaa00; border: 1px solid #ffaa00; cursor: pointer; font-family: Consolas, monospace; font-size: 11px; transition: all 0.3s;" onmouseover="this.style.background='#ffaa00'; this.style.color='#000';" onmouseout="this.style.background='transparent'; this.style.color='#ffaa00';">
                        [ OMEGA ]
                    </button>
                    ` : ''}
                    ${isOmega ? `
                    <button onclick="irParaAdmin()" style="padding: 8px 15px; background: transparent; color: #ff4444; border: 1px solid #ff4444; cursor: pointer; font-family: Consolas, monospace; font-size: 11px; transition: all 0.3s;" onmouseover="this.style.background='#ff4444'; this.style.color='#000';" onmouseout="this.style.background='transparent'; this.style.color='#ff4444';">
                        [ ADMIN ]
                    </button>
                    ` : ''}
                    <button onclick="logoutEden()" style="padding: 8px 15px; background: transparent; color: #ff4444; border: 1px solid #ff4444; cursor: pointer; font-family: Consolas, monospace; font-size: 11px; transition: all 0.3s;" onmouseover="this.style.background='#ff4444'; this.style.color='#000';" onmouseout="this.style.background='transparent'; this.style.color='#ff4444';">
                        [ SAIR ]
                    </button>
                </div>
                
                <div id="edenContent" style="min-height: 200px; padding: 10px; border: 1px solid #1a1a1a; background: rgba(0,0,0,0.3); opacity: 1; transition: opacity 0.3s ease;">
                    <div style="color: #666; font-size: 13px; text-align: center; padding: 40px 0;">
                        ${isOmega ? 
                            'Bem-vindo ao EDEN, Dr. Bergman.<br><span style="color: #333; font-size: 11px;">"A perfeição não é descoberta. Ela é projetada."</span>' 
                            : 
                            'Selecione uma opção no menu acima para começar.'
                        }
                    </div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            const terminal = document.querySelector('.terminal');
            if (terminal) {
                terminal.style.opacity = '1';
                terminal.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        }, 50);
    });
}

// ========== IR PARA O ADMIN ==========
function irParaAdmin() {
    if (window.usuarioEden?.nivel !== "OMEGA") {
        playDeniedSound();
        return;
    }
    
    playAdminAccessSound();
    
    if (typeof isAdmin !== 'undefined') {
        isAdmin = true;
    }
    
    if (typeof mostrarPainelAdmin === 'function') {
        mostrarPainelAdmin();
    }
}

// ========== FUNÇÕES DAS ABAS DO EDEN ==========
function mostrarEdenProjects() {
    playNavSound();
    atualizarConteudoEden(`
        <div style="color: #ffaa00; font-size: 14px; margin-bottom: 10px;">PROJETOS ATIVOS</div>
        <div style="color: #888; font-size: 13px; line-height: 2;">
            • <span style="color: #ff1a1a;">Projeto Lazarus</span> — Adaptação Genética (Ativo)<br>
            • <span style="color: #ff1a1a;">Projeto A.D.A.M.</span> — Biologia Sintética (Ativo)<br>
            • <span style="color: #ff1a1a;">Projeto E.V.A.</span> — Protocolos Evolutivos (Pausado)<br>
            • <span style="color: #666;">Projeto Prometheus</span> — Mapeamento Neural (Planejamento)
        </div>
    `);
}

function mostrarEdenDocuments() {
    playNavSound();
    atualizarConteudoEden(`
        <div style="color: #ffaa00; font-size: 14px; margin-bottom: 10px;">DOCUMENTOS</div>
        <div style="color: #888; font-size: 13px; line-height: 2;">
            • <span style="color: #666;">Protocolo_Omega_5 — Classificado</span><br>
            • <span style="color: #666;">Sujeito_032 — Registros Médicos</span><br>
            • <span style="color: #666;">Cepa_Origem — Notas de Pesquisa</span><br>
            • <span style="color: #666;">Aescula_Biotech_Charter — Corporativo</span>
        </div>
    `);
}

function mostrarEdenPortadores() {
    playNavSound();
    atualizarConteudoEden(`
        <div style="color: #ffaa00; font-size: 14px; margin-bottom: 10px;">PORTADORES</div>
        <div style="color: #888; font-size: 13px; line-height: 2;">
            • <span style="color: #ff1a1a;">032 — Glauber F. Amado</span> — Hospedeiro — Vetor<br>
            • <span style="color: #ff1a1a;">045 — Marcus Oliver</span> — Hospedeiro — Vetor<br>
            • <span style="color: #666;">078 — Jason MacLam</span> — Livre de Vírus<br>
            • <span style="color: #666;">089 — Julius Topuria</span> — Livre de Vírus
        </div>
    `);
}

function mostrarEdenLazarus() {
    playNavSound();
    atualizarConteudoEden(`
        <div style="color: #ffaa00; font-size: 14px; margin-bottom: 10px;">PROJETO LAZARUS</div>
        <div style="color: #888; font-size: 13px; line-height: 1.8;">
            <span style="color: #ff1a1a;">Status:</span> Ativo — Fase 3<br>
            <span style="color: #ff1a1a;">Objetivo:</span> Adaptação genética avançada em sujeitos humanos<br>
            <span style="color: #ff1a1a;">Sujeitos:</span> 47 inscritos — 12 hospedeiros confirmados<br>
            <span style="color: #ff1a1a;">Líder:</span> Dr. Matthias Bergman<br><br>
            <span style="color: #666; font-size: 12px;">"A evolução é lenta demais." — M.B.</span>
        </div>
    `);
}

function mostrarEdenAdam() {
    playNavSound();
    atualizarConteudoEden(`
        <div style="color: #ffaa00; font-size: 14px; margin-bottom: 10px;">PROJETO A.D.A.M.</div>
        <div style="color: #888; font-size: 13px; line-height: 1.8;">
            <span style="color: #ff1a1a;">Status:</span> Ativo — Fase de Pesquisa<br>
            <span style="color: #ff1a1a;">Objetivo:</span> Desenvolvimento de sistemas biológicos sintéticos<br>
            <span style="color: #ff1a1a;">Líder:</span> Dr. Matthias Bergman<br><br>
            <span style="color: #666; font-size: 12px;">"A perfeição não é descoberta. Ela é projetada." — M.B.</span>
        </div>
    `);
}

function mostrarEdenEva() {
    playNavSound();
    atualizarConteudoEden(`
        <div style="color: #ffaa00; font-size: 14px; margin-bottom: 10px;">PROJETO E.V.A.</div>
        <div style="color: #888; font-size: 13px; line-height: 1.8;">
            <span style="color: #ffaa00;">Status:</span> Pausado — Revisão Necessária<br>
            <span style="color: #ff1a1a;">Objetivo:</span> Protocolos de adaptação evolutiva<br>
            <span style="color: #ff1a1a;">Líder:</span> Dr. Matthias Bergman<br><br>
            <span style="color: #666; font-size: 12px;">"Toda criação começa com uma única célula." — M.B.</span>
        </div>
    `);
}

function mostrarEdenSecurity() {
    playNavSound();
    const nivel = window.usuarioEden?.nivel || 'PUBLICO';
    const cor = nivel === 'OMEGA' ? '#00ff00' : nivel === 'CLASSE-B' ? '#ffaa00' : '#666';
    
    atualizarConteudoEden(`
        <div style="color: #ffaa00; font-size: 14px; margin-bottom: 10px;">SEGURANÇA</div>
        <div style="color: #888; font-size: 13px; line-height: 2;">
            • <span style="color: ${cor};">Nível de Segurança: ${nivel}</span><br>
            • <span style="color: #666;">Último Acesso: ${new Date().toLocaleString()}</span><br>
            • <span style="color: #666;">Sessão: Ativa</span><br>
            • <span style="color: #666;">Criptografia: Protocolo OMEGA-5</span>
        </div>
    `);
}

function mostrarEdenLogs() {
    playNavSound();
    atualizarConteudoEden(`
        <div style="color: #ffaa00; font-size: 14px; margin-bottom: 10px;">LOGS PESSOAIS</div>
        <div style="color: #888; font-size: 13px; line-height: 2;">
            • <span style="color: #666;">LOG_01 — Notas Iniciais de Pesquisa</span><br>
            • <span style="color: #666;">LOG_02 — Primeira Inscrição de Sujeito</span><br>
            • <span style="color: #666;">LOG_03 — Desenvolvimento de Protocolo</span><br>
            • <span style="color: #666;">LOG_04 — Resultados da Fase 2</span><br>
            • <span style="color: #666;">LOG_05 — Observações de Adaptação</span>
        </div>
    `);
}

function mostrarEdenOmega() {
    playNavSound();
    atualizarConteudoEden(`
        <div style="color: #ffaa00; font-size: 14px; margin-bottom: 10px;">⚡ ACESSO OMEGA — Dr. Matthias Bergman</div>
        <div style="color: #888; font-size: 13px; line-height: 2;">
            <div style="border: 1px solid rgba(255, 0, 0, 0.15); padding: 15px; background: rgba(0,0,0,0.2);">
                <div style="color: #ff1a1a; font-size: 16px; text-align: center; margin-bottom: 10px;">
                    "A evolução é lenta demais."
                </div>
                <div style="color: #666; font-size: 12px; text-align: center; border-top: 1px solid #333; padding-top: 10px;">
                    <span style="color: #ffaa00;">●</span> Projeto Lazarus — Acesso Total<br>
                    <span style="color: #ffaa00;">●</span> Protocolo OMEGA — Autorizado<br>
                    <span style="color: #ffaa00;">●</span> Arquivos Classificados — Liberados<br>
                    <span style="color: #ffaa00;">●</span> A.D.A.M. & E.V.A. — Controle Total
                </div>
                <div style="color: #333; font-size: 10px; text-align: center; margin-top: 10px;">
                    [ SISTEMA APROPRIADO POR MATTHIAS BERGMAN ]
                </div>
            </div>
        </div>
    `);
}

function logoutEden() {
    playAdminExitSound();
    window.usuarioEden = null;
    if (typeof isAdmin !== 'undefined') {
        isAdmin = false;
    }
    setTimeout(() => {
        mostrarEdenMenu();
    }, 300);
}