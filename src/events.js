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

            this.addGlobalListeners();

            var cd = document.getElementById('cd');

            cd.addEventListener('markerFound', function () {
                var texts = { default: 'teste' };
                texts[Controls.ROLES.DEVELOPER] = 'teste developer';
                game.setConditionalText(texts);
            });

            cd.addEventListener('markerLost', function() {
                game.setText();
            });
        },

        addGlobalListeners: function() {
            var game = this.game;

            window.addEventListener("devicemotion", function (ev) {
                const GRAVITY = 10;
                const MIN_VALUE = 10;
                var g = ev.accelerationIncludingGravity;
                var acceleration = Math.abs(g.x) + Math.abs(g.y) + Math.abs(g.z) - GRAVITY;

                if (acceleration - MIN_VALUE < 0) {
                    acceleration = 0;
                }

                if (game.getUser().role === Controls.ROLES.ATHLETE) {
                    acceleration *= 3.4;
                }

                game.recharge(ev.interval, acceleration);
            }, true);
        }
    };
})();