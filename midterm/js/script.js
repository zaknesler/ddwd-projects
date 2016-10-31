// Vue is a "progressive" JavaScript framework.
// It makes JavaScript extremely pleasing to work with.
//
// It uses a process known as "data binding" which is defined as a
// "connection between the UI and the logic behind it."
//
// vuejs.org (Check it out, you might like it.)

// Instantiate a new Vue instance.
new Vue({
    el: '#app', // Bind the instance to the element with an id of 'app'

    data: { // Set the data for the Vue instance.
        deck: { // The deck object.
            id: '', // The id of the deck. Used for API interaction.
            remaining: 52, // Amount of cards remaining in the deck.
            cards: [] // The array of cards that the user has drawn.
        },

        drawAmount: 13, // The value of the input that asks the user how many cards to draw.

        loading: false // Whether to show the "loading" text.
    },

    // When the page has been loaded completely. Similar to jQuery's 'ready' method.
    mounted: function () {
        this.getDeck(); // Call the 'getDeck' method to generate a new deck of cards.
    },

    methods: {
        getDeck: function () {
            this.loading = true;

            // Send a GET request to the api url to get a new shuffled deck.
            this.$http
                .get('https://deckofcardsapi.com/api/deck/new/shuffle/')
                .then((response) => {
                    this.deck.id = ''; // Reset the deck id.
                    this.deck.cards = []; // Reset the user's cards.

                    this.deck.id = response.body.deck_id; // Set the deck id to the id returned by the API.
                    this.deck.remaining = response.body.remaining; // Set the remaining amount of cards.

                    this.loading = false;
                });
        },

        draw: function (amount) {
            this.loading = true;

            // A check to ensure that there is a deck generated.
            if (!this.deck.id) {
                this.getDeck();
            }

            // If the amount given is greater than the amount remaining, set it to the remaining value.
            if (amount > this.deck.remaining) {
                amount = this.deck.remaining;
            }

            // If the amount is negative, just return. Don't try to pull a negative amount of cards.
            if (amount <= 0) {
                return;
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

                    this.loading = false;
                });
        },

        // The API returns text that is uppercase. This method makes the first capital and the rest lowercase.
        // Taken from a Stack Overflow answer.
        prettyString: function (str) {
            return str.replace(/\w\S*/g, function (text) {
                return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
            });
        },

        // This method ensures that things make sense grammatically.
        // If the amount is one, it will return '1 card'.
        // Otherwise, it will return 'n cards'.
        pluralCards: function (amount) {
            if (amount == 1) {
                return amount + ' card';
            }

            return amount + ' cards';
        }
    }
});
