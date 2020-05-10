import React, { Component } from "react";
// import axios from 'axios';
// import 'https://js.braintreegateway.com/web/3.58.0/js/client.min.js';
// import 'https://www.paypalobjects.com/api/checkout.js';
// import 'https://js.braintreegateway.com/web/3.57.0/js/paypal-checkout.min.js';

 
class Product extends Component {
  renderProduct(product){
    return(
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          {/*// <h1 class="display-4">{product}</h1>*/}
          <p class="lead">{this.renderProductInfo({product})}</p>
        </div>
      </div>
    )
  }
  renderProductInfo(product){
    let info;
    switch (product) {
      case 'PayPal Checkout':
        info = "Checkout with PayPal is a one-time payment checkout experience that gives you more control throughout the entire checkout process. It offers a streamlined checkout flow that keeps customers local to your website throughout the payment authorization process."
        break;
      default:
      info = "Checkout with PayPal is a one-time payment checkout experience that gives you more control throughout the entire checkout process. It offers a streamlined checkout flow that keeps customers local to your website throughout the payment authorization process."
    }
    return info;
  }
  render() {
    return (
        <>
          {this.renderProduct(this.props.product)}
       </>
    );
  }
}
 
export default Product;
