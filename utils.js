// ========== FUNÇÕES UTILITÁRIAS ==========

// ESPERA
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ========== ESCREVER COM EFEITO DE DIGITAÇÃO ==========
async function escrever(texto, vel = 25, limpar = false, pausaEntreLinhas = 200) {
    return new Promise(resolve => {
        if (limpar) {
            screen.innerHTML = "";
        }

        const linha = document.createElement("pre");
        linha.style.margin = "0";
        linha.style.padding = "0";
        linha.style.fontFamily = "Consolas, monospace";
        linha.style.whiteSpace = "pre";
        linha.style.background = "transparent";
        linha.style.border = "none";
        linha.style.fontSize = "inherit";
        screen.appendChild(linha);

        let i = 0;

        const intervalo = setInterval(() => {
            if (i < texto.length) {
                const char = texto[i];
                linha.textContent += char;
                
                // Só toca som para caracteres não-espaço (com menos frequência)
                if (char !== " " && char !== "\n" && Math.random() < 0.4) {
                    isUserTyping = false;
                    playTypeSound();
                }
                i++;
            } else {
                clearInterval(intervalo);
                resolve();
            }
        }, vel);
    });
}

// ========== ESCREVER COM PAUSA ENTRE LINHAS ==========
async function escreverLinha(texto, vel = 25, limpar = false) {
    return new Promise(resolve => {
        if (limpar) {
            screen.innerHTML = "";
        }

        const linha = document.createElement("pre");
        linha.style.margin = "0";
        linha.style.padding = "0";
        linha.style.fontFamily = "Consolas, monospace";
        linha.style.whiteSpace = "pre";
        linha.style.background = "transparent";
        linha.style.border = "none";
        linha.style.fontSize = "inherit";
        screen.appendChild(linha);

        let i = 0;

        const intervalo = setInterval(() => {
            if (i < texto.length) {
                const char = texto[i];
                linha.textContent += char;
                
                if (char !== " " && char !== "\n" && Math.random() < 0.4) {
                    isUserTyping = false;
                    playTypeSound();
                }
                i++;
            } else {
                clearInterval(intervalo);
                // Adiciona uma quebra de linha após terminar
                const br = document.createElement("br");
                screen.appendChild(br);
                resolve();
            }
        }, vel);
    });
}

// FORMATAÇÃO DE TEXTO
function formatarCategoria(categoria) {
    const chars = '═'.repeat(categoria.length + 4);
    return `═══ ${categoria} ═══`;
}

// VALIDA SE É EMAIL (para exportação)
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}