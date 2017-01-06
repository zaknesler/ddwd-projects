new Vue({
    el: '#app',

    data: {
        'token': 'a85c4d9de516b158ad21947' + 'd6304535117cd7d3f', // GitHub personal access token

        'form': {
            username: 'zaknes',
            repository: 'projects',
            path: 'html' // The path that the directories are under.
        },

        'repositoryContents': {}, // The response is stored here.

        'error': null
    },

    methods: {
        // The method to get the contents of the repository.
        getRepositoryContents: function (username, repository, path) {
            // If either the username or the repository are empty, do not continue.
            if (!username || !repository) {
                return;
            }

            // If there is a form path set, send another request to get the contents of the form path.
            if (this.form.path) {
                this.$http
                    .get('https://api.github.com/repos/' + username + '/' + repository + '/contents/' + this.form.path, {
                        params: {
                            'access_token': this.token
                        }
                    })
                    .then((response) => {
                        this.repositoryContents = response.body;

                        this.error = null;
                    }, (response) => {
                        this.repositoryContents = {};

                        this.error = 'Could not get the contents. Did you make a mistake?';
                    });

                return;
            }

            // Send a get request to the GitHub api to grab the contents of the repository.
            this.$http
                .get('https://api.github.com/repos/' + username + '/' + repository + '/contents', {
                    params: {
                        // Pass the access token through the request.
                        'access_token': this.token
                    }
                })
                .then((response) => {
                    this.repositoryContents = response.body;

                    this.error = null;
                }, (response) => {
                    this.repositoryContents = {};

                    this.error = 'Could not get the contents. Did you make a mistake?';
                });

            return;
        },

        // Get the GitHub Pages url.
        getPagesUrl: function (item) {
            return 'https://' + this.form.username + '.github.io/' + this.form.repository + '/' + item.path + '/html/index.html';
        }
    }
});
