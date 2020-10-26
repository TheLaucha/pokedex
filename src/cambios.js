// OBTENER POKEMONES

const $URL = "https://pokeapi.co/api/v2/pokemon"

export async function obtenerPokemones(pokemon){
    return fetch(`${$URL}${pokemon}`)
    .then(respuesta => respuesta.json())
    .then(respuestaJSON => respuestaJSON)
}