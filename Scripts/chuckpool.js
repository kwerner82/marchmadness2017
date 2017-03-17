$(document).ready(function() { 
    var winningTeamNumbers = [1, 5, 8, 6, 3, 4, 9, 2, 7, 0];
    var losingTeamNumbers = [4, 3, 5, 2, 7, 0, 8, 6, 9, 1];

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
        ["KW  ", "RG  ", "DWE ", "CR  ", "SW  ", "AK  ", "RJ  ", "MV  ", "NC  ", "JW  "],
        ["MS  ", "KW  ", "OG  ", "MGU ", "DWE ", "CW  ", "AK  ", "SW  ", "MV  ", "NC  "],
        ["EL  ", "OG  ", "KW  ", "RG  ", "CW  ", "CP  ", "MGU ", "AK  ", "SB  ", "GS  "],
        ["OG  ", "EL  ", "CR  ", "KW  ", "RG  ", "JW  ", "MKG ", "JF  ", "AK  ", "RJ  "],
        ["PK  ", "CR  ", "EL  ", "MS  ", "KW  ", "RG  ", "NW  ", "JF  ", "JF  ", "AK  "],
        ["CR  ", "GS  ", "MO  ", "EL  ", "EG  ", "PK  ", "RG  ", "NW  ", "CP  ", "MKG "],
        ["RJ  ", "MO  ", "MS  ", "MV  ", "JB  ", "NC  ", "PK  ", "MKG ", "MGU ", "CP  "],
        ["MO  ", "RJ  ", "EG  ", "SW  ", "EL  ", "JB  ", "NC  ", "PK  ", "MS  ", "MGU "],
        ["EG  ", "MV  ", "SW  ", "GB  ", "AG  ", "MS  ", "JB  ", "NC  ", "PK  ", "MO  "],
        ["NW  ", "SW  ", "RJ  ", "AG  ", "MV  ", "GB  ", "CR  ", "MGU ", "MO  ", "SB  "]
    ];
    
    initializeSquares(winningTeamNumbers, losingTeamNumbers, players, costPerSquare, payoutsPerRound);
});
