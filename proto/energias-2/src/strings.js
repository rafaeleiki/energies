window.Game.STRINGS = (function() {

    var r = Game.ROLES;
    var STRINGS = {
        cd: {
            default: 'Parece um CD comum.',
            [r.DEVELOPER]: 'Este CD parece conter algum tipo de dado protegido.',
            minZ: -12,
            maxZ: -7
        },

        mirror: {
            [r.SCIENTIST]: 'Esse espelho reflete quem vê. Você enxerga mais dúvidas que respostas.',
            [r.DEVELOPER]: 'Esse espelho reflete quem vê. Você entende de tecnologia.',
            [r.ATHLETE]: 'Esse espelho reflete quem vê. Você tem mais energia passando pelo seu corpo.',
            [r.TEACHER]: 'Esse espelho reflete quem vê. Você conhece mais que todos.',
            all: 'A verdade que vocês procuram é uma pessoa',
            minZ: -13.5,
            maxZ: -12
        },

        origami: {
            default: 'O cisne representa um símbolo de harmonia no Japão. Uma energia boa está sendo sentida.',
            say: '"Ana não falava por temer, mas agia pelo mundo"',
            minZ: -4.5,
            maxZ: -3.8
        },

        paper: {
            default: 'São fórmulas que mostram dados da bateria. Quanto mais tempo passa, mais o aparelho descarrega.',
            [r.TEACHER]: '"Tente falar conversar com o moço do museu" o que será que isso significa?',
            [r.DEVELOPER]: 'Tem um esquema de como colocar dispositivos, CDs e disquetes em um computador.',
            [r.ATHLETE]: 'Alguns detalhes estão pequenos na folha, não dá para ler direito.',
            details: {
                default: 'Agora dá para ler melhor: "combinar itens diferentes pode gerar energias novas"',
                [r.TEACHER]: '"Ana era muda e mulher; pra publicar sua pesquisa, colocou o nome que daria a seu filho: Rafael"',
                [r.SCIENTIST]: 'O filho de Ana se chamava Rafael; o neto de Ana também',
                [r.ATHLETE]: 'Parece que Ana estudava física.'
            },
            minZ: -4.5,
            maxZ: -3.8
        },

        battery: {
            charging: 'Uma bateria extra! O dispositivo está sendo recarregado',
            charged: 'Parece que acabou a energia dessa bateria',
            minZ: -24,
            maxZ: -4
        },

        books: {
            default: '"Diálogo Sobre os Dois Máximos Sistemas do Mundo Ptolomaico e Coperniano", de Galileu Galilei.',
            [r.TEACHER]: 'Galileu foi um grande físico que foi calado por muitos anos porque seu pensamento ia contra o da Igreja.',
            [r.SCIENTIST]: 'Todos esses itens históricos...será que tem alguma relação com o estado das pessoas que viveram com eles?',
            galileu: 'Se as palavras também tem energia...o que não foi dito guarda energia? Com esses dois juntos parece que a energia está intensa',
            minZ: -4.5,
            maxZ: -3.8
        },

        pc: {
            default: 'Parece um computador velho',
            cd: 'O neto de Ana guardou suas coisas sem saber que eram dela; Rafael não percebeu o que isso poderia causar.',
            password: 'Senha incorreta. Você não lembra qual evento que você não iria esquecer?',
            minZ: -5,
            maxZ: -4
        },

        pendrive: {
            default: 'Um pendrive comum. O que será que tem ali dentro?',
            content: 'Tem várias fotos antigas de uma senhora chamada Ana. Ela parece estar feliz.',
            cant_open: 'O pendrive parece quase encaixar no PC, mas só um técnico conseguiria ver o conteúdo.',
            minZ: -22,
            maxZ: -20
        },

        mj: {
            default: 'Michael Jackson foi um grande artista e pessoa. Eu lembro dele em "We Are The World"...',
            [r.ATHLETE]: 'Eu adoro escutar as músicas dele enquanto me exercito.',
            cd: 'Começou a tocar "We Are the world". Uma energia boa está sendo sentida.',
            minZ: -4.5,
            maxZ: -3.8
        },

        cross: {
            default: 'É um símbolo religioso. Parece conter bastante energia.',
            [r.ATHLETE]: 'Esse tipo de energia me é familiar.',
            minZ: -10,
            maxZ: -8
        },

        crown: {
            default: 'A coroa é o grande símbolo de um rei. Alguns reis não são bons...',
            king: '"Os reis que calam seus súditos são por ele calados"',
            minZ: -10,
            maxZ: -8
        },

        glasses: {
            default: 'Esse parece ser um óculos bem velho.',
            [r.TEACHER]: '"Ana, te deixo esse óculos e o pin do melhor evento da sua vida"',
            minZ: -4.5,
            maxZ: -3.8
        },

        microphone: {
            default: 'Um microfone comum, levemente velho.',
            [r.TEACHER]: 'Eu uso microfone nas minhas aulas. Me ajuda quando estou sem voz.',
            minZ: -9,
            maxZ: -8
        },

        globe: {
            default: 'O mundo representado em um globo',
            [r.TEACHER]: 'Nem todo mundo acredita que o planeta é redondo.',
            [r.SCIENTIST]: 'Antigamente, as pessoas acreditavam que o Sol que girava em torno da Terra',
            energies: 'Os sacrifícios feitos no mundo não pensavam nas pessoas; a empatia é tudo que nos resta.',
            minZ: -10,
            maxZ: -8
        },

        pyramid: {
            default: 'As pirâmides astecas escondiam muitos segredos e guardavam a energia dos que por lá passaram.',
            [r.TEACHER]: 'Elas eram usadas para rituais, guardando a energia das pessoas na pirâmide.',
            minZ: -4.5,
            maxZ: -3.8
        }
    };

    return STRINGS;
})();

