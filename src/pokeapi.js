// OBTENER POKEMONES
const $URL = "https://pokeapi.co/api/v2/pokemon/"

export async function obtenerPokemon(pokemon){
    return fetch(`${$URL}${pokemon}`)
    .then(respuesta => respuesta.json())
    .then(respuestaJSON => respuestaJSON)
}

export async function obtenerPokemones(offset = 0, limit = 20){
    return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}0&limit=${limit}`)
    .then(respuesta => respuesta.json())
    .then(respuestaJSON => respuestaJSON)
}