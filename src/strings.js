window.Game.STRINGS = (function() {

    var r = Game.ROLES;
    var STRINGS = {
        cd: {
            default: 'Parece um CD comum.',
            [r.DEVELOPER]: 'Este CD parece conter algum tipo de dado protegido.'
        },

        mirror: {
            [r.SCIENTIST]: 'Eu vejo um(a) cientista. Ele(a) consegue resolver problemas criativos e se questiona mais sobre o que faz.',
            [r.DEVELOPER]: 'Eu vejo um(a) programador(a). Ele(a) sabe resolver problemas de lógica e entende como funciona a tecnologia.',
            [r.ATHLETE]: 'Eu vejo um(a) atleta. Com o físico melhor, consegue recarregar mais rapidamente a bateria do LCFV.',
            [r.TEACHER]: 'Eu vejo um(a) professor(a). Através de muita informação e sabedoria, consegue cruzar muitas informações ensinar a todos.'
        },

        origami: {
            default: 'O cisne representa um símbolo de harmonia no Japão. Sinto uma energia boa vindo desta dobradura de papel.',
        },

        paper: {
            default: 'Parece que são papéis sobre o protótipo do LCFV que falam sobre a bateria. Quanto mais passa o tempo, a bateria vai se viciando e descarregando e carregando mais rápido. Depois de 30 minutos fica muito difícil de continuar usando ela.',
            [r.TEACHER]: '"Tente falar conversar com o moço do museu" o que será que isso significa?',
            [r.DEVELOPER]: 'Tem um esquema de como colocar dispositivos, CDs e disquetes em um computador.',
        },

        battery: {
            charging: 'Uma bateria extra! Isso parece recarregar o dispositivo',
            charged: 'Parece que acabou a energia dessa bateria'
        },

        books: {
            default: '"Diálogo Sobre os Dois Máximos Sistemas do Mundo Ptolomaico e Coperniano", de Galileu Galilei.',
            [r.TEACHER]: 'Galileu foi um grande físico que foi calado por muitos anos porque seu pensamento ia contra o da Igreja.',
            [r.SCIENTIST]: 'Todos esses itens históricos...será que tem alguma relação com o estado das pessoas que viveram com eles?'
        },

        pc: {
            default: 'Parece um computador velho',
        },

        pendrive: {
            default: 'Um pendrive comum. O que será que tem ali dentro?',
            content: 'Tem várias fotos antigas de uma senhora chamada Ana. Ela parece estar feliz.',
            cant_open: 'O pendrive parece quase encaixar no PC, mas só um técnico conseguiria ver o conteúdo.'
        },

        mj: {
            default: 'Michael Jackson foi um grande artista e pessoa. Eu lembro dele em "We Are The World"...',
            [r.ATHLETE]: 'Eu adoro escutar as músicas dele enquanto me exercito.'
        },

        cross: {
            default: 'É um símbolo religioso. Parece conter bastante energia.',
            [r.ATHLETE]: 'Esse tipo de energia me é familiar.',
        },

        crown: {
            default: 'A coroa é o grande símbolo de um rei. Alguns reis não são muito bons...',
        },

        glasses: {
            default: 'Esse parece ser um óculos bem velho.',
        },

        microphone: {
            default: 'Um microfone comum, levemente velho.',
            [r.TEACHER]: 'Eu uso microfone nas minhas aulas. Me ajuda quando estou sem voz.'
        },

        globe: {
            default: 'O mundo representado em um globo',
            [r.TEACHER]: 'Nem todo mundo acredita que o planeta é um globo.',
            [r.SCIENTIST]: 'Antigamente, as pessoas acreditavam que o Sol que girava em torno da Terra'
        },

        pyramid: {
            default: 'As pirâmides astecas escondiam muitos segredos e guardavam a energia dos que por lá passaram.',
            [r.TEACHER]: 'Elas eram usadas para rituais...isso deve deixar a energia das pessoas na pirâmide.'
        }
    };

    return STRINGS;
})();

