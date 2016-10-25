new Vue({
    el: '#app',

    data: {
        deck: {
            id: null,
            remaining: null,
            cards: []
        }
    },

    mounted: function () {
        this.getDeck();
    },

    methods: {
        getDeck: function () {
            this.$http
                .get('https://deckofcardsapi.com/api/deck/new/shuffle/')
                .then((response) => {
                    this.deck.id = null;
                    this.deck.cards = [];

                    this.deck.id = response.body.deck_id;
                    this.deck.remaining = response.body.remaining;
                });
        },

        draw: function (amount) {
            if (!this.deck.id) {
                this.getDeck();
            }

            this.$http
                .get('https://deckofcardsapi.com/api/deck/' + this.deck.id + '/draw/?count=' + amount)
                .then((response) => {
                    var cards = response.body.cards;

                    for (var i = 0; i < cards.length; i++) {
                        this.deck.cards.unshift(cards[i]);
                    }

                    this.deck.remaining = response.body.remaining;
                });
        }
    }
});
