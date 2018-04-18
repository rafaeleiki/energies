window.Game.Events = (function() {
    'use strict';

    function Events(game) {
        this.game = game;
        this.addListeners();
    }

    Events.prototype = {
        addListeners: function () {
            this.addGlobalListeners();

            this.createTextObject('cd');
            this.createTextObject('mirror');
        },

        createTextObject: function(id) {
            var game = this.game;
            var object = document.getElementById(id);
            object.addEventListener('markerLost', this.markerLost.bind(this));
            object.addEventListener('markerFound', function () {
                game.setConditionalText(Game.STRINGS[id]);
            });
        },

        markerLost: function () {
          this.game.setText();
        },

        addGlobalListeners: function() {
            var game = this.game;

            window.addEventListener("devicemotion", function (ev) {
                const GRAVITY = 10;
                const MIN_VALUE = 10;
                var g = ev.accelerationIncludingGravity;
                var acceleration = Math.abs(g.x) + Math.abs(g.y) + Math.abs(g.z) - GRAVITY;

                // Only reads acceleration above minimum value
                if (acceleration - MIN_VALUE < 0) {
                    acceleration = 0;
                }

                // Athlete has an energy multiplier
                if (game.getUser().role === Game.ROLES.ATHLETE) {
                    acceleration *= 3.4;
                }

                game.recharge(ev.interval, acceleration);
            }, true);
        }
    };

    return Events;
})();