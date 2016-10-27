// Vue is a "progressive" JavaScript framework.
// It makes JavaScript extremely pleasing to work with.
//
// It uses a process known as "data binding" which is defined as a "connection between the UI and the logic behind it."
//
// vuejs.org (Check it out, you might like it.)

// Instantiate a new Vue instance.
new Vue({
    el: '#app', // Bind the instance to the element with an id of 'app'

    data: { // Set the data for the Vue instance.
        deck: { // The deck object.
            id: '', // The id of the deck. Used for API interaction.
            remaining: 1, // Amount of cards remaining in the deck.
            cards: [] // The array of cards that the user has drawn.
        },

        drawAmount: 13 // The value of the input that asks the user how many cards to draw.
    },

    // When the page has been loaded completely. Similar to jQuery's 'ready' method.
    mounted: function () {
        this.getDeck(); // Call the 'getDeck' method to generate a new deck of cards.
    },

    methods: {
        getDeck: function () {
            // Send a GET request to the api url to get a new shuffled deck.
            this.$http
                .get('https://deckofcardsapi.com/api/deck/new/shuffle/')
                .then((response) => {
                    this.deck.id = ''; // Reset the deck id.
                    this.deck.cards = []; // Reset the user's cards.

                    this.deck.id = response.body.deck_id; // Set the deck id to the id returned by the API.
                    this.deck.remaining = response.body.remaining; // Set the remaining amount of cards (always 52).
                });
        },

        draw: function (amount) {
            // A check to ensure that there is a deck generated.
            if (!this.deck.id) {
                this.getDeck();
            }

            // A check to ensure that the amount requested to draw is available.
            if (amount > this.deck.remaining) {
                amount = this.deck.remaining;
            }

            // Send a GET request to draw a specified amount of cards.
            this.$http
                .get('https://deckofcardsapi.com/api/deck/' + this.deck.id + '/draw/?count=' + amount)
                .then((response) => {
                    var cards = response.body.cards;

                    // Loop through all of the cards returned.
                    for (var i = 0; i < cards.length; i++) {
                        this.deck.cards.unshift(cards[i]); // Add each card to the cards array.
                    }

                    this.deck.remaining = response.body.remaining; // Update the remaining amount of cards.
                });
        }
    }
});
