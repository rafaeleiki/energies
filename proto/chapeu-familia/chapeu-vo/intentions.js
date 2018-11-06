window.Intention = (function() {

    const intentions = [
        {
            text: 'Obrigada! Vocês me ajudaram muito!',
            triggers: [
                ['encontrei', 'chave'],
                ['encontramos', 'chave'],
                ['encontrou', 'chave'],
                ['achamos', 'chave'],
                ['achamos', 'chaves']
            ],
        },
        {
            text: 'Obrigada meu filho! Eu bati a cabeça e estou esquecendo das coisas.',
            triggers: [
                ['vovó', 'ajudar'],
                ['vovó', 'ajuda'],
                ['vamos', 'ajudar'],
                ['claro', 'vovó']
            ],
        },
        {
            text: 'Eu bati a cabeça e estou esquecendo das coisas.',
            triggers: [
                ['vovózinha', 'ajudar'],
                ['vovózinha', 'ajuda'],
                ['vamos', 'ajudar'],
                ['claro', 'vovózinha']
            ],
        },
        {
            text: 'Tudo bem também, obrigada por perguntar.',
            triggers: [
                ['tudo bem'],
            ],
        },
        {
            text: 'Oi, tudo bem?',
            triggers: [
                ['oi'],
                ['olá'],
                ['bom dia'],
                ['boa tarde']
            ],
        },
        {
            text: 'O lobo é só um animal como qualquer outro.',
            triggers: [
                ['lobo', 'mal'],
                ['lobo', 'mau'],
                ['sabe', 'labo']
            ]
        },
        {
            text: 'Pra vir pra cá é só pegar um carro!',
            triggers: [
                ['como', 'chega', 'ai'],
                ['como', 'levo', 'chave'],
                ['como', 'leva', 'chave'],
                ['como', 'faz', 'levar']
            ]
        },
        {
            text: 'A chapéuzinho vermelho é a minha neta e prima de vocês!',
            triggers: [
                ['quem', 'é', 'chapeuzinho'],
                ['conhece', 'chapeuzinho'],
            ]
        },
        {
            text: 'Quando eu era mais nova eu era uma soldada!',
            triggers: [
                ['você', 'trabalhava'],
                ['qual', 'profissão'],
                ['vovó', 'profissão'],
                ['vovó', 'trabalhava'],
                ['você', 'soldado'],
                ['vovó', 'soldado'],
                ['você', 'soldada'],
                ['vovó', 'soldada'],
                ['vovó', 'exército'],
                ['você', 'exército'],
                ['vovózinha', 'soldado'],
                ['vovózinha', 'trabalhava'],
                ['vovózinha', 'trabalha'],
                ['vovózinha', 'exército']
            ]
        },
        {
            text: 'Você quer ouvir uma história? Eu não lembro de nenhuma agora.',
            triggers: [
                ['essa', 'história'],
            ]
        },
        {
            text: 'Eu não consigo mais trabalhar, então fico em casa vendo Netflix.',
            triggers: [
                ['por que', 'em casa'],
                ['porque', 'em casa'],
                ['fica', 'fazendo']
            ]
        },
    ];

    const relatedWords = [
        'senhora',
        'chave',
        'profissão',
        'chapéuzinho',
        'história'
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