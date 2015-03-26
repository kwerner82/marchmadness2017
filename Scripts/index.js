$(document).ready(function() {
    var winningTeamNumbers = [1, 9, 4, 0, 2, 5, 7, 8, 6, 3];
    var losingTeamNumbers = [3, 9, 2, 0, 5, 6, 1, 4, 7, 8];

    var payoutsPerRound = {};
    payoutsPerRound[1] = 5;
    payoutsPerRound[2] = 10;
    payoutsPerRound[3] = 20;
    payoutsPerRound[4] = 40;
    payoutsPerRound[5] = 80;
    payoutsPerRound[6] = 200;

    var players = [
        ["DW  ", "KW  ", "SB  ", "EL  ", "AK  ", "NM  ", "NC  ", "OG  ", "MCOS", "MCOS"],
        ["GB  ", "JW  ", "KW  ", "MCOS", "MCOS", "AA  ", "Mick", "GS  ", "RJ  ", "EL  "],
        ["NC  ", "EL  ", "OG  ", "KW  ", "MCOS", "SA  ", "CW  ", "RJ  ", "Mick", "GG  "],
        ["EL  ", "AS  ", "AA  ", "RJ  ", "KW  ", "MCOS", "RJ  ", "RJ  ", "AM  ", "MO  "],
        ["MO  ", "NW  ", "LM  ", "JF  ", "MCOS", "KW  ", "MCOS", "EL  ", "MO  ", "NC  "],
        ["RG  ", "MO  ", "RJ  ", "JB  ", "RJ  ", "RJ  ", "KW  ", "MO  ", "EL  ", "AK  "],
        ["SW  ", "OG  ", "MO  ", "RJ  ", "DW  ", "EL  ", "MO  ", "KW  ", "RG  ", "Mick"],
        ["Mick", "NC  ", "CW  ", "MO  ", "EL  ", "MO  ", "RG  ", "JF  ", "KW  ", "KB  "],
        ["KW  ", "RJ  ", "EL  ", "MCOS", "MO  ", "NW  ", "MCOS", "NC  ", "SB  ", "SA  "],
        ["MCOS", "JF  ", "KW  ", "RG  ", "DW  ", "AS  ", "EL  ", "Mick", "GG  ", "OG  "]
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
        renderGames(games);
    });
});

function renderSquares(winningTeamNumbers, losingTeamNumbers, playersBySquareId) {
    var squares = $(".squares");
 
    var headerRow = $("<tr></tr>");
    headerRow.append("<td></td>");

    $.each(winningTeamNumbers, function(index, number) {
        headerRow.append("<td class='header'>" + number + "</td>")
    });

    squares.append(headerRow);

    $.each(losingTeamNumbers, function(index, number) {
        var row = $("<tr></tr>");
        row.append("<td class='header'>" + number + "</td>");
        squares.append(row);

        for(var i = 0; i < 10; i++) {
            var squareId = "square" + winningTeamNumbers[i] + number;

            var td = $("<td id='" + squareId + "'></td>");
            td.append("<div class='player'>" + playersBySquareId[squareId] + "</div>");
            td.append("<div class='winnings'></div>");

            row.append(td);
        }
    });
}

function renderWinnings(winningsBySquareId) {
    $.each(winningsBySquareId, function(key, winnings) {
        var square = $("#" + key);

        if (winnings) {
            square.addClass("winner");
            square.find(".winnings").text("$" + winnings);
        } else {
            square.find(".winnings").text("-");
        }
    });
}

function renderWinningsPerPlayer(playersBySquareId, winningsBySquareId) {
    var winningsPerPlayer = {};

    $.each(playersBySquareId, function(squareId, player) {
        winningsPerPlayer[player] = winningsPerPlayer[player] || 0;
        winningsPerPlayer[player] += winningsBySquareId[squareId];
    });

    var tableEntries = [];
    $.each(winningsPerPlayer, function(player, totalWinnings) {
        tableEntries.push({ player: player, winnings: totalWinnings });
    });

    tableEntries.sort(function(entry1, entry2) { 
        if (entry1.winnings < entry2.winnings) {
            return -1;
        }

        if (entry1.winnings > entry2.winnings) {
            return 1;
        }

        return 0;
    });

    tableEntries.reverse();

    var table = $(".winningsPerPlayer");
    $.each(tableEntries, function(index, entry) {
        var row = $("<tr></tr>");
        row.append("<td>" + entry.player + "</td>");
        row.append("<td> $" + entry.winnings + "</td>");
        table.find("tbody").append(row);
    });
}

function renderGames(games) {
    $(".games").text(JSON.stringify(games, undefined, 2));
}

function getWinningsBySquareId(winningTeamNumbers, losingTeamNumbers, payoutsPerRound, games) {
    var winningsBySquareId = {};
    $.each(winningTeamNumbers, function(index, winningNumber) {
        $.each(losingTeamNumbers, function(index, losingNumber) {
            winningsBySquareId["square" + winningNumber + losingNumber] = 0;
        });
    });

    $.each(games, function(index, game) {
        var winningNumber, losingNumber;

        if (game.score1 > game.score2) {
            winningNumber = game.score1 % 10;
            losingNumber = game.score2 % 10;
        } else {
            winningNumber = game.score2 % 10;
            losingNumber = game.score1 % 10; 
        }

        var payout = payoutsPerRound[game.round] || 0;
        winningsBySquareId["square" + winningNumber + losingNumber] += payout;
    });

    return winningsBySquareId;
}

function getGames() {
    var cacheBuster = (new Date()).getTime();
    return $.ajax("http://espn.go.com/mens-college-basketball/tournament/bracket?v=" + cacheBuster).then(function(responseText) {
    
        var espnPage = $(responseText);
    
        var completedGames = [];
        espnPage.find(".match").each(function() {
            var match = $(this);
            
            if(!match.hasClass("winnerbot") && !match.hasClass("winnertop")) {
                return;
            }
            
            var cssClasses = match.attr("class").split(" ");
            var round = 0;
            jQuery.each(cssClasses, function(index, cssClass) {
                if(cssClass.indexOf("round") === 0) {
                    round = parseInt(cssClass.split("round")[1]);
                }
            });
            
            var teamsAndSeeds = match.find("dt");
            
            var teams = teamsAndSeeds.find("a");
            var team1 = teams[0] && teams[0].text;
            var team2 = teams[1] && teams[1].text;
         
            
            var seeds = teamsAndSeeds.html().split(/\D+/).filter(function(val) { return !!val; })
            var seed1 = parseInt(seeds[0]);
            var seed2 = parseInt(seeds[2]);
            
            var scores = match.find("dd").html().split(/\D+/).filter(function(val) { return !!val; })
            var score1 = parseInt(scores[0]);
            var score2 = parseInt(scores[1]);
            
            completedGames.push({
                round: round,
                team1: seed1 + " " + team1,
                team2: seed2 + " " + team2,
                score1: score1,
                score2: score2
            });
        });

        completedGames.sort(function(game1, game2) {
            if (game1.round < game2.round) {
                return -1;
            }

            if (game1.round > game2.round) {
                return 1;
            }

            return 0;
        });

        return completedGames;
    });
}