Vue.prototype.$http = axios;

const app = new Vue({
    el: '#app',

    data: {
        test: 'ahahaahaha'
    },

    mounted: function () {
        this.$http
            .get('https://api.zaknesler.com')
            .then((response) => {
                console.log(response.data);
            });
    }
});
