// pcm 20172018a Blackjack oop

let game = null;

function debug(an_object) {
    document.getElementById("debug").innerHTML = JSON.stringify(an_object);
}

function buttons_initialization() {
    document.getElementById("card").disabled = false;
    document.getElementById("stand").disabled = false;
    document.getElementById("new_game").disabled = true;
}

function finalize_buttons() {
    document.getElementById("card").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("new_game").disabled = false;
}


//FUNÇÕES QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
function new_game() {
    clear();
    game = new BlackJack();
    buttons_initialization();
    game.dealer_move();
    game.dealer_move();
    draw_card(game.get_dealer_cards()[0], "dealerIMG");
    draw_card(['c', 0], "dealerIMG");
    player_new_card();
    debug(game);
}

function update_dealer(state) {
    var img = document.getElementById("dealerIMG");
    while (img.firstChild) {
        img.removeChild(img.firstChild);
    }
    for (var i = 0; i < game.get_dealer_cards().length; i++) {
        draw_card(game.get_dealer_cards()[i], "dealerIMG");
    }
    document.getElementById("dealer").innerHTML = "Points: " + game.get_cards_value(game.get_dealer_cards());
    if (state.gameEnded == true) {
        if (state.dealerWon == true || state.playerBusted == true) {
            document.getElementById("title").innerHTML = "Result";
            document.getElementById("result").innerHTML = "Dealer WON!";
        } else if (state.dealerWon === false && state.playerBusted === false) {
            document.getElementById("title").innerHTML = "Result";
            document.getElementById("result").innerHTML = "Player WON!";

        }
        finalize_buttons()
    }
    debug(game);
}

function update_player(state) {
    var img = document.getElementById("playerIMG");
    while (img.firstChild) {
        img.removeChild(img.firstChild);
    }
    for (var i = 0; i < game.get_player_cards().length; i++) {
        draw_card(game.get_player_cards()[i], "playerIMG");
    }
    document.getElementById("player").innerHTML = "Points: " + game.get_cards_value(game.get_player_cards());
    if (state.gameEnded === true) {
        if (state.dealerWon === false && state.playerBusted === false) {
            document.getElementById("title").innerHTML = "Result";
            document.getElementById("result").innerHTML = "Player WON!";
            update_dealer(state);
        } else if (state.dealerWon === true || state.playerBusted === true) {
            update_dealer(state);
        }
        finalize_buttons()
    }
    debug(game);
}

function dealer_new_card() {
    update_player(game.dealer_move());
    update_dealer(game.get_game_state());
}

function player_new_card() {
    update_player(game.player_move());
            document.getElementById("title").innerHTML = "";
        document.getElementById("result").innerHTML = "";
}

function dealer_finish() {
    if (game.get_player_cards().length > 1) {
        var state = game.get_game_state();
        game.setDealerTurn(true);
        while (state.gameEnded !== true) {
            update_dealer(game.dealer_move());
        }
    }else {
        document.getElementById("title").innerHTML = "MOVE ERROR:";
        document.getElementById("result").innerHTML = "You need 2 cards to do that!";
    }
}

function draw_card(card, where) {
    var x = document.createElement("IMG");
    switch (card[0]) {
        case "Ouros":
            if (card[1] === 1 || card[1] === 13) {
                x.setAttribute("src", "images/ace_of_diamonds.png");
            } else {
                for (var i = 0; i < 13; i++) {
                    if (card[1] === i) {
                        x.setAttribute("src", "images/" + i + "_of_diamonds.png");
                    }
                }
            }
            break;
        case "Paus":
            if (card[1] === 1 || card[1] === 13) {
                x.setAttribute("src", "images/ace_of_clubs.png");
            } else {
                for (var i = 0; i < 13; i++) {
                    if (card[1] === i) {
                        x.setAttribute("src", "images/" + i + "_of_clubs.png");
                    }
                }
            }
            break;
        case "Copas":
            if (card[1] === 1 || card[1] === 13) {
                x.setAttribute("src", "images/ace_of_hearts.png");
            } else {
                for (var i = 0; i < 13; i++) {
                    if (card[1] === i) {
                        x.setAttribute("src", "images/" + i + "_of_hearts.png");
                    }
                }
            }
            break;
        case "Espadas":
            if (card[1] === 1 || card[1] === 13) {
                x.setAttribute("src", "images/ace_of_spades.png");
            } else {
                for (var i = 0; i < 13; i++) {
                    if (card[1] === i) {
                        x.setAttribute("src", "images/" + i + "_of_spades.png");
                    }
                }
            }
            break;

        default:
            x.setAttribute("src", "images/red_joker.png");
            break;
    }
    x.setAttribute("width", "100");
    x.setAttribute("height", "130");
    x.setAttribute("alt", "cenas");
    x.setAttribute("padding", "5");
    document.getElementById(where).appendChild(x);
}

function clear() {
    document.getElementById("title").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("dealer").innerHTML = "";
    document.getElementById("player").innerHTML = "";
    var img = document.getElementById("playerIMG");
    while (img.firstChild) {
        img.removeChild(img.firstChild);
    }
    var img = document.getElementById("dealerIMG");
    while (img.firstChild) {
        img.removeChild(img.firstChild);
    }
}

function active() {
    var checkBox = document.getElementById("btnDebug");
    var text = document.getElementById("sec_debug");

    if (checkBox.checked == true) {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}