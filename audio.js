// ========== SISTEMA DE ÁUDIO ==========
let audioCtx = null;
let audioEnabled = false;
let isUserTyping = false;

function enableAudio() {
    if (!audioEnabled) {
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            audioEnabled = true;
            console.log('✅ Áudio ativado!');
        } catch(e) {
            console.log('❌ Erro ao ativar áudio:', e);
        }
    }
}

// ========== EFEITO CYBERPUNK (SISTEMA) ==========
function playTypeSound_System() {
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
        const delay = audioCtx.createDelay(0.05);
        delay.delayTime.value = 0.02 + Math.random() * 0.03;
        const feedback = audioCtx.createGain();
        feedback.gain.value = 0.3;
        osc.connect(gain);
        gain.connect(delay);
        delay.connect(feedback);
        feedback.connect(delay);
        delay.connect(audioCtx.destination);
        gain.connect(audioCtx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(800 + Math.random() * 1200, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.02);
    } catch(e) {}
}

// ========== EFEITO GRAVE (USUÁRIO) ==========
function playTypeSound_User() {
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
        const delay = audioCtx.createDelay(0.05);
        delay.delayTime.value = 0.02 + Math.random() * 0.03;
        const feedback = audioCtx.createGain();
        feedback.gain.value = 0.5;
        osc.connect(gain);
        gain.connect(delay);
        delay.connect(feedback);
        feedback.connect(delay);
        delay.connect(audioCtx.destination);
        gain.connect(audioCtx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150 + Math.random() * 200, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.06);
    } catch(e) {}
}

function playTypeSound() {
    if (isUserTyping) {
        playTypeSound_User();
    } else {
        playTypeSound_System();
    }
}

// ========== SOM DE ESTÁTICA CONTÍNUA ==========
let staticSound = null;
let staticGain = null;
let staticNoise = null;
let staticFilter = null;

function playStaticSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        // Cria ruído branco contínuo
        const bufferSize = audioCtx.sampleRate * 0.1;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1);
        }
        
        staticNoise = audioCtx.createBufferSource();
        staticNoise.buffer = buffer;
        staticNoise.loop = true;
        
        staticFilter = audioCtx.createBiquadFilter();
        staticFilter.type = 'bandpass';
        staticFilter.frequency.value = 800;
        staticFilter.Q.value = 1.5;
        
        staticGain = audioCtx.createGain();
        staticGain.gain.setValueAtTime(0, audioCtx.currentTime);
        staticGain.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.5);
        
        staticNoise.connect(staticFilter);
        staticFilter.connect(staticGain);
        staticGain.connect(audioCtx.destination);
        
        staticNoise.start(audioCtx.currentTime);
        
        // Efeito de "varredura" na estática (muda a frequência lentamente)
        let freq = 800;
        const freqInterval = setInterval(() => {
            if (staticNoise) {
                freq = 400 + Math.random() * 800;
                if (staticFilter) {
                    staticFilter.frequency.setValueAtTime(freq, audioCtx.currentTime);
                }
            }
        }, 500);
        
        // Guarda o intervalo para limpar depois
        if (staticSound) {
            clearInterval(staticSound);
        }
        staticSound = freqInterval;
        
    } catch(e) {
        console.log('Static sound error:', e);
    }
}

function stopStaticSound() {
    try {
        if (staticNoise) {
            if (staticGain) {
                staticGain.gain.setValueAtTime(staticGain.gain.value, audioCtx.currentTime);
                staticGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
                setTimeout(() => {
                    try {
                        if (staticNoise) {
                            staticNoise.stop();
                            staticNoise = null;
                        }
                        if (staticGain) {
                            staticGain.disconnect();
                            staticGain = null;
                        }
                        if (staticFilter) {
                            staticFilter.disconnect();
                            staticFilter = null;
                        }
                        if (staticSound) {
                            clearInterval(staticSound);
                            staticSound = null;
                        }
                    } catch(e) {}
                }, 500);
            }
        }
    } catch(e) {
        console.log('Stop static error:', e);
    }
}

// ========== SOM DE SPAM (TEXTO DESCONTROLADO - ZOMBOID) ==========
function playZomboidSpamSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        // Som mais agressivo que o panic sound, com distorção
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        const osc3 = audioCtx.createOscillator();
        const gain3 = audioCtx.createGain();
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc3.connect(gain3);
        gain3.connect(audioCtx.destination);
        
        // Primeiro som - agudo e cortante (como um alarme)
        osc.type = 'square';
        osc.frequency.setValueAtTime(1000 + Math.random() * 400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300 + Math.random() * 200, audioCtx.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
        
        // Segundo som - grave e pulsante
        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.2);
        
        gain2.gain.setValueAtTime(0, audioCtx.currentTime);
        gain2.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.03);
        gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
        
        // Terceiro som - ruído de estática (mais curto)
        osc3.type = 'sawtooth';
        osc3.frequency.setValueAtTime(3000 + Math.random() * 2000, audioCtx.currentTime);
        osc3.frequency.exponentialRampToValueAtTime(500, audioCtx.currentTime + 0.05);
        
        gain3.gain.setValueAtTime(0, audioCtx.currentTime);
        gain3.gain.linearRampToValueAtTime(0.03, audioCtx.currentTime + 0.01);
        gain3.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
        
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.15);
        osc2.start(audioCtx.currentTime + 0.02);
        osc2.stop(audioCtx.currentTime + 0.25);
        osc3.start(audioCtx.currentTime + 0.05);
        osc3.stop(audioCtx.currentTime + 0.08);
        
        // Pequeno "clique" de interferência
        setTimeout(() => {
            try {
                const click = audioCtx.createOscillator();
                const gainClick = audioCtx.createGain();
                click.connect(gainClick);
                gainClick.connect(audioCtx.destination);
                click.type = 'square';
                click.frequency.setValueAtTime(1500 + Math.random() * 500, audioCtx.currentTime);
                gainClick.gain.setValueAtTime(0, audioCtx.currentTime);
                gainClick.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.005);
                gainClick.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
                click.start(audioCtx.currentTime);
                click.stop(audioCtx.currentTime + 0.04);
            } catch(e) {}
        }, 80);
        
    } catch(e) {
        console.log('Zomboid spam sound error:', e);
    }
}

// ========== SOM DE PANE (POPUP) ==========
function playPanicSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        // Som de "pane" eletrônica - agudo e distorcido
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        
        // Primeiro som - agudo e cortante
        osc.type = 'square';
        osc.frequency.setValueAtTime(800 + Math.random() * 400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200 + Math.random() * 200, audioCtx.currentTime + 0.15);
        
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        
        // Segundo som - grave e distorcido
        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.25);
        
        gain2.gain.setValueAtTime(0, audioCtx.currentTime);
        gain2.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.03);
        gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.25);
        osc2.start(audioCtx.currentTime + 0.05);
        osc2.stop(audioCtx.currentTime + 0.35);
        
        // Pequeno "click" de estática no final
        setTimeout(() => {
            try {
                const click = audioCtx.createOscillator();
                const gainClick = audioCtx.createGain();
                click.connect(gainClick);
                gainClick.connect(audioCtx.destination);
                click.type = 'square';
                click.frequency.setValueAtTime(1000, audioCtx.currentTime);
                gainClick.gain.setValueAtTime(0, audioCtx.currentTime);
                gainClick.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.01);
                gainClick.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
                click.start(audioCtx.currentTime);
                click.stop(audioCtx.currentTime + 0.04);
            } catch(e) {}
        }, 250);
        
    } catch(e) {
        console.log('Panic sound error:', e);
    }
}

// ========== SOM DE GLITCH (JANELA ABRINDO) ==========
function playGlitchWindowSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        // Som de "abertura" de janela - digital e pulsante
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.08);
        
        filter.type = 'bandpass';
        filter.frequency.value = 800;
        filter.Q.value = 2;
        
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
        
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.12);
        
    } catch(e) {
        console.log('Glitch window sound error:', e);
    }
}

// ========== SOM DE SPAM (TEXTO DESCONTROLADO - GERAL) ==========
function playSpamSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        // Som de "estática" rápida - tipo interferência
        const bufferSize = audioCtx.sampleRate * 0.05;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / bufferSize * 2);
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1500 + Math.random() * 500;
        filter.Q.value = 1;
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
        
        noise.start(audioCtx.currentTime);
        noise.stop(audioCtx.currentTime + 0.06);
        
        // Pequeno "pip" no final
        setTimeout(() => {
            try {
                const osc = audioCtx.createOscillator();
                const gain2 = audioCtx.createGain();
                osc.connect(gain2);
                gain2.connect(audioCtx.destination);
                osc.type = 'square';
                osc.frequency.setValueAtTime(600 + Math.random() * 400, audioCtx.currentTime);
                gain2.gain.setValueAtTime(0, audioCtx.currentTime);
                gain2.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.005);
                gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
                osc.start(audioCtx.currentTime);
                osc.stop(audioCtx.currentTime + 0.03);
            } catch(e) {}
        }, 30);
        
    } catch(e) {
        console.log('Spam sound error:', e);
    }
}

// ========== SOM DE CLIMAX (MENSAGEM FINAL) ==========
function playClimaxSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        // Som de "revelação" - subindo e suave
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        
        // Primeiro - subida suave
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.5);
        
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
        
        // Segundo - harmônico
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.5);
        
        gain2.gain.setValueAtTime(0, audioCtx.currentTime);
        gain2.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.1);
        gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
        
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.6);
        osc2.start(audioCtx.currentTime);
        osc2.stop(audioCtx.currentTime + 0.6);
        
    } catch(e) {
        console.log('Climax sound error:', e);
    }
}

// ========== SOM DE "TRAVAMENTO" FINAL ==========
function playCrashSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        // Som de "travamento" - grave e distorcido caindo
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        
        // Primeiro - queda grave
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 1);
        
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
        
        // Segundo - ruído
        osc2.type = 'square';
        osc2.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 1);
        
        gain2.gain.setValueAtTime(0, audioCtx.currentTime);
        gain2.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.05);
        gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
        
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 1.2);
        osc2.start(audioCtx.currentTime + 0.1);
        osc2.stop(audioCtx.currentTime + 1.2);
        
    } catch(e) {
        console.log('Crash sound error:', e);
    }
}

// ========== SOM DE CONCLUSÃO DE CATEGORIA (MAIS ÉPICO) ==========
function playCategoryCompleteSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        // Sequência de 4 notas ascendentes (mais longa e épica)
        const notas = [523, 659, 784, 1047]; // C5, E5, G5, C6
        notas.forEach((freq, i) => {
            setTimeout(() => {
                try {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                    gain.gain.setValueAtTime(0, audioCtx.currentTime);
                    gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.03);
                    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
                    osc.start(audioCtx.currentTime);
                    osc.stop(audioCtx.currentTime + 0.15);
                } catch(e) {}
            }, i * 100);
        });
        
        // Acorde final
        setTimeout(() => {
            try {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1318, audioCtx.currentTime); // E6
                gain.gain.setValueAtTime(0, audioCtx.currentTime);
                gain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
                osc.start(audioCtx.currentTime);
                osc.stop(audioCtx.currentTime + 0.25);
            } catch(e) {}
        }, 450);
        
    } catch(e) {}
}

// ========== SOM DE CONCLUSÃO DA ANÁLISE ESPECÍFICA ==========
function playAnalysisCompleteSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        // Sons mais dramáticos - sequência descendente com efeito de "revelação"
        const notas = [880, 784, 659, 523]; // A5, G5, E5, C5
        notas.forEach((freq, i) => {
            setTimeout(() => {
                try {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    const osc2 = audioCtx.createOscillator();
                    const gain2 = audioCtx.createGain();
                    
                    osc.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc2.connect(gain2);
                    gain2.connect(audioCtx.destination);
                    
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                    gain.gain.setValueAtTime(0, audioCtx.currentTime);
                    gain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.02);
                    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
                    
                    osc2.type = 'sine';
                    osc2.frequency.setValueAtTime(freq * 1.5, audioCtx.currentTime);
                    gain2.gain.setValueAtTime(0, audioCtx.currentTime);
                    gain2.gain.linearRampToValueAtTime(0.025, audioCtx.currentTime + 0.04);
                    gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
                    
                    osc.start(audioCtx.currentTime);
                    osc.stop(audioCtx.currentTime + 0.2);
                    osc2.start(audioCtx.currentTime + 0.05);
                    osc2.stop(audioCtx.currentTime + 0.2);
                } catch(e) {}
            }, i * 120);
        });
        
        // Efeito de "revelação" no final
        setTimeout(() => {
            try {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(200, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.3);
                gain.gain.setValueAtTime(0, audioCtx.currentTime);
                gain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
                osc.start(audioCtx.currentTime);
                osc.stop(audioCtx.currentTime + 0.35);
            } catch(e) {}
        }, 500);
        
    } catch(e) {}
}

// ========== VOZ ROBÓTICA - EDEN ==========
function playEdenVoice() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        const duracaoTotal = 6.5;
        
        // Simula voz robótica
        const bufferSize = audioCtx.sampleRate * duracaoTotal;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            const t = i / audioCtx.sampleRate;
            const freq = 80 + 40 * Math.sin(t * 2.5) + 20 * Math.sin(t * 1.3);
            const envelope = Math.min(1, t * 2) * (1 - Math.exp(-t * 3));
            const noise = (Math.random() * 2 - 1) * envelope * 0.3;
            const carrier = Math.sin(2 * Math.PI * freq * t) * envelope * 0.5;
            data[i] = carrier + noise;
        }
        
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;
        filter.Q.value = 1;
        
        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duracaoTotal);
        
        source.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        
        source.start(audioCtx.currentTime);
        source.stop(audioCtx.currentTime + duracaoTotal);
        
        // Glitchs na voz
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                try {
                    const glitchOsc = audioCtx.createOscillator();
                    const glitchGain = audioCtx.createGain();
                    glitchOsc.connect(glitchGain);
                    glitchGain.connect(audioCtx.destination);
                    glitchOsc.type = 'square';
                    glitchOsc.frequency.setValueAtTime(200 + Math.random() * 300, audioCtx.currentTime);
                    glitchGain.gain.setValueAtTime(0, audioCtx.currentTime);
                    glitchGain.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.01);
                    glitchGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
                    glitchOsc.start(audioCtx.currentTime);
                    glitchOsc.stop(audioCtx.currentTime + 0.05);
                } catch(e) {}
            }, 0.8 + i * 1.2);
        }
        
    } catch(e) {
        console.log('Eden voice error:', e);
    }
}

// ========== SOM DE CONCLUSÃO ==========
function playCompletionSound() {
    if (!audioEnabled) return;
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
            return;
        }
        const notas = [523, 659, 784];
        notas.forEach((freq, i) => {
            setTimeout(() => {
                try {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
                    osc.start(audioCtx.currentTime);
                    osc.stop(audioCtx.currentTime + 0.1);
                } catch(e) {}
            }, i * 80);
        });
    } catch(e) {}
}

// ========== SOM DE BOOT ==========
function playBootSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        const nota1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        nota1.connect(gain1);
        gain1.connect(audioCtx.destination);
        nota1.type = 'sine';
        nota1.frequency.setValueAtTime(523, audioCtx.currentTime);
        gain1.gain.setValueAtTime(0, audioCtx.currentTime);
        gain1.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.05);
        gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        nota1.start(audioCtx.currentTime);
        nota1.stop(audioCtx.currentTime + 0.3);
        
        setTimeout(() => {
            try {
                const nota2 = audioCtx.createOscillator();
                const gain2 = audioCtx.createGain();
                nota2.connect(gain2);
                gain2.connect(audioCtx.destination);
                nota2.type = 'sine';
                nota2.frequency.setValueAtTime(659, audioCtx.currentTime);
                gain2.gain.setValueAtTime(0, audioCtx.currentTime);
                gain2.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.05);
                gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
                nota2.start(audioCtx.currentTime);
                nota2.stop(audioCtx.currentTime + 0.35);
            } catch(e) {}
        }, 150);
        
        setTimeout(() => {
            try {
                const nota3 = audioCtx.createOscillator();
                const gain3 = audioCtx.createGain();
                nota3.connect(gain3);
                gain3.connect(audioCtx.destination);
                nota3.type = 'sine';
                nota3.frequency.setValueAtTime(784, audioCtx.currentTime);
                gain3.gain.setValueAtTime(0, audioCtx.currentTime);
                gain3.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.05);
                gain3.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
                nota3.start(audioCtx.currentTime);
                nota3.stop(audioCtx.currentTime + 0.4);
            } catch(e) {}
        }, 300);
        
        setTimeout(() => {
            try {
                const click = audioCtx.createOscillator();
                const gainClick = audioCtx.createGain();
                click.connect(gainClick);
                gainClick.connect(audioCtx.destination);
                click.type = 'square';
                click.frequency.setValueAtTime(1000, audioCtx.currentTime);
                gainClick.gain.setValueAtTime(0, audioCtx.currentTime);
                gainClick.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.01);
                gainClick.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
                click.start(audioCtx.currentTime);
                click.stop(audioCtx.currentTime + 0.06);
            } catch(e) {}
        }, 500);
        
    } catch(e) {}
}

// ========== SOM DE CLICK ==========
function playButtonClickSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.03, audioCtx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.04);
    } catch(e) {}
}

// ========== SOM DE SUBMIT ==========
function playSubmitSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const freq1 = 523;
        const freq2 = 659;
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.connect(gain1);
        gain1.connect(audioCtx.destination);
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq1, audioCtx.currentTime);
        gain1.gain.setValueAtTime(0, audioCtx.currentTime);
        gain1.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.02);
        gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
        osc1.start(audioCtx.currentTime);
        osc1.stop(audioCtx.currentTime + 0.12);
        setTimeout(() => {
            try {
                const osc2 = audioCtx.createOscillator();
                const gain2 = audioCtx.createGain();
                osc2.connect(gain2);
                gain2.connect(audioCtx.destination);
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(freq2, audioCtx.currentTime);
                gain2.gain.setValueAtTime(0, audioCtx.currentTime);
                gain2.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.02);
                gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
                osc2.start(audioCtx.currentTime);
                osc2.stop(audioCtx.currentTime + 0.15);
            } catch(e) {}
        }, 100);
    } catch(e) {}
}

// ========== SOM DE SIM ==========
function playSimSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(880, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.15);
    } catch(e) {}
}

// ========== SOM DE NÃO ==========
function playNaoSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(220, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.2);
    } catch(e) {}
}

// ========== SOM DE NAVEGAÇÃO ==========
function playNavSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.06);
    } catch(e) {}
}

// ========== SOM DE ADMIN ACCESS ==========
function playAdminAccessSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const notas = [440, 554, 659, 880];
        notas.forEach((freq, i) => {
            setTimeout(() => {
                try {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                    gain.gain.setValueAtTime(0, audioCtx.currentTime);
                    gain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.02);
                    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
                    osc.start(audioCtx.currentTime);
                    osc.stop(audioCtx.currentTime + 0.08);
                } catch(e) {}
            }, i * 80);
        });
        setTimeout(() => {
            try {
                const osc2 = audioCtx.createOscillator();
                const gain2 = audioCtx.createGain();
                osc2.connect(gain2);
                gain2.connect(audioCtx.destination);
                osc2.type = 'sawtooth';
                osc2.frequency.setValueAtTime(150, audioCtx.currentTime);
                osc2.frequency.linearRampToValueAtTime(80, audioCtx.currentTime + 0.4);
                gain2.gain.setValueAtTime(0, audioCtx.currentTime);
                gain2.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.05);
                gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
                osc2.start(audioCtx.currentTime);
                osc2.stop(audioCtx.currentTime + 0.5);
            } catch(e) {}
        }, 350);
        setTimeout(() => {
            try {
                const osc3 = audioCtx.createOscillator();
                const gain3 = audioCtx.createGain();
                osc3.connect(gain3);
                gain3.connect(audioCtx.destination);
                osc3.type = 'square';
                osc3.frequency.setValueAtTime(1200, audioCtx.currentTime);
                gain3.gain.setValueAtTime(0, audioCtx.currentTime);
                gain3.gain.linearRampToValueAtTime(0.03, audioCtx.currentTime + 0.01);
                gain3.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
                osc3.start(audioCtx.currentTime);
                osc3.stop(audioCtx.currentTime + 0.06);
            } catch(e) {}
        }, 500);
        setTimeout(() => {
            try {
                const osc4 = audioCtx.createOscillator();
                const gain4 = audioCtx.createGain();
                osc4.connect(gain4);
                gain4.connect(audioCtx.destination);
                osc4.type = 'sine';
                osc4.frequency.setValueAtTime(880, audioCtx.currentTime);
                gain4.gain.setValueAtTime(0, audioCtx.currentTime);
                gain4.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.05);
                gain4.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
                osc4.start(audioCtx.currentTime);
                osc4.stop(audioCtx.currentTime + 0.3);
            } catch(e) {}
        }, 600);
    } catch(e) {}
}

// ========== SOM DE ADMIN EXIT ==========
function playAdminExitSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const notas = [660, 523, 440, 330];
        notas.forEach((freq, i) => {
            setTimeout(() => {
                try {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                    gain.gain.setValueAtTime(0, audioCtx.currentTime);
                    gain.gain.linearRampToValueAtTime(0.035, audioCtx.currentTime + 0.02);
                    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
                    osc.start(audioCtx.currentTime);
                    osc.stop(audioCtx.currentTime + 0.12);
                } catch(e) {}
            }, i * 100);
        });
        setTimeout(() => {
            try {
                const bufferSize = audioCtx.sampleRate * 0.15;
                const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / bufferSize * 3);
                }
                const noise = audioCtx.createBufferSource();
                noise.buffer = buffer;
                const gainNoise = audioCtx.createGain();
                gainNoise.gain.setValueAtTime(0, audioCtx.currentTime);
                gainNoise.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.02);
                gainNoise.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
                noise.connect(gainNoise);
                gainNoise.connect(audioCtx.destination);
                noise.start(audioCtx.currentTime);
                noise.stop(audioCtx.currentTime + 0.15);
            } catch(e) {}
        }, 400);
        setTimeout(() => {
            try {
                const osc3 = audioCtx.createOscillator();
                const gain3 = audioCtx.createGain();
                osc3.connect(gain3);
                gain3.connect(audioCtx.destination);
                osc3.type = 'square';
                osc3.frequency.setValueAtTime(200, audioCtx.currentTime);
                osc3.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.08);
                gain3.gain.setValueAtTime(0, audioCtx.currentTime);
                gain3.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.01);
                gain3.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
                osc3.start(audioCtx.currentTime);
                osc3.stop(audioCtx.currentTime + 0.1);
            } catch(e) {}
        }, 600);
    } catch(e) {}
}

// ========== SOM DE CAMPO VAZIO ==========
function playEmptyFieldSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.2);
        setTimeout(() => {
            try {
                const osc2 = audioCtx.createOscillator();
                const gain2 = audioCtx.createGain();
                osc2.connect(gain2);
                gain2.connect(audioCtx.destination);
                osc2.type = 'square';
                osc2.frequency.setValueAtTime(150, audioCtx.currentTime);
                gain2.gain.setValueAtTime(0, audioCtx.currentTime);
                gain2.gain.linearRampToValueAtTime(0.03, audioCtx.currentTime + 0.01);
                gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
                osc2.start(audioCtx.currentTime);
                osc2.stop(audioCtx.currentTime + 0.08);
            } catch(e) {}
        }, 100);
    } catch(e) {}
}

// ========== SETUP ==========
function setupUserTyping() {
    document.addEventListener('input', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            isUserTyping = true;
            playTypeSound();
            clearTimeout(window.userTypingTimeout);
            window.userTypingTimeout = setTimeout(() => {
                isUserTyping = false;
            }, 100);
        }
    });
}

document.addEventListener('click', enableAudio);
document.addEventListener('keydown', enableAudio);
document.addEventListener('touchstart', enableAudio);
setupUserTyping();