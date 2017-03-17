$(document).ready(function() { 
    var winningTeamNumbers = [1, 5, 8, 6, 3, 4, 9, 2, 7, 0];
    var losingTeamNumbers = [4, 3, 5, 2, 7, 0, 8, 6, 9, 1];

    var costPerSquare = 50;

    var payoutsPerRound = {};
    payoutsPerRound[0] = 0;
    payoutsPerRound[1] = 25;
    payoutsPerRound[2] = 50;
    payoutsPerRound[3] = 100;
    payoutsPerRound[4] = 200;
    payoutsPerRound[5] = 400;
    payoutsPerRound[6] = 1000;

    var players = [
        ["CW    ", "Be   ", "AMD  ", "E+J  ", "KD  ", "    ", "    ", "    ", "    ", "    "],
        ["Sch   ", "A+C  ", "KD   ", "Coach", "P   ", "    ", "    ", "    ", "    ", "    "],
        ["BG    ", "MM   ", "Coach", "Sl   ", "RS  ", "    ", "    ", "    ", "    ", "    "],
        ["Mr B  ", "Coach", "Fox  ", "Vil  ", "NJ  ", "    ", "    ", "    ", "    ", "    "],
        ["Coach ", "K    ", "Sch  ", "MW   ", "Sl  ", "    ", "    ", "    ", "    ", "    "],
        ["Dec M ", "NH   ", "Buck ", "Sch  ", "SD  ", "    ", "    ", "    ", "    ", "    "],
        ["Bur   ", "McD  ", "SG   ", "A    ", "Sch ", "    ", "    ", "    ", "    ", "    "],
        ["C     ", "Chief", "Vil  ", "E    ", "TM  ", "    ", "    ", "    ", "    ", "    "],
        ["Sm    ", "JG   ", "Br   ", "BB   ", "G   ", "    ", "    ", "    ", "    ", "    "],
        ["Hop   ", "TSr  ", "TSr  ", "G    ", "JDK ", "    ", "    ", "    ", "    ", "    "]
    ];
    
    initializeSquares(winningTeamNumbers, losingTeamNumbers, players, costPerSquare, payoutsPerRound);
});
