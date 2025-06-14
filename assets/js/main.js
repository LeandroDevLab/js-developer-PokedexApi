const pokemonList = document.getElementById('pokemonList') /*pega o valor contido no HTML*/ 
const loadMoreButton = document.getElementById('loadMoreButton')

/* definindo um máximo de carregamento */
const maxRecords = 151  
const limit = 5
let offset = 0

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <div id="card" class="card">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#00${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">

                </div>
                <div class="escondida">
                    <ol><li class="height">${pokemon.height}</li></ol>
                    <ol><li class="weight">${pokemon.weight}</li></ol>
                </div>
            </li>
        </div>
    `).join('')
        pokemonList.innerHTML += newHtml /*substitui valor contido por um novo valor criado*/
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    /* debugger */
    const qtdRecordNexPage = offset + limit

    if(qtdRecordNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens (offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens (offset, limit)
    }

    
})


const infoBox = document.getElementById("infoBox");
const closeBtn = document.getElementById("closeBtn");

pokemonList.addEventListener("click", (event) => {
    const clickedCard = event.target.closest(".card"); // Verifica se clicou em um card
    if (!clickedCard) return;

    const pokemonName = clickedCard.querySelector(".name").textContent;
    const pokemonType = clickedCard.querySelector(".type").textContent;
    const pokemonImg = clickedCard.querySelector("img").src;
    const pokemonAltura = clickedCard.querySelector(".height").textContent;
    const pokemonPeso = clickedCard.querySelector(".weight").textContent;

    // Adiciona as informações no pop-up
    infoBox.innerHTML = `
        <h2>${pokemonName}</h2>
        <img src="${pokemonImg}" alt="${pokemonName}">
        <h4>Classe principal: ${pokemonType}</h4>
        <h4>Altura: ${pokemonAltura / 10} metros</h4>
        <h4>Peso: ${pokemonPeso / 10}Kg</h4>
        <button id="closeBtn">Fechar</button>
    `;
    
    infoBox.style.display = "block";

    // Reativando o evento de fechar
    document.getElementById("closeBtn").addEventListener("click", () => {
        infoBox.style.display = "none";
    });
});
