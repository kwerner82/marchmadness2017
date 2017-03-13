$(document).ready(function() { 
    var winningTeamNumbers = [8, 2, 9, 3, 4, 1, 6, 7, 0, 5];
    var losingTeamNumbers = [9, 8, 5, 3, 2, 6, 0, 4, 7, 1];

    var costPerSquare = 10;

    var payoutsPerRound = {};
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
        ["AP. ", "EP. ", "BP  ", "SC  ", "KH  ", "LG  ", "MF  ", "BW  ", "WO  ", "ZL  "],
        ["CDF ", "JY  ", "MO  ", "EE  ", "BG  ", "JL  ", "EE  ", "TD  ", "AGE ", "MA  "],
        ["NK  ", "ZL  ", "LO  ", "LG  ", "MF  ", "JM  ", "JL  ", "SO  ", "NK  ", "JR  "]
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
