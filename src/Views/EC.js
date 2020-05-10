import React, { Component } from "react";
import axios from 'axios';
import api from '../services/api';
import Panel from './Partials/Panel';
import Product from './Partials/Product';
import loadingGif from '../assets/loading.gif';
import './EC.css';




// Panel
// import 'https://js.braintreegateway.com/web/3.58.0/js/client.min.js';
// import 'https://www.paypalobjects.com/api/checkout.js';
// import 'https://js.braintreegateway.com/web/3.57.0/js/paypal-checkout.min.js';

 
class Vault extends Component {
  componentDidMount () {
    // this.getClientToken();
    this.createPayPalButton();
  }

  state = {
    language: 'Node',
    loading: true,
    clientAuthorizationResponse: 'tete'
  }


  getClientToken = async () => {
    console.log('getClientToken');
    // const CLIENT_AUTHORIZATION = await axios.get('http://localhost:3333/get-client-token');
    const CLIENT_AUTHORIZATION = await api.get('get-client-token');
    console.log('CLIENT_AUTHORIZATION.data');
    console.log(CLIENT_AUTHORIZATION.data);
    this.setState({ clientAuthorizationResponse: CLIENT_AUTHORIZATION.data })
    return CLIENT_AUTHORIZATION.data.clientToken;
  }

  createPayPalButton = async () => {
    //{/* // Create a client. */}
    const CLIENT_AUTHORIZATION =  await this.getClientToken();
    this.setState({ loading: false })

    // Be sure to have PayPal's checkout.js library loaded on your page.
    // <script src="https://www.paypalobjects.com/api/checkout.js" data-version-4></script>

    // Create a client.
    // braintree.client.create({
    window.braintree.client.create({
      authorization: CLIENT_AUTHORIZATION
    }, function (clientErr, clientInstance) {

      // Stop if there was a problem creating the client.
      // This could happen if there is a network error or if the authorization
      // is invalid.
      if (clientErr) {
        console.error('Error creating client:', clientErr);
        return;
      }

      // Create a PayPal Checkout component.
      // braintree.paypalCheckout.create({
      window.braintree.paypalCheckout.create({
        client: clientInstance
      }, function (paypalCheckoutErr, paypalCheckoutInstance) {

        // Stop if there was a problem creating PayPal Checkout.
        // This could happen if there was a network error or if it's incorrectly
        // configured.
        if (paypalCheckoutErr) {
          console.error('Error creating PayPal Checkout:', paypalCheckoutErr);
          return;
        }

        // Set up PayPal with the checkout.js library
        // paypal.Button.render({
        window.paypal.Button.render({
          // env: 'production', // Or 'sandbox'
          env: 'sandbox', // Or 'sandbox'
          commit: true, // This will add the transaction amount to the PayPal button

          payment: function () {
            return paypalCheckoutInstance.createPayment({
              flow: 'checkout', // Required
              amount: 10.00, // Required
              currency: 'USD', // Required
              enableShippingAddress: true,
              shippingAddressEditable: false,
              shippingAddressOverride: {
                recipientName: 'Scruff McGruff',
                line1: '1234 Main St.',
                line2: 'Unit 1',
                city: 'Chicago',
                countryCode: 'US',
                postalCode: '60652',
                state: 'IL',
                phone: '123.456.7890'
              }
            });
          },

          onAuthorize: function (data, actions) {
            return paypalCheckoutInstance.tokenizePayment(data, function (err, payload) {
              // Submit `payload.nonce` to your server
            });
          },

          onCancel: function (data) {
            console.log('checkout.js payment cancelled', JSON.stringify(data, 0, 2));
          },

          onError: function (err) {
            console.error('checkout.js error', err);
          }
        }, '#paypal-button').then(function () {
          // The PayPal button will be rendered in an html element with the id
          // `paypal-button`. This function will be called when the PayPal button
          // is set up and ready to be used.
        });

      });

    });
  }

  render() {
    return (
        <>
          {/* // {this.state.language} */}
          {/*
            // Be sure to have PayPal's checkout.js library loaded on your page.
            // <script src="https://www.paypalobjects.com/api/checkout.js" data-version-4></script>
          */}
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <br/>
                <br/>
                <br/>

                <div id="loadingContainer">
                  <div id="loadingDiv" className='text-center'>
                    <div id="loadingDivCenterV" className='text-center'>

                      {this.state.loading &&
                        <img src={loadingGif} alt="Loading" width='25px' />
                      }

                      <div id="paypal-button"></div>

                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>

          <br/>



          <div className="container" id="mainDiv">

            <div className="row">
              <div className="col">

                <div className="row">
                  <div className="col-2">
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                      <a className="nav-link active" id="v-pills-product-tab" data-toggle="pill" href="#v-pills-product" role="tab" aria-controls="v-pills-product" aria-selected="true">Product</a>
                      <a className="nav-link" id="v-pills-install-tab" data-toggle="pill" href="#v-pills-install" role="tab" aria-controls="v-pills-install" aria-selected="false">Install</a>
                      <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Client-Side</a>
                      <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
                      <select className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false"
                        onChange={e => this.setState({ language: e.target.value })}
                      >
                        <option value="Node">Node.js</option>
                        <option value="PHP">PHP</option>
                        <option value="Python">Python</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-10">
                    <div className="tab-content" id="v-pills-tabContent">



                      <div className="tab-pane fade show active" id="v-pills-product" role="tabpanel" aria-labelledby="v-pills-product-tab">
                        <Product product={'PayPal Checkout'} />
                      </div>

                      <div className="tab-pane fade" id="v-pills-install" role="tabpanel" aria-labelledby="v-pills-install-tab">
                        <Panel product={'profile'} language={this.state.language} response={this.state.clientAuthorizationResponse} />
                      </div>

                      <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                        Messages
                      </div>

                      <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                        Settings
                      </div>

                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>


          <style> 
            *{
              'background-color:red'
            }
          </style> 




       </>
    );
  }
}
export default Vault;
