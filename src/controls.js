(function() {
    'use strict';

    /* 2 minutes */
    const ROLE_TIME = 2 * 60 * 1000;

    function Controls() {
        this.battery = {
            load: document.getElementById('battery-charge'),
            percent: document.getElementById('battery-percent')
        };
        this.charge = 100;
        this.currentRoleTime = ROLE_TIME;
        this.watch = document.getElementById('role-time');
    }

    Controls.prototype = {
        loadBattery: function (percent) {
            percent = percent.toFixed(1);
            this.battery.load.style.width = percent + '%';
            this.battery.percent.innerText = percent + '%';
        },

        /* Discharges 0.16% per second */
        discharge: function (timeInterval) {
            this.charge -= 0.16 * timeInterval / 1000;
            this.charge = Math.max(0, this.charge);
        },

        updateTime: function(timeInterval) {
            this.currentRoleTime -= timeInterval;
            var seconds = Math.floor(this.currentRoleTime / 1000);
            var minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;
            minutes = Math.max(0, minutes);
            seconds = Math.max(0, seconds);
            this.watch.innerText = minutes + ":" + seconds;
        },

        gameLoop: function (timeInterval) {
            this.discharge(timeInterval);
            this.loadBattery(this.charge);
            this.updateTime(timeInterval)
        },

        isOver: function () {
            return this.charge <= 0;
        },

        start: function () {
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
        }
    };

    new Controls().start();
})();