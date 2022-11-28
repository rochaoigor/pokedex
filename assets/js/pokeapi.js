const pokeApi = {}

function convertPokeDetail(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.name = pokeDetail.name
  pokemon.number = pokeDetail.id
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types
  const abilities = pokeDetail.abilities.map((abilities)=> abilities.ability.name)
  const ability = abilities
  pokemon.types = types
  pokemon.type = type
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
   pokemon.ability = ability
  return pokemon
}

pokeApi.getPokemonDetail = (pokemons) => {
    return fetch(pokemons.url)
    .then((response) => response.json())
    .then(convertPokeDetail)
}


pokeApi.getPokemons = (offset, limit ) => {
const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
return fetch(url)
.then((response) => response.json())
.then((jsonBody)=> jsonBody.results)
.then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
.then((detailRequest) => Promise.all(detailRequest))
.then((pokemonDetails) =>  pokemonDetails)

  
}

     