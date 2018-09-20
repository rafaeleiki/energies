window.Intention = (function() {

    const intentions = [
        {
            text: 'Oi, tudo bem?',
            triggers: [
                ['oi'],
                ['olá'],
                ['tudo bem'],
                ['bom dia'],
                ['boa tarde']
            ],
        },
        {
            text: 'Eu estou na minha casa e não consigo achar a chave da porta. Vocês podem trazer pra mim?',
            triggers: [
                ['me', 'explica', 'história'],
                ['fala', 'que', 'acontecendo'],
                ['me', 'explica', 'acontecendo']
            ],
        },
        {
            text: 'O lobo é só um animal como qualquer outro.',
            triggers: [
                ['lobo', 'mal'],
                ['lobo', 'mau']
            ]
        }
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

    function isTrigger(word) {
        return intentions.some((intention) => {
            return intention.triggers.some((trigger) => {
                return trigger.indexOf(word) >= 0;
            })
        })
    }

    function isRelated(word) {
        return relatedWords.indexOf(word) >= 0 || isTrigger(word);
    }

    return {
        find: findIntention,
        isRelated,
    };
})();