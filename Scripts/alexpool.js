$(document).ready(function() { 
    var winningTeamNumbers = [5, 1, 7, 0, 2, 9, 6, 8, 3, 4];
    var losingTeamNumbers = [6, 4, 3, 8, 5, 0, 7, 2, 9, 1];

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
        ["KW  ", "AGE ", "JL  ", "KG  ", "MO  ", "EE  ", "AGU ", "JR  ", "WO  ", "JY  "],
        ["TD  ", "KW  ", "MA  ", "BM  ", "ZL  ", "BP  ", "JL  ", "OG  ", "SO  ", "WO  "],
        ["KH  ", "KS  ", "KW  ", "MA  ", "SC  ", "AP  ", "BG  ", "NT  ", "MF  ", "BM  "],
        ["MO  ", "SC  ", "KH  ", "KW  ", "NU  ", "KG  ", "JL  ", "KS  ", "NK  ", "KG  "],
        ["BA  ", "BW  ", "LG  ", "JR  ", "OG  ", "NT  ", "LO  ", "NU  ", "CD  ", "JM  "],
        ["AGU ", "BM  ", "SC  ", "MF  ", "BA  ", "KW  ", "ZL  ", "NK  ", "WA  ", "BP  "],
        ["LG  ", "SO  ", "DP  ", "AGE ", "NK  ", "WO  ", "KG  ", "WA  ", "BA  ", "EP  "],
        ["AP  ", "EP  ", "BP  ", "SC  ", "KH  ", "LG  ", "MF  ", "BW  ", "WO  ", "ZL  "],
        ["CDF ", "JY  ", "MO  ", "EE  ", "BG  ", "JL  ", "EE  ", "TD  ", "AGE ", "MA  "],
        ["NK  ", "ZL  ", "LO  ", "LG  ", "MF  ", "JM  ", "JL  ", "SO  ", "NK  ", "JR  "]
    ];

    initializeSquares(winningTeamNumbers, losingTeamNumbers, players, costPerSquare, payoutsPerRound);
});
