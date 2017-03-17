(function() {
    window.selectedUser = "";

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

                var td = $("<td id='" + squareId + "' playerId='" + playersBySquareId[squareId] + "'></td>");
                td.append("<div class='player'>" + playersBySquareId[squareId] + "</div>");
                td.append("<div class='winnings'></div>");

                row.append(td);

                td.click(function() {
                    selectPlayer(this.attributes.playerId.nodeValue);
                });
            }
        });
    }
    window.renderSquares = renderSquares;

    function selectPlayer(playerId) {
        $("table.squares tr td.highlight").removeClass("highlight");
        $("table.winningsPerPlayer tr.highlight").removeClass("highlight");
        $("table.profitPerPlayer tr.highlight").removeClass("highlight");
        $("table.games tr.highlight").removeClass("highlight");

        if (window.selectedUser !== playerId)
        {
            $("table.squares tr td[playerId='" + playerId + "']").addClass("highlight");
            $("table.winningsPerPlayer tr[playerId='" + playerId + "']").addClass("highlight");
            $("table.profitPerPlayer tr[playerId='" + playerId + "']").addClass("highlight");
            $("table.games tr[playerId='" + playerId + "']").addClass("highlight");
            window.selectedUser = playerId;
        }
        else
        {
            window.selectedUser = "";
        }
    }
    window.selectPlayer = selectPlayer;

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
    window.renderWinnings = renderWinnings;

    function renderWinningsPerPlayer(playersBySquareId, winningsBySquareId) {
        var winningsPerPlayer = {};

        $.each(playersBySquareId, function(squareId, player) {
            winningsPerPlayer[player] = winningsPerPlayer[player] || 0;
            winningsPerPlayer[player] += winningsBySquareId[squareId];
        });

        var tableEntries = [];
        $.each(winningsPerPlayer, function(player, totalWinnings) {
            tableEntries.push({
                player: player,
                winnings: totalWinnings
            });
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
        
        $(".winningsPerPlayer tbody tr").remove();
        var table = $(".winningsPerPlayer");
        $.each(tableEntries, function(index, entry) {
            var row = $("<tr playerId='" + entry.player + "'></tr>");
            row.append("<td>" + entry.player + "</td>");
            row.append("<td> $" + entry.winnings + "</td>");
            table.find("tbody").append(row);

            row.click(function() {
                selectPlayer(this.attributes.playerId.nodeValue);
            });
        });
    }
    window.renderWinningsPerPlayer = renderWinningsPerPlayer;

    function renderProfitPerPlayer(playersBySquareId, winningsBySquareId, costPerSquare) {
        var winningsPerPlayer = {};
        var buyinPerPlayer = {};

        $.each(playersBySquareId, function(squareId, player) {
            winningsPerPlayer[player] = winningsPerPlayer[player] || 0;
            winningsPerPlayer[player] += winningsBySquareId[squareId];

            buyinPerPlayer[player] = buyinPerPlayer[player] || 0;
            buyinPerPlayer[player] += costPerSquare;
        });

        var tableEntries = [];
        $.each(winningsPerPlayer, function(player, totalWinnings) {
            var totalBuyin = buyinPerPlayer[player];

            tableEntries.push({
                player: player,
                winnings: totalWinnings,
                buyin: totalBuyin,
                profit: totalWinnings - totalBuyin
            });
        });

        tableEntries.sort(function(entry1, entry2) {
            if (entry1.profit < entry2.profit) {
                return -1;
            }

            if (entry1.profit > entry2.profit) {
                return 1;
            }

            return 0;
        });

        tableEntries.reverse();

        $(".profitPerPlayer tbody tr").remove();
        
        var table = $(".profitPerPlayer");
        $.each(tableEntries, function(index, entry) {
            var row = $("<tr playerId='" + entry.player + "'></tr>");
            row.append("<td>" + entry.player + "</td>");

            if (entry.profit > 0) {
                row.append("<td class='positive'> $" + entry.profit + "</td>");
            } else if (entry.profit < 0) {
                row.append("<td class='negative'> $" + entry.profit + "</td>");
            } else {
                row.append("<td> $" + entry.profit + "</td>");
            }

            row.append("<td> $" + entry.winnings + "</td>");
            row.append("<td> $" + entry.buyin + "</td>");

            table.find("tbody").append(row);

            row.click(function() {
                selectPlayer(this.attributes.playerId.nodeValue);
            });
        });
    }
    window.renderProfitPerPlayer = renderProfitPerPlayer;

    function renderGames(games, players, payoutsPerRound, winningTeamNumbers, losingTeamNumbers) {
        var playersBySquareId = {};
        $.each(winningTeamNumbers, function(winningIndex, winningNumber) {
            $.each(losingTeamNumbers, function(losingIndex, losingNumber) {
                playersBySquareId["square" + winningNumber + losingNumber] = $.trim(players[losingIndex][winningIndex]);
            });
        });

        $(".games tr").remove();
        
        var table = $(".games");
        $.each(games, function(index, game) {
            var gameScoreColumn = "";
            var winningNumber = -1;
            var losingNumber = -1;
            if (game.score1 > game.score2)
            {
                gameScoreColumn = "<td><b>" + game.team1 + ": " + game.score1 + "</b></br>" + game.team2 + ": " + game.score2 + "</td>";
                winningNumber = game.score1 % 10;
                losingNumber = game.score2 % 10;
            }
            else
            {
                gameScoreColumn = "<td>" + game.team1 + ": " + game.score1 + "</br><b>" + game.team2 + ": " + game.score2 + "</b></td>";
                winningNumber = game.score2 % 10;
                losingNumber = game.score1 % 10;
            }

            var playerId = playersBySquareId["square" + winningNumber + losingNumber];
            
            if (game.round === 0)
            {
                playerId = "N/A";   
            }

            var row = $("<tr playerId='" + playerId + "'></tr>");
            row.append("<td>" + game.round + "</td>");
            row.append(gameScoreColumn);
            row.append("<td>" + playerId + " ($" + payoutsPerRound[game.round] + ")" + "</td>");

            table.find("tbody").append(row);

            row.click(function() {
                selectPlayer(this.attributes.playerId.nodeValue);
            });
        });

        if (games.length <= 0)
        {
            var row = $("<tr></tr>");
            row.append("<td>No games have finished yet!</td><td></td><td></td>");
            table.find("tbody").append(row);
        }
    }
    window.renderGames = renderGames;

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
    window.getWinningsBySquareId = getWinningsBySquareId;

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
                    return 1;
                }

                if (game1.round > game2.round) {
                    return -1;
                }

                return 0;
            });

            return completedGames;
        });
    }
    window.getGames = getGames;
    
    function initializeSquares(winningTeamNumbers, losingTeamNumbers, players, costPerSquare, payoutsPerRound) {
        var playersBySquareId = {};
        $.each(winningTeamNumbers, function(winningIndex, winningNumber) {
            $.each(losingTeamNumbers, function(losingIndex, losingNumber) {
                playersBySquareId["square" + winningNumber + losingNumber] = $.trim(players[losingIndex][winningIndex]);
            });
        });

        renderSquares(winningTeamNumbers, losingTeamNumbers, playersBySquareId);

        var renderData = function() {
            getGames().then(function(games) {
                var winningsBySquareId = getWinningsBySquareId(winningTeamNumbers, losingTeamNumbers, payoutsPerRound, games);
                renderWinnings(winningsBySquareId);
                renderWinningsPerPlayer(playersBySquareId, winningsBySquareId);
                renderProfitPerPlayer(playersBySquareId, winningsBySquareId, costPerSquare);
                renderGames(games, players, payoutsPerRound, winningTeamNumbers, losingTeamNumbers);
            });   
        };
        
        renderData();
        
        setInterval(renderData, 30000);
    }
    window.initializeSquares = initializeSquares;
})();
