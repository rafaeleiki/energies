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
            percent: document.getElementById('battery-percent')
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
    }

    Controls.prototype = {
        loadBattery: function (percent) {
            percent = percent.toFixed(0);
            this.battery.load.style.width = percent + '%';
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
            this.discharge(timeInterval);
            this.loadBattery(this.charge);
            if (this.updateTime(timeInterval)) {
                this.currentUserIndex = (this.currentUserIndex + 1) % Game.ROLES.length;
                this.loadUser();
                this.currentRoleTime = Game.ROLE_TIME;
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
            this.loadUser();
            this.lastTime = new Date().getTime();
            setTimeout(this.gameControl.bind(this));
        },

        gameControl: function () {
            if (this.isOver()) {
                this.endGame();
            } else {
                var now = new Date().getTime();
                this.gameLoop(now - this.lastTime);
                this.lastTime = now;
                setTimeout(this.gameControl.bind(this));
            }
        },

        endGame: function () {
            document.querySelector('.a-canvas').style.background = 'red';
        },

        getUser: function () {
            return Game.CHARACTERS[this.currentUserIndex];
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