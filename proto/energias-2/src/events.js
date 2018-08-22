window.Game.Events = (function() {
    'use strict';

    function Events(game) {
        this.game = game;
        this.shown = new Set();
        this.addListeners();
    }

    function pendriveInPc(game, shown) {
        var found = shown.has('pendrive') && shown.has('pc');
        if (found) {

            if (game.getUser().role === Game.ROLES.DEVELOPER) {
                game.setText(Game.STRINGS.pendrive.content);
            } else {
                game.setText(Game.STRINGS.pendrive.cant_open);
            }
        }
        return found;
    }

    function pc(game, shown) {
        if (!pendriveInPc(game, shown)) {
            if (shown.has('pc') && shown.has('cd') &&
                game.getUser().role === Game.ROLES.DEVELOPER) {

                if (prompt('Digite a senha para abrir o CD', '').toUpperCase() === 'BCN16') {
                    game.setText(Game.STRINGS.pc.cd);
                } else {
                    game.setText(Game.STRINGS.pc.password);
                }
            }
        }
    }

    function weAreTheWorld(game, shown) {
        if (shown.has('mj') && shown.has('cd')) {
            game.setText(Game.STRINGS.mj.cd);
        } else {
            pc(game, shown);
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
            game.setConditionalText(Game.STRINGS.paper.details);
        }
    }

    function origamiMic(game, shown) {
        if (shown.has('origami') && shown.has('microphone')) {
            game.setText(Game.STRINGS.origami.say);
        }
    }

    function globePyramid(game, shown) {
        if (shown.has('globe') && shown.has('pyramid')) {
            game.setText(Game.STRINGS.globe.energies);
        }
    }

    Events.prototype = {
        addListeners: function () {
            this.addGlobalListeners();

            this.createTextObject('cd', weAreTheWorld);
            this.createTextObject('mirror', kingMirror);
            this.createTextObject('origami', origamiMic);
            this.createTextObject('paper', paperGlasses);
            this.createTextObject('books', galileu);
            this.createTextObject('pc', pc);
            this.createTextObject('mj', weAreTheWorld);
            this.createTextObject('cross', galileu);
            this.createTextObject('crown', kingMirror);
            this.createTextObject('glasses', paperGlasses);
            this.createTextObject('microphone', origamiMic);
            this.createTextObject('globe', globePyramid);
            this.createTextObject('pyramid', globePyramid);
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
            let game = this.game;
            let shown = this.shown;
            let object = document.getElementById(id);
            let showing = false;

            function tryFind() {
                if (showing) {
                    let zPosition = object.object3D.position.z;
                    let values = Game.STRINGS[id];
                    if (game.isObjectReadable(zPosition, values.minZ, values.maxZ)) {
                        shown.add(id);
                        game.setConditionalText(Game.STRINGS[id]);
                        fnFound && fnFound(game, shown);
                        showing = false;
                    }
                    setTimeout(tryFind, 100);
                }
            }

            object.addEventListener('markerLost', () => {
                showing = false;
                this.markerLost.bind(this, id, fnLost);
            });

            object.addEventListener('markerFound', function () {
                showing = true;
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

                game.rechargeByMoving(ev.interval, acceleration);
            }, true);
        }
    };

    return Events;
})();