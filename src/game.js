window.Game = (function() {
    'use strict';

    const roles = {
        SCIENTIST: 1,
        DEVELOPER: 2,
        TEACHER: 3,
        ATHLETE: 4
    };

    const SECONDS = 1000;
    const MINUTES = 60 * SECONDS;

    const Game = {
        ROLES: roles,
        CHARACTERS: [
            { name: 'Cientista', icon: 'res/scientist.png', role: roles.SCIENTIST },
            { name: 'Programador', icon: 'res/coder.png', role: roles.DEVELOPER },
            { name: 'Professor', icon: 'res/teacher.png', role: roles.TEACHER },
            { name: 'Atleta', icon: 'res/athlete.png', role: roles.ATHLETE }
        ],
        STATES: {
            PLAYING: 1,
            CHARACTER_ROTATION: 2,
            ENDED: 3
        },
        SECONDS: SECONDS,
        MINUTES: MINUTES,
        ROLE_TIME: 2 * MINUTES,
        INITIAL_BATTERY: 100,
        TOTAL_TIME: 0,
        STARTING_USER: 0,
    };

    return Game;
})();