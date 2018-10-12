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
    buttons_initialization();
    game = new BlackJack();
    game.dealer_move();
    game.dealer_move();
    game.player_move();
    draw_card(game.get_dealer_cards()[0], "dealer");
    draw_card(['c',0], "dealer");
    draw_card(game.get_player_cards()[0], "player");
    debug(game);
}

function update_dealer(state) {
    document.getElementById("dealer").innerHTML = game.get_dealer_cards()[0] + ",X,X";
    if (game.get_game_state().gameEnded === true && game.get_game_state().dealerWon === true) {
        document.getElementById("dealer").innerHTML = game.get_dealer_cards() + " Pontos: " + game.get_cards_value(game.get_dealer_cards()) + " VITORIA!";
        finalize_buttons();
    }
    debug(game);
}

function update_player(state) {
    for(var i = 0 ; i < game.get_player_cards().length; i++){
        console.log(game.get_player_cards()[i+1]);
        draw_card(game.get_player_cards()[i+1], "player");
    }
    if (game.get_game_state().gameEnded === true && game.get_game_state().dealerWon === false && game.get_game_state().playerBusted === false) {
        document.getElementById("dealer").innerHTML = game.get_dealer_cards() + " Pontos: " + game.get_cards_value(game.get_dealer_cards());
        document.getElementById("player").innerHTML = game.get_player_cards() + " Pontos: " + game.get_cards_value(game.get_player_cards()) + " VITORIA!";
        finalize_buttons();
    } else if (game.get_game_state().gameEnded === true && game.get_game_state().playerBusted === true) {
        document.getElementById("dealer").innerHTML = game.get_dealer_cards() + " Pontos: " + game.get_cards_value(game.get_dealer_cards()) + " VITORIA!";
        finalize_buttons();
    }
    debug(game);
}

function dealer_new_card() {
    update_player(game.dealer_move());
    update_dealer(game.get_game_state());
}

function player_new_card() {
    update_player(game.player_move());
}

function dealer_finish() {

}

function draw_card(card, where) {
    var x = document.createElement("IMG");
    switch (card[0]) {
        case "Ouros":
            if (card[1] == 1 || card[1] == 13) {
                x.setAttribute("src", "images/ace_of_diamonds.png");
            } else {
                for (var i = 0; i < 13; i++) {
                    if (card[1] == i) {
                        x.setAttribute("src", "images/" + i + "_of_diamonds.png");
                    }
                }
            }
            break;
        case "Paus":
            if (card[1] == 1 || card[1] == 13) {
                x.setAttribute("src", "images/ace_of_clubs.png");
            } else {
                for (var i = 0; i < 13; i++) {
                    if (card[1] == i) {
                        x.setAttribute("src", "images/" + i + "_of_clubs.png");
                    }
                }
            }
            break;
        case "Copas":
            if (card[1] == 1 || card[1] == 13) {
                x.setAttribute("src", "images/ace_of_hearts.png");
            } else {
                for (var i = 0; i < 13; i++) {
                    if (card[1] == i) {
                        x.setAttribute("src", "images/" + i + "_of_hearts.png");
                    }
                }
            }
            break;
        case "Espadas":
            if (card[1] == 1 || card[1] == 13) {
                x.setAttribute("src", "images/ace_of_spades.png");
            } else {
                for (var i = 0; i < 13; i++) {
                    if (card[1] == i) {
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
    document.getElementById(where).appendChild(x);
}
