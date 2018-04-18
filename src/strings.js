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
        },

        battery: {
            default: 'Uma bateria extra! Com isso recarregou 50% da bateria.',
        },

        books: {
            default: '"Diálogo Sobre os Dois Máximos Sistemas do Mundo Ptolomaico e Coperniano", de Galileu Galilei.',
            [r.TEACHER]: 'Galileu foi um grande físico que foi calado por muitos anos porque seu pensamento ia contra o da Igreja.',
            [r.SCIENTIST]: 'Todos esses itens históricos...será que tem alguma relação com o estado das pessoas que viveram com eles?'
        },

        pc: {
            default: 'Parece um computador velho',
        },
    };

    return STRINGS;
})();

