window.Game.Controls = (function() {
    'use strict';

    const TIME_MULTIPLIER = 1;
    const MIN_VIBRATION_LEVEL = 10;

    function formatTime(min, sec) {
        if (sec < 10) {
            sec = '0' + sec;
        }
        return min + ":" + sec;
    }

    function Controls() {
        this.battery = {
            load: document.querySelector('.battery-charge'),
            percent: document.getElementById('battery-percent'),
            chargeMark: document.getElementById('charging'),
            supercharge: false,
            superchargeCount: 30 * Game.SECONDS,
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
        this.speech = {
            text: new SpeechSynthesisUtterance(),
            ready: false
        };
        this.lastCharge = this.charge;
        this.vibration = {
            period: 0,
            level: MIN_VIBRATION_LEVEL + 1,
        };
    }

    Controls.prototype = {
        setSupercharge: function (supercharge) {
            this.battery.supercharge = supercharge;
        },

        isSupercharging: function () {
            return this.battery.supercharge && this.battery.superchargeCount > 0;
        },

        loadBattery: function (percent) {
            percent = percent.toFixed(1);
            this.battery.load.style.width = percent + '%';
            this.battery.percent.innerText = percent + '%';

            this.battery.load.classList.remove('high');
            this.battery.load.classList.remove('medium');
            this.battery.load.classList.remove('low');

            if (percent > 50) {
                this.battery.load.classList.add('high');
            } else if (percent > 25) {
                this.battery.load.classList.add('medium');
            } else {
                this.battery.load.classList.add('low');
            }
        },

        discharge: function (timeInterval) {

            let dischargeMultiplier;

            if (this.isSupercharging()) {
                dischargeMultiplier = -1.8;
                this.battery.superchargeCount -= timeInterval;
            } else {
                if (this.totalTime < 10 * Game.MINUTES) {
                    dischargeMultiplier = 0.09;
                } else if (this.totalTime < 15 * Game.MINUTES) {
                    dischargeMultiplier = 0.12;
                } else if (this.totalTime < 20 * Game.MINUTES) {
                    dischargeMultiplier = 0.2;
                } else if (this.totalTime < 25 * Game.MINUTES) {
                    dischargeMultiplier = 0.25;
                } else if (this.totalTime < 30 * Game.MINUTES) {
                    dischargeMultiplier = 0.3;
                } else {
                    dischargeMultiplier = 0.6;
                }
            }

            this.charge -= dischargeMultiplier * timeInterval / Game.SECONDS;
            this.charge = Math.max(0, this.charge);
        },

        rechargeByMoving: function(timeInterval, movement) {
            let chargeMultiplier;

            if (this.totalTime < 10 * Game.MINUTES) {
                chargeMultiplier = 0.02;
            } else if (this.totalTime < 20 * Game.MINUTES) {
                chargeMultiplier = 0.022;
            } else if (this.totalTime < 30 * Game.MINUTES) {
                chargeMultiplier = 0.03;
            } else {
                chargeMultiplier = 0.04;
            }

            let charge = Math.abs(chargeMultiplier * movement * timeInterval / Game.SECONDS);
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
            this.prepareSpeech();
            var canvas = document.querySelector('.a-canvas');
            canvas.addEventListener('click', () => {
                if (this.state === Game.STATES.CHARACTER_ROTATION) {
                    this.setState(Game.STATES.PLAYING);
                }
            });

            this.loadUser();
            this.lastTime = new Date().getTime();
            this.prepareVibration();

            this.setState(Game.STATES.CHARACTER_ROTATION);
            setTimeout(this.gameControl.bind(this));
        },

        prepareSpeech: function() {
            var that = this;
            this.findVoice('BR');

            window.speechSynthesis.onvoiceschanged = () => {
                that.findVoice('BR');
            };
        },

        findVoice: function(language) {
            var speech = this.speech;
            var voices = window.speechSynthesis.getVoices();

            voices.forEach(function (voice) {
                if (voice.lang.indexOf(language) > 0) {
                    speech.text.voice = voice;
                    speech.text.voiceURI = voice.voiceURI;
                    speech.text.lang = voice.lang;
                    speech.text.localService = true;
                }
            });
        },

        startSpeaking: function(content) {
            const synth = window.speechSynthesis;
            if (content !== this.speech.text.text || !synth.speaking) {
                this.speech.text.text = content;
                synth.cancel();
                synth.speak(this.speech.text);
            }
        },

        isObjectReadable(z, minZ, maxZ) {
            return minZ <= z && z <= maxZ;
        },

        checkObjectDistance: function (z, minZ, maxZ) {
            let readable = this.isObjectReadable(z, minZ, maxZ);
            if (readable) {
                this.stopVibration();
            } else {
                const range = maxZ - minZ;
                let dist;

                if (z < minZ) {
                    dist = Math.abs(minZ - z);
                } else {
                    dist = Math.abs(z - maxZ);
                }

                let proximity = Math.floor(dist / range);
                let period = 200 + proximity * 200;
                if (proximity > MIN_VIBRATION_LEVEL) {
                    period = 0;
                }
                this.vibrate(proximity, period);
            }
            return readable;
        },

        prepareVibration: function () {
            const period = Math.max(this.vibration.period, 200);
            if (this.vibration.level <= MIN_VIBRATION_LEVEL) {
                window.navigator.vibrate(100);
                console.log("vibrei");
            }
            setTimeout(() => this.prepareVibration(), period);
        },

        vibrate: function(level, period) {
            this.vibration.level = level;
            this.vibration.period = period;
        },

        stopVibration: function() {
            this.vibration.period = 0;
            this.vibration.level = MIN_VIBRATION_LEVEL + 1;
            window.navigator.vibrate(0);
        },

        gameControl: function () {
            if (this.isOver()) {
                this.endGame();
            } else {
                var now = new Date().getTime();
                this.setIsCharging(this.charge > this.lastCharge);
                var timeGap = now - this.lastTime;
                this.gameLoop(TIME_MULTIPLIER * timeGap);
                this.lastTime = now;
                setTimeout(this.gameControl.bind(this));
            }
        },

        endGame: function () {
            this.setState(Game.STATES.ENDED);
        },

        getUser: function () {
            return Game.CHARACTERS[this.currentUserIndex];
        },

        setIsCharging: function(isCharging) {
            this.battery.chargeMark.style.visibility = isCharging ? 'visible' : 'hidden';
        },

        setState: function(state) {
            if (state !== this.state) {
                let canvas = document.querySelector('.a-canvas');
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
            }
        },

        setText: function (text) {
            if (text) {
                this.text.innerText = text;
                this.text.style.display = 'block';
                this.startSpeaking(text);
            } else {
                this.text.style.display = 'none';
            }
        },

        setConditionalText: function (conditions) {
            let user = this.getUser();
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