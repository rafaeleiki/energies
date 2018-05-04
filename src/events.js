window.Game.Events = (function() {
    'use strict';

    function Events(game) {
        this.game = game;
        this.shown = new Set();
        this.addListeners();
    }

    function pendriveInPc(game, shown) {
        if (shown.has('pendrive') && shown.has('pc')) {

            if (game.getUser().role === Game.ROLES.DEVELOPER) {
                game.setText(Game.STRINGS.pendrive.content);
            } else {
                game.setText(Game.STRINGS.pendrive.cant_open);
            }
        }
    }

    function weAreTheWorld(game, shown) {
        if (shown.has('mj') && shown.has('cd')) {
            game.setText(Game.STRINGS.mj.cd);
        }
    }

    function galileu(game, shown) {
        if (shown.has('books') && shown.has('cross')) {
            game.setText(Game.STRINGS.books.galileu);
        }
    }

    function kingMirror(game, shown) {
        if (shown.has('crown') && shown.has('mirror')) {
            game.setText(Game.STRINGS.crown.king);
        }
    }

    function paperGlasses(game, shown) {
        if (shown.has('paper') && shown.has('glasses')) {
            game.setText(Game.STRINGS.paper.details);
        }
    }

    Events.prototype = {
        addListeners: function () {
            this.addGlobalListeners();

            this.createTextObject('cd', weAreTheWorld);
            this.createTextObject('mirror', kingMirror);
            this.createTextObject('origami');
            this.createTextObject('paper', paperGlasses);
            this.createTextObject('books', galileu);
            this.createTextObject('pc', pendriveInPc);
            this.createTextObject('mj', weAreTheWorld);
            this.createTextObject('cross', galileu);
            this.createTextObject('crown', kingMirror);
            this.createTextObject('glasses', paperGlasses);
            this.createTextObject('microphone');
            this.createTextObject('globe');
            this.createTextObject('pyramid');
            this.createTextObject('pendrive', pendriveInPc);

            var game = this.game;

            var battery = document.getElementById('battery');
            battery.addEventListener('markerLost', function() {
                game.setSupercharge(false);
            });
            battery.addEventListener('markerFound', function () {
                game.setSupercharge(true);
                if (game.isSupercharging()) {
                    game.setText(Game.STRINGS.battery.charging);
                } else {
                    game.setText(Game.STRINGS.battery.charged);
                }
            });
        },

        createTextObject: function(id, fnFound, fnLost) {
            var game = this.game;
            var shown = this.shown;
            var object = document.getElementById(id);
            object.addEventListener('markerLost', this.markerLost.bind(this, id, fnLost));
            object.addEventListener('markerFound', function () {
                shown.add(id);
                game.setConditionalText(Game.STRINGS[id]);
                fnFound && fnFound(game, shown);
            });
        },

        markerLost: function (id, fnLost) {
          this.game.setText();
          this.shown.delete(id);
          fnLost && fnLost(this.game, this.shown);
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

                game.rechargeByMoving(ev.interval, acceleration);
            }, true);
        }
    };

    return Events;
})();