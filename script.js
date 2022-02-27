const pokeContainer = document.getElementById("pokeContainer");

async function fetchPokemon() {
  for (let i = 1; i < 7; i++) {
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
        `;
  pokeElement.innerHTML = pokeInnerHTML;

  pokeContainer.appendChild(pokeElement);
}

fetchPokemon();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
