$(document).ready(function() { 
    var winningTeamNumbers = [1, 8, 3, 4, 5, 2, 6, 7, 9, 0];
    var losingTeamNumbers = [9, 0, 7, 1, 2, 8, 3, 4, 5, 6];

    var costPerSquare = 100;

    var payoutsPerRound = {};
    payoutsPerRound[0] = 0;
    payoutsPerRound[1] = 50;
    payoutsPerRound[2] = 75;
    payoutsPerRound[3] = 150;
    payoutsPerRound[4] = 250;
    payoutsPerRound[5] = 500;
    payoutsPerRound[6] = 1000;

    var players = [
        ["Anne, Julia, Robert  ", "Bob, Kevin           ", "JC2                  ", "Jon                  ", "Anthony W            ", "Bob W                ", "Jake                 ", "Greg, Harry Sr       ", "Hef                  ", "Ski                  "],
        ["Suchy2               ", "Munceys              ", "Steve                ", "LF                   ", "Grahm                ", "Jack                 ", "Joe M                ", "Dave, Ross           ", "Skul                 ", "Roy                  "],
        ["T                    ", "O'Hara               ", "Sweeney              ", "Jay                  ", "LF2                  ", "Japple               ", "Bob E                ", "Dave S               ", "Tim O                ", "Jonathan             "],
        ["Box 1                ", "JJN                  ", "Bucky                ", "Kuhl                 ", "Jay2                 ", "Copher               ", "Al J                 ", "Tony M               ", "Whis                 ", "Courtney             "],
        ["Fuller 1             ", "Tucker               ", "Pounder              ", "Mike M               ", "Stauner              ", "Bill O               ", "Dave W               ", "Rodney               ", "Kevin L              ", "Mike Wes             "],
        ["Whiplash 1           ", "Loul                 ", "Hyder                ", "Auntsy 1             ", "Mike L               ", "K. Sweeney           ", "Jerry                ", "Neil                 ", "Rodney2              ", "Randy B              "],
        ["Kay                  ", "Paully               ", "Theo                 ", "WFA                  ", "Nau1                 ", "Koz 1                ", "O'Connor             ", "Hugh                 ", "Ty                   ", "Tim S                "],
        ["Whis1                ", "Arch 1               ", "Sluggy               ", "Anj                  ", "Spike                ", "Ryke 1               ", "Hammer               ", "Gobberg              ", "Collin               ", "Ty2                  "],
        ["t                    ", "Box 2                ", "JJN 2                ", "Fuller 2             ", "Toby                 ", "Whiplash 2           ", "Meeshie Pup          ", "Auntsy 2             ", "Erin, Jack, Sar, Kev ", "JC                   "],
        ["Scaletta             ", "Nau 2                ", "Koz 2                ", "Whis 2               ", "Arch 2               ", "Normie               ", "Team Rossi           ", "Trend                ", "Ryke 2               ", "Suchy1               "]
    ];

    initializeSquares(winningTeamNumbers, losingTeamNumbers, players, costPerSquare, payoutsPerRound);
});
