(function() {
    'use strict';

    function Events(game) {
        this.game = game;
        this.addListeners();
    }

    window.Events = Events;

    Events.prototype = {
        addListeners: function () {
            var game = this.game;
            var cd = document.getElementById('cd');

            cd.addEventListener('markerFound', function () {
                var texts = { default: 'teste' };
                texts[Controls.ROLES.DEVELOPER] = 'teste developer';
                game.setConditionalText(texts);
            });

            cd.addEventListener('markerLost', function() {
                game.setText();
            })
        }
    };
})();