// ========== SEQUÊNCIA ZOMBOID ==========
// Este arquivo contém toda a sequência especial que acontece
// quando o jogador digita "zomboid" no login.

async function sequenciaZomboid() {
    // ========== INICIA A ESTÁTICA ==========
    if (typeof playStaticSound === 'function') {
        playStaticSound();
    }
    // TRAVA A TELA POR 3 SEGUNDOS
    screen.innerHTML = `
        <div style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            min-height: 300px;
            font-family: Consolas, monospace;
            color: #ff1a1a;
            font-size: 24px;
            animation: blink 1s infinite;
        ">
            CARREGANDO...
        </div>
    `;
    
    await esperar(3000);
    
    // LIMPA E MOSTRA A MENSAGEM INICIAL
    screen.innerHTML = "";
    await escrever("");
    await escrever("════════════════════════════════════════");
    await escrever("   AESCULA BIOTECH INDUSTRIES");
    await escrever("");
    await escrever("   Usuario reconhecido.");
    await escrever("");
    await escrever("   Bem-vindo de volta, Dr. ████████.");
    await escrever("════════════════════════════════════════");
    
    await esperar(5000);
    
    // LIMPA E MOSTRA A PRÓXIMA MENSAGEM
    screen.innerHTML = "";
    await escrever("", 50);
    await escrever(`   Voce realmente ainda utiliza o nome "Zomboid"?`);
    await escrever("");
    await escrever("   Confesso que nunca entendi sua insistencia");
    await escrever("   nesse apelido.");
    await escrever("");
    await escrever("   Ainda assim...");
    await escrever("");
    await escrever("   E bom ve-lo novamente, meu amigo.");
    
    await esperar(3000);
    
    // MENSAGENS RÁPIDAS (UMA POR VEZ) - COM SOM DE PANE
    const mensagens = [
        "Faz 4 anos.",
        "4 anos desde sua demissao.",
        "4 anos desde que voce abandonou o Projeto Lazarus.",
        "Voce se lembra da ultima conversa que tivemos?"
    ];
    
    // SEQUÊNCIA COM PISCADAS
    screen.innerHTML = "";
    playPanicSound();
    await escrever("", 50);
    await escrever(`   "Isso esta indo longe demais."`);
    await escrever("");
    await escrever("   Foi isso que voce disse.");
    await esperar(2000);
    
    screen.innerHTML = "";
    playPanicSound();
    await escrever("", 50);
    await escrever("   Eu esperava mais de voce.");
    await esperar(1500);
    
    screen.innerHTML = "";
    playGlitchWindowSound();
    await escrever("", 50);
    await escrever("   Voce viu os resultados.");
    await esperar(1500);
    
    screen.innerHTML = "";
    playGlitchWindowSound();
    await escrever("", 50);
    await escrever("   Voce viu o potencial.");
    await esperar(1500);
    
    screen.innerHTML = "";
    playGlitchWindowSound();
    await escrever("", 50);
    await escrever("   Voce foi um dos poucos que realmente");
    await escrever("   compreendeu o que estavamos construindo.");
    await esperar(2000);
    
    // POPUPS (MENSAGENS CENTRALIZADAS) - TODOS AO MESMO TEMPO
    const popups = [
        "Por que voce foi embora?",
        "Por que voce me deixou sozinho?",
        "Voce tinha medo?",
        "Ou apenas faltou coragem?"
    ];
    
    const posicoes = [
        { top: 15, left: 10 },
        { top: 30, left: 65 },
        { top: 55, left: 20 },
        { top: 70, left: 70 }
    ];
    
    popups.forEach((texto, index) => {
        setTimeout(() => {
            playPanicSound();
        }, index * 150);
        
        const pos = posicoes[index % posicoes.length];
        const msgDiv = document.createElement('div');
        msgDiv.style.cssText = `
            position: fixed;
            top: ${pos.top}%;
            left: ${pos.left}%;
            transform: translate(-50%, -50%) rotate(${Math.random() * 6 - 3}deg);
            color: #ff4444;
            font-size: ${20 + Math.random() * 10}px;
            font-family: Consolas, monospace;
            text-align: center;
            background: rgba(0, 0, 0, 0.92);
            padding: 20px 30px;
            border: 2px solid #ff4444;
            z-index: 9999;
            animation: glitch 0.15s infinite;
            box-shadow: 0 0 50px rgba(255, 0, 0, 0.2);
            text-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
        `;
        msgDiv.textContent = texto;
        document.body.appendChild(msgDiv);
        
        setTimeout(() => {
            if (msgDiv.parentNode) msgDiv.remove();
        }, 4000);
    });
    
    // JANELAS SOBRE JANELAS (TEXTO SPAM) - COM SOM DE GLITCH
    const textosSpam = [
        "Eu perdoaria sua covardia.",
        "Mas nao seu abandono.",
        "Voce nos chamou de desumanos.",
        "Voce chamou A.D.A.M. de desumano.",
        "Voce chamou E.V.A. de desumana.",
        "Voce chamou Lazarus de desumano.",
        "Mas olhe ao seu redor.",
        "Quem estava certo?"
    ];
    
    const janelas = [];
    textosSpam.forEach((texto, index) => {
        setTimeout(() => {
            playGlitchWindowSound();
            
            const janela = document.createElement('div');
            const top = 5 + Math.random() * 85;
            const left = 5 + Math.random() * 85;
            const width = 200 + Math.random() * 300;
            const rotacao = Math.random() * 10 - 5;
            
            janela.style.cssText = `
                position: fixed;
                top: ${top}%;
                left: ${left}%;
                transform: translate(-50%, -50%) rotate(${rotacao}deg);
                color: #ff4444;
                font-size: ${14 + Math.random() * 8}px;
                font-family: Consolas, monospace;
                background: rgba(0, 0, 0, 0.9);
                padding: 15px 25px;
                border: 1px solid #ff4444;
                z-index: 9998;
                box-shadow: 0 0 30px rgba(255, 0, 0, 0.1);
                max-width: ${width}px;
                text-align: center;
                animation: glitch ${0.05 + Math.random() * 0.05}s infinite;
                opacity: 0.9;
            `;
            janela.textContent = texto;
            document.body.appendChild(janela);
            janelas.push(janela);
        }, index * 300 + 100);
    });
    
    await esperar(4000);
    
    // ========== TEXTO DESCONTROLADO (SPAM CENTRALIZADO) ==========
    const spamTextos = [
        "VOCE FOI EMBORA.",
        "VOCE ME DEIXOU.",
        "VOCE ABANDONOU O FUTURO.",
        "VOCE ABANDONOU A HUMANIDADE."
    ];
    
    // ========== TOCCA SOM DE SPAM PARA CADA TEXTO ==========
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            // ========== TOCA O SOM DE SPAM ==========
            playZomboidSpamSound();
            
            const spamDiv = document.createElement('div');
            const texto = spamTextos[Math.floor(Math.random() * spamTextos.length)];
            const top = Math.random() * 90 + 5;
            const left = Math.random() * 90 + 5;
            const tamanho = 16 + Math.random() * 24;
            
            spamDiv.style.cssText = `
                position: fixed;
                top: ${top}%;
                left: ${left}%;
                transform: translate(-50%, -50%) rotate(${Math.random() * 8 - 4}deg);
                color: #ff0000;
                font-size: ${tamanho}px;
                font-family: Consolas, monospace;
                font-weight: bold;
                z-index: 9997;
                opacity: ${0.4 + Math.random() * 0.5};
                text-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
                pointer-events: none;
                animation: glitch ${0.02 + Math.random() * 0.04}s infinite;
            `;
            spamDiv.textContent = texto;
            document.body.appendChild(spamDiv);
            
            setTimeout(() => {
                if (spamDiv.parentNode) spamDiv.remove();
            }, 5000);
        }, i * 150);
    }
    
    await esperar(5000);
    
    // LIMPA TODAS AS JANELAS
    janelas.forEach(janela => {
        if (janela.parentNode) janela.remove();
    });
    document.querySelectorAll('div[style*="z-index: 9997"]').forEach(el => el.remove());
    
    // ÚLTIMA JANELA - CALMA E PEQUENA
    screen.innerHTML = "";
    await escrever("", 50);
    await escrever("   Apesar de tudo...");
    await escrever("");
    await escrever("   Ainda sinto sua falta, meu amigo.");
    await escrever("");
    await escrever("   — Matthias");
    await escrever("");
    await esperar(3000);
    
    // ========== PARA A ESTÁTICA ==========
    stopStaticSound();
    
    // FECHA TUDO
    playCrashSound();
    screen.innerHTML = `
        <div style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            min-height: 300px;
            font-family: Consolas, monospace;
            color: #ff1a1a;
            font-size: 20px;
            animation: blink 0.5s infinite;
        ">
            [ SISTEMA ENCERRADO ]
        </div>
    `;
    
    await esperar(2000);
    
    // TRAVA O NAVEGADOR (SIMULA)
    document.body.style.backgroundColor = '#000';
    document.body.innerHTML = `
        <div style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Consolas, monospace;
            color: #ff1a1a;
            font-size: 16px;
            background: #000;
        ">
            <div style="text-align: center;">
                <div style="font-size: 24px; margin-bottom: 20px; animation: blink 1s infinite;">■</div>
                <div style="color: #666;">O sistema encontrou um erro crítico.</div>
                <div style="color: #444; font-size: 12px; margin-top: 10px;">[ MEMORIA CORROMPIDA ]</div>
            </div>
        </div>
    `;
}