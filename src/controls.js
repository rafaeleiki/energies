(function() {
    'use strict';

    const SECONDS = 1000;
    const MINUTES = 60 * SECONDS;

    function formatTime(min, sec) {
        if (sec < 10) {
            sec = '0' + sec;
        }
        return min + ":" + sec;
    }

    /* 2 minutes */
    const ROLE_TIME = 2 * MINUTES;

    function Controls() {
        this.battery = {
            load: document.getElementById('battery-charge'),
            percent: document.getElementById('battery-percent')
        };
        this.role = {
            name: document.getElementById('role-name'),
            picture: document.getElementById('role-pic')
        };
        this.charge = 100;
        this.totalTime = 20 * MINUTES;
        this.currentRoleTime = ROLE_TIME;
        this.watch = document.getElementById('role-time');
        this.currentUserIndex = 0;
        this.text = document.getElementById('text-interaction');
    }

    window.Controls = Controls;

    Controls.ROLES = {
        SCIENTIST: 1,
        DEVELOPER: 2,
        TEACHER: 3,
        ATHLETE: 4
    };

    const ROLES = [
        { name: 'Cientista', icon: 'res/scientist.png', role: Controls.ROLES.SCIENTIST },
        { name: 'Programador', icon: 'res/coder.png', role: Controls.ROLES.DEVELOPER },
        { name: 'Prof. História', icon: 'res/teacher.png', role: Controls.ROLES.TEACHER },
        { name: 'Atleta', icon: 'res/athlete.png', role: Controls.ROLES.ATHLETE }
    ];

    Controls.prototype = {
        loadBattery: function (percent) {
            percent = percent.toFixed(0);
            this.battery.load.style.width = percent + '%';
            this.battery.percent.innerText = percent + '%';
        },

        discharge: function (timeInterval) {

            var dischargeMultiplier;
            if (this.totalTime < 10 * MINUTES) {
                dischargeMultiplier = 0.15;
            } else if (this.totalTime < 20 * MINUTES) {
                dischargeMultiplier = 0.22;
            } else if (this.totalTime < 30 * MINUTES) {
                dischargeMultiplier = 0.30;
            } else {
                dischargeMultiplier = 0.60;
            }

            this.charge -= dischargeMultiplier * timeInterval / SECONDS;
            this.charge = Math.max(0, this.charge);
        },

        recharge: function(timeInterval, movement) {
            var chargeMultiplier;

            if (this.totalTime < 10 * MINUTES) {
                chargeMultiplier = 0.01;
            } else if (this.totalTime < 20 * MINUTES) {
                chargeMultiplier = 0.013;
            } else if (this.totalTime < 30 * MINUTES) {
                chargeMultiplier = 0.02;
            } else {
                chargeMultiplier = 0.04;
            }

            var charge = Math.abs(chargeMultiplier * movement * timeInterval / SECONDS);
            this.charge = Math.min(100, this.charge + charge);
        },

        updateTime: function(timeInterval) {
            this.totalTime += timeInterval;
            this.currentRoleTime -= timeInterval;
            var seconds = Math.floor(this.currentRoleTime / SECONDS);
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
                this.currentUserIndex = (this.currentUserIndex + 1) % ROLES.length;
                this.loadUser();
                this.currentRoleTime = ROLE_TIME;
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
            return ROLES[this.currentUserIndex];
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
})();