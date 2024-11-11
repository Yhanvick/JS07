const IMAGE_URL = "https://placehold.co/200";
//lo pongo todo en imayusculas porque será una constante global
const CARD_CONTAINER = document.getElementById("container");
//son variables contexto¿?
const IMG_CONTAINER = document.getElementById("img-container");

const users = [
    {
        id: 1,
        user_name: 'User1',
        description: 'lorem ipsum',
        age: '46',
        fav_music: {
            bands: [
                'Black Veil Brides', 'Bring me the Horizon', 'Get Scared', 'The Word Alive'
            ]
        }
    },
    {
        id: 2,
        user_name: 'User LastName',
        description: 'Lorem lorem lorem',
        age: '23',
        fav_music: {
            bands: [
               'Bad Bunny', 'Danny Flow', 'Don Omar', 'Travis Scott'
            ]
        }
    },

    {
        id: 3,
        user_name: 'Selene',
        description: 'Lorem lorem lorem',
        age: '23',
        fav_music: {
            bands: [
               'Editors', 'System of a Down', 'Camaron de la Isla', 'Elsiane'
            ]
        }
    }
]

/**
 * Lista de bandas de usuarios
 * @returns {item} Retorna la lista de bandas favoritas
 */

function generateListBand(user) //esta función genera la lista de bandas del usuario 
{
    return user.fav_music.bands.map(band => {
        const item = document.createElement("li");
        item.textContent = band; 
        return item;
    });
}

function createCard(user) //esta función crea las tarjetas de los usarios, en estas se crean elementos HTML para poder imprimir en la página. 
{
    const card = document.createElement("div");
    const image = document.createElement("img");
    const userName = document.createElement("h3");
    const description = document.createElement("p");
    const age = document.createElement("p");
    const bands = document.createElement("ul");


    const bandList = generateListBand(user); //
    image.src = IMAGE_URL; //mando llamar mi contante global dandole un atributo de enlace a mi variable 

    userName.textContent = user.user_name; //agrego texto dentro de mis etiquetas, en este caso obtengo el noimbre de usuario, su descripción y edad
    description.textContent = user.description;
    age.textContent = user.age;

    bands.append(...bandList); //con mi .append puedo agregar elementos a mis etiquetas 
    card.append(userName, image, description, age, bands); //con esto agrego estas etiquetas dento de la etiqueta card que es un div
    
    CARD_CONTAINER.append(card); // Se agrega a la página a travez del container que está en el html como etiqueta 
}

users.forEach(user => createCard(user));

// Alternar visibilidad de la tarjeta al hacer clic en el botón
document.getElementById("btn-hide").addEventListener("click", () => {
    CARD_CONTAINER.style.visibility = 
        CARD_CONTAINER.style.visibility === "hidden" ? "visible" : "hidden";
});