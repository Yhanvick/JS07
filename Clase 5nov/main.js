//FETCH Y SINCRONIA

function orderBurger(burgerType) { //{mi bloque de código}
    return new Promise((resolve, reject) =>{
        console.log('Starting order: ${burgerType}, burger');
        setTimeout(() => {
            console.log('Order: ${burgerType}, burger is ready');
            resolve(burgerType);
    }, 2000 );
 }); //new y promise es una palabara reservada, es un ovkjeto que representa una promesa, hay un call back 
} 
console.log('Order placed');
orderBurger("Double Western Bacon")
     .then((res) => console.log(res))
     .catch((err) => console.error(err));
     
     async function orderAndServe(burgerType) {
        try {
            console.log("Placing order")
            const burger = await new Promise((res, rej) => res(burgerType));
            console.log('Here is your order: ${burger}');
        } catch (err) {
            console.error(err);
        }
     }

     orderAndServe("Portobello burger");
     