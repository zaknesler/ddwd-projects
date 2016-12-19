Vue.prototype.$http = axios;

new Vue({
    el: '#app',

    data: {
        location: {},

        conditions: {}
    },

    mounted: function () {
        this.getLocation();
    },

    methods: {
        getLocation: function () {
            this.$http
                .get('https://ip-api.com/json/')
                .then((response) => {
                    this.getConditions(response.data.region, response.data.city);

                    setTimeout(this.getLocation, 300000);
                });
        },

        getConditions: function (region, city) {
            if (region == null || city == null) {
                return;
            }

            this.$http
                .get('https://api.wunderground.com/api/7787bf91089d35a6/conditions/q/' + region + '/' + city + '.json')
                .then((response) => {
                    this.conditions = response.data.current_observation;
                });
        }
    }

});
