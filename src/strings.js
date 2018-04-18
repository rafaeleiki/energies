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
    };

    return STRINGS;
})();

