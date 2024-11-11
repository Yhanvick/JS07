const API_URL = "https://pokeapi.co/api/v2/";

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${API_URL}pokemon/${pokemon}`); // Cambiamos a comillas invertidas 
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err); // Imprimimos el error si ocurre uno
    }   
};
//fetchPokemon();

//GET desde el input
document.getElementById('get-btn')
  .addEventListener('click', async () => {
    const text = document.getElementById("poke-name").value.toLowerCase(); //aunque se escriba nombre en mayuscula o minuscula, no va a dar problema
    const pokemon = await fetchPokemon(text);
    localStorage.setItem("pokemonId", pokemon.id); //con esto podemos manipualr y pasar al sigueinte 
    console.log(pokemon.name);
  })

//GET-PREV
document.getElementById('prev-btn').addEventListener("click", async () => {
    const currentPokemonId = localStorage.getItem("pokemonId");
    const newId = Math.max(1, currentPokemonId - 1); //mathmax va a comparar los numeros que hay dentro del parentesis, no nos vamos a pasar del limite y se ahorra un error.
    const pokemon = await fetchPokemon(newId);
    console.log(pokemon);
})

//Get-NEXT es el boton de siguiente. Sera casi identico al anterior, solo se cambie ID y NEWID

document.getElementById('next-btn').addEventListener("click", async () => {
    const currentPokemonId = localStorage.getItem("pokemonId");
    const newId = currentPokemonId + 1;
    const pokemon = await fetchPokemon(newId);
    console.log(pokemon);
})