import React, {useState, useContext} from 'react';

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import RateReviewIcon from '@material-ui/icons/RateReview';
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import InfoOutlined from '@material-ui/icons/InfoOutlined'
import StarIcon from '@material-ui/icons/Star'


// core components
import Paper from '@material-ui/core/Paper';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

//context
import { ProductDetailsContext } from '../../contexts/ProductDetailsContext';

import { bugs, website, server } from "variables/general.js";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import SearchBar from 'components/SearchBar/SearchBar.js'

const useStyles = makeStyles(styles);


const columns = [
  {
    id: 'productImg',
    label: '',
    width: '10%',
    align: 'left',

  },
  { id: 'asin', label: 'ASIN', width: '15%' },
  { id: 'title', label: 'Title', width: '60%' },
  {
    id: 'price',
    label: 'Price',
    width: '15%',
    align: 'left',

  }
];

export default function Dashboard() {
  const classes = useStyles();
  const [gettingData, setGettingData] = useState(false)
  const [asin, setASIN] = useState("");
  const [products, setProducts] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { productDetails, dispatch } = useContext(ProductDetailsContext)

  function createData(asin, title, price, productImage) {
    const productImg = <Avatar variant='square' alt={asin} src={productImage} style={{width: '100px', height:'100px'}}/>;
    return { productImg, asin, title, price };
  }

  const handleChangePage = (event,newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  
    if(asin!="" && products!= null){
      const productList = products["items"].map(product => 
        createData(product.ASIN, product.productTitle, product.ProductPrices, product.ProductImageLink)
        );
      /*alert(JSON.stringify(productList, null, 4)); */
      if(productList){
      return(
      <div>
        <GridContainer>
          {/* <SearchBar asin={asin} setASIN={asin =>setASIN(asin)} setProducts={products =>setProducts(products)}/> */}
          <SearchBar setGettingData={gettingData =>setGettingData(false)} asin={asin} setASIN={asin =>setASIN(asin)} setProducts={products =>setProducts(products)}/>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Store />
                </CardIcon>
                  <p className={classes.cardCategory}>Products</p>
                  <h3 className={classes.cardTitle}>{products['product_count']}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                <LocalOffer />
                Tracked from {products['sellerName']}
                </div>
              </CardFooter>
            </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <StarIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Overall Rating</p>
              <h3 className={classes.cardTitle}>{products['seller_rating']}/5</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from {products['sellerName']}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <RateReviewIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Reviews</p>
              <h3 className={classes.cardTitle}>{products['seller_review']}</h3>
            </CardHeader>
             <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from {products['sellerName']}
              </div>
            </CardFooter> 
          </Card>
        </GridItem>
      </GridContainer>
      {/*<GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
      </GridItem>
      </GridContainer>*/}
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Product Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
            
            <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ width: column.width }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {productList && productList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((productList) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={productList.asin}>
                      {columns.map((column) => {
                        const value = productList[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={productList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}/>
        

            </CardBody>
          </Card>
        </GridItem>
       </GridContainer>
      </div>

      )
      }
      }
  
      return (

          <div>
            <GridContainer>
              <SearchBar setGettingData= {gettingData =>setGettingData(false)} setASIN={asin =>setASIN(asin)} setProducts={products =>setProducts(products)}/>
            </GridContainer>
          </div>

      )        
}
