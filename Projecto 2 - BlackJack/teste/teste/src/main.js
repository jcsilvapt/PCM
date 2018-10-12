// pcm 20172018a Blackjack object

//constante com o nÃºmero mÃ¡ximo de pontos para blackJack
const MAX_POINTS = 21;


// Classe BlackJack - construtor
class BlackJack {   
    constructor() {
        // array com as cartas do dealer
        this.dealer_cards = [];
        // array com as cartas do player
        this.player_cards = [];
        // variÃ¡vel booleana que indica a vez do dealer jogar atÃ© ao fim
        this.dealerTurn = false;

        // objeto na forma literal com o estado do jogo
        this.state = {
            'gameEnded': false,
            'dealerWon': false,
            'playerBusted': false
        };

        //mÃ©todos utilizados no construtor (DEVEM SER IMPLEMENTADOS PELOS ALUNOS)
        this.new_deck = function () {
            let naipes = ["O", "P", "C", "E"]; // Ouros, Paus, Copas, Espadas
            let deck = [];
            for (let x in 52) {
                if (x <= 13) {
                    deck = [naipes[0], x + 1];
                } else if (x >= 13 && x <= 26) {
                    deck = [naipes[1], x + 1];
                } else if (x >= 26 && x <= 39) {
                    deck = [naipes[2], x + 1];
                } else if (x >= 39 && x <= 52) {
                    deck = [naipes[3], x + 1];
                }
            }
            
            return deck;

        };

        this.shuffle = function (deck) {

        };

        // baralho de cartas baralhado
        this.deck = this.shuffle(this.new_deck());
    }

    // mÃ©todos
    // devolve as cartas do dealer num novo array (splice)
    get_dealer_cards() {
        return this.dealer_cards.slice();
    }

    // devolve as cartas do player num novo array (splice)
    get_player_cards() {
        return this.player_cards.slice();
    }

    // Ativa a variÃ¡vel booleana "dealerTurn"
    setDealerTurn(val) {
        this.dealerTurn = true;
    }

    //MÃ‰TODOS QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
    get_cards_value(cards) {

    }

    dealer_move() {

    }

    player_move() {

    }

    get_game_state() {

    }
}