class App {
    constructor() {
        window.addEventListener('load', () => {
            this.initialize();

            for(let i = 0; i < 250; i++) {
                this.generateCard();
            }
        });
    }

    initialize() {
        if(document.querySelector('main')) document.querySelector('main').remove();

        document.querySelector('body').innerHTML += '<header></header><main><div class="container"><div class="cards"></div></div></main><footer><div class="container"><p>&copy; 2023&nbsp;<a href="//github.com/kanaaa224/" style="color:inherit;"><u>kanaaa224</u></a>.</p></div></footer>';
    }

    generateCard(id = (Math.floor(Math.random() * 250) + 1)) {
        let callback = (d) => {
            const typeColors = {
                bug:      '#26de81',
                dragon:   '#ffeaa7',
                electric: '#fed330',
                fairy:    '#ff0069',
                fighting: '#30336b',
                fire:     '#f0932b',
                flying:   '#81ecec',
                grass:    '#00b894',
                ground:   '#efb549',
                ghost:    '#a55eea',
                ice:      '#74b9ff',
                normal:   '#95afc0',
                poison:   '#6c5ce7',
                psychic:  '#a29bfe',
                rock:     '#2d3436',
                water:    '#0190ff',
                dark:     '#353535'
            };

            let imgSrc = d.sprites.other.dream_world.front_default;

            let name = d.name[0].toUpperCase() + d.name.slice(1);

            let hp      = d.stats[0].base_stat;
            let attack  = d.stats[1].base_stat;
            let defence = d.stats[2].base_stat;
            let speed   = d.stats[5].base_stat;

            let typeColor = typeColors[d.types[0].type.name];

            let element = `
                <div class="card" style="background: radial-gradient( circle at 50% 0%, ${typeColor} 36%, #ffffff 36%);">
                    <p class="hp"><span>HP</span>${hp}</p>
                    <img src=${imgSrc}>
                    <h2 class="name">${name}</h2>
                    <div class="types">
            `;

            d.types.forEach((item) => {
                element += '<span style="background-color: ' + typeColor + ';">' + item.type.name.toUpperCase() + '</span>';
            });

            element += `
                    </div>
                    <div class="stats">
                        <div>
                            <h3>${attack}</h3>
                            <p>Attack</p>
                        </div>

                        <div>
                            <h3>${defence}</h3>
                            <p>Defense</p>
                        </div>

                        <div>
                            <h3>${speed}</h3>
                            <p>Speed</p>
                        </div>
                    </div>
                </div>
            `;

            document.querySelector('main .container .cards').innerHTML += element;
        }

        fetch('https://pokeapi.co/api/v2/pokemon/' + id)
            .then(response => response.json())
            .then(data => callback(data))
    }
}

let app = new App();