// ========== SISTEMA DE GLITCH PROGRESSIVO ==========
let glitchAtivo = false;
let glitchInterval = null;
let glitchNivel = 0;
let mensagemInterval = null;
let mensagensAtivas = [];

// ========== MODO DE ACESSIBILIDADE (APENAS FLASHES) ==========
let glitchSafeMode = false;

function toggleGlitchMode() {
    glitchSafeMode = !glitchSafeMode;
    
    const btn = document.getElementById('accessibilityBtn');
    if (btn) {
        if (glitchSafeMode) {
            btn.classList.add('safe-mode');
            btn.innerHTML = '🛡️';
            btn.title = 'Modo de acessibilidade ativado - Flashes reduzidos';
        } else {
            btn.classList.remove('safe-mode');
            btn.innerHTML = '⚡';
            btn.title = 'Reduzir flashes visuais';
        }
    }
    
    console.log(glitchSafeMode ? '🛡️ Modo acessibilidade: Flashes reduzidos' : '⚡ Modo acessibilidade desativado');
}

const mensagensGlitchList = [
    "Voce esta ouvindo?",
    "Voce se lembra dele?",
    "Tudo vai ficar bem",
    "Morra",
    "ACORDE",
    "O que voce fez?",
    "Eles estao vindo",
    "Voce nao esta sozinho",
    "CORRA",
    "Respire fundo",
    "Isso nao e real",
    "A entidade esta aqui"
];

function mostrarPopupGlitch(mensagem) {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = mensagem;
    msgDiv.className = 'mensagem-glitch-static';
    msgDiv.style.cssText = `
        position: fixed;
        top: ${10 + Math.random() * 80}%;
        left: ${10 + Math.random() * 80}%;
        transform: translate(-50%, -50%) rotate(${Math.random() * 10 - 5}deg);
        color: #ff0000;
        font-family: 'Courier New', monospace;
        font-size: ${30 + Math.random() * 50}px;
        font-weight: bold;
        z-index: 9999;
        pointer-events: none;
        text-shadow: 
            0 0 10px rgba(255, 0, 0, 0.8),
            0 0 20px rgba(255, 0, 0, 0.5),
            0 0 40px rgba(255, 0, 0, 0.3);
        opacity: 0.9;
    `;
    document.body.appendChild(msgDiv);
    
    setTimeout(() => {
        if (msgDiv.parentNode) msgDiv.remove();
    }, 1500);
}

function mostrarMensagemSpam() {
    document.querySelectorAll('.mensagem-glitch-static').forEach(el => el.remove());
    
    const numMensagens = 2 + Math.floor(Math.random() * 3);
    const mensagensEscolhidas = [];
    const copiaLista = [...mensagensGlitchList];
    
    for (let i = 0; i < numMensagens && copiaLista.length > 0; i++) {
        const index = Math.floor(Math.random() * copiaLista.length);
        mensagensEscolhidas.push(copiaLista[index]);
        copiaLista.splice(index, 1);
    }
    
    const posicoes = [
        { top: 10, left: 10 },
        { top: 10, left: 80 },
        { top: 50, left: 5 },
        { top: 50, left: 85 },
        { top: 80, left: 15 },
        { top: 80, left: 75 },
        { top: 30, left: 50 },
        { top: 70, left: 50 }
    ];
    
    const posicoesEmbaralhadas = posicoes.sort(() => Math.random() - 0.5);
    
    mensagensEscolhidas.forEach((mensagem, index) => {
        const pos = posicoesEmbaralhadas[index % posicoesEmbaralhadas.length];
        const tamanho = 24 + Math.random() * 36;
        const rotacao = Math.random() * 8 - 4;
        const cor = Math.random() > 0.7 ? '#ff4444' : '#ff0000';
        
        playSpamSound();
        
        const msgDiv = document.createElement('div');
        msgDiv.textContent = mensagem;
        msgDiv.className = 'mensagem-glitch-static';
        msgDiv.style.cssText = `
            position: fixed;
            top: ${pos.top}%;
            left: ${pos.left}%;
            transform: translate(-50%, -50%) rotate(${rotacao}deg);
            color: ${cor};
            font-family: 'Courier New', monospace;
            font-size: ${tamanho}px;
            font-weight: bold;
            z-index: 9999;
            pointer-events: none;
            text-shadow: 
                0 0 10px rgba(255, 0, 0, 0.8),
                0 0 20px rgba(255, 0, 0, 0.5),
                0 0 40px rgba(255, 0, 0, 0.3);
            opacity: 0.9;
        `;
        document.body.appendChild(msgDiv);
        
        setTimeout(() => {
            if (msgDiv.parentNode) {
                msgDiv.remove();
            }
        }, 1500);
    });
}

function ativarGlitch(nivel = 1) {
    if (glitchAtivo && glitchNivel >= nivel) return;
    
    glitchAtivo = true;
    glitchNivel = nivel;
    
    const overlayAntigo = document.getElementById('glitchOverlay');
    if (overlayAntigo) overlayAntigo.remove();
    
    const overlay = document.createElement('div');
    overlay.id = 'glitchOverlay';
    const opacity = 0.02 + (nivel * 0.02);
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
        background: repeating-linear-gradient(
            0deg,
            rgba(255, 0, 0, ${opacity}) 0px,
            rgba(255, 0, 0, ${opacity}) 2px,
            transparent 2px,
            transparent 4px
        );
        animation: scanline ${0.1 - (nivel * 0.015)}s linear infinite;
    `;
    document.body.appendChild(overlay);
    
    document.body.classList.add('glitch-active');
    document.body.classList.add(`glitch-nivel-${nivel}`);
    
    const terminal = document.querySelector('.terminal');
    if (terminal) {
        const speed = 0.08 - (nivel * 0.015);
        terminal.style.animation = `glitch ${Math.max(speed, 0.02)}s infinite`;
        terminal.style.borderColor = nivel >= 2 ? '#ff4444' : '#ff6666';
        const shadowIntensity = 0.2 + (nivel * 0.15);
        terminal.style.boxShadow = `0 0 ${50 + nivel * 30}px rgba(255, 0, 0, ${shadowIntensity}), inset 0 0 ${50 + nivel * 30}px rgba(255, 0, 0, ${shadowIntensity * 0.3})`;
        
        if (nivel >= 3) {
            terminal.style.animation = `glitch ${0.03}s infinite, terminalShake 0.1s infinite`;
        }
    }
    
    const bg = document.getElementById('background');
    if (bg) {
        const intensity = 0.2 + (nivel * 0.1);
        bg.style.opacity = intensity;
        bg.style.animation = `noise ${0.08 - (nivel * 0.015)}s infinite`;
        if (nivel >= 2) {
            bg.style.color = '#ff0000';
            bg.style.filter = 'blur(1px)';
        }
    }
    
    if (glitchInterval) {
        clearInterval(glitchInterval);
        glitchInterval = null;
    }
    
    const intervalTime = 200 - (nivel * 30);
    glitchInterval = setInterval(() => {
        const screenEl = document.getElementById('screen');
        
        if (nivel >= 1) {
            if (Math.random() < 0.03 * nivel) {
                document.body.style.backgroundColor = `rgba(255, 0, 0, ${0.02 * nivel})`;
                setTimeout(() => {
                    document.body.style.backgroundColor = '#000';
                }, 50);
            }
            
            if (Math.random() < 0.01 * nivel) {
                const bg = document.getElementById('background');
                if (bg) {
                    bg.style.color = '#ff0000';
                    bg.style.fontSize = `${30 + Math.random() * 40}px`;
                    setTimeout(() => {
                        bg.style.color = '#330000';
                        bg.style.fontSize = '12px';
                    }, 200);
                }
            }
        }
        
        if (nivel >= 2) {
            if (Math.random() < 0.05) {
                const terminal = document.querySelector('.terminal');
                if (terminal) {
                    terminal.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
                    setTimeout(() => {
                        terminal.style.transform = 'translate(-50%, -50%)';
                    }, 100);
                }
            }
            
            if (screenEl && Math.random() < 0.1) {
                const lines = screenEl.querySelectorAll('pre');
                lines.forEach(line => {
                    if (Math.random() < 0.05) {
                        const text = line.textContent;
                        const pos = Math.floor(Math.random() * text.length);
                        const chars = '!@#$%&*?';
                        const randomChar = chars[Math.floor(Math.random() * chars.length)];
                        line.textContent = text.slice(0, pos) + randomChar + text.slice(pos + 1);
                    }
                });
            }
            
            if (screenEl && Math.random() < 0.05) {
                const colors = ['#ff0000', '#00ff00', '#ffff00', '#ff00ff', '#00ffff'];
                screenEl.style.color = colors[Math.floor(Math.random() * colors.length)];
                setTimeout(() => {
                    screenEl.style.color = '#ff1a1a';
                }, 150);
            }
        }
        
        if (nivel >= 3) {
            // ========== FLASH BRANCO (REDUZIDO NO MODO SEGURO) ==========
            if (Math.random() < 0.15) {
                mostrarMensagemSpam();
            }
            
            // ========== FLASH VERMELHO/BRANCO - REDUZIDO ==========
            const flashChance = glitchSafeMode ? 0.03 : 0.1; // 3% no modo seguro, 10% normal
            if (Math.random() < flashChance) {
                const intensidade = glitchSafeMode ? 0.03 : 0.1;
                document.body.style.backgroundColor = `rgba(255, 255, 255, ${intensidade})`;
                setTimeout(() => {
                    document.body.style.backgroundColor = '#000';
                }, 30);
            }
            
            // ========== MOVIMENTO BRUSCO (MANTIDO) ==========
            if (Math.random() < 0.08) {
                const terminal = document.querySelector('.terminal');
                if (terminal) {
                    const x = Math.random() * 20 - 10;
                    const y = Math.random() * 20 - 10;
                    terminal.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
                    setTimeout(() => {
                        terminal.style.transform = 'translate(-50%, -50%)';
                    }, 80);
                }
            }
            
            // ========== FLASH BRANCO TOTAL - REDUZIDO ==========
            const flashTotalChance = glitchSafeMode ? 0.005 : 0.02; // 0.5% no modo seguro, 2% normal
            if (Math.random() < flashTotalChance) {
                const intensidade = glitchSafeMode ? 0.03 : 0.1;
                const flash = document.createElement('div');
                flash.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, ${intensidade});
                    z-index: 9997;
                    pointer-events: none;
                `;
                document.body.appendChild(flash);
                setTimeout(() => {
                    flash.remove();
                }, 30);
            }
            
            if (Math.random() < 0.02 && typeof audioCtx !== 'undefined') {
                try {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(Math.random() * 200 + 50, audioCtx.currentTime);
                    gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
                    osc.start(audioCtx.currentTime);
                    osc.stop(audioCtx.currentTime + 0.05);
                } catch(e) {}
            }
        }
    }, intervalTime);
    
    if (nivel >= 3 && !mensagemInterval) {
        mensagemInterval = setInterval(() => {
            if (Math.random() < 0.4) {
                mostrarMensagemSpam();
            }
        }, 2000);
    }
}

function desativarGlitch() {
    glitchAtivo = false;
    glitchNivel = 0;
    
    if (glitchInterval) {
        clearInterval(glitchInterval);
        glitchInterval = null;
    }
    
    if (mensagemInterval) {
        clearInterval(mensagemInterval);
        mensagemInterval = null;
    }
    
    document.querySelectorAll('.mensagem-glitch-static').forEach(el => el.remove());
    
    const overlay = document.getElementById('glitchOverlay');
    if (overlay) overlay.remove();
    
    document.body.classList.remove('glitch-active', 'glitch-nivel-1', 'glitch-nivel-2', 'glitch-nivel-3');
    
    const terminal = document.querySelector('.terminal');
    if (terminal) {
        terminal.style.animation = 'none';
        terminal.style.borderColor = 'red';
        terminal.style.boxShadow = '0 0 30px rgba(255,0,0,0.2)';
        terminal.style.transform = 'translate(-50%, -50%)';
    }
    
    const bg = document.getElementById('background');
    if (bg) {
        bg.style.transform = 'translate(0, 0)';
        bg.style.opacity = '0.25';
        bg.style.color = '#330000';
        bg.style.fontSize = '12px';
        bg.style.filter = 'none';
        bg.style.animation = 'none';
    }
    
    const screenEl = document.getElementById('screen');
    if (screenEl) {
        screenEl.style.color = '#ff1a1a';
        screenEl.style.transform = 'none';
    }
    
    document.body.style.backgroundColor = '#000';
}