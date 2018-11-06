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
        this.role = {
            name: document.getElementById('role-name'),
            picture: document.getElementById('role-pic')
        };
        this.totalTime = Game.TOTAL_TIME;
        this.currentRoleTime = Game.ROLE_TIME;
        this.watch = document.getElementById('role-time');
        this.currentUserIndex = Game.STARTING_USER;
        this.text = document.getElementById('text-interaction');
        this.speech = {
            text: new SpeechSynthesisUtterance(),
            ready: false
        };
        this.vibration = {
            period: 0,
            level: MIN_VIBRATION_LEVEL + 1,
        };
    }

    Controls.prototype = {

        updateTime: function(timeInterval) {
            this.totalTime += timeInterval;
            this.currentRoleTime -= timeInterval;
            var seconds = Math.floor(this.currentRoleTime / Game.SECONDS);
            const percent = seconds / (2 * 60);
            var minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;
            minutes = Math.max(0, minutes);
            seconds = Math.max(0, seconds);
            this.watch.innerText = formatTime(minutes, seconds);
            
            if (percent === 0.5) {
                this.setText('Falta metade do tempo, ' + this.getUser().name);
            }

            const time = document.querySelector('.battery-charge');
            time.style.width = percent * 100 + '%';
            
            return minutes <= 0 && seconds <= 0;
        },

        gameLoop: function (timeInterval) {
            if (this.state === Game.STATES.PLAYING) {
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
                synth.cancel();
                const copy = this.speech.text;

                content.split(/[.!?:]/).forEach((sentence) => {
                    let speech = new SpeechSynthesisUtterance();
                    speech.voice = copy.voice;
                    speech.voiceURI = copy.voiceURI;
                    speech.lang = copy.lang;
                    speech.localService = true;
                    speech.text = sentence;
                    synth.speak(speech);
                });
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

        setConditionalText: function (conditions, eye) {
            if (eye) {
                this.setText(conditions.eye);
            } else if (conditions.default) {
                this.setText(conditions.default);
            } else {
                this.setText();
            }
        }
    };

    return Controls;
})();