// pcm 20172018a Blackjack object

//constante com o número máximo de pontos para blackJack
const MAX_POINTS = 21;


// Classe BlackJack - construtor
class BlackJack {
    constructor() {
        // array com as cartas do dealer
        this.dealer_cards = [];
        // array com as cartas do player
        this.player_cards = [];
        // variável booleana que indica a vez do dealer jogar até ao fim
        this.dealerTurn = false;

        // objeto na forma literal com o estado do jogo
        this.state = {
            'gameEnded': false,
            'dealerWon': false,
            'playerBusted': false
        };

        //métodos utilizados no construtor (DEVEM SER IMPLEMENTADOS PELOS ALUNOS)
        this.new_deck = function () {
            let naipes = ["O", "P", "C", "E"]; // Ouros, Paus, Copas, Espadas
            let deck = [];
            let z = 0;
            for (i = 0; i < naipes.length; i++) {
                for (x = 0; x < 13; x++) {
                    deck[z] = [naipes[i], (x + 1)];
                    console.log(deck[i]);
                    z++;
                }
            }
            return deck;

        };

        this.shuffle = function (deck) {
            let indices = [];
            let deckBaralhado = [];
            for (i = 0; i < 52; i++) {
                indices[i] = (i + 1);

            }
            let size = indices.length;
            for (i = 0; i < size; i++) {
                let num = Math.floor(Math.random() * indices.length);
                let ind = indices[num];
                deckBaralhado.push(deck[ind - 1]);
                indices.splice(num, 1);
            }
            return deckBaralhado;
        };

        // baralho de cartas baralhado
        this.deck = this.shuffle(this.new_deck());
    }

    // métodos
    // devolve as cartas do dealer num novo array (splice)
    get_dealer_cards() {
        return this.dealer_cards.slice();
    }

    // devolve as cartas do player num novo array (splice)
    get_player_cards() {
        return this.player_cards.slice();
    }

    // Ativa a variável booleana "dealerTurn"
    setDealerTurn(val) {
        this.dealerTurn = true;
    }

    //MÉTODOS QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
    get_cards_value(cards) {
        let pontos = 0;
        for (i = 0; i < cards.length; i++) {
            pontos += cards[i][1];
        }
        return pontos;
    }

    dealer_move() {

    }

    player_move() {

    }

    get_game_state() {
        state
    }
}

