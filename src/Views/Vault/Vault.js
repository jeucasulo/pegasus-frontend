import React, { Component } from "react";
// import axios from 'axios';
import api from '../../services/api';
import Install from './Install';
import Product from './Product';
import ClientSide from './ClientSide';
// import ServerSide from './ServerSide';

import loadingGif from '../../assets/loading.gif';
import './Vault.css';
import ServerSide from "./ServerSide";
import Transaction from "./Transaction";
// import uuid from 'react-uuid';




// Panel
// import 'https://js.braintreegateway.com/web/3.58.0/js/client.min.js';
// import 'https://www.paypalobjects.com/api/checkout.js';
// import 'https://js.braintreegateway.com/web/3.57.0/js/paypal-checkout.min.js';


class Vault extends Component {
  componentDidMount() {
    this.setUserProfile();
    this.checkPayPalVault();
    // this.getClientToken();
    this.createPayPalButton();
  }


  state = {
    language: 'Node',
    loading: true,
    vault: false,
    transaction: false,
    paypalVaultTokenization: false,
    amount: 50
    // paypalVaultTokenizationToken: "",
    // clientAuthorizationResponse: 'Waiting...'
  }

  setUserProfile = () => {
    if (localStorage.getItem("user")) {
      console.log(localStorage.getItem("user"));
    } else {
      let id = Math.random().toString(36).substr(2, 15);
      let user = "user_" + id + "@test.com"
      localStorage.setItem("user", user);
      console.log("User created");
      console.log(user);
    }
  }

  checkPayPalVault = () => {
    // const token = localStorage.getItem('vaultPayPalToken');
    if (localStorage.getItem('vaultPayPalToken')) {
      console.log('PayPal vaulted')
      this.setState({ paypalVaultTokenization: true })
      this.setState({ vault: true });

    } else {
      console.log('PayPal not vaulted');
    }

  }


  getClientToken = async () => {
    console.log('getClientToken');
    // const CLIENT_AUTHORIZATION = await axios.get('http://localhost:3333/get-client-token');
    const CLIENT_AUTHORIZATION = await api.get('get-client-token');
    console.log('CLIENT_AUTHORIZATION.data');
    console.log(CLIENT_AUTHORIZATION.data);
    // this.setState({ clientAuthorizationResponse: CLIENT_AUTHORIZATION.data })

    const newoutput = JSON.stringify(CLIENT_AUTHORIZATION.data, null, '\t');

    // document.getElementById("CreatePaymentJsonResponseOutput").innerHTML = output;
    document.getElementById("installTextAreaJsonResponse").value = newoutput;

    return CLIENT_AUTHORIZATION.data.clientToken;
  }

  createPayPalButton = async () => {
    //{/* // Create a client. */}
    const CLIENT_AUTHORIZATION = await this.getClientToken();
    this.setState({ loading: false })


    const createVault = async (payload) => {
      const vault = await api.post('create-customer', {
        amount: 30,
        nonce: payload.nonce
      });
      console.log('vault');
      console.log(vault);

      const newoutput = JSON.stringify(vault.data, null, '\t');
      document.getElementById("serversideTextAreaJsonResponse").value = newoutput;

      this.setState({ vault: true });
      console.log('data.customer.paymentMethods[0].token');
      console.log(vault.data.customer.paymentMethods[0].token);

      localStorage.setItem('vaultPayPalToken', vault.data.customer.paymentMethods[0].token);

      return vault;
    }


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
              flow: 'vault',
              billingAgreementDescription: 'Your agreement description',
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
              console.log('payload.nonce');
              console.log(payload.nonce);
              // Submit `payload.nonce` to your server
              createVault(payload);
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

  createVaultTransaction = async () => {
    const token = localStorage.getItem('vaultPayPalToken');
    console.log('createVaultTransaction');
    console.log(this.state.amount);
    // const amount = { this.state.amount };
    // const customerId = localStorage.getItem('customerId');
    const payment = await api.post('create-vault-transaction', {
      amount: this.state.amount,
      // token: '7nd3dr2'
      token: token
    });
    console.log('payment');
    console.log(payment);

    const newoutput = JSON.stringify(payment.data, null, '\t');
    document.getElementById("transactionTextAreaJsonResponse").value = newoutput;

    this.setState({ transaction: true })

    return payment;
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
              <br />
              <br />
              <br />

              <div id="loadingContainer">
                <div id="loadingDiv" className='text-center'>
                  <div id="loadingDivCenterV" className='text-center'>

                    {this.state.loading
                      ?
                      <img src={loadingGif} alt="Loading" width='25px' />
                      : [
                        this.state.paypalVaultTokenization
                          ? <div>

                            <div class="p-3 mb-2 bg-dark text-white">
                              <input className='form-control' type="number" step='10' value={this.state.amount} onChange={(val) => { this.setState({ amount: val.target.value }) }} />
                            </div>

                            <br />
                            <div><button className='btn btn-success' onClick={() => this.createVaultTransaction()}>Pay</button></div>
                          </div>
                          :
                          <div id="paypal-button"></div>
                      ]
                    }





                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>

        <br />



        <div className="container" id="mainDiv">

          <div className="row">
            <div className="col">

              <div className="row">
                <div className="col-2">
                  <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link active" id="v-pills-product-tab" data-toggle="pill" href="#v-pills-product" role="tab" aria-controls="v-pills-product" aria-selected="true">Product</a>
                    <a className="nav-link" id="v-pills-install-tab" data-toggle="pill" href="#v-pills-install" role="tab" aria-controls="v-pills-install" aria-selected="false">
                      Install
                      <span className='float-right'>&#10004;</span>
                      {/* <span className='float-right'>&#x2713;</span> */}
                      {/* <span className='float-right'>&#10003;</span> */}
                      {/* <span className='float-right'>&#9745;</span> */}
                    </a>
                    <a className="nav-link" id="v-pills-clientside-tab" data-toggle="pill" href="#v-pills-clientside" role="tab" aria-controls="v-pills-clientside" aria-selected="false">
                      Client-Side
                      <span className='float-right'>&#10004;</span>
                    </a>
                    <a className="nav-link" id="v-pills-serverside-tab" data-toggle="pill" href="#v-pills-serverside" role="tab" aria-controls="v-pills-serverside" aria-selected="false">
                      Server-Side
                      {this.state.vault &&
                        <span className='float-right'>&#10004;</span>
                      }

                    </a>
                    <a className="nav-link" id="v-pills-transaction-tab" data-toggle="pill" href="#v-pills-transaction" role="tab" aria-controls="v-pills-transaction" aria-selected="false">
                      Transaction
                      {this.state.transaction &&
                        <span className='float-right'>&#10004;</span>
                      }
                    </a>

                    <select className="nav-link" id="v-pills-language-tab" data-toggle="pill" href="#v-pills-language" role="tab" aria-controls="v-pills-language" aria-selected="false"
                      onChange={e => this.setState({ language: e.target.value })}
                    >
                      <option value="Node">Node.js</option>
                      <option value="PHP">PHP</option>
                      {/* always configure clientside.js when a new language option is inserted */}
                      {/* <option value="Python">Python</option> */}
                    </select>
                  </div>
                </div>
                <div className="col-10">
                  <div className="tab-content" id="v-pills-tabContent">



                    <div className="tab-pane fade show active" id="v-pills-product" role="tabpanel" aria-labelledby="v-pills-product-tab">
                      <Product product={'PayPal Checkout'} />
                    </div>

                    <div className="tab-pane fade" id="v-pills-install" role="tabpanel" aria-labelledby="v-pills-install-tab">
                      <Install product={'profile'} language={this.state.language} response={this.state.clientAuthorizationResponse} />
                    </div>

                    <div className="tab-pane fade" id="v-pills-clientside" role="tabpanel" aria-labelledby="v-pills-clientside-tab">
                      <ClientSide product={'profile'} language={this.state.language} response={this.state.clientAuthorizationResponse} />
                    </div>

                    <div className="tab-pane fade" id="v-pills-serverside" role="tabpanel" aria-labelledby="v-pills-serverside-tab">
                      <ServerSide product={'profile'} language={this.state.language} response={this.state.clientAuthorizationResponse} />
                    </div>

                    <div className="tab-pane fade" id="v-pills-transaction" role="tabpanel" aria-labelledby="v-pills-transaction-tab">
                      <Transaction product={'profile'} language={this.state.language} response={this.state.clientAuthorizationResponse} />
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
