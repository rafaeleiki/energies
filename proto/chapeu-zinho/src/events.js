window.Game.Events = (function() {
    'use strict';

    const varEvents = {
        find: 0,
    };

    function Events(game) {
        this.game = game;
        this.shown = new Set();
        this.addListeners();
    }

    function objectFind(id, index) {
        if (index === varEvents.find) {
            game.setText(Game.STRINGS[id].found);
            varEvents.find++;
        } else if (index === varEvents.find - 1) {
            game.setText(Game.STRINGS[id].found);
        }
    }

    function finish(shown) {
        if (shown.has('drive') && shown.has('battery') && varEvents.find >= 7) {
            game.setText(Game.STRINGS.end);
        }
    }

    Events.prototype = {
        addListeners: function () {
            this.addGlobalListeners();

            this.createTextObject('phone', () => objectFind('phone', 0));
            this.createTextObject('game');
            this.createTextObject('battery', () => finish(this.shown));
            this.createTextObject('glasses');
            this.createTextObject('dino', () => objectFind('dino', 2));
            this.createTextObject('racket', () => objectFind('racket', 5));
            this.createTextObject('drive', () => finish(this.shown));
            this.createTextObject('tank', () => objectFind('tank', 4));
            this.createTextObject('yoyo', () => objectFind('yoyo', 3));
            this.createTextObject('necklace', () => objectFind('necklace', 1));
            this.createTextObject('magazine', () => objectFind('magazine', 6));

            var game = this.game;
        },

        createTextObject: function(id, fnFound, fnLost) {
            let game = this.game;
            let shown = this.shown;
            let object = document.getElementById(id);
            let showing = false;
            let speak = false;

            function tryFind() {
                if (showing) {
                    let zPosition = object.object3D.position.z;
                    let values = Game.STRINGS[id];
                    shown.add(id);

                    if (game.checkObjectDistance(zPosition, values.minZ, values.maxZ)) {
                        if (speak) {
                            game.setConditionalText(Game.STRINGS[id]);
                            fnFound && fnFound(game, shown);
                            speak = false;
                        }
                    }
                    setTimeout(tryFind, 100);
                }
            }

            object.addEventListener('markerLost', () => {
                showing = false;
                speak = false;
                game.stopVibration();
                this.markerLost(id, fnLost);
            });

            object.addEventListener('markerFound', function () {
                showing = true;
                speak = true;
                tryFind();
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
                } else {
                    acceleration /= 10;
                }

                // Athlete has an energy multiplier
                if (game.getUser().role === Game.ROLES.ATHLETE) {
                    acceleration *= 3.4;
                }
            }, true);
        }
    };

    return Events;
})();