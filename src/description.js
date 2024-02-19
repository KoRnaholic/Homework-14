const id = new URLSearchParams(window.location.search).get("id");
const poke_container = document.getElementById("poke_container");
console.log(poke_container)

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

     console.log(data)
  };

 fetchPokemons(id);


  const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");
    let {name,id, sprites, types, abilities, stats} = pokemon;
    id = pokemon.id.toString().padStart(3, "0");

    const poke_types = pokemon.types.map((type) => type.type.name);
    const type = main_types.find((type) => poke_types.indexOf(type) >= 0);
    pokemonEl.classList.add(type);
    const color = colours[type];
    pokemonEl.style.backgroundColor = color;

    const pokemonInnerHTML = `
    <div>
    <div class="img-container">
    <img src="${sprites.front_default}" alt="${pokemon.species.name}"/>
    </div>
    <div class="info-container">
    <span class="number">#${id}</span>
    <h3 class="name">${name.toUpperCase()}</h3>
    <small class="type">Type : <span>${types[0].type.name}</span></small>
    </div>
    </div>
    <div class="info">

            <div class="ability">Abilities:
            ${abilities.map(ability => {
                return ` <span class="abilities">${ability.ability.name}</span>`
            }).join("")}
            </div>
            <div class="ability">
            <table class="pokemon-stats">
            <tr>
                <th>Stat</th>
                <th>Value</th>
            </tr>
            ${stats.map(stat=> {
                return `<tr>
                <td class="stats">${stat.stat.name}<img src="/src/styles/icons/${stat.stat.name}.svg" width="30px" height="25px" /></td>
                <td>${stat.base_stat}</td>
            </tr>`
            }).join("")}
        </table>
            </div>
            
    `;
    pokemonEl.innerHTML=pokemonInnerHTML;
    poke_container.appendChild(pokemonEl);
    
};