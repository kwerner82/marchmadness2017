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

    var playersBySquareId = {};
    $.each(winningTeamNumbers, function(winningIndex, winningNumber) {
        $.each(losingTeamNumbers, function(losingIndex, losingNumber) {
            playersBySquareId["square" + winningNumber + losingNumber] = $.trim(players[losingIndex][winningIndex]);
        });
    });

    renderSquares(winningTeamNumbers, losingTeamNumbers, playersBySquareId);

    getGames().then(function(games) {
        var winningsBySquareId = getWinningsBySquareId(winningTeamNumbers, losingTeamNumbers, payoutsPerRound, games);
        renderWinnings(winningsBySquareId);
        renderWinningsPerPlayer(playersBySquareId, winningsBySquareId);
        renderProfitPerPlayer(playersBySquareId, winningsBySquareId, costPerSquare);
        renderGames(games, players, payoutsPerRound, winningTeamNumbers, losingTeamNumbers);
    });
});

