const createList = document.getElementById('pokemonList')
const loadPokemon = document.querySelector('#LoadPokemon')
const limit = 10
let offset = 0
const maxPokemons = 386

function convertToHtml(pokemon) {
  return  ` <li class="pokemon ${pokemon.type}">
  <span class="name">${pokemon.name}</span>
  <span class="number">${pokemon.number}</span>
  <span class="ability">${pokemon.ability}</span>
  <div class="detail">
      <ol class="types ${pokemon.type}">
      ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
      </ol>
      <img src='${pokemon.photo}' alt='${pokemon.name}'>
  </div>
 </li>  `  
}

function loadPokemonList(offset, limit) {
    pokeApi.getPokemons(offset,limit).then((listPokemon = [])=> {
        const newHtml = listPokemon.map(convertToHtml).join('')
        createList.innerHTML +=  newHtml;
    }) 
}


loadPokemonList(offset,limit)

loadPokemon.addEventListener('click', () => {
    offset += limit;
    const nextPage = offset + limit;
    

    if(nextPage >= maxPokemons) {
        const newLimit = maxPokemons - offset;
        loadPokemonList(offset, newLimit)
        loadPokemon.parentElement.removeChild(loadPokemon)
    }else {
        loadPokemonList(offset, limit)
    }
})
