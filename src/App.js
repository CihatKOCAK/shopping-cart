import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar, Products, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';
import { set } from 'react-hook-form';

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [products, setProducts] = useState([]);
  const[category,setCategory] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const[checked, setChacked]=useState([]);

  const handleCategory = async (value) =>{
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if(currentIndex === -1){
      newChecked.push(value)
    }
    else{
      newChecked.splice(currentIndex,1)
    }
    setChacked(newChecked);
  
    console.log(newChecked);
    
       commerce.products.list({
        category_id: newChecked,
      }).then(response => setProducts(response.data));
    

  }

  const fetchProducts = async () => {
   
      console.log(setChacked);
      const { data } = await commerce.products.list();
      setProducts(data);
      
  };

  const fetchCategory = async () =>{
    const {data} = await commerce.categories.list();
    setCategory(data);
  };

  
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };



  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchProducts();
    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar category = {category} handleCategory ={handleCategory} totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} handleCategory handleUpdateCartQty />
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
          </Route>
          <Route path="/checkout" exact>
            <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;