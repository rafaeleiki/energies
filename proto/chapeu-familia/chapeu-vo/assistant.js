(function() {
    'use strict';

    let SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    let speech = new SpeechSynthesisUtterance();
    let recognition = new SpeechRecognition();
    let container = document.getElementById('container');
    let speaking = false;
    window.words = {};
    window.count = 0;

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
            window.count++;

            let relatedWords = [];
            text.split(' ').forEach((word) => {
                if (window.words[word]) {
                    window.words[word]++;
                } else {
                    window.words[word] = 1;
                }

                if (window.Intention.isRelated(word)) {
                    relatedWords.push(word);
                }
            });

            if (intention) {
                speech.text = intention.text;
            } else if (relatedWords.length > 2) {
                speech.text = 'Eu lembro das palavras ' + relatedWords.join(', ');
            } else {
                const index = Math.floor(Math.random() + 0.5);
                const possibilities = [
                    'Eu não lembro nada sobre isso',
                    'que?!'
                ];
                speech.text = possibilities[index];
            }
            window.speechSynthesis.speak(speech);
            if (speech.text === window.Intention.FINAL_TEXT) {
                setTimeout(() => {
                    const audio = new Audio('applause.mp3');
                    audio.loop = true;
                    audio.play();
                    recognition.abort();
                    speaking = true;
                }, 5000);
            }
        };

        setInterval(() => {
            if (!speaking) {
                const random = Math.random();
                if (random < 0.01) {
                    speech.text = randomText();
                    window.speechSynthesis.speak(speech);
                }

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

    function randomText() {
        const texts = [
          'O olho mágico ajuda a ver mais coisas',
          'Eu acho que são 9 pessoas no álbum da família',
          'Sabia que a luva consegue enxergar mais de uma coisa ao mesmo tempo?',
          'Quando você descobrir algo, desenhe e coloque no quadro',
          'Eu queria poder usar a luva também!',
        ];
        const random = Math.floor(Math.random() * texts.length + 1) % texts.length;
        return texts[random];
    }

    start();
})();