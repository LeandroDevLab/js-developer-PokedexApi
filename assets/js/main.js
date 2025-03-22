const pokemonList = document.getElementById('pokemonList') /*pega o valor contido no HTML*/ 
const loadMoreButton = document.getElementById('loadMoreButton')

/* definindo um máximo de carregamento */
const maxRecords = 151
const limit = 5
let offset = 0

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#00${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">

            </div>
        </li>
    `).join('')
        pokemonList.innerHTML += newHtml /*substitui valor contido por um novo valor criado*/
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    debugger
    const qtdRecordNexPage = offset + limit

    if(qtdRecordNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens (offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens (offset, limit)
    }

    
})

/* 
//se não tivesse +=  na expressão ***pokemonList.innerHTML += newHtml*** e só = newHtml, 
//um botão de voltar seria interessante
goBackButton. addEventListener('click', () => {
    offset -= limit
    loadPokemonItens(offset, limit)
}) */




/*
    REDUZIDO DE FORMA 1
pokeApi.getPokemons().then((pokemons = []) => {
    const newList = pokemons.map((pokemon) => convertPokemonToLi(pokemon))
    const newHtml = newList.join('')
    pokemonList.innerHTML += newHtml
})   */    
 



/*
    FORMA 1
const pokemonList = document.getElementById('pokemonList')

pokeApi.getPokemons().then((pokemons) => {
        for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i];
            pokemonList.innerHTML += convertPokemonToLi(pokemon)
        }
}) */
    
//Foi condensada na função de cima
/* function convertPokemonToLi(pokemon){
    
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#00${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">

            </div>
        </li>
    `
} */