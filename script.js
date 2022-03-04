const pokeContainer = document.getElementById("pokeContainer");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const modal = document.getElementById("modal");
let pokeStart = 1;
let pokeEnd = pokeStart + 12;

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
        <p class="name">${capitalizeFirstLetter(pokemon.name)}</p>
        <p class="p">Price:<span> ${pokemon.weight}</span></p>
      
        <button onclick="viewMore(${
          pokemon.id
        })" class="btn1">Read more</button>
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
const viewMore = async (id) => {
  modal.innerHTML = "";
  const pokeElement = document.createElement("div");
  pokeElement.classList.add("pokemodal");
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const resolve = await fetch(url);
  const pokemon = await resolve.json();
  console.log(pokemon);
  const pokeInnerHTML = `
        <div class="image-container">
          <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemon.id
          }.png"
        />
        </div>
        <p class="name">${capitalizeFirstLetter(pokemon.name)}</p>
        <p class="p">Price:<span> ${pokemon.weight}</span></p>
          <p class="p">height:<span> ${pokemon.height}</span></p>
        <p class="p">ability:<span> ${
          pokemon.abilities[0].ability.name
        }</span></p>
        <p class="p">move:<span> ${pokemon.moves[0].move.name}</span></p>
        <p class="p">species:<span> ${pokemon.species.name}</span></p>
      <button class='btn1' onclick="closemodal()">Close</button>
        `;
  pokeElement.innerHTML = pokeInnerHTML;

  modal.appendChild(pokeElement);
};
const closemodal = () => {
  modal.innerHTML = "";
};
