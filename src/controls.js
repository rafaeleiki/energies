window.Game.Controls = (function() {
    'use strict';

    function formatTime(min, sec) {
        if (sec < 10) {
            sec = '0' + sec;
        }
        return min + ":" + sec;
    }

    function Controls() {
        this.battery = {
            load: document.getElementById('battery-charge'),
            percent: document.getElementById('battery-percent'),
            chargeMark: document.getElementById('charging')
        };
        this.role = {
            name: document.getElementById('role-name'),
            picture: document.getElementById('role-pic')
        };
        this.charge = Game.INITIAL_BATTERY;
        this.totalTime = Game.TOTAL_TIME;
        this.currentRoleTime = Game.ROLE_TIME;
        this.watch = document.getElementById('role-time');
        this.currentUserIndex = Game.STARTING_USER;
        this.text = document.getElementById('text-interaction');
        this.setState(Game.STATES.CHARACTER_ROTATION);
        this.lastCharge = this.charge;
    }

    Controls.prototype = {
        loadBattery: function (percent) {
            percent = percent.toFixed(0);
            const BATTERY_ELEMENT_WIDTH = 70;
            this.battery.load.style.width = (BATTERY_ELEMENT_WIDTH * percent / 100) + 'px';
            this.battery.percent.innerText = percent + '%';
        },

        discharge: function (timeInterval) {

            var dischargeMultiplier;
            if (this.totalTime < 10 * Game.MINUTES) {
                dischargeMultiplier = 0.15;
            } else if (this.totalTime < 20 * Game.MINUTES) {
                dischargeMultiplier = 0.22;
            } else if (this.totalTime < 30 * Game.MINUTES) {
                dischargeMultiplier = 0.30;
            } else {
                dischargeMultiplier = 0.60;
            }

            this.charge -= dischargeMultiplier * timeInterval / Game.SECONDS;
            this.charge = Math.max(0, this.charge);
        },

        rechargeByMoving: function(timeInterval, movement) {
            var chargeMultiplier;

            if (this.totalTime < 10 * Game.MINUTES) {
                chargeMultiplier = 0.01;
            } else if (this.totalTime < 20 * Game.MINUTES) {
                chargeMultiplier = 0.013;
            } else if (this.totalTime < 30 * Game.MINUTES) {
                chargeMultiplier = 0.02;
            } else {
                chargeMultiplier = 0.04;
            }

            var charge = Math.abs(chargeMultiplier * movement * timeInterval / Game.SECONDS);
            this.recharge(charge);
        },

        recharge: function(amount) {
            this.charge = Math.min(100, this.charge + amount);
        },

        updateTime: function(timeInterval) {
            this.totalTime += timeInterval;
            this.currentRoleTime -= timeInterval;
            var seconds = Math.floor(this.currentRoleTime / Game.SECONDS);
            var minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;
            minutes = Math.max(0, minutes);
            seconds = Math.max(0, seconds);
            this.watch.innerText = formatTime(minutes, seconds);
            return minutes <= 0 && seconds <= 0 && this.charge > 0;
        },

        gameLoop: function (timeInterval) {
            if (this.state === Game.STATES.PLAYING) {
                this.lastCharge = this.charge;
                this.discharge(timeInterval);
                this.loadBattery(this.charge);
                if (this.updateTime(timeInterval)) {
                    this.currentUserIndex = (this.currentUserIndex + 1) % Game.CHARACTERS.length;
                    this.loadUser();
                    this.setState(Game.STATES.CHARACTER_ROTATION);
                    this.currentRoleTime = Game.ROLE_TIME;
                }
            }
        },

        loadUser: function () {
            var user = this.getUser();
            this.role.name.innerText = user.name;
            this.role.picture.src = user.icon;
        },

        isOver: function () {
            return this.charge <= 0;
        },

        start: function () {
            var canvas = document.querySelector('.a-canvas');
            canvas.addEventListener('click', () => {
               if (this.state === Game.STATES.CHARACTER_ROTATION) {
                   this.setState(Game.STATES.PLAYING);
               }
            });

            this.loadUser();
            this.lastTime = new Date().getTime();
            setTimeout(this.gameControl.bind(this));
        },

        gameControl: function () {
            if (this.isOver()) {
                this.endGame();
            } else {
                var now = new Date().getTime();
                this.setIsCharging(this.charge > this.lastCharge);
                var timeGap = now - this.lastTime;
                this.gameLoop(timeGap * 30);
                this.lastTime = now;
                setTimeout(this.gameControl.bind(this));
            }
        },

        endGame: function () {
            this.state = Game.STATES.ENDED;

        },

        getUser: function () {
            return Game.CHARACTERS[this.currentUserIndex];
        },

        setIsCharging: function(isCharging) {
            this.battery.chargeMark.style.visibility = isCharging ? 'visible' : 'hidden';
        },

        setState: function(state) {
            var canvas = document.querySelector('.a-canvas');
            this.state = state;

            switch (state) {
                case Game.STATES.PLAYING:
                    this.setText('');
                    canvas.style.background = '';
                    break;
                case Game.STATES.CHARACTER_ROTATION:
                    canvas.style.background = 'blue';
                    this.setText('Agora é a vez do ' + this.getUser().name + '. Toque na tela quando estiver pronto');
                    break;
                case Game.STATES.ENDED:
                    canvas.style.background = 'red';
                    this.setText('A bateria acabou!');
                    break;
            }
        },

        setText: function (text) {
            if (text) {
                this.text.innerText = text;
                this.text.style.display = 'block';
            } else {
                this.text.style.display = 'none';
            }
        },

        setConditionalText: function (conditions) {
            var user = this.getUser();
            if (conditions[user.role]) {
                this.setText(conditions[user.role]);
            } else if (conditions.default) {
                this.setText(conditions.default);
            } else {
                this.setText();
            }
        }
    };

    return Controls;
})();