// A function factory that takes in a name, marker & returns the object made out of them supplied
function createPlayer(name, marker) {

    function makeMove(x, y) {

        let currentGameBoard = Gameboard.getGameBoard();

        if (currentGameBoard[x][y] == " ") {

            for (let i = 0; i < currentGameBoard.length; i++) {
                for (let j = 0; j < currentGameBoard[i].length; j++) {
                    if (i == x && j == y) {
                        currentGameBoard[x][y] = marker;
                    }
                }
            }

            Gameboard.setGameBoard(currentGameBoard);
        }
    }

    return { name, marker, makeMove };
}

const Gameboard = (function () {
    let gameBoard = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ];

    let editable = true;

    function setGameBoard(newGameBoard) {
        gameBoard = newGameBoard;
    }

    function getGameBoard() {
        return gameBoard;
    }

    function updateGameBoard(x, y, marker) {
        if (editable) {
            gameBoard[x][y] = marker;
        }
    }

    function setEditable(value) {
        editable = value;
    }

    function getEditable() {
        return editable;
    }

    return {
        setGameBoard,
        getGameBoard,
        updateGameBoard,
        setEditable,
        getEditable
    };
})();

function gameOverLogic(player1, player2) {

    const currentGameBoard = Gameboard.getGameBoard();
    const marker1 = player1.marker;
    const marker2 = player2.marker;

    // To check if player 1
    if (currentGameBoard[0][0] == marker1 && currentGameBoard[0][1] == marker1 && currentGameBoard[0][2] == marker1) {
        return "player1";
    } else if (currentGameBoard[1][0] == marker1 && currentGameBoard[1][1] == marker1 && currentGameBoard[1][2] == marker1) {
        return "player1";
    } else if (currentGameBoard[2][0] == marker1 && currentGameBoard[2][1] == marker1 && currentGameBoard[2][2] == marker1) {
        return "player1";
    } else if (currentGameBoard[0][0] == marker1 && currentGameBoard[1][0] == marker1 && currentGameBoard[2][0] == marker1) {
        return "player1";
    } else if (currentGameBoard[0][1] == marker1 && currentGameBoard[1][1] == marker1 && currentGameBoard[2][1] == marker1) {
        return "player1";
    } else if (currentGameBoard[0][2] == marker1 && currentGameBoard[1][2] == marker1 && currentGameBoard[2][2] == marker1) {
        return "player1";
    } else if (currentGameBoard[0][0] == marker1 && currentGameBoard[1][1] == marker1 && currentGameBoard[2][2] == marker1) {
        return "player1";
    } else if (currentGameBoard[0][2] == marker1 && currentGameBoard[1][1] == marker1 && currentGameBoard[2][0] == marker1) {
        return "player1";
    }


    // To check if player 2 won
    if (currentGameBoard[0][0] == marker2 && currentGameBoard[0][1] == marker2 && currentGameBoard[0][2] == marker2) {
        return "player2";
    } else if (currentGameBoard[1][0] == marker2 && currentGameBoard[1][1] == marker2 && currentGameBoard[1][2] == marker2) {
        return "player2";
    } else if (currentGameBoard[2][0] == marker2 && currentGameBoard[2][1] == marker2 && currentGameBoard[2][2] == marker2) {
        return "player2";
    } else if (currentGameBoard[0][0] == marker2 && currentGameBoard[1][0] == marker2 && currentGameBoard[2][0] == marker2) {
        return "player2";
    } else if (currentGameBoard[0][1] == marker2 && currentGameBoard[1][1] == marker2 && currentGameBoard[2][1] == marker2) {
        return "player2";
    } else if (currentGameBoard[0][2] == marker2 && currentGameBoard[1][2] == marker2 && currentGameBoard[2][2] == marker2) {
        return "player2";
    } else if (currentGameBoard[0][0] == marker2 && currentGameBoard[1][1] == marker2 && currentGameBoard[2][2] == marker2) {
        return "player2";
    } else if (currentGameBoard[0][2] == marker2 && currentGameBoard[1][1] == marker2 && currentGameBoard[2][0] == marker2) {
        return "player2";
    }

    // To check if it was a draw
    let drawCount = 0;
    for (let i = 0; i < currentGameBoard.length; i++) {
        for (let j = 0; j < currentGameBoard[i].length; j++) {
            if (currentGameBoard[i][j] != " ") {
                drawCount++;
            }
        }
    }

    if (drawCount == 9) return "draw";

}

const Game = (function () {
    let player1;
    let player2;

    function createPlayer1(name, marker) {
        player1 = createPlayer(name, marker);
        return player1;
    }

    function createPlayer2(name, marker) {
        player2 = createPlayer(name, marker);
        return player2;
    }

    return {
        createPlayer1,
        createPlayer2
    }
})();











const player1Input = document.querySelector(".player-card-1 input");
const player2Input = document.querySelector(".player-card-2 input");

const playButton = document.querySelector(".play-button");
const body = document.querySelector("body");
const clearButton = document.querySelector(".clear-button");
const history = document.querySelector(".history");

clearButton.addEventListener("click", function () {
    while (history.hasChildNodes()) {
        history.removeChild(history.firstChild);
    }
});

let playButtonClicked = false;

if (!playButtonClicked) {
    playButton.addEventListener("click", function () {
        if (!playButtonClicked) {
            playButtonClicked = true;

            let player1, player2;

            if (player1Input.value != "" && player2Input.value != "") {
                player1 = Game.createPlayer1(player1Input.value, "O");
                player2 = Game.createPlayer2(player2Input.value, "X");

                console.log(player1);
                console.log(player2);

            } else {

                player1 = Game.createPlayer1("John", "O");
                player2 = Game.createPlayer2("Brad", "X");


            }

            setupBoard(player1, player2);

        }
    });
}

let player1Turn = true;
const gridBoard = document.createElement("div");
function setupBoard(player1, player2) {

    if (Gameboard.getEditable()) {
        let winner, loser;


        body.style.backgroundColor = "#FFEDDF";

        gridBoard.addEventListener("click", function () {
            let result = gameOverLogic(player1, player2);
            switch (result) {
                case "player1":
                    winner = player1;
                    loser = player2;
                    afterGame(winner, loser);
                    break;
                case "player2":
                    winner = player2;
                    loser = player1;
                    afterGame(winner, loser);
                    break;
                case "draw":
                    draw = true;
                    afterGame("draw", gridBoard);
                    break;
            }
        });

        gridBoard.id = "grid-board";
        gridBoard.style.display = "grid";
        gridBoard.style.height = "75svh";
        gridBoard.style.width = "75svh";
        gridBoard.style.border = "2px solid black";
        gridBoard.style.margin = "0";
        gridBoard.style.gridTemplate = "1fr 1fr 1fr / 1fr 1fr 1fr";
        gridBoard.style.position = "fixed";
        gridBoard.style.left = "calc(50% - 37.5svh)";
        gridBoard.style.top = "calc(50% - 37.5svh)";
        gridBoard.style.zIndex = "1000";

        for (let i = 0; i < 9; i++) {

            const tile = document.createElement("div");
            tile.style.border = "1px solid gray";
            tile.style.overflow = "hidden";
            tile.id += `${i}`;

            tile.addEventListener("click", function (event) {


                if (!tile.classList.contains("occupied") && Gameboard.getEditable()) {

                    tile.classList.add("occupied");

                    if (player1Turn) {

                        player1Turn = false;
                        const markerImage = document.createElement("img");
                        markerImage.src = "./images/marker1.svg";
                        tile.appendChild(markerImage);

                        console.log(event.target.id);

                        switch (Number(event.target.id)) {
                            case 0:
                                Gameboard.updateGameBoard(0, 0, "O");
                                break;
                            case 1:
                                Gameboard.updateGameBoard(0, 1, "O");
                                break;
                            case 2:
                                Gameboard.updateGameBoard(0, 2, "O");
                                break;
                            case 3:
                                Gameboard.updateGameBoard(1, 0, "O");
                                break;
                            case 4:
                                Gameboard.updateGameBoard(1, 1, "O");
                                break;
                            case 5:
                                Gameboard.updateGameBoard(1, 2, "O");
                                break;
                            case 6:
                                Gameboard.updateGameBoard(2, 0, "O");
                                break;
                            case 7:
                                Gameboard.updateGameBoard(2, 1, "O");
                                break;
                            case 8:
                                Gameboard.updateGameBoard(2, 2, "O");
                                break;
                        }


                    } else if (!player1Turn) {

                        player1Turn = true;
                        const markerImage = document.createElement("img");
                        markerImage.src = "./images/marker2.svg";
                        tile.appendChild(markerImage);

                        console.log(event.target.id);

                        switch (Number(event.target.id)) {
                            case 0:
                                Gameboard.updateGameBoard(0, 0, "X");
                                break;
                            case 1:
                                Gameboard.updateGameBoard(0, 1, "X");
                                break;
                            case 2:
                                Gameboard.updateGameBoard(0, 2, "X");
                                break;
                            case 3:
                                Gameboard.updateGameBoard(1, 0, "X");
                                break;
                            case 4:
                                Gameboard.updateGameBoard(1, 1, "X");
                                break;
                            case 5:
                                Gameboard.updateGameBoard(1, 2, "X");
                                break;
                            case 6:
                                Gameboard.updateGameBoard(2, 0, "X");
                                break;
                            case 7:
                                Gameboard.updateGameBoard(2, 1, "X");
                                break;
                            case 8:
                                Gameboard.updateGameBoard(2, 2, "X");
                                break;
                        }


                    }
                }
            });


            gridBoard.appendChild(tile);
        }

        body.appendChild(gridBoard);

    }


}

let playAgainExists = false;
let called = false;

function afterGame(winner, loser) {
    Gameboard.setEditable(false);

    const playAgain = document.createElement("button");

    // Set initial styles using individual style properties
    playAgain.style.width = "10rem";
    playAgain.style.fontSize = "1.25rem";
    playAgain.style.padding = "0.25em 1em";
    playAgain.style.borderRadius = "5rem";
    playAgain.style.backgroundColor = "rgb(99, 129, 99)";
    playAgain.style.border = "none";
    playAgain.style.boxShadow = "1px 1px 4px black";

    // Handle mouseover event
    playAgain.addEventListener("mouseover", function () {
        playAgain.style.backgroundColor = "rgb(30, 100, 30)";
        playAgain.style.cursor = "pointer";
    });

    // Handle mouseleave event
    playAgain.addEventListener("mouseleave", function () {
        playAgain.style.backgroundColor = "rgb(99, 129, 99)";
        playAgain.style.cursor = "default";
    });

    playAgain.textContent = "Retry";
    playAgain.style.position = "fixed";
    playAgain.style.top = "calc(50% - 37.5svh)";
    playAgain.style.right = "12svw";

    playAgain.addEventListener("click", function () {
        called = false;
        playButtonClicked = false;
        Gameboard.setEditable(true);
        Gameboard.setGameBoard([[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]);
        gridBoard.innerHTML = "";
        body.removeChild(gridBoard);
        playAgainExists = false;
        body.removeChild(playAgain);
    });

    if (!playAgainExists) {
        playAgainExists = true;
        body.appendChild(playAgain);
    }

    let result;


    if (!called) {
        called = true;
        if (winner != "draw") {
            result = `${winner.name} won against ${loser.name}!`;
        } else {
            result = "It was a tie!"
        }
        const history = document.querySelector(".history");
        const resultDOM = document.createElement("p");
        resultDOM.textContent = result;

        if (history.childElementCount <= 13) {
            history.appendChild(resultDOM);
        }
    }
}