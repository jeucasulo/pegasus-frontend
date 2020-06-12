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


class Dropin extends Component {
  componentDidMount() {
    this.setUserProfile();
    this.checkPayPalVault();
    // this.getClientToken();
    this.createPaymentsDisplay();
  }


  state = {
    language: 'Node',
    loading: true,
    vault: false,
    ccVault: false,
    transaction: false,
    // paypalVaultTokenization: false,
    amount: 50,
    userEmail: 'email@email.com',
    customerId: ''
    // loadingDivHeigth: 200
    // paypalVaultTokenizationToken: "",
    // clientAuthorizationResponse: 'Waiting...'
  }
  expandDiv = () => {
    // alert('asdf');
    // loadingDivHeigth
    // this.setState({ loadingDivHeigth: 400 })
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
    if (localStorage.getItem('vaultCCToken')) {
      console.log('PayPal vaulted')
      // this.setState({ paypalVaultTokenization: true })
      this.setState({ ccVault: true });
      this.setState({ userEmail: localStorage.getItem('vaultCCNumberData') });

    } else {
      console.log('PayPal not vaulted');
    }

  }


  getClientToken = async () => {
    console.log('getClientToken---');
    // const CLIENT_AUTHORIZATION = await axios.get('http://localhost:3333/get-client-token');
    var customerId = "";
    if (!localStorage.getItem('customerId')) {
      // customerId = await api.post('create-customer-no-nonce');
      customerId = await api.post('create-customer-no-nonce');
      console.log('customerId.data.customer.id');
      console.log(customerId.data.customer.id);
      this.setState({ customerId: customerId.data.customer.id })
      customerId = customerId.data.customer.id;
      localStorage.setItem('customerId', customerId)
    } else {
      customerId = localStorage.getItem('customerId')
      console.log('ok ja tem customer blz');
      this.setState({ customerId: customerId })
      console.log(customerId);
    }
    // console.log(customerId);
    const CLIENT_AUTHORIZATION = await api.post('get-client-token', {
      // customerId: customerId.data.customer.id
      customerId: customerId
    });
    console.log('CLIENT_AUTHORIZATION.data');
    console.log(CLIENT_AUTHORIZATION.data);
    // this.setState({ clientAuthorizationResponse: CLIENT_AUTHORIZATION.data })

    const newoutput = JSON.stringify(CLIENT_AUTHORIZATION.data, null, '\t');

    // document.getElementById("CreatePaymentJsonResponseOutput").innerHTML = output;
    document.getElementById("installTextAreaJsonResponse").value = newoutput;

    this.setState({ loading: false });

    return CLIENT_AUTHORIZATION.data.clientToken;
  }
  cancelVault = () => {
    localStorage.removeItem('vaultPayPalToken');

    this.setState({ vault: false });
    this.setState({ loading: false });
  }

  createPaymentsDisplay = async () => {
    console.log('createPayPalButton---------------------------');
    // let clientToken = document.getElementById('clientToken').innerHTML;
    const checkUser = (payload) => {
      // this.createVault(payload);
      this.createTransaction(payload);
    }

    var button = document.querySelector('#submit-button');

    const CLIENT_AUTHORIZATION = await this.getClientToken();
    // console.log(CLIENT_AUTHORIZATION);
    // braintree.dropin.create({
    console.log('createPayPalButton---------------------------okokok');
    window.braintree.dropin.create({
      authorization: CLIENT_AUTHORIZATION,
      // authorization: clientToken,
      container: '#dropin-container',
      locale: 'pt_BR',
      vaultManager: true, // ENABLES THE 'REMOVE VAULT' OPTION
      paypal: {
        flow: 'vault'
      },

      // paypalCredit: {
      //   flow: 'checkout',
      //   amount: '10.00',
      //   currency: 'USD'
      // },
      card: {
        cardholderName: {
          required: true
        }
      },




    }, (createErr, instance) => {
      button.addEventListener('click', function () {
        console.log('clicou------------------------------------------------------------');
        instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
          // Submit payload.nonce to your server
          console.log('payload.nonce');
          console.log(payload.nonce);
          console.log(payload);


          // this.createVaultTransaction();
          checkUser(payload);
          // ajax
          // $(document).ready(function(){
          // window.$(document).ready(function () {
          //   // $.ajax({
          //   window.$.ajax({
          //     type: "POST",
          //     // 	url: "EC-VAULT-BT/payment.php",
          //     url: "http://localhost:3333/create-customer",
          //     data: {
          //       payment_method_nonce: payload.nonce,
          //       amount: 10,
          //     },
          //     dataType: "JSON"
          //   })
          //     .done(function (response) {
          //       alert("success");
          //       console.log("success");
          //       console.log(response);
          //     })
          //     .fail(function (jqXHR, exception) {
          //       console.log(exception)
          //       console.log(jqXHR)
          //       var msg_err = "";
          //       if (jqXHR.status === 0) {
          //         msg_err = "Not connect. Verify Network.";
          //       } else if (jqXHR.status === 404) {
          //         msg_err = "Requested page not found. [404]";
          //       } else if (jqXHR.status === 500) {
          //         msg_err = "Internal Server Error [500].";
          //       } else if (exception === "parsererror") {
          //         msg_err = "Requested JSON parse failed.";
          //       } else if (exception === "timeout") {
          //         msg_err = "Time out error.";
          //       } else if (exception === "abort") {
          //         msg_err = "Ajax request aborted.";
          //       } else {
          //         msg_err = "Uncaught Error. " + jqXHR.responseText;
          //       }
          //       alert(msg_err);
          //       console.log('fail');
          //     })
          //     .always(function () {
          //       alert("complete");
          //       console.log('always');
          //     });
          // });

          // ajax






        });
      });
    });

  }
  createTransaction = async (payload) => {
    const payment = await api.post('create-payment', {
      // amount: 30,
      amount: this.state.amount,
      nonce: payload.nonce
    });
    console.log('payment');
    console.log(payment);

    const newoutput = JSON.stringify(payment.data, null, '\t');
    document.getElementById("transactionTextAreaJsonResponse").value = newoutput;

    this.setState({ transaction: true })
    // window.location.reload(false);


    return payment;
  }

  createCCVault = async (payload) => {
    const vault = await api.post('create-customer', {
      amount: 30,
      nonce: payload.nonce
    });
    console.log('vault');
    console.log(vault);

    const newoutput = JSON.stringify(vault.data, null, '\t');
    document.getElementById("serversideTextAreaJsonResponse").value = newoutput;

    this.setState({ vault: true });
    this.setState({ userEmail: vault.data.customer.creditCards[0].email });
    console.log('data.customer.paymentMethods[0].token');
    console.log(vault.data.customer.paymentMethods[0].token);

    localStorage.setItem('vaultCCToken', vault.data.customer.paymentMethods[0].token);
    localStorage.setItem('vaultCCNumberData', vault.data.customer.creditCards[0].email);

    return vault;
  }

  deleteCustomer = async () => {
    const deleteCustomerVar = await api.post('delete-customer', {
      customerId: this.state.customerId
    });
    console.log('deleteCustomerVar');
    console.log(deleteCustomerVar);

    const newoutput = JSON.stringify(deleteCustomerVar.data, null, '\t');
    document.getElementById("serversideTextAreaJsonResponse").value = newoutput;

    localStorage.removeItem('customerId');
    this.setState({ customerId: null })


    // this.setState({ vault: true });
    // this.setState({ userEmail: vault.data.customer.creditCards[0].email });
    // console.log('data.customer.paymentMethods[0].token');
    // console.log(vault.data.customer.paymentMethods[0].token);

    // localStorage.setItem('vaultCCToken', vault.data.customer.paymentMethods[0].token);
    // localStorage.setItem('vaultCCNumberData', vault.data.customer.creditCards[0].email);

    // return vault;
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
        <div className="container" style={{ minHeight: 200 }}>
          <div className="row">
            <div className="col text-center">




              {this.state.loading
                ?
                <img src={loadingGif} alt="Loading" width='25px' />
                // <div></div>
                :
                [
                  < div className="container" >
                    <div className="row">
                      <div className="col text-center">
                        <br />
                        <br />
                        <br />
                        {!this.state.transaction &&
                          <div id="dropin-container"></div>
                        }




                      </div>
                    </div>
                  </div>

                ]
              }
              <br />
              {this.state.customerId &&
                < p > Customer Id:{this.state.customerId} <button className='btn btn-danger' onClick={() => { this.deleteCustomer() }}>X</button> </p>
              }

              <br />
              <p>

                <div class="p-3 mb-2 bg-dark text-white">
                  <input className='form-control' type="number" step='10' value={this.state.amount} onChange={(val) => { this.setState({ amount: val.target.value }) }} />
                </div>




              </p>

              <button id="submit-button" >Request payment method</button>


              {/* </div>
                </div>
              </div> */}


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
                    {/* <a className="nav-link" id="v-pills-serverside-tab" data-toggle="pill" href="#v-pills-serverside" role="tab" aria-controls="v-pills-serverside" aria-selected="false">
                      Server-Side
                      {this.state.vault &&
                        <span className='float-right'>&#10004;</span>
                      }

                    </a> */}
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
export default Dropin;
