window.Intention = (function() {

    const intentions = [
        {
            text: 'Eu sou o que todos procuram mas ninguém gosta de ouvir',
            triggers: [
                ['que', 'será', 'computador'],
                ['quem', 'computador'],
                ['quem', 'isso'],
                ['o', 'que', 'é', 'isso'],
                ['saber', 'verdade'],
                ['descobrir', 'verdade'],
                ['será', 'verdade'],
            ],
        },
        {
            text: 'A luva transforma movimento em energia',
            triggers: [
                ['como', 'recarrega'],
                ['você', 'sabe', 'recarregar'],
                ['recarregar', 'bateria'],
                ['acabando', 'bateria'],
                ['como', 'carrega'],
                ['informação', 'luz']
            ],
        },
        {
            text: 'Se você colocar a mão numa distância certa, dá para capturar a energia do objeto.',
            triggers: [
                ['como', 'pega', 'objeto'],
                ['código', 'objeto'],
                ['vibrou', 'perto'],
                ['perto', 'luva'],
                ['luva', 'vibrando'],
                ['luva', 'guarda'],
                ['dispositivo', 'funciona'],
                ['dispositivo', 'guarda']
            ]
        },
        {
            text: 'As dúvidas que o cientista traz estão sendo ouvidas?',
            triggers: [
                ['duvida', 'cientista'],
                ['dúvida', 'cientista'],
                ['informações', 'cientista'],
                ['informação', 'cientista'],
                ['cientista', 'faz']
            ]
        },
        {
            text: 'Quem é a Ana?',
            triggers: [
                ['ana'],
                ['história', 'velha'],
                ['senhora'],
                ['senhorinha']
            ]
        },
        {
            text: 'Galileu foi um físico, assim como Ana',
            triggers: [
                ['galileu', 'livro'],
                ['galileu', 'ana']
            ]
        },
        {
            text: 'Quando pessoas se juntam para dar energia boa, a energia ruim é repelida',
            triggers: [
                ['we', 'are', 'the', 'world']
            ]
        },
        {
            text: '"We are the world"',
            triggers: [
                ['michael', 'jackson'],
            ]
        },
        {
            text: 'Tudo que nos resta é empatia',
            triggers: [
                ['empatia'],
                ['energia', 'boa'],
            ]
        },
        {
            text: 'A Ana é a avó do Rafael',
            triggers: [
                ['neto', 'rafael'],
                ['avó', 'ana']
            ]
        },
        {
            text: 'Alguns objetos guardam energia boa, outros tem energia ruim',
            triggers: [
                ['objeto', 'energia']
            ]
        },
        {
            text: 'Ana era uma física que não foi ouvida por ser mulher',
            triggers: [
                ['fisica', 'ana'],
                ['cientista', 'ana'],
                ['ana', 'fazia'],
            ]
        },
    ];

    const relatedWords = [
        'bateria',
        'carregar',
        'senhora',
        'cientista',
        'energia',
        'cantor',
        'música',
        'dúvidas',
        'dúvida'
    ];

    function findIntention(text) {
        let foundIntention;

        intentions.some((intention) => {
            return intention.triggers.some((trigger) => {
                let found = isTriggered(text, trigger);
                if (found) {
                    foundIntention = intention;
                }
                return found;
            });
        });

        return foundIntention;
    }

    function isTriggered(text, trigger) {
        let possible = true;
        for (let i = 0; possible && i < trigger.length; i++) {
            if (text.indexOf(trigger[i]) < 0) {
                possible = false;
            }
        }
        return possible;
    }

    function wordLevel(word) {
        let level = 0;

        if (isRelated(word)) {
            level = 2;
        } else if (isTrigger(word)) {
            level = 1;
        }

        return level;
    }

    function isTrigger(word) {
        return intentions.some((intention) => {
            return intention.triggers.some((trigger) => {
                return trigger.indexOf(word) >= 0;
            })
        })
    }

    function isRelated(word) {
        return relatedWords.indexOf(word) >= 0;
    }

    return {
        find: findIntention,
        getLevel: wordLevel,
    };
})();