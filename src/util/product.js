import axios from 'axios';

export function getProductDetails(value) {
    console.log("Calling API...........")
    return new Promise((resolve, reject) => {
      axios
        .get('https://amazonsellerproductinfo.herokuapp.com/getproductdetails/scrape?SellerID='+value)
        .then(
          res => resolve(res.data),
          err => reject(err)
        );
    });
  }