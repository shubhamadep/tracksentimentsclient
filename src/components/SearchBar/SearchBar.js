import React, { useState, useContext } from 'react';
import { Container, Paper, InputBase, IconButton, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import DirectionsIcon from '@material-ui/icons/Directions';
import { getProductDetails } from 'util/product';
import { ProductDetailsContext } from '../../contexts/ProductDetailsContext';
import Button from '@material-ui/core/Button';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

const useStyles = makeStyles((theme) => ({
    root:{
        display: 'flex',
        backgroundColor: theme.palette.primary.background,
        height: '100vh'
    },
    trymeButton:{
      display: 'flex',
      alignItems: 'center',
      width: '15%',
      margin: '2vh',
    },

    inputBar: {
        display: 'flex',
        alignItems: 'center',
        width: '85%',
        margin: '2vh',
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        padding: '8px 10px'
      },
      iconButton: {
        padding: 10,
      }
}))
export default function SearchBar({setGettingData, setSellerID, sellerID}) {
    const classes = useStyles()
    const [value, setValue] = useState("");
    let fetchingData = true;
    let products = {};
    const { productDetails, dispatch } = useContext(ProductDetailsContext)

    const handleChange = (e) => {
        setValue(e.target.value);
        
    };

    const handleTryMe = () => {
      setSellerID('A20J3ITGSOMSJG');
      
    };

    function sleep(milliseconds) {
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < milliseconds);
    }

    async function handleGoClick() {

        setGettingData(true);
        setSellerID(value);
        products = await getProductDetails(value);     
        /*alert(JSON.stringify(products, null, 4));*/
        console.log(products)

        dispatch({type: 'UPDATE_PRODUCT_DETAILS', amazonScrapperAPIData: {
          listedProductsAndDetails: products['items'],
          statusCode: true,
          sellerName: products['sellerName'],
          sellerRating: products['seller_rating'],
          productCount: products['product_count'],
          sellerReviews: products['seller_review']
        }})

        setGettingData(false);
    };
    
    if(Object.keys(products).length === 0){

    
    return(
            <div style={{ display: "flex" , width: '100%'}}>
            <Paper component="form" className={classes.inputBar} >
              <InputBase
                placeholder="Enter Amazon Seller ID"
                className={classes.input}
                inputProps={{'aria-label': 'seller id' }}
                onChange={handleChange}
                defaultvalue={sellerID}
              />
              <IconButton type="submit" className={classes.iconButton} aria-label="search" align='right' onClick={handleGoClick}>
                <DirectionsIcon />
              </IconButton>
            </Paper>
            <Button variant="contained" color="primary" className={classes.trymeButton} onClick= {handleTryMe} >
            Try ME!
            </Button>
            </div>



    )

    }
}


        {/* <div className={classes.root}>
          <Container maxWidth="sm">
            <Paper component="form" className={classes.inputBar} align="left">
              <InputBase
                placeholder="Enter Amazon Seller ID"
                className={classes.input}
                inputProps={{'aria-label': 'seller id' }}
                onChange={handleChange}
              />
              <IconButton className={classes.iconButton} aria-label="search" align='right' onClick={handleGoClick}>
                <DirectionsIcon />
              </IconButton>
            </Paper>
          </Container>
        </div> */}