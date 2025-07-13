import { useState } from 'react'
import Swal from 'sweetalert2'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/db';

function App() {

  // State
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  function clearCart(){
    setCart([]);
  };
  
  function addToCart(item){
    
    const ItemExists = cart.findIndex(guitar => guitar.id === item.id);
    
    if(ItemExists >= 0){
        if(cart[ItemExists].quantity < MAX_ITEMS){
          const updatedCart = [...cart]
          updatedCart[ItemExists].quantity++
          setCart(updatedCart);
        }else{
          showAlert("Máximo 5 por ítem");
        }
    }else{
      item.quantity = 1;
      setCart([...cart, item]);
    };
  };

  // const deleteFromCart = itemId =>  setCart(prevCart => prevCart.filter(guitar => guitar.id !== itemId));

  function deleteFromCart(itemId) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== itemId));
  };

  function showAlert(message){
    Swal.fire({
    position: "top-end",
    icon: "error",
    title: message,
    showConfirmButton: false,
    timer: 1500
  });
  }

  function reduceQuantity(itemId){

    const updatedCart = cart.map(item => {
      if(item.id === itemId && item.quantity > MIN_ITEMS) {
          return {
            ...item,
            quantity: item.quantity - 1
          }
      }
        return item
    });
    
    setCart(updatedCart);
  }

  function increaseQuantity(itemId){

    const updatedCart = cart.map(item => {
      if(item.id === itemId && item.quantity < MAX_ITEMS){
        return {
          ...item,
          quantity: item.quantity + 1,
        }
      }else{
          showAlert("Máximo 5 por ítem");
        };

      return item
    });

    setCart(updatedCart)
  };

  return (
    <>

    <Header 
      cart={cart}
      clearCart={clearCart}
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
