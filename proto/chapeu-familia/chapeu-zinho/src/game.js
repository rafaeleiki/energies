window.Game = (function() {
    'use strict';

    const roles = {
        STRAW_HAT: 1,
        BLACK_HAT: 2,
        BLUE_HAT: 3,
        WHITE_HAT: 4
    };

    const SECONDS = 1000;
    const MINUTES = 60 * SECONDS;

    const Game = {
        ROLES: roles,
        CHARACTERS: [
            { name: 'Chapéuzinho de palha', role: roles.STRAW_HAT },
            { name: 'Chapéuzinho preto', role: roles.BLACK_HAT },
            { name: 'Chapéuzinho azul', role: roles.BLUE_HAT },
            { name: 'Chapéuzinho branco', role: roles.WHITE_HAT }
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