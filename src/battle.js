const id = new URLSearchParams(window.location.search).get("id");
const poke_container = document.getElementById("poke_container");
const poke_container2 = document.getElementById("poke_container2");

const splitId = id.split(",");
console.log(splitId);

const getRandomPokemonIds = () => {
  const randomIds = [];
  while (randomIds.length < 5) {
    const randomId = Math.floor(Math.random() * 200) + 1; 
    if (!randomIds.includes(randomId)) {
      randomIds.push(randomId);
    }
  }
  return randomIds;
};

const getPokemons = async (splitId) => {
  for (let i = 0; i < splitId.length; i++) {
    await fetchPokemons(splitId[i]);
  }
};

const getEnemyPokemons = async () => {
  const randomIds = getRandomPokemonIds();
  for (let i = 0; i < randomIds.length; i++) {
    await fetchOpponentPokemons(randomIds[i]);
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

  console.log(data);
  createPokemonCard(data);
};

const fetchOpponentPokemons = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  console.log(data);
  createEnemyPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");
  let { name, id, sprites, types } = pokemon;
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

  pokemonEl.innerHTML = pokemonInnerHTML;

  poke_container.appendChild(pokemonEl);
};

const createEnemyPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");
  let { name, id, sprites, types } = pokemon;
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

  pokemonEl.innerHTML = pokemonInnerHTML;

  poke_container2.appendChild(pokemonEl);
};

getPokemons(splitId);
getEnemyPokemons();

