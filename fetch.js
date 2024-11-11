// URL base de la API de Pokémon
const API_URL = "https://pokeapi.co/api/v2/";

// selecciona el contenedor donde se mostrarán las tarjetas de pokémon. que es mi constante global
const CARD_CONTAINER = document.getElementById("card_pokemon");

// con esta función obtengo los datos de un pokémon desde la API
const fetchPokemon = async (pokemon) => {
    try {
        // se solicita a la API a través del nombre o número del Pokémon
        const response = await fetch(`${API_URL}pokemon/${pokemon}`);
        // convierte la respuesta a formato JSON para trabajar con los datos
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        // se muestra un error en la consola si la solicitud falla o no se encuentra
        console.error(err);
    }
};

// Evento del botón "Buscar" que se activa al hacer clic
document.getElementById('get-btn').addEventListener('click', async () => {
    // Obtiene el valor del input (nombre del pokémon) y lo convierte a minúsculas
    const text = document.getElementById("poke-name").value.toLowerCase();
    // Llama a la función fetchPokemon para obtener los datos del Pokémon
    const pokemon = await fetchPokemon(text);

    // si el Pokémon existe, crea una tarjeta y guarda los datos
    if (pokemon) {
        // Crea la tarjeta del Pokémon y la agrega al contenedor
        const card = createCard(pokemon);
        CARD_CONTAINER.append(card);
        savePokemonData(pokemon); // Guarda los datos del Pokémon en localStorage
    }
});

// función para crear una tarjeta HTML con la información del Pokémon
function createCard(pokemon) {
    // Crea el div principal de la tarjeta y le agrega la clase "container"
    let card = document.createElement("div");
    card.classList.add("container");

    // Crea los elementos para mostrar la imagen, nombre, ID y peso
    let image = document.createElement("img");
    let pokeName = document.createElement("h3");
    let id = document.createElement("p");
    let peso = document.createElement("p");

    // Asigna valores a cada elemento con la información del Pokémon
    image.src = pokemon.sprites.back_default;  // Imagen del Pokémon
    pokeName.textContent = `Nombre: ${pokemon.name}`;  // Nombre del Pokémon
    id.textContent = `ID: ${pokemon.id}`;  // ID del Pokémon
    peso.textContent = `Peso: ${pokemon.weight}`;  // Peso del Pokémon

    // Agrega todos los elementos (imagen, nombre, ID y peso) a la tarjeta
    card.append(image, pokeName, id, peso);
    return card;  // retorna la tarjeta completa para mostrarla en la página
}

// Función para guardar los datos del Pokémon en el almacenamiento local
function savePokemonData(pokemon) {
    // Obtiene el array de pokemones guardados o un array vacío si no hay datos
    let savedPokemons = JSON.parse(localStorage.getItem("pokemons")) || [];

    // se verifica si el Pokémon ya está guardado para evitar duplicados
    if (!savedPokemons.some(p => p.id === pokemon.id)) {
        // agrega el Pokémon a la lista de guardados con propiedades clave
        savedPokemons.push({
            id: pokemon.id,
            name: pokemon.name,
            weight: pokemon.weight,
            sprite: pokemon.sprites.back_default
        });
        // Guarda el array actualizado en localStorage en formato JSON
        localStorage.setItem("pokemons", JSON.stringify(savedPokemons));
    }
}

// función para cargar y mostrar las tarjetas de Pokémon guardadas al abrir la página
function loadSavedPokemons() {
    // vobtiene el array de Pokémon guardados o un array vacío si no hay datos
    const savedPokemons = JSON.parse(localStorage.getItem("pokemons")) || [];

    // Crea una tarjeta para cada Pokémon guardado
    savedPokemons.forEach(pokemon => {
        let card = document.createElement("div");
        card.classList.add("container");

        // Crea los elementos de la tarjeta con los datos guardados
        let image = document.createElement("img");
        let pokeName = document.createElement("h3");
        let id = document.createElement("p");
        let peso = document.createElement("p");

        // Asigna valores a cada elemento usando los datos guardados
        image.src = pokemon.sprite;
        pokeName.textContent = `Nombre: ${pokemon.name}`;
        id.textContent = `ID: ${pokemon.id}`;
        peso.textContent = `Peso: ${pokemon.weight}`;

        // Agrega todos los elementos a la tarjeta y la muestra en la página
        card.append(image, pokeName, id, peso);
        CARD_CONTAINER.append(card);
    });
}

// se llama a la función para cargar los pokémon guardados cuando la página se carga
document.addEventListener("DOMContentLoaded", loadSavedPokemons);