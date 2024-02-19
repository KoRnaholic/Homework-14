const poke_container = document.getElementById("poke_container");
const startTeam = document.getElementById("startTeam");
startTeam.style.display = "none";
const pokemon_count = 40;

const getPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await fetchPokemons(i);
  }
};
const colours = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};
const main_types = Object.keys(colours);

const fetchPokemons = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  createPokemonCard(data);
};
let prokeArr = [];
const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");
    let {name,id, sprites, types} = pokemon;
     id = pokemon.id.toString().padStart(3, "0");

     const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) >= 0);
  pokemonEl.classList.add(type);
  const color = colours[type];
  pokemonEl.style.backgroundColor = color;

 
 
    const pokemonInnerHTML = `
        <div class="img-container">
            <img src="${sprites.front_default}" alt="${pokemon.species.name}"/>
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type:<span>${types[0].type.name}</span></small>
            
            
        </div>
    `;
    pokemonEl.addEventListener('contextmenu', function(e) {
       
        const menu = document.createElement("div");
        
        e.preventDefault(); 
        menu.style.display = 'block';
        menu.style.left = e.pageX + 'px';
        menu.style.top = e.pageY + 'px';
        menu.classList.add("dropdown")

        menu.innerHTML = `
                    <a href="#" id="viewDetails">View Details</a>
                    <a href="#" id="choosePokemon">Choose Pokemon</a>
        `;
        document.body.appendChild(menu);

        document.addEventListener('click', function(event) {
            if (!menu.contains(event.target)) {
                menu.style.display = 'none';
            }
          menu.remove();
        });

        document.getElementById("viewDetails").addEventListener("click", () => {
            window.location.href = `description.html?id=${pokemon.id}`;
            menu.remove();
          });

          document.getElementById("choosePokemon").addEventListener("click", () => {
            prokeArr.push(pokemon.id);
      
            if (prokeArr.length < 5) {
              console.log(prokeArr);
            } else if (prokeArr.length == 5) {
              startTeam.style.display = "block";
              startTeam.addEventListener("click", () => {
                window.location.href = `battle.html?id=${prokeArr}`;
              });
            } else {
              alert("You can choose only 5 pokemons");
            }
            menu.remove();
          });
    });

    
    pokemonEl.innerHTML=pokemonInnerHTML;

    poke_container.appendChild(pokemonEl)
};
document.querySelector('input[type="submit"]').addEventListener('click', function(event) {
  event.preventDefault(); 
  
  const selectedType = document.getElementById('pokemon-type').value;
  fetchPokemons2(selectedType);
});

const fetchPokemons2 = async (type) => {
  const url = `https://pokeapi.co/api/v2/type/${type}/`;
  const res = await fetch(url);
  const data = await res.json();
 
  poke_container.innerHTML = '';

  data.pokemon.forEach(async (poke) => {
    const res = await fetch(poke.pokemon.url);
    const pokemonData = await res.json();
    createPokemonCard(pokemonData);
  });
};

getPokemons();
