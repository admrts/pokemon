const bg_color = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF63A4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};

const pokeContainer = document.querySelector(".poke-container");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");
const searchInput = document.querySelector(".searchInput");

const pokeCount = 150;
const url = "https://pokeapi.co/api/v2/pokemon";

searchBtn.addEventListener("click", () => {
  search.classList.toggle("active");
});

const fetchPokemons = async () => {
  for (let i = 1; i < pokeCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  createPokemonCard(data);
};

fetchPokemons();

const createPokemonCard = (pokemon) => {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");

  const pokeId = pokemon.id.toString().padStart(3, "0");

  const pokemonType = pokemon.types[0].type.name;

  const pokemonBg = bg_color[pokemonType];
  pokemonDiv.style.backgroundColor = `${pokemonBg}`;

  const pokemonDivInnerHTML = `
  <div class="image-container">
  <img
    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
    alt=""
  />
</div>
<div class="poke-info">
            <div class="poke-id">#${pokeId}</div>
            <h3 class="poke-name">${pokemon.name}</h3>
            <div class="small">
              <small class="poke-exp">
                <i class="fa solid fa-flask"></i> ${pokemon.base_experience} exp
              </small>
              <small class="poke-weight">
                <i class="fa solid fa-flask"></i> ${pokemon.weight} kg
              </small>
            </div>
            <div class="poke-type">
              <i class="fa-brands fa-uncharted"> ${pokemonType}</i>
            </div>
          </div>
`;

  pokemonDiv.innerHTML = pokemonDivInnerHTML;
  pokeContainer.appendChild(pokemonDiv);
};

// search

searchInput.addEventListener("input", (e) => {
  const searchValue = searchInput.value.toLowerCase();
  const pokemonNames = document.querySelectorAll(".poke-name");

  pokemonNames.forEach((pokemonName) => {
    if (pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
      pokemonName.parentElement.parentElement.style.display = "block";
    } else {
      pokemonName.parentElement.parentElement.style.display = "none";
    }
  });
});
