import React from 'react';
import { Grid, Checkbox } from '@material-ui/core';
import Product from './Product/Product'
import { Navbar } from '../Navbar/Navbar'
import useStyles from './styles'



const Products = ({ products, onAddToCart,fetchProducts,handleCategory }) => {
    const classes = useStyles();
    //console.log(products);  //products.categories.name
    return (
        
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products.map((product) =>
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} fetchProducts={fetchProducts} handleCategory = {handleCategory}/>
                    </Grid>
                )}
            </Grid>
        </main>);
}

export default Products;


