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

                cards = [];
                        a = 0;
                        for (i = 0; i < 4; i++){

                switch (i){
                case 0:
                        for (j = 1; j < 14; j++){
                cards[a] = ["Copas", j];
                        a++;
                }
                break;
                        case 1:
                        for (j = 1; j < 14; j++){
                cards[a] = ["Espadas", j];
                        a++;
                }
                break;
                        case 2:
                        for (j = 1; j < 14; j++){
                cards[a] = ["Ouros", j];
                        a++;
                }
                break;
                        case 3:
                        for (j = 1; j < 14; j++){
                cards[a] = ["Paus", j];
                        a++;
                }
                break;
                        default:
                        break;
                }
                }

                return cards;
                }
        this.shuffle = function (deck) {

        indices = [];
                baralhado = [];
                for (i = 1; i <= 52; i++){
        indices[i - 1] = i;
        }

        for (i = 0; i < 52; i++){
        indice = Math.floor(Math.random() * indices.length);
                baralhado.push(deck[indices[indice] - 1]);
                indices.splice(indice, 1);
        }

        return baralhado;
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
        setDealerTurn (val) {
        this.dealerTurn = true;
                }

//MÉTODOS QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
        get_cards_value(cards) {

        valor = 0;
                for (i = 0; i < cards.length; i++){

        if (cards[i] > 1 && cards[i] < 10){
        valor += cards[i];
                }
        else if (cards[i] >= 10){
        valor += 10;
                }
        else{
        valor += 1; /* MUDAR ISTO // MUDAR ISTO // MUDAR ISTO // MUDAR ISTO // MUDAR ISTO // MUDAR ISTO // MUDAR ISTO */
                }
        }

        return valor;
                }

        dealer_move() {
        dealer = get_dealer_cards();
                dealer.push(this.deck.splice(0, 1));
                setDealerTurn(false);
                }

        player_move() {
        player = get_player_cards();
                player.push(this.deck[0]);
                this.deck.splice(0, 1);
                setDealerTurn(true);
                }

        get_game_state() { /* Mal feito muito provavelmente */

        dealer = get_dealeer_cards();
                player = get_player_cards();
                if (get_cards_value(dealer) > MAX_POINTS){ /* Dealer rebenta*/
        return 'gameEnded': true;
                }
        else if (get_cards_value(player) > MAX_POINTS){ /* Player rebenta*/
        return 'playerBusted': true; /* E gameEnded true? */
                }
        else if (get_cards_value(dealer) > get_cards_value(player) && get_cards_value(dealer) <= MAX_POINTS){
        return 'dealerWon': true; /* E gameEnded true? */
                }
        else if (get_cards_value(player) == MAX_POINTS){
        return 'gameEnded': true;
                }
        else{
        continue;
                }
        }
        }