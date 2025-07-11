import { useEffect, useState } from 'react'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/db';

function App() {

  // State
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1
  
  function addToCart(item){
    
    const ItemExists = cart.findIndex(guitar => guitar.id === item.id);
    
    if(ItemExists >= 0){
      console.log("Ya existe")
      const updatedCart = [...cart]
      updatedCart[ItemExists].quantity++
      setCart(updatedCart);
    }else{
      console.log("No existe, agregando...")
      item.quantity = 1;
      setCart([...cart, item]);
    }

  };

  // const deleteFromCart = itemId =>  setCart(prevCart => prevCart.filter(guitar => guitar.id !== itemId));

  function deleteFromCart(itemId) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== itemId));
  }

  function reduceQuantity(itemId){

    const updatedCart = cart.map(item => {
      if(item.id === itemId) {

        if(item.quantity > MIN_ITEMS){
          return {
            ...item,
            quantity: item.quantity - 1
          }
        }
      }
        return item
    });

    console.log(updatedCart);
    
    setCart(updatedCart);
    
  }

  function increaseQuantity(itemId){

    const updatedCart = cart.map(item => {
      if(item.id === itemId && item.quantity < MAX_ITEMS){
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }

      return item
    });

    setCart(updatedCart)
  };

  return (
    <>

    <Header 
      cart={cart}
      deleteFromCart={deleteFromCart}
      reduceQuantity={reduceQuantity}
      increaseQuantity={increaseQuantity}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

            {data.map((guitar) => (
              <Guitar 
                key={guitar.id}
                guitar={guitar}
                setCart={setCart}
                addToCart={addToCart}
              />
            ))}

        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
