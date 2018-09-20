(function() {
    'use strict';

    let SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    let speech = new SpeechSynthesisUtterance();
    let recognition = new SpeechRecognition();
    let container = document.getElementById('container');
    let speaking = false;

    function prepareSpeech() {
        findVoice('BR');

        window.speechSynthesis.onvoiceschanged = () => {
            findVoice('BR');
        };

        speech.onstart = function() {
            container.classList.add('speaking');
            recognition.abort();
            speaking = true;
        };

        speech.onend = function() {
            container.classList.remove('speaking');
            speaking = false;
        }
    }

    function findVoice(language) {
        let voices = window.speechSynthesis.getVoices();

        voices.forEach(function (voice) {
            if (voice.lang.indexOf(language) > 0) {
                speech.voice = voice;
                speech.voiceURI = voice.voiceURI;
                speech.lang = voice.lang;
                speech.localService = true;
            }
        });
    }

    function prepareRecognition() {
        recognition.continuous = false;
        recognition.lang = 'pt-BR';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = function(event) {
            let text = event.results[0][0].transcript.toLowerCase();
            let intention = window.Intention.find(text);

            let relatedWords = [];
            text.split(' ').forEach((word) => {
                if (window.Intention.isRelated(word)) {
                    relatedWords.push(word);
                }
            });

            if (intention) {
                speech.text = intention.text;
            } else if (relatedWords.length > 2) {
                speech.text = 'Acho que tem algo haver com ' + relatedWords.join(', ');
            } else {
                speech.text = 'Eu não sei sobre o que você disse';
            }
            window.speechSynthesis.speak(speech);
        };

        setInterval(() => {
            if (!speaking) {
                try {
                    recognition.start();
                } catch (e) {}
            }
        }, 500);

        recognition.start();
    }

    function start() {
        prepareSpeech();
        prepareRecognition();
    }

    start();
})();