$(document).ready(function() {
    var winningTeamNumbers = [1, 9, 4, 0, 2, 5, 7, 8, 6, 3];
    var losingTeamNumbers = [3, 9, 2, 0, 5, 6, 1, 4, 7, 8];

    renderSquares(winningTeamNumbers, losingTeamNumbers);

    getGames().then(function(games) {
        renderWinnings(winningTeamNumbers, losingTeamNumbers, games);
        renderGames(games);
    });
});

function renderSquares(winningTeamNumbers, losingTeamNumbers) {
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
            row.append("<td id='square" + winningTeamNumbers[i] + number + "'></td>");            
        }
    });
}

function renderWinnings(winningTeamNumbers, losingTeamNumbers, games) {
    var payouts = {};
    payouts[1] = 5;
    payouts[2] = 10;
    payouts[3] = 20;
    payouts[4] = 40;
    payouts[5] = 80;
    payouts[6] = 200;

    var totalWinningsPerSquare = {};
    $.each(winningTeamNumbers, function(index, winningNumber) {
        $.each(losingTeamNumbers, function(index, losingNumber) {
            totalWinningsPerSquare["square" + winningNumber + losingNumber] = 0;
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

        var payout = payouts[game.round] || 0;
        totalWinningsPerSquare["square" + winningNumber + losingNumber] += payout;
    });

    $.each(totalWinningsPerSquare, function(key, winnings) {
        var square = $("#" + key);

        if (winnings) {
            square.addClass("winner");
            square.text("$" + winnings);
        } else {
            square.text("-");
        }
    });
}

function renderGames(games) {
    $(".games").text(JSON.stringify(games, undefined, 2));
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