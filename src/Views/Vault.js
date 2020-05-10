import React, { Component } from "react";
import axios from 'axios';
// import 'https://js.braintreegateway.com/web/3.58.0/js/client.min.js';
// import 'https://www.paypalobjects.com/api/checkout.js';
// import 'https://js.braintreegateway.com/web/3.57.0/js/paypal-checkout.min.js';

 
class Vault extends Component {
  componentDidMount () {
    // this.getClientToken();
    this.createPayPalButton();
  }

  getClientToken = async () => {
    console.log('getClientToken');
    const CLIENT_AUTHORIZATION = await axios.get('http://localhost:3333/get-client-token');
    return CLIENT_AUTHORIZATION.data.clientToken;
  }

  createPayPalButton = async () => {
    //{/* // Create a client. */}
    const CLIENT_AUTHORIZATION =  await this.getClientToken();
    // console.log(CLIENT_AUTHORIZATION);
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
          // env: 'production', // or 'sandbox'
          env: 'sandbox', // or 'sandbox'

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
              // Submit `payload.nonce` to your server.
              axios.post('http://localhost:3333/create-customer', { payment_method_nonce:payload.nonce })
                .then(function(response){
                  console.log(response);
                  console.log('salvo com sucesso');
              }).catch(function (error) {
                  console.log(error);
              });



              // mycode
              // window.$(document).ready(function(){
              //     window.$.ajax({
              //       type: "POST",
              //       // url: "EC-VAULT-BT/payment.php",
              //       url: "http://localhost:3333/create-customer",
              //       data: {
              //           payment_method_nonce:payload.nonce,
              //           amount:10,
              //       },
              //       dataType: "JSON"
              //     })
              //     .done(function(response) {
              //       // alert( "success" );
              //       console.log( "success" );
              //       console.log(response);
              //     })
              //     .fail(function (jqXHR, exception) {
              //       console.log(exception)
              //       console.log(jqXHR)
              //       var msg_err = "";
              //       if (jqXHR.status === 0) {
              //         msg_err = "Not connect. Verify Network.";
              //       } else if (jqXHR.status == 404) {
              //         msg_err = "Requested page not found. [404]";
              //       } else if (jqXHR.status == 500) {
              //         msg_err = "Internal Server Error [500].";
              //       } else if (exception === "parsererror") {
              //         msg_err = "Requested JSON parse failed.";
              //       } else if (exception === "timeout") {
              //         msg_err = "Time out error.";
              //       } else if (exception === "abort") {
              //         msg_err = "Ajax request aborted.";
              //       } else {
              //         msg_err = "Uncaught Error. "+ jqXHR.responseText;
              //       }
              //       alert(msg_err);
              //       console.log('fail');
              //     })
              //     .always(function() {
              //       alert("complete");
              //       console.log('always');
              //     });
              // });


              //my code

              console.log('payload');
              console.log(payload);
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
                <br/>
                <div id="paypal-button"></div>

              </div>
            </div>
          </div>
       </>
    );
  }
}
 
export default Vault;
