navigator.permissions.query({name:'magnetometer'}).then(function(result) {
    if (result.state === 'granted') {
        let magSensor = new Magnetometer({frequency: 30});

        magSensor.addEventListener('reading', e => {
            const sum = Math.abs(magSensor.x) + Math.abs(magSensor.y) + Math.abs(magSensor.z);
            varEvents.magnetometer = sum > 80;
            console.log(varEvents.magnetometer);
        });
        magSensor.start();
    }
});

const varEvents = {
    find: 0,
    magnetometer: false,
};

window.Game.Events = (function() {
    'use strict';

    function Events(game) {
        this.game = game;
        this.shown = new Set();
        this.addListeners();
    }

    function withBattery(id, game, shown) {
        if (shown.has(id) && shown.has('battery')) {
            game.setText(Game.STRINGS[id].battery);
        }
    }

    Events.prototype = {
        addListeners: function () {
            this.addGlobalListeners();

            this.createTextObject('phone', withBattery.bind(this, 'phone'));
            this.createTextObject('game', withBattery.bind(this, 'game'));
            this.createTextObject('battery');
            this.createTextObject('glasses');
            this.createTextObject('dino');
            this.createTextObject('racket');
            this.createTextObject('drive', withBattery.bind(this, 'drive'));
            this.createTextObject('tank');
            this.createTextObject('yoyo');
            this.createTextObject('necklace');
            this.createTextObject('eye');

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
                            game.setConditionalText(Game.STRINGS[id], varEvents.magnetometer);
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