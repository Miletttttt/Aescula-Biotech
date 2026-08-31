const questions = [
    // IDENTIFICACAO
    {
        id: "identificacao_1",
        category: "[IDENTIFICACAO]",
        question: "Qual seu nome completo?",
        type: "text"
    },
    {
        id: "identificacao_2",
        category: "[IDENTIFICACAO]",
        question: "Qual sua idade?",
        type: "text"
    },
    {
        id: "identificacao_3",
        category: "[IDENTIFICACAO]",
        question: "Qual seu tipo sanguineo? (se souber)",
        type: "text"
    },
    {
        id: "identificacao_4",
        category: "[IDENTIFICACAO]",
        question: "Qual sua profissao antes do incidente?",
        type: "text"
    },
    {
        id: "identificacao_5",
        category: "[IDENTIFICACAO]",
        question: "Qual sua cidade de origem?",
        type: "text"
    },
    {
        id: "identificacao_6",
        category: "[IDENTIFICACAO]",
        question: "Possui familiares vivos?",
        type: "yesno",
        bloqueada: false
    },
    // EXPOSICAO
    {
        id: "exposicao_1",
        category: "[EXPOSICAO]",
        question: "Voce teve contato com individuos infectados nas ultimas 72 horas?",
        type: "yesno",
        bloqueada: false
    },
    {
        id: "exposicao_2",
        category: "[EXPOSICAO]",
        question: "Ja foi mordido, arranhado ou exposto a fluidos biologicos?",
        type: "yesno",
        bloqueada: false
    },
    {
        id: "exposicao_3",
        category: "[EXPOSICAO]",
        question: "Apresenta febre, tremores ou alucinacoes?",
        type: "yesno",
        bloqueada: false
    },
    {
        id: "exposicao_4",
        category: "[EXPOSICAO]",
        question: "Quanto tempo faz desde seu ultimo exame medico?",
        type: "text"
    },
    {
        id: "exposicao_5",
        category: "[EXPOSICAO]",
        question: "Voce perdeu a consciencia recentemente?",
        type: "yesno",
        bloqueada: false
    },
    // ESTADO PSICOLOGICO
    {
        id: "psicologico_1",
        category: "[ESTADO PSICOLOGICO]",
        question: "Voce confia em estranhos?",
        type: "yesno",
        bloqueada: false
    },
    {
        id: "psicologico_2",
        category: "[ESTADO PSICOLOGICO]",
        question: "Voce costuma agir por impulso?",
        type: "yesno",
        bloqueada: false
    },
    {
        id: "psicologico_3",
        category: "[ESTADO PSICOLOGICO]",
        question: "Voce ja abandonou alguem para sobreviver?",
        type: "yesno",
        bloqueada: false
    },
    {
        id: "psicologico_4",
        category: "[ESTADO PSICOLOGICO]",
        question: "O que mais teme perder?",
        type: "text"
    },
    {
        id: "psicologico_5",
        category: "[ESTADO PSICOLOGICO]",
        question: "Em uma situacao de risco, voce lidera ou segue ordens?",
        type: "text"
    },
    {
        id: "psicologico_6",
        category: "[ESTADO PSICOLOGICO]",
        question: "Voce acredita que ainda existe esperanca?",
        type: "yesno",
        bloqueada: false
    },
    // SOBREVIVENCIA
    {
        id: "sobrevivencia_1",
        category: "[SOBREVIVENCIA]",
        question: "Voce possui treinamento militar?",
        type: "yesno",
        bloqueada: false
    },
    {
        id: "sobrevivencia_2",
        category: "[SOBREVIVENCIA]",
        question: "Sabe utilizar armas de fogo?",
        type: "yesno",
        bloqueada: false
    },
    {
        id: "sobrevivencia_3",
        category: "[SOBREVIVENCIA]",
        question: "Sabe prestar primeiros socorros?",
        type: "yesno",
        bloqueada: false
    },
    {
        id: "sobrevivencia_4",
        category: "[SOBREVIVENCIA]",
        question: "Qual habilidade considera mais util para sobreviver?",
        type: "text"
    },
    {
        id: "sobrevivencia_5",
        category: "[SOBREVIVENCIA]",
        question: "Voce prefere evitar conflitos ou enfrenta-los?",
        type: "text"
    },
    // SOBRE A ORGANIZACAO
    {
        id: "organizacao_1",
        category: "[SOBRE A ORGANIZACAO]",
        question: "Voce ja ouviu falar da Aescula Biotech?",
        type: "yesno",
        bloqueada: false
    },
    {
        id: "organizacao_2",
        category: "[SOBRE A ORGANIZACAO]",
        question: "Voce ja trabalhou para alguma empresa farmaceutica?",
        type: "yesno",
        bloqueada: false
    },
    {
        id: "organizacao_3",
        category: "[SOBRE A ORGANIZACAO]",
        question: "Voce autoriza a utilizacao dos seus dados biologicos?",
        type: "yesno",
        bloqueada: true
    },
    {
        id: "organizacao_4",
        category: "[SOBRE A ORGANIZACAO]",
        question: "Voce aceita participar de testes clinicos?",
        type: "yesno",
        bloqueada: true
    },
    {
        id: "organizacao_5",
        category: "[SOBRE A ORGANIZACAO]",
        question: "Voce concorda em obedecer as diretrizes da instalacao?",
        type: "yesno",
        bloqueada: true
    },
    // PERGUNTAS ESTRANHAS
    {
        id: "estranhas_1",
        category: "[PERGUNTAS ESTRANHAS]",
        question: "Voce sonha frequentemente com corredores brancos?",
        type: "yesno"
    },
    {
        id: "estranhas_2",
        category: "[PERGUNTAS ESTRANHAS]",
        question: "Alguma voz ja chamou seu nome quando nao havia ninguem?",
        type: "yesno"
    },
    {
        id: "estranhas_3",
        category: "[PERGUNTAS ESTRANHAS]",
        question: "Voce se lembra do dia 14 de setembro?",
        type: "yesno"
    },
    {
        id: "estranhas_4",
        category: "[PERGUNTAS ESTRANHAS]",
        question: "Quando fecha os olhos, ve alguma cor especifica?",
        type: "text"
    },
    {
        id: "estranhas_5",
        category: "[PERGUNTAS ESTRANHAS]",
        question: "Voce acredita que esta e a primeira vez respondendo este questionario?",
        type: "yesno"
    },
    // PERGUNTAS QUEBRA-CABECA
    {
        id: "quebra_1",
        category: "[QUEBRA-CABECA]",
        question: "Quantas portas havia na ultima sala em que voce esteve?",
        type: "text"
    },
    {
        id: "quebra_2",
        category: "[QUEBRA-CABECA]",
        question: "Escolha um numero entre 1 e 100.",
        type: "text"
    },
    {
        id: "quebra_3",
        category: "[QUEBRA-CABECA]",
        question: "Qual destas palavras parece mais familiar? Laz████████, E████████en, Or██",
        type: "text"
    },
    {
        id: "quebra_4",
        category: "[QUEBRA-CABECA]",
        question: "Se precisasse esquecer uma memoria hoje, qual seria?",
        type: "text"
    }
];

// MAPEAMENTO DE CATEGORIAS PARA EXIBICAO
const categoriasMap = {
    "[IDENTIFICACAO]": "TESTE DE IDENTIFICACAO",
    "[EXPOSICAO]": "TESTE DE EXPOSICAO",
    "[ESTADO PSICOLOGICO]": "AVALIACAO PSICOLOGICA",
    "[SOBREVIVENCIA]": "TESTE DE SOBREVIVENCIA",
    "[SOBRE A ORGANIZACAO]": "AVALIACAO ORGANIZACIONAL",
    "[PERGUNTAS ESTRANHAS]": "TESTE DE PERCEPCAO",
    "[QUEBRA-CABECA]": "TESTE COGNITIVO",
    "[PERGUNTAS ESPECIFICAS]": "ANALISE ESPECIFICA"
};

// MAPEIA QUAIS PERGUNTAS PERTENCEM A CADA CATEGORIA
const categoriasPerguntas = {};
questions.forEach(q => {
    if (!categoriasPerguntas[q.category]) {
        categoriasPerguntas[q.category] = [];
    }
    categoriasPerguntas[q.category].push(q);
});

// ========== PERGUNTAS PERSONALIZADAS POR ID ==========
const perguntasPersonalizadas = {
    // ID 032 - Glauber
    "032": [
        "Se tivesse apenas uma dose de um medicamento capaz de salvar uma unica vida, quem voce escolheria?",
        "Voce acredita que ainda conseguiria olhar nos olhos da sua mae se ela soubesse tudo?",
        "Ate onde a pobreza justifica uma escolha?",
        "Quando foi a primeira vez que voce percebeu que era capaz de matar alguem?",
        "Voce acredita que aquela primeira morte foi inevitavel... ou apenas conveniente?",
        "Se pudesse voltar a arena sabendo o que aconteceria, voce ainda entraria?",
        "Qual foi o momento exato em que voce deixou de ser a vitima?",
        "Voce luta para proteger pessoas... ou porque descobriu que gosta de vencer?",
        "Voce ainda consegue distinguir quando esta lutando por necessidade e quando e por que quer?",
        "Quando alguem o chama de monstro, o que mais incomoda? O insulto... ou a possibilidade de estarem certos?",
        "Naquela arena, quem morreu primeiro: seu oponente... ou o garoto que jurou nunca tirar uma vida?"
    ],
    
    // ID 045 - Marcus Oliver
    "045": [
        "Se tivesse a oportunidade de trazer alguem de volta, mas precisasse condenar outra pessoa inocente, voce aceitaria?",
        "Voce realmente sente falta do seu irmao... ou sente falta da pessoa que voce era antes de perde-lo?",
        "Voce acredita que poderia telo salvado?",
        "Quando pensa nele, qual sentimento aparece primeiro? Saudade, culpa... ou raiva?",
        "Existe algum som que voce gostaria de nunca mais ouvir?",
        "Voce ja precisou destruir algo que amava acreditando que era a unica escolha possivel?",
        "Voce acredita que boas intencoes sao suficientes para justificar um ato irreversivel?",
        "Quando foi a ultima vez que voce conseguiu olhar para suas proprias maos sem lembrar do que fez?",
        "Voce ja sacrificou algo precioso esperando receber uma resposta... e descobriu que estava falando sozinho?",
        "Se tudo aquilo em que voce acreditava fosse apenas um erro de interpretacao, quem voce seria agora?",
        "Voce ainda acredita que existe uma forca superior observando voce?",
        "Voce ja teve a impressao de que algo dentro de voce respondeu antes de voce tomar uma decisao?",
        "Voce ja percebeu pessoas reagindo a sua presenca de maneiras que nao conseguem explicar?",
        "Voce acredita que ainda possui controle absoluto sobre sua propria mente?",
        "Voce sente que, as vezes, seus pensamentos parecem... compartilhados?"
    ],
    
    // ID 078 - Jason MacLam
    "078": [
        "O que voce mais gosta de fazer quando tem um dia livre?",
        "Qual foi a ultima vez que voce realmente se divertiu com alguem?",
        "O que faz voce confiar em uma pessoa?",
        "O que Jullius representa na sua vida?",
        "Qual foi a coisa mais estupida que voce ja fez por alguem que ama?",
        "Voce se considera uma pessoa feliz hoje? Por que?",
        "Existe alguma coisa que voce gostaria de mudar em si mesmo?",
        "Quando voce percebe que esta perdendo o controle, o que costuma fazer?",
        "Qual foi a pior coisa que voce ja fez para sobreviver?",
        "Voce acredita que merece a vida que tem hoje?",
        "Se pudesse voltar para um unico momento da sua vida, qual seria?",
        "O que realmente aconteceu na missao ID0890?",
        "O que a morte dos seus pais mudou em voce?",
        "Se Jullius descobrisse tudo sobre o seu passado, voce teria medo de perde-lo?",
        "Se voce tivesse que escolher entre sua propria vida e a de Jullius, o que faria?"
    ],
    
    // ID 089 - Julius Topuria
    "089": [
        "O que a luta significa para voce alem de vencer?",
        "Qual foi a pessoa que mais acreditou em voce antes de voce se tornar quem e hoje?",
        "O que voce mais sente falta da sua antiga vida na policia?",
        "Por que Jason e alguem importante para voce?",
        "O que voce faria se Jason estivesse em perigo e voce soubesse que nao poderia salva-lo sozinho?",
        "Voce acha que se tornou uma pessoa diferente depois de abandonar a policia?",
        "Existe alguma coisa que voce sente culpa por ter feito ou deixado de fazer?",
        "Quando voce perde alguem, como costuma lidar com isso?",
        "Voce ainda acredita que poderia ter salvado seu parceiro e sua esposa?",
        "O que voce sente quando pensa no grupo que matou as pessoas que amava?",
        "Voce busca conquistar algo por voce mesmo ou para provar algo a alguem?",
        "Se tivesse a oportunidade de encontrar os responsaveis pelas mortes, o que faria?",
        "O que voce nunca contou a Jason sobre o seu passado?",
        "Se Jason estivesse prestes a morrer, voce seria capaz de abandonar tudo para salva-lo?",
        "Se um dia voce tivesse que escolher entre conquistar seu maior sonho e salvar alguem que ama, qual escolheria?"
    ],
    
    // ID 073 - Sasha Arantes
    "073": [
        "Voce consegue perceber quando alguem esta triste, mesmo quando essa pessoa sorri?",
        "Existe alguem por quem voce mudaria completamente quem voce e?",
        "Voce ja fingiu estar bem porque sabia que outra pessoa precisava que voce estivesse?",
        "Qual foi a maior confusao em que ja se meteu?",
        "Existe alguma pessoa que sempre consegue fazer voce sorrir?",
        "Voce acha que as pessoas costumam entender quem voce realmente e?",
        "Voce ja fingiu estar feliz para nao preocupar alguem?",
        "Se pudesse proteger uma unica pessoa pelo resto da vida, quem escolheria?",
        "Voce sente que precisa ser forte por alguem?",
        "Existe alguma coisa que voce gostaria que sua irma soubesse, mas nunca conseguiu dizer?",
        "Quando foi a ultima vez que voce percebeu que sua irma estava triste antes dela falar qualquer coisa?",
        "Se pudesse reviver um unico momento com sua mae, qual escolheria?",
        "Se alguem machucasse sua irma e depois implorasse por perdao... voce conseguiria olhar para essa pessoa sem sentir raiva?",
        "Se sua irma dissesse que precisa desaparecer para proteger voce, voce respeitaria a decisao dela?",
        "Imagine que sua irma perdeu todas as lembrancas de voces duas. Ela sorri para voce como sorri para qualquer estranho. Voce tentaria faze-la lembrar... ou deixaria que ela tivesse uma vida feliz, mesmo que nela nao existisse espaco para voce?"
    ],
    
    // ID 074 - Yamato Hanabi
    "074": [
        "Quando foi a ultima vez que voce precisou esconder uma emocao para nao preocupar alguem?",
        "Voce acredita que algumas pessoas carregam responsabilidades que nunca escolheram?",
        "Existe alguem cuja felicidade voce considera mais importante do que a sua?",
        "O que faz voce perder a paciencia mais rapido?",
        "Voce acredita que inteligencia e algo que nasce com a pessoa ou pode ser construida?",
        "Quando precisa escolher entre logica e emocao, qual costuma vencer?",
        "Voce ja escondeu uma verdade para proteger alguem?",
        "Existe alguma pessoa que voce sente que depende de voce para continuar bem?",
        "Voce sente que vive a vida que gostaria de viver?",
        "Se pudesse voltar a um unico dia da sua vida sem mudar nada, apenas revive-lo, qual seria?",
        "Qual foi a ultima vez que voce chorou completamente sozinha?",
        "Existe alguma culpa que voce acredita nunca conseguir superar?",
        "Se alguem dissesse que pode salvar milhoes de pessoas, mas sua irma morreria no processo, quanto tempo voce demoraria para responder?",
        "Voce ainda seria a mesma pessoa se deixasse de proteger quem ama?",
        "Se sua irma esquecesse completamente quem voce e... voce aceitaria viver ao lado dela sabendo que ela nunca mais voltara a lembrar do seu nome?"
    ],
};