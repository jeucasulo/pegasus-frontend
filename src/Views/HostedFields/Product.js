import React, { Component } from "react";
import dropinProductImg from '../../assets/dropinProductImg.png';

// import axios from 'axios';
// import 'https://js.braintreegateway.com/web/3.58.0/js/client.min.js';
// import 'https://www.paypalobjects.com/api/checkout.js';
// import 'https://js.braintreegateway.com/web/3.57.0/js/paypal-checkout.min.js';


class Product extends Component {
  renderProduct(product) {
    return (
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          {/*// <h1 className="display-4">{product}</h1>*/}
          <p className="lead">{this.renderProductInfo({ product })}</p>
        </div>
      </div>
    )
  }
  renderProductInfo(product) {
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
        {/* {this.renderProduct(this.props.product)} */}
        {/* <p><span className="font-weight-bold" style={{ textDecoration: 'underline ' }}>Vaulting a PayPal account</span> will allow you to charge the account in the future without requiring your customer to re-authenticate with PayPal.</p> */}

        <p>
          Our <span className="font-weight-bold" style={{ textDecoration: 'underline ' }}>Drop-in UI</span> is a ready-made payment UI that offers the quickest way to integrate and start securely accepting payments with Braintree.
        </p>

        <img src={dropinProductImg} alt="" />



      </>
    );
  }
}

export default Product;
