import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Checkbox, Grid } from '@material-ui/core';
import { CallMissedSharp, ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/commerce.png'
import useStyles from './styles'
import { Link, useLocation } from 'react-router-dom';
import { Products } from '..';
const Navbar = ({ totalItems, category,handleCategory }) => {
    const classes = useStyles();
    const location = useLocation();





    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherid">
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
                        Commerce.js
                    </Typography>

                    {location.pathname === '/' && category.map((item) =>
                        <div key={item.id}>
                            <input value={item.name} 
                             type="checkbox" onChange={()=>handleCategory(item.id)}/>
                            <span>{item.name}</span>
                        </div>
                    )}
                    <div className={classes.grow} />
                    {location.pathname === '/' && (
                        <div className={classes.button}>
                            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    )}

                </Toolbar>


            </AppBar>
        </>
    )
}

export default Navbar
