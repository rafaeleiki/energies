window.Intention = (function() {

    const intentions = [
        {
            text: 'A luva transforma movimento em energia',
            triggers: [
                ['como', 'recarrega'],
                ['você', 'sabe', 'recarregar'],
                ['recarregar', 'bateria'],
                ['acabando', 'bateria'],
                ['como', 'carrega']
            ],
        },
        {
            text: 'Se você colocar a mão numa distância certa, dá para capturar a energia do objeto.',
            triggers: [
                ['como', 'pega', 'objeto'],
                ['código', 'objeto'],
                ['vibrou', 'perto'],
                ['perto', 'luva'],
                ['luva', 'vibrando']
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
        }
    ];

    const relatedWords = [
        'bateria',
        'carregar',
        'senhora',
        'cientista',
        'energia'
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