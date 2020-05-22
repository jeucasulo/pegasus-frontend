import React, { Component } from "react";
import checkoutProductImg from '../../assets/checkoutProductImg.png';

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
        <p><span className="font-weight-bold" style={{ textDecoration: 'underline ' }}>Checkout with PayPal</span> is a one-time payment checkout experience that gives you more control throughout the entire checkout process. It offers a streamlined checkout flow that keeps customers local to your website throughout the payment authorization process.</p>
        <p>Unlike the Vault flow, Checkout with PayPal does not provide the ability to store a customer’s PayPal account in the Vault. However, if you are located in a country that supports PayPal One Touch™, your customer can make repeat purchases without re-entering their user credentials after their initial purchase.</p>
        <p>Checkout with PayPal supports the following features:</p>
        <ul>
          <li>Select or add shipping addresses in the PayPal account</li>
          <li>Select or add funding instruments in the PayPal account</li>
          <li>PayPal One Touch™ for Web</li>
          <li>Two factor authentication support (currently only for US, UK, CA, DE, AT, and AU)</li>
        </ul>

        <img src={checkoutProductImg} width={700} alt="" />

        <p>Typical use cases for the Checkout With PayPal flow:</p>
        <ul>
          <li>Checkout from Cart/Product pages</li>
          <li>Checkout page replacement</li>
          <li>As a payment source</li>
        </ul>
      </>
    );
  }
}

export default Product;
