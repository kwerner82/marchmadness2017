$(document).ready(function() { 
    var winningTeamNumbers = [8, 2, 9, 3, 4, 1, 6, 7, 0, 5];
    var losingTeamNumbers = [9, 8, 5, 3, 2, 6, 0, 4, 7, 1];

    var costPerSquare = 10;

    var payoutsPerRound = {};
    payoutsPerRound[0] = 0;
    payoutsPerRound[1] = 5;
    payoutsPerRound[2] = 10;
    payoutsPerRound[3] = 20;
    payoutsPerRound[4] = 40;
    payoutsPerRound[5] = 80;
    payoutsPerRound[6] = 200;

    var players = [
        ["    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    "],
        ["    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    "],
        ["    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    "],
        ["    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    "],
        ["    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    "],
        ["    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    "],
        ["    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    "],
        ["    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    "],
        ["    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    "],
        ["    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "    "]
    ];

    initializeSquares(winningTeamNumbers, losingTeamNumbers, players, costPerSquare, payoutsPerRound);
});
