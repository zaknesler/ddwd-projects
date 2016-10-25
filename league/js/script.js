var app = new Vue({
    el: '#app',

    data: {
        champions: ['Aatrox', 'Ahri', 'Akali', 'Alistar', 'Amumu', 'Anivia', 'Annie', 'Ashe', 'Aurelion Sol', 'Azir', 'Bard', 'Blitzcrank', 'Brand', 'Braum', 'Caitlyn', 'Cassiopeia', 'Cho\'Gath', 'Corki', 'Darius', 'Diana', 'Dr. Mundo', 'Draven', 'Ekko', 'Elise', 'Evelynn', 'Ezreal', 'Fiddlesticks', 'Fiora', 'Fizz', 'Galio', 'Gangplank', 'Garen', 'Gnar', 'Gragas', 'Graves', 'Hecarim', 'Heimerdinger', 'Illaoi', 'Irelia', 'Janna', 'Jarvan IV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'Kalista', 'Karma', 'Karthus', 'Kassadin', 'Katarina', 'Kayle', 'Kennen', 'Kha\'Zix', 'Kindred', 'Kled', 'Kog\'Maw', 'LeBlanc', 'Lee Sin', 'Leona', 'Lissandra', 'Lucian', 'Lulu', 'Lux', 'Malphite', 'Malzahar', 'Maokai', 'Master Yi', 'Miss Fortune', 'Mordekaiser', 'Morgana', 'Nami', 'Nasus', 'Nautilus', 'Nidalee', 'Nocturne', 'Nunu', 'Olaf', 'Orianna', 'Pantheon', 'Poppy', 'Quinn', 'Rammus', 'Rek\'Sai', 'Renekton', 'Rengar', 'Riven', 'Rumble', 'Ryze', 'Sejuani', 'Shaco', 'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Skarner', 'Sona', 'Soraka', 'Swain', 'Syndra', 'Tahm Kench', 'Taliyah', 'Talon', 'Taric', 'Teemo', 'Thresh', 'Tristana', 'Trundle', 'Tryndamere', 'Twisted Fate', 'Twitch', 'Udyr', 'Urgot', 'Varus', 'Vayne', 'Veigar', 'Vel\'Koz', 'Vi', 'Viktor', 'Vladimir', 'Volibear', 'Warwick', 'Wukong', 'Xerath', 'Xin Zhao', 'Yasuo', 'Yorick', 'Zac', 'Zed', 'Ziggs', 'Zilean', 'Zyra'],

        items: {
            regular: ['Abyssal Sceptor', 'Archangel\'s Staff', 'Ardent Censer', 'Athene\'s Unholy Grail', 'Banner of Command', 'Banshee\'s Veil', 'Berserker\'s Greaves', 'Blade of the Ruined King', 'Boots of Mobility', 'Boots of Swiftness', 'Dead Man\'s Plate', 'Death\'s Dance', 'Duskblade of Draktharr', 'Essence Reaver', 'Frozen Heart', 'Frozen Mallet', 'Guardian Angel', 'Guinsoo\'s Rageblade', 'Hextech GLP-800', 'Hextech Gunblade', 'Hextech Protobelt-01', 'Iceborn Gauntlet', 'Infinity Edge', 'Ionian Boots of Lucity', 'Liandry\'s Torment', 'Lich Bane', 'Locket of the Iron Solari', 'Lord Domink\'s Regards', 'Luden\'s Echo', 'Manamune', 'Maw of Malmortius', 'Meja\'s Soulstealer', 'Mercurial Scimitar', 'Mercury Treads', 'Mikael\'s Crucible', 'Morellonomicon', 'Mortal Reminder', 'Nashor\'s Tooth', 'Ninja Tabi', 'Ohmwrecker', 'Phantom Dancer', 'Rabadon\'s Deathcap', 'Randuin\'s Omen', 'Rapid Firecannon', 'Ravenous Hydra', 'Relic Shield', 'Righteous Glory', 'Rod of Ages', 'Runaan\'s Hurricane', 'Rylai\'s Crystal Sceptor', 'Sorcerer\'s Shoes', 'Spirit Visage', 'Statikk Shiv', 'Sterak\'s Gage', 'Sunfire Cape', 'The Black Cleaver', 'The Bloodthirster', 'Thornmail', 'Titanic Hydra', 'Trinity Force', 'Void Staff', 'Warmog\'s Armor', 'Wit\'s End', 'Youmuu\'s Ghostblade', 'Zeke\'s Harbinger', 'Zhonya\'s Hourglass', 'Zz\'Rot Portal'],
            support: ['Eye of the Equinox', 'Eye of the Oasis', 'Eye of the Watcher', 'Face of the Mountain', 'Frost Queen\'s Claim', 'Talisman of Ascension'],
            jungle: ['Skirmisher\'s Sabre - Bloodrazer', 'Tracker\'s Knife - Bloodrazer', 'Stalker\'s Blade - Bloodrazer', 'Skirmisher\'s Sabre - Cinderhulk', 'Tracker\'s Knife - Cinderhulk', 'Stalker\'s Blade - Cinderhulk', 'Skirmisher\'s Sabre - Runic Echoes', 'Tracker\'s Knife - Runic Echoes', 'Stalker\'s Blade - Runic Echoes', 'Skirmisher\'s Sabre - Warrior', 'Tracker\'s Knife - Warrior', 'Stalker\'s Blade - Warrior']
        },

        roles: ['Top', 'Jungle', 'Mid', 'Bottom', 'Support'],

        output: {
            champion: null,
            role: null,
            items: []
        }
    },

    mounted: function () {
        this.generate();
    },

    methods: {
        random: function (array) {
            return array[Math.floor(Math.random() * array.length)];
        },

        generate: function () {
            this.output.items = [];

            this.output.champion = this.random(this.champions);

            this.output.role = this.random(this.roles);

            if (this.output.role == 'Jungle') {
                this.output.items.push(this.random(this.items.jungle));

                for (var i = 0; i < 5; i++) {
                    this.output.items.push(this.random(this.items.regular));
                }
            } else if (this.output.role == 'Support') {
                this.output.items.push(this.random(this.items.support));

                for (var i = 0; i < 5; i++) {
                    this.output.items.push(this.random(this.items.regular));
                }
            } else {
                for (var i = 0; i < 6; i++) {
                    this.output.items.push(this.random(this.items.regular));
                }
            }
        }
    }
});
