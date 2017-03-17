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
        ["CW    ", "Be   ", "AMD  ", "E+J  ", "KD  ", "D+C  ", "T       ", "K+L     ", "A+C ", "Hop "],
        ["Sch   ", "A+C  ", "KD   ", "Coach", "P   ", "JK   ", "K       ", "K       ", "DS  ", "C   "],
        ["BG    ", "MM   ", "Coach", "Sl   ", "RS  ", "RH   ", "Mr B    ", "PG+K    ", "TSr ", "TSr "],
        ["Mr B  ", "Coach", "Fox  ", "Vil  ", "NJ  ", "Fa   ", "GH+Coach", "M       ", "Br  ", "M+D "],
        ["Coach ", "K    ", "Sch  ", "MW   ", "Sl  ", "R    ", "JD      ", "GH+Coach", "CJr ", "BH  "],
        ["Dec M ", "NH   ", "Buck ", "Sch  ", "SD  ", "MV   ", "D       ", "NH      ", "SG  ", "Cu  "],
        ["Bur   ", "McD  ", "SG   ", "A    ", "Sch ", "JD   ", "G       ", "DC      ", "C   ", "Cu  "],
        ["C     ", "Chief", "Vil  ", "E    ", "TM  ", "G    ", "W       ", "Fa      ", "Fo  ", "JR  "],
        ["Sm    ", "JG   ", "Br   ", "BB   ", "G   ", "K+L  ", "C       ", "BG      ", "D+C ", "Be  "],
        ["Hop   ", "TSr  ", "TSr  ", "G    ", "JD+K", "BrosG", "GM      ", "JG      ", "T   ", "DW  "]
    ];
    
    initializeSquares(winningTeamNumbers, losingTeamNumbers, players, costPerSquare, payoutsPerRound);
});
