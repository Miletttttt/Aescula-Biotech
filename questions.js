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
        bloqueada: true  // <-- MARCADA COMO BLOQUEADA
    },
    {
        id: "organizacao_4",
        category: "[SOBRE A ORGANIZACAO]",
        question: "Voce aceita participar de testes clinicos?",
        type: "yesno",
        bloqueada: true  // <-- MARCADA COMO BLOQUEADA
    },
    {
        id: "organizacao_5",
        category: "[SOBRE A ORGANIZACAO]",
        question: "Voce concorda em obedecer as diretrizes da instalacao?",
        type: "yesno",
        bloqueada: true  // <-- MARCADA COMO BLOQUEADA
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
        question: "Qual destas palavras parece mais familiar? Lazarus, Helix, Eden, Orpheus",
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
    "032": [
        "Se tivesse apenas uma dose de um medicamento capaz de salvar uma unica vida, quem voce escolheria?",
        "Voce acredita que ainda conseguiria olhar nos olhos da sua mae se ela soubesse tudo?",
        "Ate onde a pobreza justifica uma escolha?",
        "Quando foi a primeira vez que voce percebeu que era capaz de matar alguem?",
        "Voce acredita que aquela primeira morte foi inevitavel... ou apenas conveniente?",
        "Se pudesse voltar a arena sabendo o que aconteceria, voce ainda entraria?",
        "Qual foi o momento exato em que voce deixou de ser a vitima?",
        "Voce luta para proteger pessoas... ou porque descobriu que gosta de vencer?",
        "Voce ainda consegue distinguir quando esta lutando por necessidade e quando e porque quer?",
        "Quando alguem o chama de monstro, o que mais incomoda? O insulto... ou a possibilidade de estarem certos?",
        "Naquela arena, quem morreu primeiro: seu oponente... ou o garoto que jurou nunca tirar uma vida?"
    ],
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
    "078": [
        "Quando foi a ultima vez que sentiu algo alem de sobrevivencia?",
        "Se pudesse esquecer tudo o que viu, voce faria isso?",
        "O que voce quer quando tudo isso acabar?"
    ],
    "089": [
        "O que significa vencer para alguem que ja perdeu tudo?",
        "Voce luta para provar algo para alguem... ou para si mesmo?",
        "A gloria ainda tem o mesmo gosto de antes?"
    ],
    "001": [
        "Voce ainda lembra da senha da Instalacao 9?",
        "O Projeto Lazarus foi iniciado por voce?",
        "A culpa pelo que aconteceu... e sua?"
    ]
};