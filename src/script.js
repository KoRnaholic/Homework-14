const poke_container = document.getElementById("poke_container");
console.log(poke_container)

const pokemon_count = 20;

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
  console.log(data)
  createPokemonCard(data);
};
let prokeArr = [];
const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");
    let {name,id, sprites, types} = pokemon;
     id = pokemon.id.toString().padStart(3, "0");
 
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
    pokemonEl.innerHTML=pokemonInnerHTML;

    poke_container.appendChild(pokemonEl)
};

getPokemons();
