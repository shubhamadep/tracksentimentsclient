import React, { useState, useContext } from 'react';
import { Container, Paper, InputBase, IconButton, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import DirectionsIcon from '@material-ui/icons/Directions';
import { getProductDetails } from 'util/product';
import { ProductDetailsContext } from '../../contexts/ProductDetailsContext';


const useStyles = makeStyles((theme) => ({
    root:{
        display: 'flex',
        backgroundColor: theme.palette.primary.background,
        height: '100vh'
    },
    inputBar: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
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
export default function SearchBar({setGettingData, setASIN, setProducts}) {
    const classes = useStyles()
    const [value, setValue] = useState("");
    let fetchingData = true;
    let products = {};
    const { productDetails, dispatch } = useContext(ProductDetailsContext)

    console.log(productDetails)
    const displayTest = productDetails.length > 0 ? productDetails[0]['listedProductsAndDetails'] : 'oops!'
    console.log(displayTest)

    const handleChange = (e) => {
        setValue(e.target.value);
       
  
    };

    async function handleGoClick() {

        setGettingData(value);

        products = await getProductDetails(value);     
        /*alert(JSON.stringify(products, null, 4));*/
        setASIN(value);
        setProducts(products);

        console.log(products)

        dispatch({type: 'UPDATE_PRODUCT_DETAILS', amazonScrapperAPIData: {
          listedProductsAndDetails: products,
          statusCode: true
        }})

        setGettingData(false)
    };
    
    if(Object.keys(products).length === 0){

    
    return(

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