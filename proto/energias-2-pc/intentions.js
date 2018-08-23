window.findIntention = (function() {

    let intentions = [
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
                ['perto', 'luva']
            ]
        },
        {
            text: 'As dúvidas que o cientista traz estão sendo ouvidas?',
            triggers: [
                ['duvida', 'cientista'],
                ['dúvida', 'cientista'],
                ['informações', 'cientista'],
                ['cientista', 'informações']
            ]
        },
        {
            text: 'Quem é a Ana?',
            triggers: [
                ['ana'],
                ['Ana'],
                ['história', 'velha'],
                ['senhora']
            ]
        }
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
        let index = 0;
        let possible = true;

        for (let i = 0; possible && i < trigger.length; i++) {
            let newIndex = text.indexOf(trigger[i], index);
            if (newIndex >= 0) {
                index = newIndex;
            } else {
                possible = false;
            }
        }

        return possible;
    }

    return findIntention;
})();