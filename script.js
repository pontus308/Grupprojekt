const pokeContainer = document.getElementById("pokeContainer");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
let pokeStart = 1;
let pokeEnd = pokeStart + 6;

async function fetchPokemon() {
  for (let i = pokeStart; i < pokeEnd; i++) {
    await getPokemon(i);
  }
}

async function getPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const resolve = await fetch(url);
  const pokemon = await resolve.json();
  createPokeCard(pokemon);
}

function createPokeCard(pokemon) {
  const pokeElement = document.createElement("div");
  pokeElement.classList.add("pokemon");
  const pokeInnerHTML = `
        <div class="image-container">
          <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemon.id
          }.png"
        />
        </div>
        <p>${capitalizeFirstLetter(pokemon.name)}</p>
        <p>Price: ${pokemon.weight}</p>
        <button id="readmore">Read more</button>
        `;
  pokeElement.innerHTML = pokeInnerHTML;

  pokeContainer.appendChild(pokeElement);
}

fetchPokemon();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function clearPokeCards() {
  pokeContainer.innerHTML = "";
}

previousButton.onclick = function () {
  if (pokeStart >= 7) {
    pokeStart = pokeStart - 6;
    pokeEnd = pokeEnd - 6;
    clearPokeCards();
    fetchPokemon();
  }
  return;
};
nextButton.onclick = function () {
  if (pokeStart < 60) {
    pokeStart = pokeStart + 6;
    pokeEnd = pokeEnd + 6;
    clearPokeCards();
    fetchPokemon();
  }
};
